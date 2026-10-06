import re
import unicodedata

_ALWAYS = re.compile("[​⁠﻿­‎‏‪-‮⁦-⁩]")
_JOINERS = re.compile(r"(?<![^\x00-\x7f])[‌‍](?![^\x00-\x7f])")
_SPACES = re.compile("[   -   　]")
_MULTI = re.compile(r"(?<=\S)[ \t]{2,}(?=\S)")
_TRAIL = re.compile(r"[ \t]+(?=\n)")
_BLANKS = re.compile(r"\n{3,}")


def clean(text):
    text = unicodedata.normalize("NFC", text)
    text = _ALWAYS.sub("", text)
    text = _JOINERS.sub("", text)
    text = _SPACES.sub(" ", text)
    text = _MULTI.sub(" ", text)
    text = _TRAIL.sub("", text)
    return _BLANKS.sub("\n\n", text).strip()


def count_invisible(text):
    return len(_ALWAYS.findall(text)) + len(_JOINERS.findall(text))
