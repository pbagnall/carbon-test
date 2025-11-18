import "./style.scss";
import '@carbon/web-components/es/components/button/button.js';
import "@carbon/web-components/es/components/ui-shell/index";

// Import and register the original icon component first
import "@carbon/web-components/es/components/icon/index.js";

// Import icons
import Search20 from "@carbon/icons/es/search/20.js";
import Notification20 from "@carbon/icons/es/notification/20.js";
import Switcher20 from "@carbon/icons/es/switcher/20.js";

// Create icon registry
const iconRegistry: Record<string, any> = {
  search: Search20,
  notification: Notification20,
  switcher: Switcher20,
};

// Function to process an icon element
function processIconElement(iconElement: HTMLElement) {
  const iconAttr = iconElement.getAttribute('icon');
  if (iconAttr && typeof iconAttr === 'string') {
    const iconData = iconRegistry[iconAttr];
    if (iconData) {
      (iconElement as any).icon = iconData;
    } else {
      console.warn(`Icon "${iconAttr}" not found in registry. Available icons:`, Object.keys(iconRegistry));
    }
  }
}

// Wait for the cds-icon component to be defined, then enhance all instances
customElements.whenDefined('cds-icon').then(() => {
  
  // Create a custom element that extends HTMLElement to intercept cds-icon creation
  class IconRegistry extends HTMLElement {
    static observedAttributes = ['icon'];
    
    connectedCallback() {
      if (this.tagName.toLowerCase() === 'cds-icon') {
        processIconElement(this);
      }
    }
    
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      if (name === 'icon' && newValue !== oldValue && this.tagName.toLowerCase() === 'cds-icon') {
        processIconElement(this);
      }
    }
  }
  
  // Monkey patch the original cds-icon to add our functionality
  const originalCDSIcon = customElements.get('cds-icon');
  if (originalCDSIcon) {
    const originalConnectedCallback = originalCDSIcon.prototype.connectedCallback;
    const originalAttributeChangedCallback = originalCDSIcon.prototype.attributeChangedCallback;
    
    // Enhance connectedCallback
    originalCDSIcon.prototype.connectedCallback = function() {
      originalConnectedCallback?.call(this);
      processIconElement(this);
    };
    
    // Enhance attributeChangedCallback
    originalCDSIcon.prototype.attributeChangedCallback = function(name: string, oldValue: string | null, newValue: string | null) {
      originalAttributeChangedCallback?.call(this, name, oldValue, newValue);
      if (name === 'icon' && newValue !== oldValue) {
        processIconElement(this);
      }
    };
    
    // Ensure 'icon' attribute is observed
    const originalObservedAttributes = (originalCDSIcon as any).observedAttributes || [];
    if (!originalObservedAttributes.includes('icon')) {
      Object.defineProperty(originalCDSIcon, 'observedAttributes', {
        get() {
          return [...originalObservedAttributes, 'icon'];
        }
      });
    }
  }
  
  // Process any existing cds-icon elements
  document.querySelectorAll('cds-icon[icon]').forEach((element) => {
    processIconElement(element as HTMLElement);
  });
});