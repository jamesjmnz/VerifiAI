import os

MODEL_NAME = "jy46604790/Fake-News-Bert-Detect"
MAX_RISK = 25

# Lazy loading - models loaded only when needed
_tokenizer = None
_model = None

def _load_model():
    """Lazy load the model only when first needed."""
    global _tokenizer, _model
    if _model is None:
        # Lazy import to avoid loading torch/transformers at module import time
        import torch
        from transformers import AutoTokenizer, AutoModelForSequenceClassification
        
        print("[INFO] Loading BERT fake news model (lazy load)...")
        # Force CPU to save memory
        device = "cpu"
        _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        _model = AutoModelForSequenceClassification.from_pretrained(
            MODEL_NAME,
            torch_dtype=torch.float32,  # Use float32 instead of float16 for compatibility
        )
        _model.to(device)
        _model.eval()
        # Clear cache after loading
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
        print("[INFO] BERT model loaded successfully")
    return _tokenizer, _model

def fake_news_model_score(text: str) -> int:
     """
    Returns risk score 0–25.
    Uses probability of FAKE class (LABEL_0).
    """

     if not text or not text.strip():
        return MAX_RISK  # empty or invalid claim = high uncertainty

     # Check if model loading is disabled
     if os.getenv("DISABLE_FAKE_NEWS_MODEL", "false").lower() == "true":
        return MAX_RISK // 2  # Return default risk if disabled

     try:
        tokenizer, model = _load_model()
        # Import torch here since it's needed for inference
        import torch
        
        inputs = tokenizer(
            text,
            truncation=True,
            padding=True,
            max_length=256,
            return_tensors="pt"
        )

        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probs = torch.softmax(logits, dim=1)

        fake_prob = float(probs[0][0])
        risk = fake_prob * MAX_RISK
        return int(round(risk))
     except Exception as e:
        print(f"[ERROR] fake_news_model_score failed: {e}")
        return MAX_RISK // 2  # Return default on error