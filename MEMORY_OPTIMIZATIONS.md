# Memory Optimizations for Render Deployment

## Problem
Render deployment was failing with "Ran out of memory (used over 512MB)" error. The application was loading all ML models at startup, consuming too much memory.

## Solutions Implemented

### 1. Lazy Loading for ML Models ✅

#### BERT Fake News Model (`fake_news_model_agent.py`)
- **Before**: Model loaded at module import time
- **After**: Model loaded only when `fake_news_model_score()` is first called
- **Memory Saved**: ~200-300MB (model only loaded when scoring is needed)
- **Environment Variable**: `DISABLE_FAKE_NEWS_MODEL=true` to disable completely

#### SentenceTransformer Model (`semantic_crossref_agent.py`)
- **Before**: Model loaded at module import time  
- **After**: Model loaded only when `semantic_crossref_score()` is first called
- **Memory Saved**: ~150-200MB
- **Environment Variable**: `DISABLE_SEMANTIC_MODEL=true` to disable completely

### 2. Lazy Loading for Qdrant Vector Store ✅

- **Before**: Qdrant client and embeddings initialized at import time
- **After**: Initialized only when cache functions are called
- **Memory Saved**: ~50-100MB
- **Environment Variable**: `DISABLE_QDRANT=true` to disable caching

### 3. PyTorch CPU-Only Installation ✅

- **Before**: Full PyTorch with CUDA support (~1GB+)
- **After**: CPU-only PyTorch from PyPI (~200MB)
- **Memory Saved**: ~800MB
- **Implementation**: Updated `requirements.txt` to use CPU-only PyTorch

### 4. Dockerfile Optimizations ✅

- Added environment variables for memory optimization:
  - `PYTHONUNBUFFERED=1` - Reduce Python memory overhead
  - `OMP_NUM_THREADS=1` - Limit OpenMP threads
  - `MKL_NUM_THREADS=1` - Limit MKL threads
  - `NUMEXPR_NUM_THREADS=1` - Limit NumExpr threads
- Single worker mode: `--workers 1` to reduce memory usage
- Cleanup of pip cache and Python bytecode
- Reduced health check start period to 60s (allows time for lazy loading)

### 5. Conditional Model Loading ✅

Models are only loaded when:
- Verdict is `UNCERTAIN` (scoring node runs)
- Individual scoring functions are called

This means:
- If evidence is clearly `FAKE` or `LEGIT`, ML models are never loaded
- Memory is only used when actually needed

## Expected Memory Usage

### Before Optimizations
- Startup: ~600-800MB (all models loaded)
- During scoring: ~800-1000MB
- **Result**: Exceeds 512MB limit ❌

### After Optimizations
- Startup: ~150-250MB (no models loaded)
- During scoring: ~400-500MB (models loaded on-demand)
- **Result**: Should fit within 512MB limit ✅

## Environment Variables for Render

Add these to your Render environment variables:

```env
# Optional: Disable models if still having memory issues
DISABLE_FAKE_NEWS_MODEL=false
DISABLE_SEMANTIC_MODEL=false
DISABLE_QDRANT=false

# PyTorch optimizations (set automatically in Dockerfile)
OMP_NUM_THREADS=1
MKL_NUM_THREADS=1
NUMEXPR_NUM_THREADS=1
```

## Additional Recommendations

### If Still Having Memory Issues:

1. **Disable Qdrant caching** (if not critical):
   ```env
   DISABLE_QDRANT=true
   ```

2. **Disable one of the ML models** (if acceptable):
   ```env
   DISABLE_FAKE_NEWS_MODEL=true
   # OR
   DISABLE_SEMANTIC_MODEL=true
   ```

3. **Upgrade Render plan** to 1GB if needed (if budget allows)

4. **Use smaller models** (future optimization):
   - Replace BERT with a smaller model
   - Use quantized models (INT8 instead of FP32)

## Testing

To test memory usage locally:

```bash
# Build and run with memory limits
docker build -t verifiai-backend -f backend/Dockerfile .
docker run --memory="512m" --memory-swap="512m" verifiai-backend

# Monitor memory usage
docker stats
```

## Files Modified

1. `backend/app/agents/fake_news_model_agent.py` - Lazy loading
2. `backend/app/agents/semantic_crossref_agent.py` - Lazy loading
3. `backend/app/vectordb/qdrant_store.py` - Lazy loading
4. `backend/app/vectordb/cache_service.py` - Updated to use lazy loading
5. `backend/Dockerfile` - Memory optimizations
6. `backend/requirements.txt` - CPU-only PyTorch

## Notes

- Models are loaded once and cached in memory (singleton pattern)
- First request that needs scoring will be slower (model loading)
- Subsequent requests will be fast (models already loaded)
- If you need to free memory, you'd need to restart the container
