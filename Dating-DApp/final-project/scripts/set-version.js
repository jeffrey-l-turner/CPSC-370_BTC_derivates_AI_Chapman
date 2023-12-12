import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setVersion() {
  const packageJsonPath = join(__dirname, '../package.json');
  const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonData);

  const versionContent = `export const version = '${packageJson.version}';\n`;
  await fs.writeFile('./src/lib/version.ts', versionContent);
}

setVersion();
