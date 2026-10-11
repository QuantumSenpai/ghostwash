import json
import re
from pathlib import Path

_DATA = json.loads((Path(__file__).parent / "replacements.json").read_text("utf-8"))
_SWAPS = tuple((re.compile(r["p"], re.I), r["r"]) for r in _DATA if r["r"])
_DROPS = tuple(
    (re.compile(rf"(?:{r['p']})\s*(\w)", re.I), r.get("start", False)) for r in _DATA if not r["r"]
)
_DASH = re.compile("\\s*\u2014\\s*")
_WORDS = re.compile(r"\w+")
_NOT_JUST = re.compile(
    r"(?<!\bdo )(?<!\bdoes )(?<!\bdid )\bnot (?:just|only|merely) (?!does |do |did |is |are |was |were |to )([^.;!?\n]{3,80}?),? but (also )?",
    re.I,
)
_GLUE = re.compile(r"(^|[.!?]\s+)([A-Z][a-z]+),(?=[a-z])", re.M)


def _case(src, dst):
    if len(src) > 1 and src.isupper():
        return dst.upper()
    return dst[0].upper() + dst[1:] if src[0].isupper() else dst


def _starts_sentence(s, i):
    j = i - 1
    while j >= 0 and s[j] in " \t":
        j -= 1
    return j < 0 or s[j] in ".!?:\n"


def _drop(start_only):
    def sub(m):
        head = _starts_sentence(m.string, m.start())
        if start_only and not head:
            return m.group()
        c = m.group(1)
        return c.upper() if head else c

    return sub


def _not_just(m):
    out = m.group(1) + " and " + ("also " if m.group(2) else "")
    return out[0].upper() + out[1:] if m.group()[0].isupper() else out


def soften_dashes(text, per_words=250):
    allowed = max(1, len(_WORDS.findall(text)) // per_words)
    n = 0

    def sub(m):
        nonlocal n
        n += 1
        return m.group() if n <= allowed else ", "

    return _DASH.sub(sub, text)


def apply_rules(text):
    text = _NOT_JUST.sub(_not_just, text)
    for rx, r in _SWAPS:
        text = rx.sub(lambda m, r=r: _case(m.group(), r), text)
    for rx, start_only in _DROPS:
        text = rx.sub(_drop(start_only), text)
    text = _GLUE.sub(r"\1\2, ", text)
    return soften_dashes(text)
