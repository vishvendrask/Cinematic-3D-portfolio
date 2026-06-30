const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '..', 'node_modules', 'dlv', 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
let changed = false;

if (pkg.main !== './dist/dlv.js') {
  pkg.main = './dist/dlv.js';
  changed = true;
}

if (pkg.browser !== './dist/dlv.umd.js') {
  pkg.browser = './dist/dlv.umd.js';
  changed = true;
}

if (pkg.module !== './dist/dlv.es.js') {
  pkg.module = './dist/dlv.es.js';
  changed = true;
}

if (pkg.type === 'module') {
  delete pkg.type;
  changed = true;
}

if (changed) {
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log('Patched dlv package.json metadata for Node compatibility.');
}
