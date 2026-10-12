import os

from core.ml import loader
from core.ml.models import DEFAULT_KEY, REGISTRY, is_installed, resolve


def _with_env(value, fn):
    old = os.environ.get("HUMANIZER_MODEL")
    try:
        if value is None:
            os.environ.pop("HUMANIZER_MODEL", None)
        else:
            os.environ["HUMANIZER_MODEL"] = value
        return fn()
    finally:
        if old is None:
            os.environ.pop("HUMANIZER_MODEL", None)
        else:
            os.environ["HUMANIZER_MODEL"] = old


def test_default_and_keys():
    assert _with_env(None, resolve)[0] == DEFAULT_KEY
    assert resolve("llama3b")[0] == "llama3b"
    assert set(REGISTRY) == {"qwen7b", "qwen3b", "llama3b"}


def test_legacy_values_map_to_keys():
    assert resolve("models/qwen25-3b-4bit")[0] == "qwen3b"
    assert resolve("mlx-community/Qwen2.5-7B-Instruct-4bit")[0] == "qwen7b"
    assert resolve("mlx-community/Other-Model") == (None, "mlx-community/Other-Model")


def test_is_installed_returns_bool():
    assert all(isinstance(is_installed(k), bool) for k in REGISTRY)


def test_switch_model_sets_env_and_drops_cache():
    def run():
        assert loader.switch_model("llama3b") == "llama3b"
        assert os.environ["HUMANIZER_MODEL"] == "llama3b"
        assert loader.get_llm.cache_info().currsize == 0

    _with_env(None, run)


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
    print("ok")
