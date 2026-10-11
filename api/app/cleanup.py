import threading
import time

from . import config, jobs


def sweep():
    cutoff = time.time() - config.FILE_TTL_SECONDS
    for jid, job in list(jobs.JOBS.items()):
        if job.finished and job.finished < cutoff:
            jobs.JOBS.pop(jid, None)
    for d in (config.UPLOADS, config.OUTPUTS):
        for p in d.glob("*"):
            if p.is_file() and not p.name.startswith(".") and p.stat().st_mtime < cutoff:
                p.unlink(missing_ok=True)


def _loop():
    while True:
        time.sleep(600)
        try:
            sweep()
        except Exception:
            pass


def start():
    threading.Thread(target=_loop, daemon=True).start()
