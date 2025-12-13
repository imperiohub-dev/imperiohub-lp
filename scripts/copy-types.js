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

  const typesDir = path.join(root, 'dist/types');
  const distDir = path.join(root, 'dist');

  // Copiar recursivamente todos los archivos .d.ts
  await copyDirRecursive(typesDir, distDir);

  // Limpiar carpeta temporal
  await fs.rm(typesDir, { recursive: true, force: true });

  console.log('✅ Archivos de tipos copiados correctamente');
}

/**
 * Copia recursivamente todos los archivos .d.ts de un directorio
 */
async function copyDirRecursive(srcDir, destDir) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const relativePath = path.relative(path.join(root, 'dist/types'), srcPath);
    const destPath = path.join(destDir, relativePath);

    if (entry.isDirectory()) {
      // Recursión para subdirectorios
      await copyDirRecursive(srcPath, destDir);
    } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
      // Copiar archivo .d.ts
      await copyFile(srcPath, destPath);
    }
  }
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
