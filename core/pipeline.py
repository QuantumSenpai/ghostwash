from pathlib import Path

from fileio.base import load, save
from fileio.txt_md import parse, render

from .clean import clean, count_invisible
from .detect import needs_rewrite, score
from .diff import diff
from .rules.apply import apply_rules


def process_units(units, skip, rewriter=None, on_progress=None):
    out = []
    total = len(units) or 1
    for i, u in enumerate(units):
        if i in skip or not u.strip():
            out.append(u)
        else:
            t = apply_rules(clean(u))
            if rewriter and needs_rewrite(t):
                t = rewriter(t)
            out.append(t)
        if on_progress:
            on_progress((i + 1) / total)
    return out


def _report(old, new):
    before, after = "\n\n".join(old), "\n\n".join(new)
    return {
        "invisible_removed": count_invisible(before),
        "score_before": score(before),
        "score_after": score(after),
        "units_changed": sum(a != b for a, b in zip(old, new)),
        "changes": [
            {"unit": i, "ops": diff(a, b)}
            for i, (a, b) in enumerate(zip(old, new))
            if a != b
        ],
    }


def run(src, dst=None, rewriter=None, on_progress=None):
    src = Path(src)
    doc = load(src)
    dst = Path(dst) if dst else src.with_name(f"{src.stem}.human{src.suffix}")
    new = process_units(doc.units, doc.skip, rewriter, on_progress)
    save(doc, new, dst)
    return {"out": str(dst), **_report(doc.units, new)}


def run_text(text, rewriter=None, on_progress=None):
    doc = parse(text)
    new = process_units(doc.units, doc.skip, rewriter, on_progress)
    return {"text": render(doc, new), **_report(doc.units, new)}
