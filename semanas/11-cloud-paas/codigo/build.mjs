import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// La plataforma ejecuta esta preparación una vez por despliegue.
// Los visitantes reciben archivos estáticos, no ejecutan este script.
const root = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(await fs.readFile(path.join(root, 'contenido.json'), 'utf8'));
const version = process.argv[2] ?? config.version;
if (!['v1', 'v2'].includes(version)) {
  throw new Error('Versión no válida. Usar v1 o v2 en contenido.json.');
}
const html = (await fs.readFile(path.join(root, 'web', version, 'index.html'), 'utf8'))
  .replaceAll('AMBIENTE_DEMO', 'vercel');
const output = path.join(root, 'public');
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
await fs.writeFile(path.join(output, 'index.html'), html);
await fs.copyFile(path.join(root, 'web', 'styles.css'), path.join(output, 'styles.css'));
await fs.cp(path.join(root, 'web', 'assets'), path.join(output, 'assets'), { recursive: true });
// Archivo estático: no es un endpoint serverless ni una prueba de servidor.
await fs.writeFile(path.join(output, 'version.json'), JSON.stringify({ version, ambiente: 'vercel' }) + '\n');
console.log(`Build listo: ${version}. Archivos estáticos en public/.`);
