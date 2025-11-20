import fs from 'fs';
import path from 'path';

/**
 * GitHub Pages path fixer class
 * Updates HTML files to use the correct relative paths for GitHub Pages deployment
 */
class GhPagesPathFixer {
  constructor(ghPagesDir) {
    this.ghPagesDir = ghPagesDir;
  }

  /**
   * Replace text in a file with multiple replacements
   * @param {string} relativePath - File path relative to ghPagesDir
   * @param {Array<{search: string, replace: string}>} replacements - Array of replacements
   */
  replaceInFile(relativePath, replacements) {
    const filePath = path.join(this.ghPagesDir, relativePath);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${relativePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    replacements.forEach(({ search, replace }) => {
      if (content.includes(search)) {
        content = content.replace(new RegExp(search, 'g'), replace);
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated paths in ${relativePath}`);
      return true;
    }
    
    return false;
  }
}

export default GhPagesPathFixer;