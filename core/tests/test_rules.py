import re

from core.rules.apply import apply_rules, soften_dashes


def test_transition_dropped_at_sentence_start():
    assert apply_rules("Moreover, it works well.") == "It works well."
    assert apply_rules("We ship. Furthermore, we test.") == "We ship. We test."


def test_no_glued_comma_after_swap():
    out = apply_rules("Additionally, the system boasts a robust core. Moreover, it plays a crucial role in fostering a vibrant ecosystem.")
    assert not re.search(r"[A-Za-z],[a-z]", out), out


def test_glue_guard_only_touches_sentence_openers():
    assert apply_rules("Hello,world is fine") == "Hello, world is fine"
    assert apply_rules("call f(a,b) now") == "call f(a,b) now"


def test_article_agreement():
    out = apply_rules("This is a crucial step and a pivotal one.")
    assert "a important" not in out and "an important" in out, out


def test_not_just_but_also():
    assert apply_rules("It is not just a tool but also proof of work.") == "It is a tool and also proof of work."
    assert apply_rules("This is not only fast but slow.") == "This is fast and slow."


def test_not_only_inverted_left_alone():
    t = "Not only does it help but also it saves time."
    assert apply_rules(t) == t


def test_numbers_untouched():
    t = "We serve 1,200 users at 95% uptime with 3,4 units."
    assert apply_rules(t) == t


def test_long_today_opener_dropped():
    out = apply_rules("In today's fast-paced digital landscape, our platform helps teams.")
    assert out == "Our platform helps teams.", out


def test_dash_budget():
    t = "A \u2014 b \u2014 c \u2014 d \u2014 e."
    out = soften_dashes(t)
    assert out.count("\u2014") == 1 and ", " in out, out


def test_swaps_basic():
    assert apply_rules("We utilize tools in order to deliver seamless results.") == "We use tools to deliver smooth results."
    assert apply_rules("We delve into data.") == "We dig into data."


def test_idempotent_on_clean_text():
    t = "We use tools to build things."
    assert apply_rules(t) == t


if __name__ == "__main__":
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for f in fns:
        f()
    print(f"{len(fns)} passed")
