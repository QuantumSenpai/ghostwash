import re

import pdfplumber

from .base import Doc

_END = (".", "!", "?", ":", '"', "”")
_HYPHEN = re.compile(r"(?<=[a-z])-$")


def _join(lines):
    out = []
    for line in lines:
        if out and _HYPHEN.search(out[-1]) and line[:1].islower():
            out[-1] = out[-1][:-1] + line
        else:
            out.append(line)
    return " ".join(out)


def _paragraphs(lines):
    if not lines:
        return []
    width = max(map(len, lines))
    out, buf = [], []
    for i, line in enumerate(lines):
        nxt = lines[i + 1] if i + 1 < len(lines) else ""
        if len(line) < width * 0.5 and not line.endswith(_END) and nxt[:1].isupper():
            if buf:
                out.append(_join(buf))
                buf = []
            out.append(line)
            continue
        buf.append(line)
        if len(line) < width * 0.7 and line.endswith(_END):
            out.append(_join(buf))
            buf = []
    if buf:
        out.append(_join(buf))
    return out


def read(path):
    units = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            lines = [l.strip() for l in (page.extract_text() or "").splitlines() if l.strip()]
            units += _paragraphs(lines)
    skip = {i for i, u in enumerate(units) if not u.endswith(_END) and len(u) < 80}
    return Doc(units, "pdf", skip)
