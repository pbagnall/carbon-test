# carbon-test
Testing carbon design system, including angular, react and web components, with theming

## Deployment

This project is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Scripts

- `npm run build` - Build all implementations (web components, React, Angular)
- `npm run demo` - Build and serve locally for development
- `npm run publish` - Build and prepare files for GitHub Pages deployment
- `npm run gh-pages:prepare` - Prepare the gh-pages directory with built files

### GitHub Pages Deployment

The deployment is handled automatically by GitHub Actions:

1. **Automatic Deployment**: Any push to the `main` branch triggers the deployment workflow
2. **Manual Deployment**: You can also trigger deployment manually from the Actions tab in GitHub
3. **Local Testing**: Run `npm run publish` to build and prepare files locally (files will be in the `gh-pages/` directory)

The deployed site includes:
- Main comparator interface (`index.html`)
- Web Components implementation
- React implementation  
- Angular implementation

All implementations are built and copied to the appropriate paths for the comparator to load them correctly.
