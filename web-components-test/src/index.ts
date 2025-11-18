import "./style.scss";
import '@carbon/web-components/es/components/button/button.js';
import "@carbon/web-components/es/components/ui-shell/index";
import "@carbon/web-components/es/components/icon/index.js";

// Import the icon data from @carbon/icons
import Search16 from "@carbon/icons/es/search/16.js";
import Notification16 from "@carbon/icons/es/notification/16.js";
import Switcher16 from "@carbon/icons/es/switcher/16.js";

// Wait for the components to be defined
customElements.whenDefined('cds-icon').then(() => {
  // Set icons on the cds-icon elements
  const searchIcon = document.querySelector('cds-header-global-action[aria-label="Search"] cds-icon');
  const notificationIcon = document.querySelector('cds-header-global-action[aria-label="Notifications"] cds-icon');
  const switcherIcon = document.querySelector('cds-header-global-action[aria-label="App Switcher"] cds-icon');

  if (searchIcon) (searchIcon as any).icon = Search16;
  if (notificationIcon) (notificationIcon as any).icon = Notification16;
  if (switcherIcon) (switcherIcon as any).icon = Switcher16;
});