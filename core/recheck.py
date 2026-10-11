from .detect import detect


def _flags(text):
    fl = detect(text)
    return sum(f.weight for f in fl), {f.rule for f in fl}


def refine(text, candidates, target_ratio=0.3):
    best = text
    low, seen = _flags(text)
    goal = low * target_ratio
    for c in candidates:
        s, rules = _flags(c)
        if s < low and rules <= seen:
            best, low = c, s
            if s <= goal:
                break
    return best
