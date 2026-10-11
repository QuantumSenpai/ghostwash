from core.rules.apply import apply_rules


def test_adjective_swaps():
    assert apply_rules("It is an ever-evolving field.") == "It is a changing field."
    assert apply_rules("The ever-evolving field.") == "The changing field."
    assert apply_rules("We use cutting-edge tools.") == "We use modern tools."
    assert apply_rules("It is an intricate plan.") == "It is a detailed plan."
    assert apply_rules("The intricate design works.") == "The detailed design works."
    assert apply_rules("We take a holistic view.") == "We take a broad view."
    assert apply_rules("She is a meticulous editor.") == "She is a careful editor."
    assert apply_rules("He checked meticulously.") == "He checked carefully."
    assert apply_rules("It is a vibrant city.") == "It is a lively city."


def test_participle_swaps():
    assert apply_rules("We are fostering trust.") == "We are building trust."
    assert apply_rules("We are enhancing speed.") == "We are improving speed."
    assert apply_rules("Sales rose, highlighting the gap.") == "Sales rose, showing the gap."


def test_highlighting_literal_left_alone():
    t = "We added syntax highlighting."
    assert apply_rules(t) == t


def test_delve_bare_forms():
    assert apply_rules("Let's delve deeper.") == "Let's dig deeper."
    assert apply_rules("They delved deeper.") == "They dug deeper."
    assert apply_rules("We delve into data.") == "We dig into data."


def test_unlock_potential():
    assert apply_rules("This unlocks the full potential of data.") == "This gets more out of data."
    assert apply_rules("We unlock the full potential of teams.") == "We get more out of teams."


def test_tapestry():
    assert apply_rules("A rich tapestry of cultures.") == "A mix of cultures."
    assert apply_rules("The tapestry of life.") == "The mix of life."


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
    print("ok")
