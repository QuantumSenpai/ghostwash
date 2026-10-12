import gc
import os
import threading
from functools import cache

from .models import resolve

_LOCK = threading.Lock()


@cache
def get_llm():
    if os.environ.get("HUMANIZER_BACKEND", "mlx") == "ollama":
        from .ollama_backend import OllamaBackend

        return OllamaBackend(os.environ.get("HUMANIZER_OLLAMA_MODEL", "qwen2.5:7b"))
    from .mlx_backend import MLXBackend

    return MLXBackend(resolve()[1])


def _free():
    gc.collect()
    try:
        import mlx.core as mx

        (getattr(mx, "clear_cache", None) or mx.metal.clear_cache)()
    except Exception:
        pass


def switch_model(name):
    """Point the next ML job at another model and free the old one first."""
    with _LOCK:
        key, target = resolve(name)
        os.environ["HUMANIZER_MODEL"] = key or target
        get_llm.cache_clear()
        _free()
        return key
