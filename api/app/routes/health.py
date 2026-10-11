import os

from fastapi import APIRouter

from .. import jobs

router = APIRouter()


def _loaded():
    from core.ml.loader import get_llm

    return get_llm.cache_info().currsize > 0


@router.get("/health")
def health():
    backend = os.environ.get("HUMANIZER_BACKEND", "mlx")
    model = (
        os.environ.get("HUMANIZER_OLLAMA_MODEL", "qwen2.5:7b")
        if backend == "ollama"
        else os.environ.get("HUMANIZER_MODEL", "mlx-community/Qwen2.5-7B-Instruct-4bit")
    )
    return {
        "status": "ok",
        "backend": backend,
        "model": model,
        "model_loaded": _loaded(),
        "warmup": jobs.WARM["state"],
        "warmup_error": jobs.WARM["error"],
    }


@router.post("/warmup", status_code=202)
def warmup():
    return {"status": jobs.warmup()}
