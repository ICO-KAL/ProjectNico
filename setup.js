#!/usr/bin/env node

console.log('🚀 Inicializando proyecto TaskFlow...\n');

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = promisify(exec);

const steps = [
  {
    name: '📦 Instalando dependencias del backend',
    command: 'cd backend && npm install',
    dir: 'backend'
  },
  {
    name: '🎨 Instalando dependencias del frontend',
    command: 'cd frontend && npm install',
    dir: 'frontend'
  },
  {
    name: '🧪 Instalando dependencias de tests',
    command: 'cd tests && npm install',
    dir: 'tests'
  }
];

async function runStep(step) {
  console.log(`\n${step.name}...`);
  try {
    const { stdout, stderr } = await execPromise(step.command);
    console.log(`✅ ${step.name} completado`);
    return true;
  } catch (error) {
    console.error(`❌ Error en ${step.name}:`, error.message);
    return false;
  }
}

async function createEnvFile() {
  const envExamplePath = path.join(process.cwd(), 'backend', '.env.example');
  const envPath = path.join(process.cwd(), 'backend', '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('\n📝 Creando archivo .env...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Archivo .env creado');
  } else {
    console.log('\n✅ Archivo .env ya existe');
  }
}

async function createScreenshotsDir() {
  const screenshotsDir = path.join(process.cwd(), 'tests', 'screenshots');
  
  if (!fs.existsSync(screenshotsDir)) {
    console.log('\n📁 Creando directorio de screenshots...');
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log('✅ Directorio de screenshots creado');
  }
}

async function main() {
  console.log('='.repeat(60));
  
  let allSuccess = true;
  
  for (const step of steps) {
    const success = await runStep(step);
    if (!success) allSuccess = false;
  }
  
  await createEnvFile();
  await createScreenshotsDir();
  
  console.log('\n' + '='.repeat(60));
  
  if (allSuccess) {
    console.log('\n✅ ¡Instalación completada exitosamente!\n');
    console.log('📚 Próximos pasos:');
    console.log('   1. Revisar backend/.env y ajustar si es necesario');
    console.log('   2. Iniciar backend: cd backend && npm run dev');
    console.log('   3. Iniciar frontend: cd frontend && npm run dev');
    console.log('   4. Abrir navegador en: http://localhost:5173\n');
    console.log('🔑 Credenciales de prueba:');
    console.log('   Usuario: admin');
    console.log('   Contraseña: cualquiera\n');
    console.log('📖 Documentación:');
    console.log('   - README.md - Guía completa');
    console.log('   - QUICKSTART.md - Inicio rápido');
    console.log('   - API_DOCUMENTATION.md - Documentación de API');
    console.log('   - .github/GITHUB_FLOW.md - Flujo de trabajo\n');
  } else {
    console.log('\n⚠️  Algunos pasos fallaron. Revisa los errores arriba.\n');
    process.exit(1);
  }
  
  console.log('='.repeat(60));
}

main();
