from pathlib import Path

from fileio.base import load, save

from .clean import clean, count_invisible
from .detect import detect, score
from .diff import diff
from .rules.apply import apply_rules


def process_units(units, skip, rewriter=None):
    out = []
    for i, u in enumerate(units):
        if i in skip or not u.strip():
            out.append(u)
            continue
        t = apply_rules(clean(u))
        if rewriter and detect(t):
            t = rewriter(t)
        out.append(t)
    return out


def run(src, dst=None, rewriter=None):
    src = Path(src)
    doc = load(src)
    dst = Path(dst) if dst else src.with_name(f"{src.stem}.human{src.suffix}")
    new = process_units(doc.units, doc.skip, rewriter)
    save(doc, new, dst)
    before, after = "\n\n".join(doc.units), "\n\n".join(new)
    return {
        "out": str(dst),
        "invisible_removed": count_invisible(before),
        "score_before": score(before),
        "score_after": score(after),
        "units_changed": sum(a != b for a, b in zip(doc.units, new)),
        "changes": [
            {"unit": i, "ops": diff(a, b)}
            for i, (a, b) in enumerate(zip(doc.units, new))
            if a != b
        ],
    }
