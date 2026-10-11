import tempfile
from pathlib import Path

from core.pipeline import run, run_text


def test_flags_in_result():
    r = run_text("This is a pivotal step. We utilize a seamless tapestry of tools.")
    b, a = r["flags"]["before"], r["flags"]["after"]
    assert b and {"text", "weight", "count"} <= set(b[0])
    assert sum(e["count"] for e in a) < sum(e["count"] for e in b)


def test_empty_file_error():
    d = Path(tempfile.mkdtemp())
    p = d / "e.txt"
    p.write_text("  \n")
    try:
        run(p, d / "o.txt")
    except ValueError as e:
        assert "no readable text" in str(e)
    else:
        raise AssertionError


if __name__ == "__main__":
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for f in fns:
        f()
    print(f"{len(fns)} passed")
