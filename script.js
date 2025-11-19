let selectedViews = new Set(['webcomponents']); // Track multiple selections
let blinkInterval = null; // For the blink comparator
let currentBlinkIndex = 0;

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

  updateButtonStates();
  updateVisibleView();
}

document.addEventListener('DOMContentLoaded', () => {
  const switchButtons = document.getElementsByClassName('switch-button');

  for (const button of switchButtons) {
    button.addEventListener('click', switchView);
  }

  // Initialize with webcomponents selected
  updateButtonStates();
  updateVisibleView();
});