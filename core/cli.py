import argparse
import json

from .pipeline import run
from .style import load_style


def main():
    p = argparse.ArgumentParser(prog="humanizer")
    p.add_argument("input")
    p.add_argument("-o", "--output")
    p.add_argument("--json", action="store_true")
    p.add_argument("--ml", action="store_true")
    p.add_argument("--strength", choices=("light", "heavy"), default="light")
    p.add_argument("--style")
    a = p.parse_args()
    rewriter = None
    if a.ml:
        from .rewrite import make_rewriter

        rewriter = make_rewriter(a.strength, load_style(a.style))
    r = run(a.input, a.output, rewriter)
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return
    print(f"saved: {r['out']}")
    print(f"invisible chars removed: {r['invisible_removed']}")
    print(f"AI-ism score: {r['score_before']} -> {r['score_after']}")
    print(f"paragraphs changed: {r['units_changed']}")


if __name__ == "__main__":
    main()
