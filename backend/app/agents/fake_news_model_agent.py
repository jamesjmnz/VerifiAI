import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

MODEL_NAME = "jy46604790/Fake-News-Bert-Detect"

_tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
_model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
_model.eval()

MAX_RISK = 25

def fake_news_model_score(text: str) -> int:
     """
    Returns risk score 0–25.
    Uses probability of FAKE class (LABEL_0).
    """

     if not text or not text.strip():
        return MAX_RISK  # empty or invalid claim = high uncertainty


     inputs = _tokenizer(
        text,
        truncation=True,
        padding=True,
        max_length=256,
        return_tensors="pt"
    )

     with torch.no_grad():
        outputs = _model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=1)


     fake_prob = float(probs[0][0])

     risk = fake_prob * MAX_RISK

     return int(round(risk))