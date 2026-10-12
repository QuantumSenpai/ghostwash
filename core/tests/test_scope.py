from core.pipeline import run_text
from core.rewrite import make_rewriter
from core.tests.test_ml import Fake

PLAIN = "In 2077 India is a civilization reborn. The Ganges flows beneath glowing bridges."
NEW = "By 2077 India has been rebuilt. The Ganges runs under lit bridges."


def run(replies, text=PLAIN, scope="all", **kw):
    fake = Fake(replies)
    rw = make_rewriter(llm=fake, scope=scope, **kw)
    return run_text(text, rw), fake


def test_unflagged_text_is_rewritten_in_all_scope():
    r, fake = run([NEW])
    assert r["text"].strip() == NEW and fake.calls == 1 and r["units_changed"] == 1


def test_flagged_scope_leaves_plain_text():
    r, fake = run([NEW], scope="flagged")
    assert r["text"].strip() == PLAIN and fake.calls == 0


def test_copy_is_not_accepted_as_a_change():
    r, fake = run([PLAIN, NEW])
    assert r["text"].strip() == NEW and fake.calls == 2


def test_guard_still_applies():
    r, fake = run(["By 2078 India has been rebuilt. The Ganges runs under lit bridges."])
    assert r["text"].strip() == PLAIN and fake.calls == 3


def test_short_lines_skipped():
    text = "The human spirit.\n\n" + PLAIN
    r, fake = run([NEW], text)
    assert r["text"].strip() == "The human spirit.\n\n" + NEW and fake.calls == 1


def test_uses_all_prompt():
    _, fake = run([NEW])
    assert "same language and register" in fake.systems[0].lower() or "keep line breaks" in fake.systems[0].lower()


def test_default_scope_unchanged():
    assert make_rewriter(llm=Fake([NEW])).scope == "flagged"


def test_hyphenated_compound_may_change():
    src = "AI-powered tools reach Mumbai and Kolkata fast."
    out = "AI tools reach Mumbai and Kolkata fast."
    r, fake = run([out], src)
    assert r["text"].strip() == out and fake.calls == 1


def test_proper_noun_loss_still_rejected():
    src = "AI-powered tools reach Mumbai and Kolkata fast."
    r, fake = run(["AI tools reach the city fast."], src)
    assert r["text"].strip() == src and fake.calls == 3


if __name__ == "__main__":
    tests = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for t in tests:
        t()
    print(f"{len(tests)} passed")
