import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const BASE_URL = 'http://localhost:5173';
const TIMEOUT = 10000;

export async function createDriver() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1920,1080');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  await driver.manage().setTimeouts({ implicit: TIMEOUT });
  return driver;
}

export async function login(driver, username = 'admin', password = 'admin') {
  await driver.get(`${BASE_URL}/login`);
  
  await driver.wait(until.elementLocated(By.css('input[type="text"]')), TIMEOUT);
  
  const usernameInput = await driver.findElement(By.css('input[type="text"]'));
  const passwordInput = await driver.findElement(By.css('input[type="password"]'));
  const loginButton = await driver.findElement(By.css('button[type="submit"]'));

  await usernameInput.sendKeys(username);
  await passwordInput.sendKeys(password);
  await loginButton.click();

  // Wait for redirect to dashboard
  await driver.wait(until.urlIs(`${BASE_URL}/`), TIMEOUT);
}

export async function waitForElement(driver, selector, timeout = TIMEOUT) {
  return await driver.wait(until.elementLocated(By.css(selector)), timeout);
}

export async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  const fs = await import('fs');
  const path = await import('path');
  const { fileURLToPath } = await import('url');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const screenshotPath = path.join(__dirname, '../screenshots', `${name}.png`);
  fs.writeFileSync(screenshotPath, screenshot, 'base64');
  console.log(`📸 Screenshot saved: ${name}.png`);
}

export { BASE_URL, TIMEOUT, By, until };
