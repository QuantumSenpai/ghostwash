import asyncio
import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from .. import jobs

router = APIRouter()


def _event(d):
    return f"data: {json.dumps(d)}\n\n"


@router.get("/jobs/{job_id}/events")
async def events(job_id: str):
    if job_id not in jobs.JOBS:
        raise HTTPException(404, "job not found")

    async def gen():
        last = None
        while True:
            job = jobs.JOBS.get(job_id)
            if job is None:
                yield _event({"status": "error", "progress": 0, "error": "job expired"})
                return
            cur = {"status": job.status, "progress": round(job.progress, 3), "error": job.error}
            if cur != last:
                yield _event(cur)
                last = cur
            if job.status in ("done", "error"):
                return
            await asyncio.sleep(0.3)

    return StreamingResponse(
        gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
