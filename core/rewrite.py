import os
import re
import sys
from functools import cache
from pathlib import Path

from .detect import detect
from .ml.guard import clean_output, reason
from .ml.loader import get_llm
from .protect import protect, restore
from .recheck import refine

_DIR = Path(__file__).parent / "prompts"
_LIMITS = {"light": (0.6, 1.4), "heavy": (0.5, 1.6)}
_TEMPS = (0.6, 0.8, 0.9)
_BREAK = re.compile(r"(?<=[.!?])\s+")


@cache
def _prompt(name):
    return (_DIR / name).read_text("utf-8").strip()


def _sentences(text):
    out, pos = [], 0
    for m in _BREAK.finditer(text):
        out.append((pos, m.start()))
        pos = m.end()
    out.append((pos, len(text)))
    return out


def _chunks(text):
    flags = [f for f in detect(text) if f.rule != "em-dash"]
    spans = _sentences(text)
    hit = [any(f.start < e and f.end > s for f in flags) for s, e in spans]
    out, i = [], 0
    while i < len(spans):
        if not hit[i]:
            i += 1
            continue
        j = i
        while j + 1 < len(spans) and hit[j + 1]:
            j += 1
        out.append((spans[i][0], spans[j][1]))
        i = j + 1
    return out


def make_rewriter(strength="light", style=None, tries=3, llm=None):
    lo, hi = _LIMITS["heavy" if strength == "heavy" else "light"]
    system = _prompt(f"rewrite_{'heavy' if strength == 'heavy' else 'light'}.txt")
    if style:
        system += "\n\n" + _prompt("style_match.txt").replace("{style}", style.strip())
    temps = [_TEMPS[min(i, len(_TEMPS) - 1)] for i in range(tries)]
    state = {"llm": llm}

    def rewrite_chunk(chunk):
        prot, store = protect(chunk)
        max_tokens = min(1024, max(128, len(chunk) // 2))
        log = []

        def candidates():
            for n, temp in enumerate(temps, 1):
                out = clean_output(state["llm"].generate(system, prot, max_tokens, temp))
                why = reason(prot, out, store, lo, hi)
                log.append(f"try{n}:{why or 'ok'}")
                if not why:
                    yield restore(out, store)

        res = refine(chunk, candidates())
        if os.environ.get("HUMANIZER_DEBUG"):
            print(f"[rewrite] {' '.join(log)} -> {'changed' if res != chunk else 'kept'}", file=sys.stderr)
        return res

    def rewrite(text):
        spans = _chunks(text)
        if not spans:
            return text
        if state["llm"] is None:
            state["llm"] = get_llm()
        out, pos = [], 0
        for s, e in spans:
            out += [text[pos:s], rewrite_chunk(text[s:e])]
            pos = e
        out.append(text[pos:])
        return "".join(out)

    return rewrite
