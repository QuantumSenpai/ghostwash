from .detect import detect


def weight(text):
    return sum(f.weight for f in detect(text))


def refine(text, candidates, target_ratio=0.3, ref=None):
    best, low = text, weight(text)
    goal = weight(text if ref is None else ref) * target_ratio
    if low <= goal:
        return best
    for c in candidates:
        w = weight(c)
        if w < low:
            best, low = c, w
        if low <= goal:
            break
    return best
