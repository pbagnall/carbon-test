let selectedViews = new Set(['webcomponents']); // Track multiple selections
let blinkInterval = null; // For the blink comparator
let currentBlinkIndex = 0;

// Cookie utility functions
function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getViewNameFromButtonId(buttonId) {
  return buttonId.substring(0, buttonId.length - 7);
}

function updateVisibleView() {
  const mainElement = document.querySelector('main');
  
  // Sort selected views in button order (webcomponents, react, angular)
  const buttonOrder = ['webcomponents', 'react', 'angular'];
  const selectedArray = buttonOrder.filter(view => selectedViews.has(view));
  
  if (selectedArray.length === 0) {
    // No selection, show webcomponents as default
    selectedViews.add('webcomponents');
    selectedArray.push('webcomponents');
  }

  if (selectedArray.length === 1) {
    // Single selection - show that view
    stopBlinkComparator();
    mainElement.className = selectedArray[0];
  } else {
    // Multiple selections - restart blink comparator with current selections in button order
    stopBlinkComparator(); // Stop existing comparator first
    startBlinkComparator(selectedArray);
  }
}

function startBlinkComparator(views) {
  if (blinkInterval) return; // Already running
  
  const mainElement = document.querySelector('main');
  const blinkIndicator = document.getElementById('blink-indicator');
  const helpMessage = document.getElementById('help-message');
  currentBlinkIndex = 0;
  
  // Show blink indicator and hide help message
  blinkIndicator.classList.remove('hidden');
  helpMessage.classList.add('hidden');
  
  // Show first view immediately and highlight its button
  mainElement.className = views[currentBlinkIndex];
  updateButtonStates(views[currentBlinkIndex]);
  
  // Start interval to cycle through views
  blinkInterval = setInterval(() => {
    currentBlinkIndex = (currentBlinkIndex + 1) % views.length;
    mainElement.className = views[currentBlinkIndex];
    updateButtonStates(views[currentBlinkIndex]);
  }, 500);
}

function stopBlinkComparator() {
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
    currentBlinkIndex = 0;
    
    // Hide blink indicator and show help message
    const blinkIndicator = document.getElementById('blink-indicator');
    const helpMessage = document.getElementById('help-message');
    blinkIndicator.classList.add('hidden');
    helpMessage.classList.remove('hidden');
    
    // Clear active view highlighting
    updateButtonStates();
  }
}

function updateButtonStates(activeView = null) {
  const switchButtons = document.getElementsByClassName('switch-button');
  for (const button of switchButtons) {
    const viewName = getViewNameFromButtonId(button.id);
    
    // Update selected state
    if (selectedViews.has(viewName)) {
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
    }
    
    // Update active view highlight for blink comparator
    if (activeView && viewName === activeView) {
      button.classList.add('active-view');
    } else {
      button.classList.remove('active-view');
    }
  }
}

function switchView(clickEvent) {
  clickEvent.preventDefault();
  
  const viewName = getViewNameFromButtonId(clickEvent.target.id);
  const isShiftClick = clickEvent.shiftKey;

  if (isShiftClick) {
    // Shift-click: toggle selection, but don't allow deselecting the last one
    if (selectedViews.has(viewName)) {
      // Only deselect if there are other selections
      if (selectedViews.size > 1) {
        selectedViews.delete(viewName);
      }
      // If it's the only selection, do nothing (don't deselect)
    } else {
      selectedViews.add(viewName);
    }
  } else {
    // Regular click: single selection
    selectedViews.clear();
    selectedViews.add(viewName);
  }

  // Save selected views to cookie
  setCookie('selectedViews', JSON.stringify(Array.from(selectedViews)));

  updateButtonStates();
  updateVisibleView();
}

document.addEventListener('DOMContentLoaded', () => {
  const switchButtons = document.getElementsByClassName('switch-button');

  for (const button of switchButtons) {
    button.addEventListener('click', switchView);
  }

  // Restore selected views from cookie
  const savedViews = getCookie('selectedViews');
  if (savedViews) {
    try {
      const parsedViews = JSON.parse(savedViews);
      if (Array.isArray(parsedViews) && parsedViews.length > 0) {
        selectedViews = new Set(parsedViews);
      }
    } catch (e) {
      console.warn('Failed to parse saved views from cookie:', e);
      // Keep default selectedViews if parsing fails
    }
  }

  // Initialize UI with selected views
  updateButtonStates();
  updateVisibleView();
});