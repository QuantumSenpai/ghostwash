import time

from core.ml.loader import get_llm

llm = get_llm()
t = time.time()
llm.generate("Reply with one word.", "Hello", 8, 0.0)
print(f"warm in {time.time() - t:.1f}s")
