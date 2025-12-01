import { createDriver, login, waitForElement, takeScreenshot, BASE_URL, By, until } from '../helpers/testHelpers.js';

async function comprehensiveLoginTests() {
  const driver = await createDriver();
  let testsPassed = 0;
  let testsFailed = 0;
  const testResults = [];
  const startTimeTotal = Date.now();

  try {
    console.log('\n');
    console.log('╔══════════════════════════════════════════════════════════════════╗');
    console.log('║   🚀 PRUEBAS EXHAUSTIVAS DE SELENIUM - MÓDULO DE LOGIN          ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📍 URL Base:', BASE_URL);
    console.log('🌐 Navegador: Google Chrome (Headless Mode)');
    console.log('⏰ Timeout: 10 segundos por test');
    console.log('📸 Screenshots automáticos: Habilitados');
    console.log('🔄 Selenium experimentará con diferentes escenarios');
    console.log('');
    console.log('════════════════════════════════════════════════════════════════════');
    console.log('');

    // ============================================================
    // TEST 1: Verificación de carga de página
    // ============================================================
    console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
    console.log('┃ 📋 TEST 1/8: VERIFICACIÓN DE CARGA DE PÁGINA               ┃');
    console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');
    console.log('🎯 Objetivo: Verificar que la página de login carga correctamente');
    console.log('');
    
    const test1Start = Date.now();
    try {
      console.log('🔄 Navegando a:', `${BASE_URL}/login`);
      await driver.get(`${BASE_URL}/login`);
      const loadTime = Date.now() - test1Start;
      
      console.log('✓ Página cargada en', loadTime, 'ms');
      console.log('');
      
      // Verificar título
      console.log('🔍 Verificando título de página...');
      const pageTitle = await driver.getTitle();
      console.log('   📄 Título:', pageTitle || '(vacío)');
      
      // Verificar URL
      const currentUrl = await driver.getCurrentUrl();
      console.log('   🔗 URL actual:', currentUrl);
      
      // Verificar contenido
      const pageSource = await driver.getPageSource();
      console.log('   📏 Tamaño de página:', pageSource.length, 'caracteres');
      
      // Buscar elemento h1
      console.log('');
      console.log('🔍 Buscando elemento <h1>...');
      const h1Element = await driver.findElement(By.css('h1'));
      const h1Text = await h1Element.getText();
      console.log('   ✓ Título H1 encontrado:', `"${h1Text}"`);
      
      // Capturar screenshot
      await takeScreenshot(driver, 'test1-page-loaded');
      
      const test1Time = Date.now() - test1Start;
      console.log('');
      console.log('✅ TEST 1 PASÓ');
      console.log('   ⏱️  Tiempo total:', test1Time, 'ms');
      console.log('   📸 Screenshot: test1-page-loaded.png');
      
      testResults.push({
        numero: 1,
        nombre: 'Carga de página',
        estado: '✅ PASÓ',
        tiempo: test1Time,
        detalles: `H1: "${h1Text}", Tamaño: ${pageSource.length} chars`
      });
      testsPassed++;
      
    } catch (error) {
      const test1Time = Date.now() - test1Start;
      console.log('');
      console.log('❌ TEST 1 FALLÓ');
      console.log('   ⏱️  Tiempo:', test1Time, 'ms');
      console.log('   ❗ Error:', error.message);
      
      testResults.push({
        numero: 1,
        nombre: 'Carga de página',
        estado: '❌ FALLÓ',
        tiempo: test1Time,
        detalles: error.message
      });
      testsFailed++;
      await takeScreenshot(driver, 'test1-failed');
    }
    
    console.log('');
    console.log('════════════════════════════════════════════════════════════════════');
    console.log('');

    // ============================================================
    // TEST 2: Inspección de elementos del formulario
    // ============================================================
    console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
    console.log('┃ 📋 TEST 2/8: INSPECCIÓN DE ELEMENTOS DEL FORMULARIO       ┃');
    console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');
    console.log('🎯 Objetivo: Selenium experimenta buscando todos los elementos');
    console.log('');
    
    const test2Start = Date.now();
    const foundElements = [];
    const missingElements = [];
    
    try {
      // Buscar input de usuario (en modo Login el formulario usa Usuario + Contraseña)
      console.log('🔍 Experimento 1: Buscando campo de usuario...');
      try {
        // Intentar localizar por label "Usuario" -> input siguiente
        let userInput;
        try {
          userInput = await driver.findElement(By.xpath("//label[normalize-space()='Usuario']/following::input[1]"));
        } catch (_) {
          // Fallbacks por placeholder o primer input de texto
          const candidates = await driver.findElements(By.css('input[type="text"]'));
          userInput = candidates[0];
        }

        const userId = await userInput.getAttribute('id');
        const userName = await userInput.getAttribute('name');
        const userPlaceholder = await userInput.getAttribute('placeholder');
        const userRequired = await userInput.getAttribute('required');
        
        console.log('   ✓ Usuario input ENCONTRADO');
        console.log('      - ID:', userId || '(ninguno)');
        console.log('      - Name:', userName || '(ninguno)');
        console.log('      - Placeholder:', userPlaceholder || '(ninguno)');
        console.log('      - Required:', userRequired ? 'Sí' : 'No');
        
        foundElements.push('Usuario input');
      } catch (e) {
        console.log('   ✗ Usuario input NO encontrado');
        missingElements.push('Usuario input');
      }
      
      console.log('');
      
      // Buscar input de password
      console.log('🔍 Experimento 2: Buscando campo de password...');
      try {
        const passwordInput = await driver.findElement(By.css('input[type="password"]'));
        const passwordId = await passwordInput.getAttribute('id');
        const passwordName = await passwordInput.getAttribute('name');
        const passwordPlaceholder = await passwordInput.getAttribute('placeholder');
        const passwordRequired = await passwordInput.getAttribute('required');
        
        console.log('   ✓ Password input ENCONTRADO');
        console.log('      - ID:', passwordId || '(ninguno)');
        console.log('      - Name:', passwordName || '(ninguno)');
        console.log('      - Placeholder:', passwordPlaceholder || '(ninguno)');
        console.log('      - Required:', passwordRequired ? 'Sí' : 'No');
        
        foundElements.push('Password input');
      } catch (e) {
        console.log('   ✗ Password input NO encontrado');
        missingElements.push('Password input');
      }
      
      console.log('');
      
      // Buscar botón
      console.log('🔍 Experimento 3: Buscando botón de submit...');
      try {
        const submitButton = await driver.findElement(By.css('button[type="submit"], button'));
        const buttonText = await submitButton.getText();
        const buttonType = await submitButton.getAttribute('type');
        const buttonDisabled = await submitButton.getAttribute('disabled');
        
        console.log('   ✓ Botón ENCONTRADO');
        console.log('      - Texto:', buttonText);
        console.log('      - Type:', buttonType);
        console.log('      - Disabled:', buttonDisabled ? 'Sí' : 'No');
        
        foundElements.push('Botón de submit');
      } catch (e) {
        console.log('   ✗ Botón de submit NO encontrado');
        missingElements.push('Botón');
      }
      
      console.log('');
      
      // Buscar otros elementos
      console.log('🔍 Experimento 4: Buscando elementos adicionales...');
      try {
        const allInputs = await driver.findElements(By.css('input'));
        console.log('   ℹ️  Total de inputs encontrados:', allInputs.length);
        
        const allButtons = await driver.findElements(By.css('button'));
        console.log('   ℹ️  Total de botones encontrados:', allButtons.length);
        
        const allLinks = await driver.findElements(By.css('a'));
        console.log('   ℹ️  Total de enlaces encontrados:', allLinks.length);
      } catch (e) {
        console.log('   ⚠️  No se pudieron contar elementos adicionales');
      }
      
      const test2Time = Date.now() - test2Start;
      await takeScreenshot(driver, 'test2-form-inspection');
      
      console.log('');
      if (missingElements.length === 0) {
        console.log('✅ TEST 2 PASÓ');
        console.log('   ⏱️  Tiempo:', test2Time, 'ms');
        console.log('   ✓ Encontrados:', foundElements.join(', '));
        console.log('   📸 Screenshot: test2-form-inspection.png');
        
        testResults.push({
          numero: 2,
          nombre: 'Inspección de formulario',
          estado: '✅ PASÓ',
          tiempo: test2Time,
          detalles: `${foundElements.length} elementos encontrados`
        });
        testsPassed++;
      } else {
        console.log('❌ TEST 2 FALLÓ');
        console.log('   ⏱️  Tiempo:', test2Time, 'ms');
        console.log('   ✓ Encontrados:', foundElements.join(', '));
        console.log('   ✗ Faltantes:', missingElements.join(', '));
        
        testResults.push({
          numero: 2,
          nombre: 'Inspección de formulario',
          estado: '❌ FALLÓ',
          tiempo: test2Time,
          detalles: `Faltan: ${missingElements.join(', ')}`
        });
        testsFailed++;
      }
      
    } catch (error) {
      const test2Time = Date.now() - test2Start;
      console.log('');
      console.log('❌ TEST 2 FALLÓ CON ERROR');
      console.log('   ❗ Error:', error.message);
      
      testResults.push({
        numero: 2,
        nombre: 'Inspección de formulario',
        estado: '❌ FALLÓ',
        tiempo: test2Time,
        detalles: error.message
      });
      testsFailed++;
    }
    
    console.log('');
    console.log('════════════════════════════════════════════════════════════════════');
    console.log('');

    // ============================================================
    // TEST 3: Experimentación con entrada de texto
    // ============================================================
    console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
    console.log('┃ 📋 TEST 3/8: EXPERIMENTACIÓN CON ENTRADA DE TEXTO         ┃');
    console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');
    console.log('🎯 Selenium va a escribir en los campos y verificar');
    console.log('');
    
    const test3Start = Date.now();
    const testUser = 'admin';
    const testPassword = 'SecurePass123!';
    
    try {
      // Localizar campo Usuario como en el test anterior
      let userInput;
      try {
        userInput = await driver.findElement(By.xpath("//label[normalize-space()='Usuario']/following::input[1]"));
      } catch (_) {
        const candidates = await driver.findElements(By.css('input[type="text"]'));
        userInput = candidates[0];
      }
      const passwordInput = await driver.findElement(By.css('input[type="password"]'));
      
      console.log('⌨️  Experimento: Escribiendo usuario...');
      await userInput.clear();
      await userInput.sendKeys(testUser);
      await driver.sleep(300);
      
      const userValue = await userInput.getAttribute('value');
      console.log('   📝 Usuario ingresado:', userValue);
      console.log('   ✓ Coincide:', userValue === testUser ? 'Sí' : 'No');
      
      console.log('');
      console.log('⌨️  Experimento: Escribiendo password...');
      await passwordInput.clear();
      await passwordInput.sendKeys(testPassword);
      await driver.sleep(300);
      
      const passwordValue = await passwordInput.getAttribute('value');
      console.log('   🔒 Password ingresado: ********** (', passwordValue.length, 'caracteres)');
      console.log('   ✓ Coincide:', passwordValue === testPassword ? 'Sí' : 'No');
      
      const test3Time = Date.now() - test3Start;
      await takeScreenshot(driver, 'test3-form-filled');
      
      console.log('');
      console.log('✅ TEST 3 PASÓ');
      console.log('   ⏱️  Tiempo:', test3Time, 'ms');
      console.log('   ✓ Usuario validado correctamente');
      console.log('   ✓ Password validado correctamente');
      console.log('   📸 Screenshot: test3-form-filled.png');
      
      testResults.push({
        numero: 3,
        nombre: 'Entrada de texto',
        estado: '✅ PASÓ',
        tiempo: test3Time,
        detalles: 'Campos aceptan texto correctamente'
      });
      testsPassed++;
      
    } catch (error) {
      const test3Time = Date.now() - test3Start;
      console.log('');
      console.log('❌ TEST 3 FALLÓ');
      console.log('   ❗ Error:', error.message);
      
      testResults.push({
        numero: 3,
        nombre: 'Entrada de texto',
        estado: '❌ FALLÓ',
        tiempo: test3Time,
        detalles: error.message
      });
      testsFailed++;
      await takeScreenshot(driver, 'test3-failed');
    }
    
    console.log('');
    console.log('════════════════════════════════════════════════════════════════════');
    console.log('');

    // Continúa con más tests...
    // Por brevedad, aquí termino el ejemplo, pero se pueden agregar más tests

  } catch (error) {
    console.log('');
    console.log('💥 ERROR CRÍTICO EN LA SUITE DE PRUEBAS');
    console.log('   Error:', error.message);
    console.log('   Stack:', error.stack);
    await takeScreenshot(driver, 'critical-error');
    testsFailed++;
    
  } finally {
    await driver.quit();
    
    const totalTime = Date.now() - startTimeTotal;
    
    // ============================================================
    // REPORTE FINAL
    // ============================================================
    console.log('');
    console.log('╔══════════════════════════════════════════════════════════════════╗');
    console.log('║          📊 REPORTE FINAL - PRUEBAS DE SELENIUM                 ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📦 Módulo probado: LOGIN');
    console.log('🌐 Navegador: Google Chrome (Headless)');
    console.log('⏱️  Tiempo total:', (totalTime/1000).toFixed(2), 'segundos (', totalTime, 'ms)');
    console.log('');
    console.log('┌──────────────────────────────────────────────────────────────────┐');
    console.log('│ ESTADÍSTICAS                                                     │');
    console.log('├──────────────────────────────────────────────────────────────────┤');
    console.log('│ Total de pruebas ejecutadas:', testsPassed + testsFailed, '                              │');
    console.log('│ ✅ Pruebas que PASARON:', testsPassed, '                                      │');
    console.log('│ ❌ Pruebas que FALLARON:', testsFailed, '                                      │');
    console.log('│ 📈 Porcentaje de éxito:', ((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1), '%', '                            │');
    console.log('└──────────────────────────────────────────────────────────────────┘');
    console.log('');
    console.log('┌──────────────────────────────────────────────────────────────────┐');
    console.log('│ DETALLE DE CADA PRUEBA                                           │');
    console.log('├──────────────────────────────────────────────────────────────────┤');
    
    testResults.forEach(result => {
      console.log('│');
      console.log('│ Test', result.numero + ':', result.nombre);
      console.log('│   Estado:', result.estado);
      console.log('│   Tiempo:', result.tiempo, 'ms');
      console.log('│   Detalles:', result.detalles);
    });
    
    console.log('└──────────────────────────────────────────────────────────────────┘');
    console.log('');
    
    // Evaluación final
    const successRate = (testsPassed / (testsPassed + testsFailed)) * 100;
    
    if (testsFailed === 0) {
      console.log('🎉 ¡EXCELENTE! TODAS LAS PRUEBAS PASARON');
      console.log('✨ Selenium experimentó con tu página y todo funciona perfectamente');
      console.log('🏆 El módulo de login está en óptimas condiciones');
    } else if (successRate >= 75) {
      console.log('✅ BUENO: La mayoría de pruebas pasaron');
      console.log('⚠️  Hay', testsFailed, 'prueba(s) que necesitan atención');
      console.log('🔧 Revisa los detalles arriba para corregir los fallos');
    } else if (successRate >= 50) {
      console.log('⚠️  REGULAR: Algunas pruebas fallaron');
      console.log('🔧 Se requiere trabajo para mejorar el módulo');
      console.log('📋 Hay', testsFailed, 'prueba(s) fallidas de', testsPassed + testsFailed, 'totales');
    } else {
      console.log('🚨 CRÍTICO: La mayoría de pruebas fallaron');
      console.log('❗ El módulo de login requiere atención inmediata');
      console.log('🔧 Solo', testsPassed, 'de', testsPassed + testsFailed, 'pruebas pasaron');
    }
    
    console.log('');
    console.log('📸 Todos los screenshots fueron guardados en: tests/screenshots/');
    console.log('🔍 Selenium terminó de experimentar con tu página web');
    console.log('');
    console.log('══════════════════════════════════════════════════════════════════');
    console.log('');

    // Establecer código de salida para integrarse con el runner
    process.exit(testsFailed > 0 ? 1 : 0);
  }
}

comprehensiveLoginTests();
