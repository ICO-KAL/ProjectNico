import { exec } from 'child_process';
import { promisify } from 'util';

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

  for (const test of tests) {
    console.log(`\n📦 Running ${test.name}...`);
    console.log('='.repeat(60));
    
    try {
      const { stdout, stderr } = await execPromise(`node ${test.file}`);
      console.log(stdout);
      
      // Parse results from English or Spanish summaries
      let passMatch = stdout.match(/Passed: (\d+)/);
      let failMatch = stdout.match(/Failed: (\d+)/);
      // Spanish variants from detailed report
      if (!passMatch) passMatch = stdout.match(/Pruebas que PASARON:\s*(\d+)/);
      if (!failMatch) failMatch = stdout.match(/Pruebas que FALLARON:\s*(\d+)/);
      
      if (passMatch) totalPassed += parseInt(passMatch[1]);
      if (failMatch) totalFailed += parseInt(failMatch[1]);
      
      if (stderr) console.error(stderr);
    } catch (error) {
      console.error(`❌ Error running ${test.name}:`, error.message);
      // If process exited with non-zero, assume at least one failure
      totalFailed++;
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
  
  process.exit(totalFailed > 0 ? 1 : 0);
}

runAllTests();
