from core.rules.apply import apply_rules


def test_greeting_filler_dropped():
    assert apply_rules("Dear Team,\n\nI hope this email finds you well. I wanted to update you.") == "Dear Team,\n\nI wanted to update you."
    assert apply_rules("I hope this message finds you well. We shipped it.") == "We shipped it."


def test_sentence_start_transitions_dropped():
    assert apply_rules("Moving forward, we test more.") == "We test more."
    assert apply_rules("Ultimately, it works.") == "It works."
    t = "It works ultimately because we tested."
    assert apply_rules(t) == t


def test_small_swaps():
    assert apply_rules("Please do not hesitate to ask.") == "Please feel free to ask."
    assert apply_rules("The team worked tirelessly.") == "The team worked hard."
    assert apply_rules("This empowers you to ship.") == "This lets you ship."
    assert apply_rules("We elevate your work.") == "We raise your work."
    assert apply_rules("It will streamline the process.") == "It will simplify the process."


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
    print("ok")
