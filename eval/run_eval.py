import argparse
import time
from pathlib import Path

from core.ml.loader import get_llm
from core.pipeline import run
from core.rewrite import make_rewriter
from core.style import load_style


def main():
    p = argparse.ArgumentParser()
    p.add_argument("files", nargs="+")
    p.add_argument("--strength", choices=("light", "heavy"), default="light")
    p.add_argument("--style")
    p.add_argument("--out", default="/tmp/ghostwash_eval")
    a = p.parse_args()
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    t = time.perf_counter()
    get_llm()
    load = time.perf_counter() - t
    rewriter = make_rewriter(a.strength, load_style(a.style))
    rows = []
    for f in map(Path, a.files):
        try:
            rules = run(f, out / f"rules.{f.name}")
            t = time.perf_counter()
            ml = run(f, out / f"ml.{f.name}", rewriter)
            rows.append((f.name, rules, ml, time.perf_counter() - t))
        except Exception as e:
            print(f"{f.name}: {type(e).__name__}: {e}")
    print(f"model load {load:.1f}s, strength {a.strength}, outputs in {out}\n")
    print("| file | before | rules | ml | units rules/ml | ml sec |")
    print("|---|---|---|---|---|---|")
    for name, r, m, sec in rows:
        print(
            f"| {name} | {r['score_before']} | {r['score_after']} | {m['score_after']} "
            f"| {r['units_changed']}/{m['units_changed']} | {sec:.1f} |"
        )
    if rows:
        n = len(rows)
        avg = lambda k, i: sum(r[i][k] for r in rows) / n
        print(
            f"| average | {avg('score_before', 1):.1f} | {avg('score_after', 1):.1f} "
            f"| {avg('score_after', 2):.1f} | | {sum(r[3] for r in rows):.1f} |"
        )


main()
