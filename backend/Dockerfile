# Backend Dockerfile - Optimized for memory
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies (minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Set environment variables for memory optimization
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    # PyTorch CPU-only optimizations
    PYTORCH_ENABLE_MPS_FALLBACK=1 \
    OMP_NUM_THREADS=1 \
    MKL_NUM_THREADS=1 \
    NUMEXPR_NUM_THREADS=1 \
    # Disable unnecessary features
    TRANSFORMERS_OFFLINE=0 \
    HF_HOME=/tmp/.cache/huggingface

# Copy requirements first for better caching
# For Render: build context is repo root, so use backend/ prefix
COPY backend/requirements.txt .

# Install Python dependencies with optimizations
# Strategy: Install CPU-only PyTorch first, then other dependencies
RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    # Install CPU-only PyTorch first to avoid full PyTorch being pulled
    pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch>=2.1.0,<2.2.0 && \
    # Install other dependencies (torch already installed, so won't reinstall)
    pip install --no-cache-dir -r requirements.txt && \
    # Clean up pip cache and temp files
    rm -rf /root/.cache/pip /tmp/* && \
    # Clean up unnecessary Python files
    find /usr/local/lib/python3.13 -type d -name __pycache__ -exec rm -r {} + 2>/dev/null || true && \
    find /usr/local/lib/python3.13 -name "*.pyc" -delete

# Copy application code
COPY backend/ .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run with single worker and memory optimizations
# Use --workers 1 for Render's 512MB limit
# Limit memory with --limit-max-requests to prevent memory leaks
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1", "--timeout-keep-alive", "30", "--limit-max-requests", "1000"]

