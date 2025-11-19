# Changelog

All notable changes to this Carbon Design System implementation comparison project will be documented in this file.

## [Unreleased] - 2025-11-19

### Added

#### Main Comparison Interface (`index.html`)
- **Multi-selection with Shift-Click**: Users can now select multiple implementations simultaneously by holding Shift while clicking buttons
- **Blink Comparator Feature**: When multiple implementations are selected, the view automatically cycles between them every 500ms for rapid visual comparison
- **Visual Indicator for Blink Mode**: Added eye icon (👁️) that appears when blink comparator is active
- **Active Button Highlighting**: Currently visible implementation in blink mode is highlighted with bright orange outline
- **Help Message System**: Contextual message guides users on shift-click functionality when blink comparator is not active
- **Deterministic View Order**: Blink comparator always cycles through implementations in button order (Web Components → React → Angular)
- **Protected Single Selection**: Prevents deselection of the last remaining implementation via shift-click
- **Enhanced Button Styling**: Improved visual feedback with hover states, transitions, and blue outline for selected buttons

#### React Implementation (`react-test/`)
- **SCSS Support**: Added SCSS preprocessing to Vite configuration for better styling capabilities
- **CSS Preprocessor Configuration**: Set up SCSS preprocessor options in `vite.config.ts`

#### Web Components Implementation (`web-components-test/`)
- **Enhanced Icon System**: Extended `cds-icon` component to support declarative string-based icon names
- **Icon Registry**: Implemented centralized icon registry system for easy icon management
- **Monkey Patching Enhancement**: Enhanced the original `cds-icon` component to automatically resolve string icon names
- **Dynamic Icon Support**: Icons added dynamically to the DOM are automatically processed
- **Type Declarations**: Added TypeScript declarations for Carbon icons to resolve compilation warnings

### Enhanced

#### Icon Implementation in Web Components
- **Declarative HTML Syntax**: Can now use `<cds-icon icon="search">` instead of programmatic icon assignment
- **Automatic Icon Resolution**: Component-level enhancement eliminates need for external DOM watchers
- **Performance Optimization**: Removed MutationObserver approach in favor of component lifecycle integration
- **Backwards Compatibility**: Still supports direct icon object assignment alongside string names

#### User Experience
- **Visual Feedback**: Better button states and transitions for improved usability
- **Rapid Comparison**: Blink comparator allows quick identification of implementation differences
- **Intuitive Controls**: Shift-click paradigm familiar to users from file selection interfaces
- **Active View Tracking**: Orange outline clearly indicates which implementation is currently visible during blink comparison
- **Contextual Help**: Smart help messages appear only when relevant, guiding users without clutter
- **Predictable Ordering**: Consistent left-to-right cycling order regardless of selection sequence
- **Robust Selection Logic**: Prevents invalid states by protecting the last selected implementation

### Fixed

#### Blink Comparator Issues
- **Multi-Selection Updates**: Fixed issue where adding a third implementation wouldn't update the active blink sequence
- **View Order Consistency**: Resolved arbitrary ordering by implementing deterministic button-order sorting
- **Invalid Selection States**: Prevented users from deselecting the last remaining implementation

#### User Interface
- **Help Message Positioning**: Simplified CSS approach using shared classes and `display: none` for cleaner implementation
- **Animation Cleanup**: Removed distracting pulse animation from active button highlighting

### Technical Improvements

#### Architecture
- **Component-Level Enhancement**: Icons are processed at the component level rather than through external watchers
- **Clean Separation**: Icon registry is centralized and easily extensible
- **Type Safety**: Added proper TypeScript declarations for better development experience
- **Simplified CSS Strategy**: Replaced complex positioning with simple show/hide logic using shared classes
- **Monkey Patching Approach**: Enhanced existing components without requiring complete rewrites

#### Build System
- **SCSS Integration**: Proper SCSS support in React implementation build pipeline
- **Development Workflow**: Enhanced development experience with better tooling support

### Implementation Details

#### Multi-Selection Logic
```javascript
// Tracks multiple selected implementations
let selectedViews = new Set(['webcomponents']);

// Ensures deterministic ordering
const buttonOrder = ['webcomponents', 'react', 'angular'];
const selectedArray = buttonOrder.filter(view => selectedViews.has(view));

// Protected deselection logic
if (selectedViews.has(viewName)) {
  if (selectedViews.size > 1) {
    selectedViews.delete(viewName); // Only if not the last one
  }
}

// Blink comparator cycles through selections
function startBlinkComparator(views) {
  // 500ms interval switching between implementations
  // Updates button highlighting with each switch
}
```

#### Icon Registry System
```javascript
// Centralized icon management
const iconRegistry: Record<string, any> = {
  search: Search16,
  notification: Notification16,
  switcher: Switcher16,
};
```

#### State Persistence System
- **Cookie-based Storage**: User selections are automatically saved to cookies and restored on page load
- **Cross-session Persistence**: Selected implementations remain active across browser sessions
- **Fallback Handling**: Graceful degradation when cookie parsing fails

#### Code Organization and Architecture
- **Separated Concerns**: Extracted CSS and JavaScript into separate files (`styles.css`, `script.js`)
- **Clean HTML Structure**: Simplified main HTML file with external dependencies
- **Modular Approach**: Better maintainability with separated presentation and logic
- **Performance Optimization**: Removed unnecessary cookie updates during blink comparator operation

#### Enhanced Component Integration
```javascript
// Component-level icon processing
originalCDSIcon.prototype.connectedCallback = function() {
  originalConnectedCallback?.call(this);
  processIconElement(this);
};
```

#### Cookie-based State Management
```javascript
// Persistent state across sessions
function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Restore selections on page load
const savedViews = getCookie('selectedViews');
if (savedViews) {
  selectedViews = new Set(JSON.parse(savedViews));
}
```

#### Simplified UI State Management
```css
/* Shared styling approach */
.indicator-message {
  font-size: 0.8rem;
  font-weight: normal;
}

.indicator-message.hidden {
  display: none;
}

/* CSS pseudo-elements for decorative icons */
#help-message::before { content: "💡 "; }
#blink-indicator::before { content: "👁️ "; }
```

#### Button State Visual Hierarchy
```css
/* Selection state */
button.selected {
  box-shadow: 0 0 0 2px #0f62fe;
}

/* Active during blink comparison */
button.active-view {
  box-shadow: 0 0 0 3px #ff6b00, 0 0 0 2px #0f62fe;
}
```

### Technical Refactoring

#### Code Organization (Commits: f19d20a, 2a8a904)
- **File Separation**: Extracted CSS and JavaScript from `index.html` into dedicated files
- **Clean Architecture**: Improved maintainability with separated concerns
- **External Dependencies**: CSS (`styles.css`) and JavaScript (`script.js`) now loaded as external resources
- **Simplified HTML**: Main HTML file focused purely on structure

#### State Management Optimization (Commit: 5f85360)
- **Cookie Implementation**: Added persistent storage for user selection preferences
- **Session Continuity**: User selections automatically restored on page refresh/reload
- **Performance Improvement**: Eliminated unnecessary DOM updates during state persistence

#### Interface Refinements (Commits: 375484e, bb3db83)
- **CSS Cleanup**: Removed redundant styles and improved maintainability
- **UI Polish**: Enhanced visual hierarchy and user experience
- **Code Tidying**: General code cleanup and organization improvements

### Files Modified
- `index.html` - Main comparison interface with multi-selection and blink comparator (refactored with external dependencies)
- `styles.css` - **NEW**: Extracted CSS styles with enhanced button states and responsive design
- `script.js` - **NEW**: Extracted JavaScript logic with cookie-based state persistence
- `react-test/vite.config.ts` - Added SCSS support configuration
- `web-components-test/src/index.ts` - Enhanced icon system implementation
- `web-components-test/src/carbon-icons.d.ts` - TypeScript declarations for Carbon icons
- `web-components-test/index.html` - Updated to use declarative icon syntax

### Recent Improvements Summary

#### Latest Development Features
1. **Complete Code Separation**: Clean architecture with external CSS/JS files
2. **Persistent User Preferences**: Cookie-based state management for seamless experience
3. **Optimized Performance**: Reduced unnecessary DOM updates and improved efficiency
4. **Enhanced Maintainability**: Better organized codebase with separated concerns
5. **Production Ready**: Stable, tested implementation ready for deployment

### Usage Examples

#### Multi-Selection with Persistence
- **Single view**: Click any implementation button (selection saved automatically)
- **Multiple comparison**: Shift+click additional implementations (all selections persisted)
- **Return to single**: Regular click to stop comparison mode
- **Session Continuity**: Selections restored automatically on page reload

#### Declarative Icons
```html
<!-- Before: Required programmatic setup -->
<cds-icon slot="icon"></cds-icon>

<!-- After: Simple declarative syntax -->
<cds-icon icon="search" slot="icon"></cds-icon>
<cds-icon icon="notification" slot="icon"></cds-icon>
<cds-icon icon="switcher" slot="icon"></cds-icon>
```

#### File Structure (Post-Refactoring)
```
carbon-test/
├── index.html          # Main interface (clean structure)
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript logic and state management
├── react-test/         # React implementation
├── web-components-test/ # Web Components implementation
└── angular-test/       # Angular implementation (planned)
```

---

## Project Overview

This project provides a comprehensive comparison interface for Carbon Design System implementations across different frameworks:

- **Web Components**: IBM Carbon Web Components implementation
- **React**: IBM Carbon React implementation  
- **Angular**: IBM Carbon Angular implementation (planned)

The enhanced interface allows developers to quickly identify visual and behavioral differences between implementations, making it easier to ensure consistency across framework boundaries.