from core.rules.apply import apply_rules


def test_robust_and_leverage():
    assert apply_rules("Robust data helps.") == "Solid data helps."
    assert apply_rules("We are leveraging robust tools.") == "We are using solid tools."
    assert apply_rules("We want to leverage our data.") == "We want to use our data."
    assert apply_rules("Teams leveraged it.") == "Teams used it."


def test_underscore_verbs():
    assert apply_rules("This underscores the point.") == "This stresses the point."
    assert apply_rules("We wanted to underscore it.") == "We wanted to stress it."


def test_overall_dropped_at_start_only():
    assert apply_rules("Overall, it works.") == "It works."
    assert apply_rules("In conclusion, it works.") == "It works."
    t = "Costs fell overall, and sales rose."
    assert apply_rules(t) == t


def test_crucial_role():
    assert apply_rules("It plays a crucial role in growth.") == "It is key to growth."
    assert apply_rules("These tools play a crucial role in growth.") == "These tools are key to growth."


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
    print("ok")
