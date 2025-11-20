#!/usr/bin/env node

/**
 * GitHub Pages Copy Script
 * Copies all necessary files to the gh-pages directory with the correct structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import GhPagesCopier from './lib/GhPagesCopier.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Execute the copy process
console.log('📁 Copying files to gh-pages directory...');

const rootDir = path.join(__dirname, '..');
const ghPagesDir = path.join(rootDir, 'gh-pages');
const copier = new GhPagesCopier(rootDir, ghPagesDir);

// Create gh-pages directory
fs.mkdirSync(copier.ghPagesDir, { recursive: true });

// Copy main files
console.log('📄 Copying main files...');
const mainFiles = ['index.html', 'styles.css', 'script.js'];
mainFiles.forEach(file => {
  copier.copyFile(file, file);
});

// Copy implementation builds
console.log('🔧 Copying implementation builds...');

// Web Components: dist → web-components-test
copier.copyDirectory(
  'web-components-test/dist',
  'web-components-test'
);

// React: dist → react-test
copier.copyDirectory(
  'react-test/dist',
  'react-test'
);

// Angular: dist/browser/* → angular-test (flattened)
copier.copyDirectoryContents(
  'angular-test/dist/browser',
  'angular-test'
);

console.log('📁 Copy completed');