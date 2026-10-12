import re
import queue
import threading
import time
import uuid
from dataclasses import dataclass, field
from pathlib import Path

from core.ml.models import resolve
from core.pipeline import run, run_text
from core.style import load_style
from fileio.base import save
from fileio.txt_md import parse

from . import config

JOBS = {}
_QUEUE = queue.Queue()
WARM = {"state": "idle", "error": None}


def warmup(model=None):
    if WARM["state"] == "warming":
        return "warming"
    if WARM["state"] != "ready" or (model and resolve()[0] != model):
        WARM.update(state="warming", error=None)
        _QUEUE.put(("__warmup__", model))
    return WARM["state"]


def _use_model(key):
    from core.ml.loader import switch_model

    if resolve()[0] != key:
        switch_model(key)


def _warm(model=None):
    try:
        if model:
            _use_model(model)
        from core.ml.loader import get_llm

        get_llm().generate("Reply with one word.", "Hello", 8, 0.0)
        WARM["state"] = "ready"
    except Exception as e:
        WARM.update(state="error", error=f"{type(e).__name__}: {e}"[:300])


@dataclass
class Job:
    id: str
    kind: str
    filename: str
    mode: str
    strength: str
    style: str | None
    out_format: str
    src: Path | None = None
    text: str | None = None
    status: str = "queued"
    progress: float = 0.0
    result: dict | None = None
    error: str | None = None
    finished: float | None = None
    created: float = field(default_factory=time.time)
    model: str | None = None
    scope: str = "flagged"


def create(kind, filename, mode, strength, style, out_format, data=None, text=None, model=None, scope="flagged"):
    jid = uuid.uuid4().hex
    src = None
    if data is not None:
        src = config.UPLOADS / f"{jid}{Path(filename).suffix.lower()}"
        src.write_bytes(data)
    job = Job(jid, kind, filename, mode, strength, style, out_format, src, text, model=model, scope=scope)
    JOBS[jid] = job
    _QUEUE.put(jid)
    return job


def out_suffix(job):
    if job.out_format == "same":
        return job.src.suffix.lower() if job.src else ".txt"
    return "." + job.out_format


def download_name(job, suffix):
    return f"{Path(job.filename).stem}.human{suffix}"


def output_for(job, suffix):
    path = config.OUTPUTS / f"{job.id}{suffix}"
    if not path.exists() and job.kind == "text" and job.result:
        doc = parse(job.result["text"])
        save(doc, doc.units, path)
    return path if path.exists() else None


def _rewriter(job):
    if job.mode != "ml":
        return None
    from core.rewrite import make_rewriter

    style = None
    if job.style and re.fullmatch(r"[A-Za-z0-9_-]+", job.style):
        sp = config.STYLES / f"{job.style}.txt"
        style = load_style(str(sp)) if sp.is_file() else None
    return make_rewriter(strength=job.strength, style=style, scope=job.scope)


def _execute(job):
    job.status = "running"
    suffix = out_suffix(job)

    def tick(f):
        job.progress = min(f, 0.99)

    try:
        if job.mode == "ml" and job.model:
            _use_model(job.model)
        rw = _rewriter(job)
        if job.kind == "file":
            res = run(job.src, config.OUTPUTS / f"{job.id}{suffix}", rw, tick)
        else:
            res = run_text(job.text, rw, tick)
        res["out"] = download_name(job, suffix)
        job.result = res
        if job.kind == "text":
            output_for(job, suffix)
        else:
            res.pop("text", None)
        job.progress = 1.0
        job.status = "done"
    except Exception as e:
        job.error = f"{type(e).__name__}: {e}"[:300]
        job.status = "error"
    finally:
        if job.src:
            job.src.unlink(missing_ok=True)
        job.text = None
        job.finished = time.time()


def _loop():
    while True:
        item = _QUEUE.get()
        if isinstance(item, tuple):
            _warm(item[1])
            continue
        job = JOBS.get(item)
        if job and job.status == "queued":
            _execute(job)


def start():
    threading.Thread(target=_loop, daemon=True).start()
