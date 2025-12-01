import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = promisify(exec);

async function runAllTests() {
  console.log('🚀 Running all E2E tests...\n');
  console.log('='.repeat(60));
  
  const tests = [
    { name: 'Login Detailed Tests', file: 'tests/login-detailed.test.js' },
    { name: 'Login Tests', file: 'tests/login.test.js' },
    { name: 'Dashboard Tests', file: 'tests/dashboard.test.js' },
    { name: 'Kanban Tests', file: 'tests/kanban.test.js' }
  ];

  let totalPassed = 0;
  let totalFailed = 0;
  const sections = [];

  const extractCounts = (text) => {
    // Try explicit summary numbers (English)
    let passMatch = text.match(/\bPassed:\s*(\d+)/);
    let failMatch = text.match(/\bFailed:\s*(\d+)/);

    // Spanish detailed summary lines
    if (!passMatch) passMatch = text.match(/Pruebas que PASARON:\s*(\d+)/i);
    if (!failMatch) failMatch = text.match(/Pruebas que FALLARON:\s*(\d+)/i);

    let passed = passMatch ? parseInt(passMatch[1]) : 0;
    let failed = failMatch ? parseInt(failMatch[1]) : 0;

    // Fallback: count individual PASS/FAIL markers
    const passTokens = (text.match(/✅\s*PASS:?/g) || []).length
      + (text.match(/Estado:\s*✅\s*PASÓ/gi) || []).length
      + (text.match(/\bPASÓ\b/gi) || []).length; // Spanish "PASÓ" markers
    const failTokens = (text.match(/❌\s*FAIL:?/g) || []).length
      + (text.match(/Estado:\s*❌\s*FALLÓ/gi) || []).length
      + (text.match(/\bFALLÓ\b/gi) || []).length;

    // If summary counts missing but there are tokens, use them
    if (passed === 0 && failed === 0 && (passTokens > 0 || failTokens > 0)) {
      passed = passTokens;
      failed = failTokens;
    }

    return { passed, failed };
  };

  for (const test of tests) {
    console.log(`\n📦 Running ${test.name}...`);
    console.log('='.repeat(60));
    
    try {
      const { stdout, stderr } = await execPromise(`node ${test.file}`);
      console.log(stdout);
      
      // Parse results robustly across formats
      const { passed, failed } = extractCounts(stdout);
      totalPassed += passed;
      totalFailed += failed;

      // Capture a concise status for HTML report
      sections.push({
        name: test.name,
        passed,
        failed,
        raw: stdout
      });
      
      if (stderr) console.error(stderr);
    } catch (error) {
      console.error(`❌ Error running ${test.name}:`, error.message);
      // If process exited with non-zero, assume at least one failure
      totalFailed++;
      sections.push({ name: test.name, passed: 0, failed: 1, raw: error.message });
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('🎯 FINAL TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Total Passed: ${totalPassed}`);
  console.log(`❌ Total Failed: ${totalFailed}`);
  console.log(`📊 Total Tests: ${totalPassed + totalFailed}`);
  console.log(`📈 Overall Success Rate: ${Math.round((totalPassed / (totalPassed + totalFailed)) * 100)}%`);
  console.log('='.repeat(60));

  // Generate HTML report
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  const htmlPath = path.join(reportsDir, 'selenium-report.html');
  const successRate = (totalPassed + totalFailed) > 0
    ? Math.round((totalPassed / (totalPassed + totalFailed)) * 100)
    : 100;

  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reporte Selenium E2E - NICO</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 24px; background:#0b1020; color:#e6eaf3; }
    .card { background:#111836; border:1px solid #243059; border-radius:12px; padding:20px; margin-bottom:16px; }
    .badge { display:inline-block; padding:4px 10px; border-radius:999px; font-size:12px; margin-left:8px; }
    .ok { background:#1b7f48; }
    .fail { background:#9b1b26; }
    .grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:16px; }
    h1 { font-size:22px; margin:0 0 16px 0; }
    h2 { font-size:18px; margin:0 0 10px 0; }
    pre { background:#0c132b; border:1px solid #1e2b4f; padding:12px; overflow:auto; border-radius:8px; }
    .muted { color:#9fb0d0; font-size:12px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Reporte de Pruebas Selenium E2E</h1>
    <p class="muted">Proyecto: Gestión de Tareas NICO · Fecha: ${new Date().toLocaleString()}</p>
    <div class="grid">
      <div class="card"><h2>Total aprobadas</h2><strong>${totalPassed}</strong></div>
      <div class="card"><h2>Total fallidas</h2><strong>${totalFailed}</strong></div>
      <div class="card"><h2>Pruebas ejecutadas</h2><strong>${totalPassed + totalFailed}</strong></div>
      <div class="card"><h2>Tasa de éxito</h2><strong>${successRate}%</strong></div>
    </div>
  </div>

  ${sections.map(s => `
    <div class="card">
      <h2>${s.name}
        <span class="badge ok">Aprobadas: ${s.passed}</span>
        <span class="badge fail">Fallidas: ${s.failed}</span>
      </h2>
      <details>
        <summary class="muted">Ver salida completa</summary>
        <pre>${s.raw.replace(/[<>]/g, m => ({'<':'&lt;','>':'&gt;'}[m]))}</pre>
      </details>
    </div>
  `).join('\n')}

  <div class="card">
    <h2>Capturas de pantalla</h2>
    <p class="muted">Las imágenes se guardan en <code>tests/screenshots</code></p>
  </div>

  <div class="muted">Generado automáticamente por Selenium Runner</div>
</body>
</html>`;

  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`📄 Reporte HTML generado: ${htmlPath}`);
  
  process.exit(totalFailed > 0 ? 1 : 0);
}

runAllTests();
