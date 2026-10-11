import re

_LOCK = re.compile(
    r"https?://\S+"
    r"|[\w.+-]+@[\w-]+\.[\w.-]+"
    r"|`[^`\n]+`"
    r'|"[^"\n]{1,200}"'
    "|“[^”\\n]{1,200}”"
    r"|\[\d+(?:[,\s-]+\d+)*\]"
)
_TOKEN = re.compile("⟦(\\d+)⟧")


def protect(text):
    store = []

    def sub(m):
        store.append(m.group())
        return f"⟦{len(store) - 1}⟧"

    return _LOCK.sub(sub, text), store


def restore(text, store):
    return _TOKEN.sub(lambda m: store[int(m.group(1))], text)


def intact(text, store):
    return sorted(map(int, _TOKEN.findall(text))) == list(range(len(store)))
