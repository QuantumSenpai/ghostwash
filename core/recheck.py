from .detect import detect


def _weight(text):
    return sum(f.weight for f in detect(text))


def refine(text, candidates, target_ratio=0.3):
    best, low = text, _weight(text)
    goal = low * target_ratio
    for c in candidates:
        s = _weight(c)
        if s < low:
            best, low = c, s
            if s <= goal:
                break
    return best
