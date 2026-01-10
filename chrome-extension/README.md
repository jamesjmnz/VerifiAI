# VerifiAI Chrome Extension

Chrome extension for fact-checking Facebook posts using the VerifiAI backend API.

## Features

- ✅ **One-click fact-checking** on Facebook posts
- ✅ **Reuses Modal component styling** from the main app
- ✅ **Automatic text extraction** from Facebook posts
- ✅ **Real-time verification** with loading states
- ✅ **Configurable API URL** via extension popup

## Installation

1. **Load the extension in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `chrome-extension` folder

2. **Configure API URL:**
   - Click the extension icon in Chrome toolbar
   - Enter your backend API URL (default: `http://localhost:8000`)
   - Click "Save Settings"

3. **Start using:**
   - Navigate to Facebook (facebook.com)
   - Look for "Fact Check" buttons on posts
   - Click to verify any post!

## How It Works

1. **Content Script** (`content-script.js`):
   - Injects "Fact Check" buttons on Facebook posts
   - Extracts text from posts when button is clicked
   - Shows modal with verification results

2. **Background Service Worker** (`background.js`):
   - Handles API communication
   - Manages extension settings

3. **Modal Component**:
   - Reuses styling from `frontend/components/ui/Modal.tsx`
   - Shows loading state during verification
   - Displays verdict (FAKE/LEGIT/UNCERTAIN)
   - Lists trusted sources used

## File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── content-script.js      # Injects UI and handles Facebook posts
├── background.js         # Service worker for API calls
├── popup.html            # Settings page UI
├── popup.js              # Settings page logic
├── styles.css            # Modal and button styles (reused from Modal.tsx)
├── icons/                # Extension icons (16x16, 48x48, 128x128)
└── README.md             # This file
```

## Icons

You'll need to add icon files:
- `icons/icon16.png` (16x16 pixels)
- `icons/icon48.png` (48x48 pixels)
- `icons/icon128.png` (128x128 pixels)

You can create simple icons or use a placeholder image for now.

## API Requirements

The extension expects your backend API to be running and accessible at the configured URL. The API endpoint should be:

```
POST /api/v1/verification/verify
Content-Type: application/json

{
  "claim": "text to verify"
}
```

Response format:
```json
{
  "claim": "original claim",
  "verdict": "FAKE" | "LEGIT" | "UNCERTAIN",
  "analysis": "detailed analysis...",
  "sources": ["url1", "url2", ...],
  "potential_fake_score": 45,
  "score_breakdown": {
    "domain_trust": 15,
    "semantic_crossref": 12,
    "google_factcheck": 10,
    "fake_news_model": 8
  }
}
```

## CORS Configuration

Make sure your backend allows requests from Chrome extensions. You may need to add CORS headers:

```python
# In your FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

- **Buttons not appearing**: Facebook's DOM structure changes frequently. You may need to update selectors in `content-script.js`
- **API errors**: Check that your backend is running and the API URL is correct in settings
- **CORS errors**: Ensure your backend has proper CORS configuration

## Development

To modify the extension:

1. Make changes to files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Reload Facebook page to see changes

## Notes

- The extension works on `facebook.com` and `www.facebook.com`
- Text extraction may vary based on Facebook's current structure
- The modal styling matches the main app's Modal component
