#!/usr/bin/env node
/**
 * Script para copiar los archivos .d.ts generados a la ubicación correcta
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

async function copyTypes() {
  console.log('📦 Copiando archivos de tipos...');

  // Copiar index.d.ts principal
  await copyFile(
    path.join(root, 'dist/types/index.d.ts'),
    path.join(root, 'dist/index.d.ts')
  );

  // Copiar schemas/index.d.ts
  await copyFile(
    path.join(root, 'dist/types/schemas/index.d.ts'),
    path.join(root, 'dist/schemas/index.d.ts')
  );

  // Copiar components/index.d.ts
  await copyFile(
    path.join(root, 'dist/types/components/index.d.ts'),
    path.join(root, 'dist/components/index.d.ts')
  );

  // Copiar generator/index.d.ts
  await copyFile(
    path.join(root, 'dist/types/generator/index.d.ts'),
    path.join(root, 'dist/generator/index.d.ts')
  );

  // Limpiar carpeta temporal
  await fs.rm(path.join(root, 'dist/types'), { recursive: true, force: true });

  console.log('✅ Archivos de tipos copiados correctamente');
}

async function copyFile(src, dest) {
  try {
    const content = await fs.readFile(src, 'utf8');
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, content);
    console.log(`   ✅ ${path.relative(root, dest)}`);
  } catch (error) {
    console.error(`   ❌ Error copiando ${path.relative(root, src)}:`, error.message);
    throw error;
  }
}

copyTypes().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
