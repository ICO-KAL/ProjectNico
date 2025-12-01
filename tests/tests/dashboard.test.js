import { createDriver, login, waitForElement, takeScreenshot, By } from '../helpers/testHelpers.js';

async function testDashboard() {
  const driver = await createDriver();
  let testsPassed = 0;
  let testsFailed = 0;

  try {
    console.log('🧪 Starting Dashboard Tests...\n');

    // Login first
    await login(driver);

    // Test 1: Dashboard title
    console.log('Test 1: Dashboard page loads correctly');
    await waitForElement(driver, 'h1');
    const title = await driver.findElement(By.css('h1')).getText();
    
    if (title.includes('NICO') || title.includes('Dashboard')) {
      console.log('✅ PASS: Dashboard page loaded correctly');
      testsPassed++;
    } else {
      console.log('❌ FAIL: Dashboard page not loaded correctly');
      testsFailed++;
    }

    // Test 2: Stats cards visible
    console.log('\nTest 2: Stats cards are visible');
    const statsCards = await driver.findElements(By.css('.card'));
    
    if (statsCards.length >= 4) {
      console.log(`✅ PASS: Found ${statsCards.length} stats cards`);
      testsPassed++;
    } else {
      console.log(`❌ FAIL: Expected 4+ stats cards, found ${statsCards.length}`);
      testsFailed++;
    }

    // Test 3: Navigation menu
    console.log('\nTest 3: Navigation menu works');
    const navLinks = await driver.findElements(By.css('nav a'));
    
    if (navLinks.length >= 4) {
      console.log(`✅ PASS: Navigation has ${navLinks.length} links`);
      testsPassed++;
    } else {
      console.log('❌ FAIL: Navigation incomplete');
      testsFailed++;
    }

    // Test 4: Active sprint section
    console.log('\nTest 4: Active sprint section exists');
    const sprintSection = await driver.findElements(By.xpath("//*[contains(text(), 'Sprint Activo')]"));
    
    if (sprintSection.length > 0) {
      console.log('✅ PASS: Active sprint section found');
      testsPassed++;
    } else {
      console.log('❌ FAIL: Active sprint section not found');
      testsFailed++;
    }

    await takeScreenshot(driver, 'dashboard-complete');

  } catch (error) {
    console.error('❌ Test Error:', error.message);
    await takeScreenshot(driver, 'dashboard-error');
    testsFailed++;
  } finally {
    await driver.quit();
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 DASHBOARD TEST RESULTS');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);
    console.log('='.repeat(50));
  }
}

testDashboard();
