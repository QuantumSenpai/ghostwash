from typing import Protocol


class LLM(Protocol):
    def generate(
        self, system: str, user: str, max_tokens: int = 512, temperature: float = 0.7
    ) -> str: ...
