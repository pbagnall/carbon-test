#!/usr/bin/env node

/**
 * GitHub Pages Clean Script
 * Removes the gh-pages directory to ensure a clean build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ghPagesDir = path.join(__dirname, '..', 'gh-pages');

console.log('🧹 Cleaning gh-pages directory...');

if (fs.existsSync(ghPagesDir)) {
  fs.rmSync(ghPagesDir, { recursive: true, force: true });
  console.log('✅ Removed existing gh-pages directory');
} else {
  console.log('ℹ️  No existing gh-pages directory found');
}

console.log('🧹 Clean completed');