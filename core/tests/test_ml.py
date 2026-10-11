from core.ml.guard import clean_output, ok
from core.protect import protect
from core.rewrite import make_rewriter

SRC = "The tool plays a crucial role in 1,200 workflows and we must delve into it."
GOOD = "The tool matters in 1,200 workflows and we should dig into it."


class Fake:
    def __init__(self, replies):
        self.replies = list(replies)
        self.calls = 0
        self.temps = []
        self.tokens = []

    def generate(self, system, user, max_tokens=512, temperature=0.7):
        reply = self.replies[min(self.calls, len(self.replies) - 1)]
        self.calls += 1
        self.temps.append(temperature)
        self.tokens.append(max_tokens)
        return reply


def run(replies, text=SRC, **kw):
    fake = Fake(replies)
    return make_rewriter(llm=fake, **kw)(text), fake


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
    partial = "The tool plays a crucial role in 1,200 workflows and we must dig into it."
    out, fake = run([partial, GOOD, partial])
    assert out == GOOD and fake.calls == 2


def test_partial_kept_when_better():
    partial = "The tool plays a crucial role in 1,200 workflows and we must dig into it."
    out, fake = run([partial])
    assert out == partial and fake.calls == 3


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


if __name__ == "__main__":
    tests = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for t in tests:
        t()
    print(f"{len(tests)} passed")
