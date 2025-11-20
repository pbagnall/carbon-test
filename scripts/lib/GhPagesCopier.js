import fs from 'fs';
import path from 'path';

/**
 * GitHub Pages file copier class
 * Manages copying files from the project root to the gh-pages directory
 */
class GhPagesCopier {
  constructor(rootDir, ghPagesDir) {
    this.rootDir = rootDir;
    this.ghPagesDir = ghPagesDir;
  }

  /**
   * Copy a single file from source to destination
   * @param {string} srcRelativePath - Source file path relative to rootDir
   * @param {string} destRelativePath - Destination file path relative to ghPagesDir
   */
  copyFile(srcRelativePath, destRelativePath) {
    const srcPath = path.join(this.rootDir, srcRelativePath);
    const destPath = path.join(this.ghPagesDir, destRelativePath);
    const displayName = `${srcRelativePath} → ${destRelativePath}`;
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copied ${displayName}`);
      return true;
    } else {
      console.warn(`⚠️  File not found: ${displayName}`);
      return false;
    }
  }

  /**
   * Copy a directory recursively from source to destination
   * @param {string} srcRelativePath - Source directory path relative to rootDir
   * @param {string} destRelativePath - Destination directory path relative to ghPagesDir
   */
  copyDirectory(srcRelativePath, destRelativePath) {
    const srcDir = path.join(this.rootDir, srcRelativePath);
    const destDir = path.join(this.ghPagesDir, destRelativePath);
    const displayName = `${srcRelativePath} → ${destRelativePath}`;
    
    if (fs.existsSync(srcDir)) {
      fs.cpSync(srcDir, destDir, { recursive: true });
      console.log(`✅ Copied ${displayName}`);
      return true;
    } else {
      console.warn(`⚠️  Directory not found: ${displayName}`);
      return false;
    }
  }

  /**
   * Copy contents of a directory (flattened) to destination
   * @param {string} srcRelativePath - Source directory path relative to rootDir
   * @param {string} destRelativePath - Destination directory path relative to ghPagesDir
   */
  copyDirectoryContents(srcRelativePath, destRelativePath) {
    const srcDir = path.join(this.rootDir, srcRelativePath);
    const destDir = path.join(this.ghPagesDir, destRelativePath);
    const displayName = `${srcRelativePath}/* → ${destRelativePath} (flattened)`;
    
    if (!fs.existsSync(srcDir)) {
      console.warn(`⚠️  Directory not found: ${displayName}`);
      return false;
    }

    fs.mkdirSync(destDir, { recursive: true });
    
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    
    console.log(`✅ Copied ${displayName}`);
    return true;
  }
}

export default GhPagesCopier;