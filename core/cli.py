import argparse
import json

from .pipeline import run


def main():
    p = argparse.ArgumentParser(prog="humanizer")
    p.add_argument("input")
    p.add_argument("-o", "--output")
    p.add_argument("--json", action="store_true")
    a = p.parse_args()
    r = run(a.input, a.output)
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return
    print(f"saved: {r['out']}")
    print(f"invisible chars removed: {r['invisible_removed']}")
    print(f"AI-ism score: {r['score_before']} -> {r['score_after']}")
    print(f"paragraphs changed: {r['units_changed']}")


if __name__ == "__main__":
    main()
