import os

from api.app import jobs
from core.ml import loader
from core.ml.models import validate


def test_validate():
    assert validate("nope") == "unknown model"
    assert validate("qwen7b") in (None, "model not installed")


def test_use_model_switches_only_when_needed():
    calls = []
    real = loader.switch_model
    old = os.environ.get("HUMANIZER_MODEL")
    loader.switch_model = lambda k: calls.append(k)
    try:
        os.environ["HUMANIZER_MODEL"] = "qwen3b"
        jobs._use_model("qwen3b")
        jobs._use_model("llama3b")
    finally:
        loader.switch_model = real
        if old is None:
            os.environ.pop("HUMANIZER_MODEL", None)
        else:
            os.environ["HUMANIZER_MODEL"] = old
    assert calls == ["llama3b"]


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
    print("ok")
