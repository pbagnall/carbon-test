import "./style.scss";
import '@carbon/web-components/es/components/button/button.js';
import "@carbon/web-components/es/components/ui-shell/index";
import "@carbon/web-components/es/components/icon/index.js";

// Import the icon data from @carbon/icons
import "@carbon/icons/es/search/16.js";
import "@carbon/icons/es/notification/16.js";
import "@carbon/icons/es/switcher/16.js";

// Wait for the components to be defined
// customElements.whenDefined('cds-icon').then(() => {
//   // Set icons on the cds-icon elements
//   const searchIcon = document.querySelector('cds-header-global-action[aria-label="User Profile"] cds-icon');
//   const notificationIcon = document.querySelector('cds-header-global-action[aria-label="Notifications"] cds-icon');
//   const switcherIcon = document.querySelector('cds-header-global-action[aria-label="App Switcher"] cds-icon');

//   if (notificationIcon) (notificationIcon as any).icon = Notification16;
//   if (searchIcon) (searchIcon as any).icon = Search16;
//   if (switcherIcon) (switcherIcon as any).icon = Switcher16;
// });