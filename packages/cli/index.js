#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CLI args
const [, , command, componentNameRaw] = process.argv;
const componentName = capitalize(componentNameRaw || '');

console.log('Command:', command);
console.log('Component name:', componentName);

if (command === 'add' && componentName) {
  console.log(chalk.blue(`Adding component: ${componentName}...`));

  const isNative = fs.existsSync('app.json');
  console.log('Environment:', isNative ? 'React Native' : 'React Web');

  const srcPath = path.resolve(
    __dirname,
    `../../packages/components-${isNative ? 'native' : 'web'}/src/${componentName}.tsx`
  );

  console.log('Looking for component at:', srcPath);

  if (!fs.existsSync(srcPath)) {
    console.log(chalk.red(`❌ Component "${componentName}" does not exist at: ${srcPath}`));
    process.exit(1);
  }

  const destPath = path.resolve(process.cwd(), `src/components/${componentName}.tsx`);
  await fs.ensureDir(path.dirname(destPath));
  await fs.copyFile(srcPath, destPath);

  console.log(chalk.green(`✅ ${componentName} added successfully!`));
} else {
  console.log(chalk.yellow('Usage: node packages/cli/index.js add [componentName]'));
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
