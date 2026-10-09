from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import cleanup, config, jobs
from .routes import download, stream, style
from .routes import jobs as job_routes


@asynccontextmanager
async def lifespan(app):
    for d in (config.UPLOADS, config.OUTPUTS, config.STYLES):
        d.mkdir(parents=True, exist_ok=True)
    jobs.start()
    cleanup.start()
    yield


app = FastAPI(title="Ghostwash", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)
for r in (job_routes, stream, download, style):
    app.include_router(r.router, prefix="/api")
