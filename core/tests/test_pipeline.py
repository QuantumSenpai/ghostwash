from core.pipeline import run_text


def test_inline_code_untouched():
    r = run_text("Use `utilize_all` to delve into data. We utilize it daily.")
    assert "`utilize_all`" in r["text"]
    assert "utilize it" not in r["text"]


def test_quote_and_url_untouched():
    t = 'She said "we utilize a seamless stack" at https://x.io/utilize today.'
    assert run_text(t)["text"].strip() == t


def test_plain_text_still_changes():
    assert run_text("We utilize tools.")["text"].strip() == "We use tools."


if __name__ == "__main__":
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for f in fns:
        f()
    print(f"{len(fns)} passed")
