import os

from fastapi import APIRouter

from core.ml.models import DEFAULT_KEY, REGISTRY, is_installed, resolve

from .. import jobs

router = APIRouter()


def _loaded():
    from core.ml.loader import get_llm

    return get_llm.cache_info().currsize > 0


@router.get("/health")
def health():
    backend = os.environ.get("HUMANIZER_BACKEND", "mlx")
    key, target = resolve()
    if backend == "ollama":
        model = os.environ.get("HUMANIZER_OLLAMA_MODEL", "qwen2.5:7b")
    else:
        model = REGISTRY[key]["repo"] if key else target
    return {
        "status": "ok",
        "backend": backend,
        "model": model,
        "model_key": key,
        "model_loaded": _loaded(),
        "warmup": jobs.WARM["state"],
        "warmup_error": jobs.WARM["error"],
    }


@router.get("/models")
def models():
    current = resolve()[0]
    loaded = _loaded()
    return [
        {
            "key": k,
            "label": m["label"],
            "installed": is_installed(k),
            "loaded": loaded and k == current,
            "default": k == DEFAULT_KEY,
        }
        for k, m in REGISTRY.items()
    ]


@router.post("/warmup", status_code=202)
def warmup():
    return {"status": jobs.warmup()}
