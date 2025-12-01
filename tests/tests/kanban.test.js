import { createDriver, login, waitForElement, takeScreenshot, BASE_URL, By } from '../helpers/testHelpers.js';

async function testKanban() {
  const driver = await createDriver();
  let testsPassed = 0;
  let testsFailed = 0;

  try {
    console.log('🧪 Starting Kanban Board Tests...\n');

    await login(driver);

    // Navigate to Kanban
    console.log('Test 1: Navigate to Kanban board');
    await driver.get(`${BASE_URL}/kanban`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for page load
    const currentUrl = await driver.getCurrentUrl();
    
    if (currentUrl.includes('/kanban')) {
      console.log('✅ PASS: Navigated to Kanban board');
      testsPassed++;
    } else {
      console.log('❌ FAIL: Failed to navigate to Kanban');
      testsFailed++;
    }

    // Test 2: Three columns exist
    console.log('\nTest 2: Three Kanban columns exist');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for data load
    const columns = await driver.findElements(By.xpath("//*[contains(text(), 'Por Hacer') or contains(text(), 'En Progreso') or contains(text(), 'Completadas')]"));
    
    if (columns.length >= 3) {
      console.log('✅ PASS: All three Kanban columns found');
      testsPassed++;
    } else {
      console.log(`❌ FAIL: Expected 3 columns, found ${columns.length}`);
      testsFailed++;
    }

    // Test 3: Task cards visible
    console.log('\nTest 3: Task cards are visible');
    const taskCards = await driver.findElements(By.css('.card'));
    
    if (taskCards.length > 0) {
      console.log(`✅ PASS: Found ${taskCards.length} task cards`);
      testsPassed++;
    } else {
      console.log('❌ FAIL: No task cards found');
      testsFailed++;
    }

    // Test 4: New task button exists
    console.log('\nTest 4: New task button exists');
    const newTaskButtons = await driver.findElements(By.xpath("//*[contains(text(), 'Nueva Tarea')]"));
    
    if (newTaskButtons.length > 0) {
      console.log('✅ PASS: New task button found');
      testsPassed++;
    } else {
      console.log('❌ FAIL: New task button not found');
      testsFailed++;
    }

    await takeScreenshot(driver, 'kanban-board');

  } catch (error) {
    console.error('❌ Test Error:', error.message);
    await takeScreenshot(driver, 'kanban-error');
    testsFailed++;
  } finally {
    await driver.quit();
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 KANBAN TEST RESULTS');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);
    console.log('='.repeat(50));
  }
}

testKanban();
