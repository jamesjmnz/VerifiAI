// Background service worker for VerifiAI Chrome Extension
// Handles API calls and storage management

chrome.runtime.onInstalled.addListener(() => {
  // Set default API URL
  chrome.storage.sync.set({
    verifiai_api_url: 'http://localhost:8000'
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'verify') {
    verifyClaim(request.claim)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
});

// Verify claim via API
async function verifyClaim(claim) {
  const result = await chrome.storage.sync.get(['verifiai_api_url']);
  const apiUrl = result.verifiai_api_url || 'http://localhost:8000';

  const response = await fetch(`${apiUrl}/api/v1/verification/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ claim })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return await response.json();
}
