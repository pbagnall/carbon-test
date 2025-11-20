#!/usr/bin/env node

/**
 * GitHub Pages Prepare Script
 * Main script that orchestrates the entire GitHub Pages build process
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptsDir = __dirname;

console.log('🚀 Starting GitHub Pages preparation...\n');

try {
  // Step 1: Clean
  console.log('Step 1: Cleaning...');
  execSync(`node "${path.join(scriptsDir, 'gh-pages-clean.js')}"`, { stdio: 'inherit' });
  console.log();

  // Step 2: Copy
  console.log('Step 2: Copying files...');
  execSync(`node "${path.join(scriptsDir, 'gh-pages-copy.js')}"`, { stdio: 'inherit' });
  console.log();

  // Step 3: Fix paths
  console.log('Step 3: Fixing paths...');
  execSync(`node "${path.join(scriptsDir, 'gh-pages-fix-paths.js')}"`, { stdio: 'inherit' });
  console.log();

  console.log('🎉 GitHub Pages preparation completed successfully!');
  console.log('📁 Files prepared in gh-pages/ directory');
  console.log('🚀 Push to main branch to deploy to GitHub Pages');

} catch (error) {
  console.error('❌ GitHub Pages preparation failed:', error.message);
  process.exit(1);
}