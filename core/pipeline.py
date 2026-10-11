from pathlib import Path

from fileio.base import load, save
from fileio.txt_md import parse, render

from .clean import clean, count_invisible
from .detect import detect, needs_rewrite, score
from .diff import diff
from .protect import protect, restore
from .rules.apply import apply_rules


def _rules(text):
    prot, store = protect(text)
    return restore(apply_rules(prot), store)


def process_units(units, skip, rewriter=None, on_progress=None):
    out = []
    total = len(units) or 1
    for i, u in enumerate(units):
        if i in skip or not u.strip():
            out.append(u)
        else:
            t = _rules(clean(u))
            if rewriter and needs_rewrite(t):
                t = rewriter(t)
            out.append(t)
        if on_progress:
            on_progress((i + 1) / total)
    return out


def _flags(text, top=30):
    agg = {}
    for f in detect(text):
        k = f.text.lower()
        e = agg.setdefault(k, {"text": k, "weight": f.weight, "count": 0})
        e["count"] += 1
    return sorted(agg.values(), key=lambda e: -e["weight"] * e["count"])[:top]


def _same(a, b):
    return a.strip() == b.strip()


def _report(old, new):
    before, after = "\n\n".join(old), "\n\n".join(new)
    return {
        "invisible_removed": count_invisible(before),
        "score_before": score(before),
        "score_after": score(after),
        "units_changed": sum(not _same(a, b) for a, b in zip(old, new)),
        "flags": {"before": _flags(before), "after": _flags(after)},
        "changes": [
            {"unit": i, "ops": diff(a, b)}
            for i, (a, b) in enumerate(zip(old, new))
            if not _same(a, b)
        ],
    }


def run(src, dst=None, rewriter=None, on_progress=None):
    src = Path(src)
    doc = load(src)
    if not any(u.strip() for u in doc.units):
        raise ValueError("no readable text found")
    dst = Path(dst) if dst else src.with_name(f"{src.stem}.human{src.suffix}")
    new = process_units(doc.units, doc.skip, rewriter, on_progress)
    save(doc, new, dst)
    return {"out": str(dst), **_report(doc.units, new)}


def run_text(text, rewriter=None, on_progress=None):
    doc = parse(text)
    new = process_units(doc.units, doc.skip, rewriter, on_progress)
    return {"text": render(doc, new), **_report(doc.units, new)}
