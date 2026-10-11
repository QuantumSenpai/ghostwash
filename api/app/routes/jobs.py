from pathlib import Path
from typing import Literal

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from core.style import list_styles

from .. import config, jobs
from ..schemas import JobOut

router = APIRouter()


def _out(job):
    return JobOut.model_validate(job, from_attributes=True).model_copy(
        update={"progress": round(job.progress, 3)}
    )


@router.post("/jobs", status_code=202, response_model=JobOut)
async def create_job(
    file: UploadFile | None = File(None),
    text: str | None = Form(None),
    mode: Literal["rules", "ml"] = Form("rules"),
    strength: Literal["light", "heavy"] = Form("light"),
    style: str | None = Form(None),
    out_format: Literal["same", "txt", "docx", "pdf"] = Form("same"),
):
    has_file = bool(file and file.filename)
    has_text = bool(text and text.strip())
    if has_file == has_text:
        raise HTTPException(422, "send exactly one of file or text")
    style = style or None
    if style and style not in list_styles():
        raise HTTPException(422, "unknown style")
    if has_text:
        if len(text) > config.MAX_TEXT_CHARS:
            raise HTTPException(413, "text too large")
        job = jobs.create("text", "pasted.txt", mode, strength, style, out_format, text=text)
        return _out(job)
    name = Path(file.filename).name
    if Path(name).suffix.lower() not in config.EXTS:
        raise HTTPException(415, "unsupported file type")
    limit = config.MAX_FILE_MB * 1024 * 1024
    buf = bytearray()
    while chunk := await file.read(1 << 20):
        buf += chunk
        if len(buf) > limit:
            raise HTTPException(413, "file too large")
    if not buf:
        raise HTTPException(422, "empty file")
    job = jobs.create("file", name, mode, strength, style, out_format, data=bytes(buf))
    return _out(job)


@router.get("/jobs/{job_id}", response_model=JobOut)
def get_job(job_id: str):
    job = jobs.JOBS.get(job_id)
    if not job:
        raise HTTPException(404, "job not found")
    return _out(job)
