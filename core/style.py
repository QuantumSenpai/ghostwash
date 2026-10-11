from pathlib import Path

_DIR = Path(__file__).resolve().parent.parent / "data" / "styles"


def save_style(name, text):
    _DIR.mkdir(parents=True, exist_ok=True)
    (_DIR / f"{name}.txt").write_text(text, "utf-8")


def list_styles():
    return sorted(p.stem for p in _DIR.glob("*.txt")) if _DIR.is_dir() else []


def load_style(ref, limit=1500):
    if not ref:
        return None
    path = Path(ref)
    if not path.is_file():
        path = _DIR / f"{ref}.txt"
    return path.read_text("utf-8")[:limit].strip() or None
