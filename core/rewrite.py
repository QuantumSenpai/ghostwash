import os
import re
import sys
from functools import cache
from pathlib import Path

from .detect import detect
from .ml.guard import clean_output, reason
from .ml.loader import get_llm
from .protect import protect, restore
from .recheck import refine, weight

_DIR = Path(__file__).parent / "prompts"
_LIMITS = {"light": (0.6, 1.4), "heavy": (0.5, 1.6)}
_FIX_LIMITS = (0.75, 1.25)
_TEMPS = (0.6, 0.8, 0.9)
_TARGET = 0.3
_LIST_MAX = 12
_BREAK = re.compile(r"(?<=[.!?])\s+")
_GROUP = 600
_MIN_WORDS = 4


@cache
def _prompt(name):
    return (_DIR / name).read_text("utf-8").strip()


def _temps(n):
    return [_TEMPS[min(i, len(_TEMPS) - 1)] for i in range(n)]


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


def _groups(text):
    out, cur = [], None
    for s, e in _sentences(text):
        if cur is None:
            cur = [s, e]
        elif e - cur[0] <= _GROUP:
            cur[1] = e
        else:
            out.append(tuple(cur))
            cur = [s, e]
    if cur:
        out.append(tuple(cur))
    return [(s, e) for s, e in out if len(text[s:e].split()) >= _MIN_WORDS]


def _flag_texts(text, skip=()):
    return dict.fromkeys(
        f.text.lower() for f in detect(text) if f.rule != "em-dash" and f.rule not in skip
    )


def _listed(words):
    return ", ".join(list(words)[-_LIST_MAX:])


def make_rewriter(strength="light", style=None, tries=3, llm=None, repair=2, scope="flagged"):
    kind = "heavy" if strength == "heavy" else "light"
    everything = scope == "all"
    lo, hi = _LIMITS[kind]
    system = _prompt(f"rewrite_{'all_' if everything else ''}{kind}.txt")
    if style:
        system += "\n\n" + _prompt("style_match.txt").replace("{style}", style.strip())
    draft_temps, fix_temps = _temps(tries), _temps(repair)
    state = {"llm": llm}

    def rewrite_chunk(chunk):
        base = {f.rule for f in detect(chunk)}
        avoid, log, made = {}, [], []

        def attempt(src, temp, tag, prompt, limits):
            prot, store = protect(src)
            out = clean_output(
                state["llm"].generate(prompt, prot, min(1024, max(128, len(src) // 2)), temp)
            )
            if "’" not in chunk:
                out = out.replace("’", "'")
            why = reason(prot, out, store, *limits)
            cand = None if why else restore(out, store)
            why = why or reason(chunk, cand, [], lo, hi)
            if why:
                log.append(f"{tag}:{why}")
                return None
            log.append(f"{tag}:ok({weight(cand):.1f})")
            made.append(cand)
            avoid.update(_flag_texts(cand, base))
            return cand

        def draft():
            for n, t in enumerate(draft_temps, 1):
                prompt = system
                if avoid:
                    prompt += "\n\nDo not use these words or phrases: " + _listed(avoid) + "."
                c = attempt(chunk, t, f"try{n}", prompt, (lo, hi))
                if c is not None:
                    yield c

        def fix(src):
            prompt = _prompt("rewrite_fix.txt") + "\n\nPhrases to replace: " + _listed(_flag_texts(src)) + "."
            for n, t in enumerate(fix_temps, 1):
                c = attempt(src, t, f"fix{n}", prompt, _FIX_LIMITS)
                if c is not None:
                    yield c

        if everything:
            best = next((c for c in draft() if c != chunk), chunk)
        else:
            best = refine(chunk, draft(), _TARGET)
        if made and fix_temps and weight(best) > weight(chunk) * _TARGET:
            best = refine(best, fix(best), _TARGET, chunk)
        if os.environ.get("HUMANIZER_DEBUG"):
            print(
                f"[rewrite] {weight(chunk):.1f}->{weight(best):.1f} {' '.join(log)} -> "
                f"{'changed' if best != chunk else 'kept'}",
                file=sys.stderr,
            )
        return best

    def rewrite(text):
        spans = _groups(text) if everything else _chunks(text)
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

    rewrite.scope = scope
    return rewrite
