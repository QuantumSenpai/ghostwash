from typing import Literal

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from .. import jobs

router = APIRouter()


@router.get("/jobs/{job_id}/download")
def download(job_id: str, format: Literal["txt", "docx", "pdf"] | None = None):
    job = jobs.JOBS.get(job_id)
    if not job or job.status != "done":
        raise HTTPException(404, "not ready")
    if format and job.kind != "text":
        raise HTTPException(422, "format is only for pasted-text jobs")
    suffix = f".{format}" if format else jobs.out_suffix(job)
    path = jobs.output_for(job, suffix)
    if not path:
        raise HTTPException(404, "file expired")
    return FileResponse(path, filename=jobs.download_name(job, suffix))
