import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

REGISTRY = {
    "qwen7b": {
        "label": "Qwen2.5 7B",
        "repo": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "local": "models/qwen25-7b-4bit",
    },
    "qwen3b": {
        "label": "Qwen2.5 3B (faster)",
        "repo": "mlx-community/Qwen2.5-3B-Instruct-4bit",
        "local": "models/qwen25-3b-4bit",
    },
    "llama3b": {
        "label": "Llama 3.2 3B",
        "repo": "mlx-community/Llama-3.2-3B-Instruct-4bit",
        "local": None,
    },
}
DEFAULT_KEY = "qwen7b"


def _local_dir(key):
    rel = REGISTRY[key]["local"]
    if not rel:
        return None
    d = ROOT / rel
    return d if (d / "config.json").exists() and any(d.glob("*.safetensors")) else None


def resolve(name=None):
    """Return (key, load_target). Accepts a registry key, an HF repo id, a local path or None."""
    name = (name or os.environ.get("HUMANIZER_MODEL") or DEFAULT_KEY).strip()
    for key, m in REGISTRY.items():
        if name in (key, m["repo"], m["local"]):
            local = _local_dir(key)
            return key, (str(local) if local else m["repo"])
    return None, name


def is_installed(key):
    if _local_dir(key):
        return True
    try:
        from huggingface_hub.constants import HF_HUB_CACHE
    except ImportError:
        return False
    repo = "models--" + REGISTRY[key]["repo"].replace("/", "--")
    return (Path(HF_HUB_CACHE) / repo / "snapshots").exists()
