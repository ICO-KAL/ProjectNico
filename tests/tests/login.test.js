import { createDriver, login, waitForElement, takeScreenshot, BASE_URL, By, until } from '../helpers/testHelpers.js';

async function testLogin() {
  const driver = await createDriver();
  let testsPassed = 0;
  let testsFailed = 0;
  const testResults = [];

  try {
    console.log('🚀 ========================================');
    console.log('🧪 INICIANDO PRUEBAS DE SELENIUM - LOGIN');
    console.log('========================================\n');
    console.log('📍 URL de prueba:', BASE_URL);
    console.log('🌐 Navegador: Google Chrome (Headless)');
    console.log('⏰ Timeout: 10 segundos\n');

    // Test 1: Page loads correctly
    console.log('Test 1: Login page loads correctly');
    await driver.get(`${BASE_URL}/login`);
    await waitForElement(driver, 'h1');
    const title = await driver.findElement(By.css('h1')).getText();
    
    if (title.includes('NICO')) {
      console.log('✅ PASS: Login page loads with correct title');
      testsPassed++;
    } else {
      console.log('❌ FAIL: Login page title incorrect');
      testsFailed++;
    }

    // Test 2: Form elements exist
    console.log('\nTest 2: Form elements exist');
    const usernameInput = await driver.findElement(By.css('input[type="text"]'));
    const passwordInput = await driver.findElement(By.css('input[type="password"]'));
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    
    if (usernameInput && passwordInput && loginButton) {
      console.log('✅ PASS: All form elements present');
      testsPassed++;
    } else {
      console.log('❌ FAIL: Form elements missing');
      testsFailed++;
    }

    // Test 3: Successful login
    console.log('\nTest 3: Successful login');
    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('admin');
    await takeScreenshot(driver, 'login-before-submit');
    await loginButton.click();
    
    await driver.wait(until.urlIs(`${BASE_URL}/`), 10000);
    const currentUrl = await driver.getCurrentUrl();
    
    if (currentUrl === `${BASE_URL}/`) {
      console.log('✅ PASS: Successfully logged in and redirected');
      testsPassed++;
      await takeScreenshot(driver, 'login-success');
    } else {
      console.log('❌ FAIL: Login redirect failed');
      testsFailed++;
    }

    // Test 4: Dashboard loads after login
    console.log('\nTest 4: Dashboard loads after login');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for redirect
    const dashboardUrl = await driver.getCurrentUrl();
    
    if (dashboardUrl === BASE_URL + '/' || dashboardUrl === BASE_URL + '/dashboard' || dashboardUrl === BASE_URL) {
      console.log('✅ PASS: Dashboard loaded successfully');
      testsPassed++;
    } else {
      console.log('❌ FAIL: Dashboard not loaded');
      testsFailed++;
    }

  } catch (error) {
    console.error('❌ Test Error:', error.message);
    await takeScreenshot(driver, 'login-error');
    testsFailed++;
  } finally {
    await driver.quit();
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 LOGIN TEST RESULTS');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);
    console.log('='.repeat(50));
  }
}

testLogin();
