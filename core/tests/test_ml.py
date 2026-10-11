import re

import core.recheck as _recheck
import core.rewrite as _rewrite
from core.detect import Flag
from core.ml.guard import clean_output, ok
from core.protect import protect
from core.rewrite import make_rewriter

SRC = "The tool plays a crucial role in 1,200 workflows and we must delve into it."
GOOD = "The tool matters in 1,200 workflows and we should dig into it."
PARTIAL = "The tool plays a crucial role in 1,200 workflows and we must dig into it."
TAPESTRY = "The tool matters in 1,200 workflows and we must tapestry into it."
TABLE = {"delve": 3.0, "crucial role": 2.5, "tapestry": 3.0}


class Fake:
    def __init__(self, replies):
        self.replies = list(replies)
        self.calls = 0
        self.temps = []
        self.tokens = []
        self.systems = []
        self.users = []

    def generate(self, system, user, max_tokens=512, temperature=0.7):
        reply = self.replies[min(self.calls, len(self.replies) - 1)]
        self.calls += 1
        self.temps.append(temperature)
        self.tokens.append(max_tokens)
        self.systems.append(system)
        self.users.append(user)
        return reply


def run(replies, text=SRC, **kw):
    fake = Fake(replies)
    return make_rewriter(llm=fake, **kw)(text), fake


def table_detect(table):
    def detect(text):
        out = [
            Flag(m.start(), m.end(), m.group(), w, word)
            for word, w in table.items()
            for m in re.finditer(re.escape(word), text, re.I)
        ]
        return sorted(out, key=lambda f: f.start)

    return detect


def run_table(replies, text=SRC, **kw):
    saved = _recheck.detect, _rewrite.detect
    _recheck.detect = _rewrite.detect = table_detect(TABLE)
    try:
        return run(replies, text, **kw)
    finally:
        _recheck.detect, _rewrite.detect = saved


def rejected(reply):
    out, fake = run([reply])
    assert out == SRC, reply
    assert fake.calls == 3, reply
    assert fake.temps == [0.6, 0.8, 0.9]
    assert fake.tokens == [128, 128, 128]


def test_good_first_call():
    out, fake = run([GOOD])
    assert out == GOOD and fake.calls == 1


def test_dropped_number():
    rejected("The tool matters in many workflows and we should dig into it.")


def test_changed_number():
    rejected("The tool matters in 1,500 workflows and we should dig into it.")


def test_too_short():
    rejected("Tool matters.")


def test_chatty_opener():
    rejected("Sure! The tool matters in 1,200 workflows and we should dig into it.")


def test_wrapping_quotes():
    out, fake = run([f'"{GOOD}"'])
    assert out == GOOD and fake.calls == 1
    assert clean_output(f"“{GOOD}”") == GOOD
    assert clean_output(f"Here is the rewrite:\n{GOOD}") == GOOD


def test_no_flags_no_calls():
    text = "The cat sat on the mat."
    out, fake = run([GOOD], text)
    assert out == text and fake.calls == 0


def test_em_dash_only_no_calls():
    text = "The cat — a tabby — sat on the mat."
    out, fake = run([GOOD], text)
    assert out == text and fake.calls == 0


def test_early_stop_and_best_candidate():
    out, fake = run_table([PARTIAL, GOOD, PARTIAL])
    assert out == GOOD and fake.calls == 2


def test_partial_kept_after_repair_fails():
    out, fake = run_table([PARTIAL])
    assert out == PARTIAL and fake.calls == 5
    assert fake.users[3] == PARTIAL


def test_unflagged_text_untouched():
    text = f"Plain first line.\n\n{SRC} Plain last line."
    out, fake = run([GOOD], text)
    assert out == f"Plain first line.\n\n{GOOD} Plain last line." and fake.calls == 1


def test_proper_noun_required():
    src = "We asked Maria and she said the tool plays a crucial role in 1,200 workflows."
    prot, store = protect(src)
    assert ok(prot, src.replace("plays a crucial role in", "matters in"), store, 0.6, 1.4)
    assert not ok(prot, "We asked her and she said the tool matters in 1,200 workflows.", store, 0.6, 1.4)


def test_markers_survive():
    src = "The tool plays a crucial role, see https://example.com for details."
    out, fake = run(["The tool matters, see for details."], src)
    assert out == src and fake.calls == 3
    out, fake = run(["The tool matters, see ⟦0⟧ for details."], src)
    assert out == "The tool matters, see https://example.com for details."


def test_strength_limits():
    long = GOOD + " It reads simple, clear and direct to the reader."
    out, _ = run([long], strength="light")
    assert out == SRC
    out, _ = run([long], strength="heavy")
    assert out == long


def test_new_flag_accepted_when_total_lower():
    out, fake = run_table([TAPESTRY], repair=0)
    assert out == TAPESTRY and fake.calls == 3


def test_repair_starts_from_best_with_avoid_list():
    out, fake = run_table([TAPESTRY, TAPESTRY, TAPESTRY, GOOD])
    assert out == GOOD and fake.calls == 4
    assert fake.users[3] == TAPESTRY
    assert "Do not use these words or phrases: tapestry." in fake.systems[3]
    assert "Do not use these words or phrases" not in fake.systems[0]


def test_repair_is_checked_against_original():
    close = "It has a crucial role in 1,200 workflows overall."
    short = "It serves 1,200 workflows well."
    out, fake = run_table([close, close, close, short, short])
    assert out == close and fake.calls == 5


if __name__ == "__main__":
    tests = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for t in tests:
        t()
    print(f"{len(tests)} passed")
