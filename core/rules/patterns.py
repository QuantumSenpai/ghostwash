import re

STRUCTURAL = (
    (re.compile(r"\bnot (?:just|only|merely) [^.;!?\n]{3,80}?,? but (?:also )?", re.I), 2.0, "not-just-but"),
    (re.compile("—"), 0.5, "em-dash"),
)
