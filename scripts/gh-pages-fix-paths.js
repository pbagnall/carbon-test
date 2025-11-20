#!/usr/bin/env node

/**
 * GitHub Pages Fix Paths Script
 * Updates HTML files to use the correct relative paths for GitHub Pages deployment
 */

import path from 'path';
import { fileURLToPath } from 'url';
import GhPagesPathFixer from './lib/GhPagesPathFixer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Execute the path fixing process
console.log('🔧 Fixing paths for GitHub Pages...');

const ghPagesDir = path.join(__dirname, '..', 'gh-pages');
const fixer = new GhPagesPathFixer(ghPagesDir);

// Fix main comparator HTML - update iframe sources
fixer.replaceInFile('index.html', [
  {
    search: './web-components-test/dist/index.html',
    replace: './web-components-test/index.html'
  },
  {
    search: './react-test/dist/index.html',
    replace: './react-test/index.html'
  },
  {
    search: './angular-test/dist/browser/index.html',
    replace: './angular-test/index.html'
  }
]);

// Fix web components HTML - update asset paths
fixer.replaceInFile('web-components-test/index.html', [
  {
    search: '/web-components-test/dist/assets/',
    replace: './assets/'
  }
]);

// Fix React HTML - update asset and icon paths
fixer.replaceInFile('react-test/index.html', [
  {
    search: '/react-test/dist/assets/',
    replace: './assets/'
  },
  {
    search: '/react-test/dist/vite.svg',
    replace: './vite.svg'
  }
]);

console.log('🔧 Path fixing completed');