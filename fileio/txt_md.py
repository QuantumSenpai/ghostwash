import re
from pathlib import Path

from .base import Doc

_SPLIT = re.compile(r"(\n[ \t]*\n+)")
_LOCKED = ("```", "~~~", "#", "|", "<", "    ", "\t")


def parse(text):
    parts = _SPLIT.split(text.replace("\r\n", "\n"))
    units, seps = parts[0::2], parts[1::2]
    skip, fenced = set(), False
    for i, u in enumerate(units):
        if fenced or u.startswith(_LOCKED):
            skip.add(i)
        if (u.count("```") + u.count("~~~")) % 2:
            fenced = not fenced
    return Doc(units, "txt", skip, {"seps": seps})


def read(path):
    return parse(Path(path).read_text("utf-8", errors="replace"))


def render(doc, units):
    seps = doc.meta.get("seps", [])
    if len(seps) != len(units) - 1:
        units = [u for u in units if u.strip()]
        seps = ["\n\n"] * max(len(units) - 1, 0)
    buf = units[:1]
    for s, u in zip(seps, units[1:]):
        buf += (s, u)
    return "".join(buf).rstrip("\n") + "\n"


def write(doc, units, out):
    Path(out).write_text(render(doc, units), "utf-8")
