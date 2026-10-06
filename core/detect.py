import json
import re
from dataclasses import dataclass
from pathlib import Path

from .rules.patterns import STRUCTURAL

_RULES = (
    tuple(
        (re.compile(r["p"], re.I), r["w"], r["p"])
        for r in json.loads((Path(__file__).parent / "rules" / "phrases.json").read_text("utf-8"))
    )
    + STRUCTURAL
)
_WORDS = re.compile(r"\w+")


@dataclass(slots=True)
class Flag:
    start: int
    end: int
    text: str
    weight: float
    rule: str


def detect(text):
    flags = [
        Flag(m.start(), m.end(), m.group(), w, name)
        for rx, w, name in _RULES
        for m in rx.finditer(text)
    ]
    flags.sort(key=lambda f: f.start)
    return flags


def score(text, flags=None):
    flags = detect(text) if flags is None else flags
    words = max(len(_WORDS.findall(text)), 1)
    return round(sum(f.weight for f in flags) * 100 / words, 2)
