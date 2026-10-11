import re
from collections import Counter

from ..protect import intact

_HERE = re.compile(r"^\s*here(?:'s| is)\b[^\n]*:\s*\n", re.I)
_QUOTES = {'"': '"', "“": "”"}
_CHAT = re.compile(
    r"\s*(?:sure|certainly|of course|absolutely|here(?:'s| is| are)|as an ai|i'm sorry|i cannot)\b",
    re.I,
)
_MARK = re.compile(r"⟦\d+⟧")
_NUM = re.compile(r"\d+(?:[.,]\d+)*")
_TOK = re.compile(r"[A-Za-z][\w'’-]*|[.!?\n]|⟦\d+⟧")
_STOPS = {".", "!", "?", "\n"}


def clean_output(text):
    t = _HERE.sub("", text.strip(), count=1).strip()
    if len(t) > 1 and _QUOTES.get(t[0]) == t[-1]:
        inner = t[1:-1]
        if t[0] not in inner and t[-1] not in inner:
            t = inner.strip()
    return t


def _caps(text):
    need, start = set(), True
    for t in _TOK.findall(text):
        if t in _STOPS:
            start = True
        elif t[0] == "⟦":
            start = False
        else:
            if not start and t[0].isupper() and len(t) > 1 and not t.startswith("I'"):
                need.add(t)
            start = False
    return need


def _words(text):
    return {t for t in _TOK.findall(text) if t[0].isalpha()}


def reason(src, out, store, lo, hi):
    if not out:
        return "empty"
    if _CHAT.match(out) and not _CHAT.match(src):
        return "chatty opener"
    if not intact(out, store):
        return "lost marker"
    ratio = len(out) / max(len(src), 1)
    if not lo <= ratio <= hi:
        return f"length ratio {ratio:.2f}"
    if Counter(_NUM.findall(_MARK.sub(" ", src))) != Counter(_NUM.findall(_MARK.sub(" ", out))):
        return "numbers changed"
    missing = _caps(src) - _words(out)
    if missing:
        return "lost proper noun " + ",".join(sorted(missing))
    return None


def ok(src, out, store, lo, hi):
    return reason(src, out, store, lo, hi) is None
