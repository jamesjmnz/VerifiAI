// Content script for Facebook fact-checking extension
// Injects Fact Check buttons on Facebook posts and handles verification

(function() {
  'use strict';

  const API_URL_KEY = 'verifiai_api_url';
  const DEFAULT_API_URL = 'http://localhost:8000';

  // Get API URL from storage
  async function getApiUrl() {
    const result = await chrome.storage.sync.get([API_URL_KEY]);
    return result[API_URL_KEY] || DEFAULT_API_URL;
  }

  // Extract text from Facebook post element
  function extractPostText(postElement) {
    // Try multiple selectors for Facebook post content
    const selectors = [
      '[data-ad-preview="message"]',
      '[data-testid="post_message"]',
      'div[dir="auto"]',
      '.userContent',
      'div[data-ad-comet-preview="message"]'
    ];

    let text = '';
    
    for (const selector of selectors) {
      const element = postElement.querySelector(selector);
      if (element) {
        text = element.innerText || element.textContent || '';
        if (text.trim().length > 0) break;
      }
    }

    // Fallback: get all text from post
    if (!text || text.trim().length === 0) {
      text = postElement.innerText || postElement.textContent || '';
    }

    return text.trim();
  }

  // Create Fact Check button
  function createFactCheckButton() {
    const button = document.createElement('button');
    button.className = 'verifiai-fb-button';
    button.type = 'button'; // Prevent form submission
    button.innerHTML = `
      <svg class="verifiai-fb-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
      Fact Check
    `;
    // Make sure button is visible
    button.style.zIndex = '9999';
    button.style.position = 'relative';
    return button;
  }

  // Create modal overlay
  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'verifiai-modal-overlay';
    overlay.id = 'verifiai-modal';
    overlay.innerHTML = `
      <div class="verifiai-modal-content">
        <div id="verifiai-modal-body"></div>
      </div>
    `;
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    return overlay;
  }

  // Show loading state
  function showLoadingModal(claim) {
    const modal = document.getElementById('verifiai-modal');
    if (!modal) return;

    const body = document.getElementById('verifiai-modal-body');
    body.innerHTML = `
      <div class="verifiai-loading">
        <div class="verifiai-loading-header">
          <div class="verifiai-spinner"></div>
          <h1 class="verifiai-modal-title">Analyzing Claim</h1>
        </div>
        <div class="verifiai-section">
          <h1 class="verifiai-section-title">
            <svg class="verifiai-section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            AI Analysis
          </h1>
          <div class="verifiai-analysis-box">
            <div class="verifiai-skeleton"></div>
            <div class="verifiai-skeleton"></div>
            <div class="verifiai-skeleton" style="width: 75%;"></div>
          </div>
        </div>
        <div class="verifiai-section">
          <h1 class="verifiai-section-title">
            <svg class="verifiai-section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
            Trusted Sources Used
          </h1>
          <div class="verifiai-sources-list">
            <div class="verifiai-source-item" style="cursor: default;">
              <div class="verifiai-source-content">
                <div class="verifiai-skeleton" style="width: 33%; height: 1.25rem; margin-bottom: 0.5rem;"></div>
                <div class="verifiai-skeleton" style="width: 66%;"></div>
              </div>
            </div>
            <div class="verifiai-source-item" style="cursor: default;">
              <div class="verifiai-source-content">
                <div class="verifiai-skeleton" style="width: 33%; height: 1.25rem; margin-bottom: 0.5rem;"></div>
                <div class="verifiai-skeleton" style="width: 66%;"></div>
              </div>
            </div>
            <div class="verifiai-source-item" style="cursor: default;">
              <div class="verifiai-source-content">
                <div class="verifiai-skeleton" style="width: 33%; height: 1.25rem; margin-bottom: 0.5rem;"></div>
                <div class="verifiai-skeleton" style="width: 66%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Show result modal
  function showResultModal(claim, result) {
    const modal = document.getElementById('verifiai-modal');
    if (!modal) return;

    const verdict = result.verdict || 'UNCERTAIN';
    const verdictClass = `verifiai-verdict-${verdict.toLowerCase()}`;
    const verdictLabel = verdict === 'FAKE' ? 'Fake News' : 
                        verdict === 'LEGIT' ? 'Legitimate' : 'Uncertain';
    
    const iconSvg = verdict === 'FAKE' 
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
      : verdict === 'LEGIT'
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>';

    const sourcesHtml = result.sources && result.sources.length > 0
      ? result.sources.map(source => {
          const title = getSourceTitle(source);
          return `
            <a href="${source}" target="_blank" rel="noopener noreferrer" class="verifiai-source-item">
              <div class="verifiai-source-content">
                <h1 class="verifiai-source-title">${escapeHtml(title)}</h1>
                <p class="verifiai-source-url">${escapeHtml(source)}</p>
              </div>
              <svg class="verifiai-source-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </a>
          `;
        }).join('')
      : '<div class="verifiai-source-item" style="cursor: default;"><p style="color: #6b7280; font-size: 0.875rem;">No sources available</p></div>';

    const body = document.getElementById('verifiai-modal-body');
    body.innerHTML = `
      <div class="verifiai-modal-header">
        <h1 class="verifiai-modal-title">Fact Check Result</h1>
        <div class="verifiai-verdict-badge ${verdictClass}">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${iconSvg}
          </svg>
          <p style="font-weight: 600; margin: 0;">${verdictLabel}</p>
        </div>
      </div>
      <div class="verifiai-section">
        <h1 class="verifiai-section-title">
          <svg class="verifiai-section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          AI Analysis
        </h1>
        <div class="verifiai-analysis-box">
          <p>${escapeHtml(result.analysis || 'No analysis available')}</p>
        </div>
      </div>
      <div class="verifiai-section">
        <h1 class="verifiai-section-title">
          <svg class="verifiai-section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
          Trusted Sources Used
        </h1>
        <div class="verifiai-sources-list">
          ${sourcesHtml}
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; width: 100%;">
        <button class="verifiai-button verifiai-close-button" onclick="document.getElementById('verifiai-modal').remove()">
          Close
        </button>
      </div>
    `;
  }

  // Helper functions
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getSourceTitle(url) {
    try {
      const urlObj = new URL(url);
      let hostname = urlObj.hostname.replace('www.', '');
      // Capitalize first letter
      return hostname.charAt(0).toUpperCase() + hostname.slice(1);
    } catch {
      return url;
    }
  }

  function closeModal() {
    const modal = document.getElementById('verifiai-modal');
    if (modal) {
      modal.remove();
    }
  }

  // Handle fact check button click
  async function handleFactCheck(postElement, button) {
    const claim = extractPostText(postElement);
    
    if (!claim || claim.length < 10) {
      alert('Unable to extract text from this post. Please try selecting text manually.');
      return;
    }

    // Disable button
    button.disabled = true;

    // Create and show modal
    const modal = createModal();
    document.body.appendChild(modal);
    showLoadingModal(claim);

    try {
      const apiUrl = await getApiUrl();
      const response = await fetch(`${apiUrl}/api/v1/verification/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ claim })
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const result = await response.json();
      showResultModal(claim, result);
    } catch (error) {
      console.error('Fact check error:', error);
      const body = document.getElementById('verifiai-modal-body');
      body.innerHTML = `
        <div class="verifiai-modal-header">
          <h1 class="verifiai-modal-title">Error</h1>
        </div>
        <div class="verifiai-section">
          <p style="color: #ef4444;">Failed to verify claim. Please check your API URL settings or try again later.</p>
        </div>
        <div style="display: flex; justify-content: flex-end; width: 100%;">
          <button class="verifiai-button verifiai-close-button" onclick="document.getElementById('verifiai-modal').remove()">
            Close
          </button>
        </div>
      `;
    } finally {
      button.disabled = false;
    }
  }

  // Inject buttons into Facebook posts
  function injectButtons() {
    // Facebook post selectors (may vary based on Facebook's structure)
    // Try multiple selectors to catch different Facebook layouts
    const postSelectors = [
      '[role="article"]',
      'div[role="article"]',
      '[data-pagelet="FeedUnit"]',
      'div[data-pagelet*="Feed"]',
      'div[data-ad-preview="message"]',
      'div[data-testid="post_message"]',
      'div[data-testid*="post"]',
      // More generic selectors
      'div[class*="userContentWrapper"]',
      'div[class*="story_body"]'
    ];

    // Find all posts that don't have a fact check button yet
    const posts = document.querySelectorAll(postSelectors.join(', '));
    
    console.log('[VerifiAI] Found', posts.length, 'posts');
    
    if (posts.length === 0) {
      console.warn('[VerifiAI] No posts found. Facebook DOM might have changed.');
      // Try to find any div that looks like a post (has text content)
      const allDivs = document.querySelectorAll('div');
      const potentialPosts = Array.from(allDivs).filter(div => {
        const text = div.innerText || '';
        return text.length > 50 && text.length < 5000 && 
               !div.querySelector('.verifiai-fb-button') &&
               !div.hasAttribute('data-verifiai-processed');
      }).slice(0, 10); // Limit to first 10 to avoid performance issues
      
      console.log('[VerifiAI] Trying fallback: found', potentialPosts.length, 'potential posts');
      potentialPosts.forEach(post => injectButtonToPost(post));
      return;
    }
    
    posts.forEach(post => {
      // Check if button exists but was removed (re-inject if needed)
      const existingButton = post.querySelector('.verifiai-fb-button');
      if (existingButton && document.body.contains(existingButton)) {
        // Button still exists, skip if already processed
        if (post.hasAttribute('data-verifiai-processed')) {
          return;
        }
      } else if (post.hasAttribute('data-verifiai-processed')) {
        // Button was removed, reset flag to re-inject
        post.removeAttribute('data-verifiai-processed');
      }

      // Skip if already has button and is processed
      if (post.hasAttribute('data-verifiai-processed') && existingButton) {
        return;
      }

      // Inject button to this post
      injectButtonToPost(post);
    });
  }

  // Helper function to inject button to a single post
  function injectButtonToPost(post) {
    // Check if button exists but was removed (re-inject if needed)
    const existingButton = post.querySelector('.verifiai-fb-button');
    if (existingButton && document.body.contains(existingButton)) {
      // Button still exists, skip if already processed
      if (post.hasAttribute('data-verifiai-processed')) {
        return;
      }
    } else if (post.hasAttribute('data-verifiai-processed')) {
      // Button was removed, reset flag to re-inject
      post.removeAttribute('data-verifiai-processed');
    }

    // Skip if already has button and is processed
    if (post.hasAttribute('data-verifiai-processed') && existingButton) {
      return;
    }

    // Try multiple strategies to find insertion point
    let insertionPoint = null;
    let insertionMethod = 'append'; // 'before', 'prepend', 'append'
    
    // Strategy 1: Look for the action buttons container (Like, Comment, Share)
    const actionContainer = post.querySelector('[role="group"]')?.parentElement ||
                            post.querySelector('div[role="group"]')?.parentElement;
    
    // Strategy 2: Look for comment/share buttons area
    const commentButton = post.querySelector('[aria-label*="Comment"]')?.closest('div')?.parentElement ||
                         post.querySelector('[aria-label*="comment"]')?.closest('div')?.parentElement ||
                         post.querySelector('[aria-label*="Share"]')?.closest('div')?.parentElement;
    
    // Strategy 3: Look for the post footer/actions section
    const postFooter = post.querySelector('[data-testid="like_button"]')?.closest('div')?.parentElement ||
                      post.querySelector('div[role="button"][aria-label*="Like"]')?.closest('div')?.parentElement ||
                      post.querySelector('div[role="button"][aria-label*="like"]')?.closest('div')?.parentElement;
    
    // Strategy 4: Find any div with multiple buttons (action area)
    const buttonContainer = Array.from(post.querySelectorAll('div[role="button"], a[role="button"]'))
      .find(el => {
        const siblings = Array.from(el.parentElement?.children || []);
        return siblings.filter(s => s.getAttribute('role') === 'button' || s.tagName === 'A').length >= 2;
      })?.parentElement;

    // Strategy 5: Look for spans with "Like", "Comment", "Share" text
    const actionText = Array.from(post.querySelectorAll('span'))
      .find(span => {
        const text = span.innerText?.toLowerCase() || '';
        return text.includes('like') || text.includes('comment') || text.includes('share');
      })?.closest('div')?.parentElement;

    insertionPoint = actionContainer || commentButton || postFooter || buttonContainer || actionText;

    // Determine insertion method
    if (insertionPoint?.parentElement) {
      insertionMethod = 'before';
    } else if (insertionPoint) {
      insertionMethod = 'prepend';
    } else {
      insertionMethod = 'append';
      insertionPoint = post; // Fallback to post itself
    }

    // Create and inject button
    try {
      const button = createFactCheckButton();
      button.setAttribute('data-verifiai-button', 'true');
      button.style.margin = '8px 0';
      button.style.display = 'block';
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFactCheck(post, button);
      });

      // Insert the button
      if (insertionMethod === 'before' && insertionPoint.parentElement) {
        insertionPoint.parentElement.insertBefore(button, insertionPoint);
      } else if (insertionMethod === 'prepend' && insertionPoint) {
        insertionPoint.insertBefore(button, insertionPoint.firstChild);
      } else {
        // Append to post (most reliable fallback)
        post.appendChild(button);
      }
      
      // Mark post as processed
      post.setAttribute('data-verifiai-processed', 'true');
      console.log('[VerifiAI] Button injected successfully');
    } catch (error) {
      console.error('[VerifiAI] Could not inject button:', error);
    }
  }

  // Initialize
  function init() {
    console.log('[VerifiAI] Extension initialized');
    
    // Debounce function for performance
    let injectTimeout;
    const debouncedInject = () => {
      clearTimeout(injectTimeout);
      injectTimeout = setTimeout(injectButtons, 100);
    };

    // Wait a bit for Facebook to load content
    setTimeout(() => {
      console.log('[VerifiAI] Initial button injection');
      injectButtons();
    }, 1000);

    // Inject buttons on page load
    injectButtons();

    // Use MutationObserver to handle dynamically loaded posts
    // More efficient: only observe additions, not all mutations
    const observer = new MutationObserver((mutations) => {
      // Only trigger if new nodes were added
      const hasNewNodes = mutations.some(mutation => 
        mutation.addedNodes.length > 0 && 
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === 1 && // Element node
          (node.matches && (
            node.matches('[role="article"]') || 
            node.matches('[data-pagelet="FeedUnit"]') ||
            node.querySelector('[role="article"]')
          ))
        )
      );
      
      if (hasNewNodes) {
        debouncedInject();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // More frequent scroll handler (Facebook loads aggressively)
    let scrollTimeout;
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Only inject if scrolled significantly (performance optimization)
      if (Math.abs(currentScrollTop - lastScrollTop) > 100) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(injectButtons, 200); // Faster response
        lastScrollTop = currentScrollTop;
      }
    }, { passive: true });

    // Use IntersectionObserver to detect when posts come into view
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Check if this post needs a button
          const post = entry.target;
          if (!post.hasAttribute('data-verifiai-processed') && 
              !post.querySelector('.verifiai-fb-button')) {
            debouncedInject();
          }
        }
      });
    }, {
      rootMargin: '200px', // Start checking before post is visible
      threshold: 0.1
    });

    // Observe all posts for intersection
    const observePosts = () => {
      document.querySelectorAll('[role="article"]').forEach(post => {
        intersectionObserver.observe(post);
      });
    };

    // Initial observation
    observePosts();

    // Re-observe when new posts are added
    const observeObserver = new MutationObserver(() => {
      observePosts();
    });
    observeObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Periodic check as fallback (every 2 seconds)
    setInterval(injectButtons, 2000);
  }

  // Wait for page to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
