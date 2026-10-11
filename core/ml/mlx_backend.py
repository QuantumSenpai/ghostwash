class MLXBackend:
    def __init__(self, model):
        import mlx_lm
        from mlx_lm.sample_utils import make_sampler

        self._lm = mlx_lm
        self._sampler = make_sampler
        self.model, self.tokenizer = mlx_lm.load(model)

    def generate(self, system, user, max_tokens=512, temperature=0.7):
        prompt = self.tokenizer.apply_chat_template(
            [{"role": "system", "content": system}, {"role": "user", "content": user}],
            tokenize=False,
            add_generation_prompt=True,
        )
        out = self._lm.generate(
            self.model,
            self.tokenizer,
            prompt=prompt,
            max_tokens=max_tokens,
            sampler=self._sampler(temp=temperature, top_p=0.9),
        )
        return out.strip()
