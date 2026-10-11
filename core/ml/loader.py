import os
from functools import cache


@cache
def get_llm():
    if os.environ.get("HUMANIZER_BACKEND", "mlx") == "ollama":
        from .ollama_backend import OllamaBackend

        return OllamaBackend(os.environ.get("HUMANIZER_OLLAMA_MODEL", "qwen2.5:7b"))
    from .mlx_backend import MLXBackend

    return MLXBackend(
        os.environ.get("HUMANIZER_MODEL", "mlx-community/Qwen2.5-7B-Instruct-4bit")
    )
