// Popup script for settings page

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('settings-form');
  const apiUrlInput = document.getElementById('api-url');
  const statusDiv = document.getElementById('status');

  // Load current settings
  const result = await chrome.storage.sync.get(['verifiai_api_url']);
  if (result.verifiai_api_url) {
    apiUrlInput.value = result.verifiai_api_url;
  }

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const apiUrl = apiUrlInput.value.trim();
    
    if (!apiUrl) {
      showStatus('Please enter an API URL', 'error');
      return;
    }

    // Validate URL format
    try {
      new URL(apiUrl);
    } catch {
      showStatus('Please enter a valid URL', 'error');
      return;
    }

    // Save to storage
    try {
      await chrome.storage.sync.set({ verifiai_api_url: apiUrl });
      showStatus('Settings saved successfully!', 'success');
      
      // Clear status after 3 seconds
      setTimeout(() => {
        statusDiv.className = 'status';
        statusDiv.textContent = '';
      }, 3000);
    } catch (error) {
      showStatus('Failed to save settings', 'error');
    }
  });
});

function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
}
