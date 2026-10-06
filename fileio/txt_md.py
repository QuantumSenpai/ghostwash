import re
from pathlib import Path

from .base import Doc

_SPLIT = re.compile(r"(\n[ \t]*\n+)")
_LOCKED = ("```", "~~~", "#", "|", "<", "    ", "\t")


def read(path):
    parts = _SPLIT.split(Path(path).read_text("utf-8", errors="replace"))
    units, seps = parts[0::2], parts[1::2]
    skip, fenced = set(), False
    for i, u in enumerate(units):
        if fenced or u.startswith(_LOCKED):
            skip.add(i)
        if (u.count("```") + u.count("~~~")) % 2:
            fenced = not fenced
    return Doc(units, "txt", skip, {"seps": seps})


def write(doc, units, out):
    seps = doc.meta.get("seps", [])
    if len(seps) != len(units) - 1:
        seps = ["\n\n"] * max(len(units) - 1, 0)
    buf = units[:1]
    for s, u in zip(seps, units[1:]):
        buf += (s, u)
    Path(out).write_text("".join(buf).rstrip("\n") + "\n", "utf-8")
