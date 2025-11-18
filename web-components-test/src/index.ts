import "./style.scss";
import '@carbon/web-components/es/components/button/button.js';
import "@carbon/web-components/es/components/ui-shell/index";
import "@carbon/web-components/es/components/icon/index.js";

// Import and register icons globally
import Search16 from "@carbon/icons/es/search/16.js";
import Notification16 from "@carbon/icons/es/notification/16.js";
import Switcher16 from "@carbon/icons/es/switcher/16.js";

// Make icons available globally for declarative use
(window as any).carbonIcons = {
  search: Search16,
  notification: Notification16,
  switcher: Switcher16,
};

// Set up icons declaratively after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('cds-icon[icon]');
  icons.forEach((iconElement: Element) => {
    const iconName = iconElement.getAttribute('icon');
    if (iconName && (window as any).carbonIcons[iconName]) {
      (iconElement as any).icon = (window as any).carbonIcons[iconName];
    }
  });
});