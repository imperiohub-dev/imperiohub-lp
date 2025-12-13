#!/usr/bin/env node
/**
 * Script de verificación post-build
 * Verifica que todos los archivos .d.ts necesarios existen
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const REQUIRED_FILES = [
  // Archivos principales
  'dist/index.d.ts',
  'dist/index.js',
  'dist/index.cjs',

  // Schemas
  'dist/schemas/index.d.ts',
  'dist/schemas/index.js',
  'dist/schemas/index.cjs',
  'dist/schemas/types.d.ts', // ⭐ Archivo intermedio crítico
  'dist/schemas/validators/index.d.ts', // ⭐ Archivo intermedio crítico
  'dist/schemas/templates/index.d.ts', // ⭐ Archivo intermedio crítico
  'dist/schemas/templates/menu.d.ts',
  'dist/schemas/templates/hero-beneficios.d.ts',
  'dist/schemas/templates/home-page-v1.d.ts',

  // Components
  'dist/components/index.d.ts',
  'dist/components/index.js',
  'dist/components/index.cjs',

  // Generator
  'dist/generator/index.d.ts',
  'dist/generator/index.js',
  'dist/generator/index.cjs',
];

console.log('🔍 Verificando archivos del build...\n');

let allOk = true;
let missingCount = 0;

for (const file of REQUIRED_FILES) {
  const filePath = path.join(root, file);
  const exists = fs.existsSync(filePath);

  if (exists) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ FALTA: ${file}`);
    allOk = false;
    missingCount++;
  }
}

console.log('\n' + '='.repeat(60));

if (allOk) {
  console.log('✅ VERIFICACIÓN EXITOSA: Todos los archivos necesarios existen');
  console.log('✅ El paquete está listo para publicarse');
  process.exit(0);
} else {
  console.log(`❌ VERIFICACIÓN FALLIDA: ${missingCount} archivo(s) faltante(s)`);
  console.log('❌ Por favor ejecuta: npm run build');
  process.exit(1);
}
