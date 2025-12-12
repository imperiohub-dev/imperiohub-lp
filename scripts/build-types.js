#!/usr/bin/env node
/**
 * Post-build script para generar archivos .d.ts correctos
 * para cada entry point
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

const entries = [
  { input: 'src/schemas/index.ts', output: 'dist/schemas/index.d.ts' },
  { input: 'src/components/index.ts', output: 'dist/components/index.d.ts' },
  { input: 'src/generator/index.ts', output: 'dist/generator/index.d.ts' },
  { input: 'src/index.ts', output: 'dist/index.d.ts' },
];

async function buildTypes() {
  console.log('🔧 Generando archivos de tipos...');

  for (const entry of entries) {
    console.log(`   Procesando ${entry.input}...`);

    try {
      // Generar .d.ts usando tsc
      await execAsync(
        `npx tsc ${entry.input} --declaration --emitDeclarationOnly --outDir dist/temp --declarationDir dist/temp`
      );

      // Leer el archivo generado (tsc crea la estructura de carpetas)
      const tempPath = path.join('dist/temp', path.relative('src', entry.input).replace('.ts', '.d.ts'));
      const content = await fs.readFile(tempPath, 'utf8');

      // Escribir en la ubicación correcta
      await fs.mkdir(path.dirname(entry.output), { recursive: true });
      await fs.writeFile(entry.output, content);

      console.log(`   ✅ ${entry.output}`);
    } catch (error) {
      console.error(`   ❌ Error procesando ${entry.input}:`, error.message);
    }
  }

  // Limpiar carpeta temporal
  await fs.rm('dist/temp', { recursive: true, force: true });

  console.log('✅ Tipos generados correctamente');
}

buildTypes().catch(console.error);
