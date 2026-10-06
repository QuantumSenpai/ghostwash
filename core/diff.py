import difflib
import re

_TOK = re.compile(r"\s+|\w+|[^\w\s]")


def diff(a, b):
    ta, tb = _TOK.findall(a), _TOK.findall(b)
    sm = difflib.SequenceMatcher(None, ta, tb, autojunk=False)
    return [
        {"op": tag, "a": "".join(ta[i1:i2]), "b": "".join(tb[j1:j2])}
        for tag, i1, i2, j1, j2 in sm.get_opcodes()
    ]
