import json
import urllib.request


class OllamaBackend:
    def __init__(self, model, url="http://localhost:11434/api/chat"):
        self.model = model
        self.url = url

    def generate(self, system, user, max_tokens=512, temperature=0.7):
        body = json.dumps(
            {
                "model": self.model,
                "stream": False,
                "messages": [
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
                "options": {"temperature": temperature, "num_predict": max_tokens},
            }
        ).encode()
        req = urllib.request.Request(self.url, body, {"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.load(r)["message"]["content"].strip()
