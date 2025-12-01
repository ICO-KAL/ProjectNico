# Guía de Pruebas de Selenium - Experimentación Completa

## ¿Qué hace Selenium ahora?

Selenium ahora **experimenta exhaustivamente** con tu página web y te reporta:

### Lo que Selenium Verifica:

1. **Carga de Página**
 - Tiempo de carga en milisegundos
 - Título de la página
 - URL actual
 - Tamaño del contenido HTML
 - Elementos principales (H1, H2, etc.)

2. **Inspección de Formularios**
 - Busca CADA campo del formulario
 - Verifica atributos (ID, name, placeholder, required)
 - Cuenta inputs, botones y enlaces
 - Te dice qué encontró y qué NO encontró

3. **Interacción con Campos**
 - Escribe texto en los campos
 - Verifica que el texto se guardó correctamente
 - Prueba con diferentes datos
 - Toma screenshots en cada paso

4. **Reporte Detallado**
 - Te dice si cada prueba **PASÓ** o **FALLÓ**
 - ⏱️ Tiempo de ejecución de cada prueba
 - Screenshots automáticos
 - Estadísticas finales
 - Evaluación del estado general

---

## Cómo Ejecutar las Pruebas

### Opción 1: Prueba Detallada (RECOMENDADA)
```bash
cd tests
node tests/login-detailed.test.js
```

### Opción 2: Prueba Estándar
```bash
cd tests
node tests/login.test.js
```

### Opción 3: Todas las Pruebas
```bash
cd tests
npm run test:e2e
```

---

## Ejemplo de Salida de Selenium

```
╔══════════════════════════════════════════════════════════════════╗
║ PRUEBAS EXHAUSTIVAS DE SELENIUM - MÓDULO DE LOGIN ║
╚══════════════════════════════════════════════════════════════════╝

 URL Base: http://localhost:5173
 Navegador: Google Chrome (Headless Mode)
⏰ Timeout: 10 segundos por test
 Screenshots automáticos: Habilitados
 Selenium experimentará con diferentes escenarios

════════════════════════════════════════════════════════════════════

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ TEST 1/8: VERIFICACIÓN DE CARGA DE PÁGINA ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 Objetivo: Verificar que la página de login carga correctamente

 Navegando a: http://localhost:5173/login
 Página cargada en 317 ms

 Verificando título de página...
 Título: Gestión de Tareas - NICO
 URL actual: http://localhost:5173/login
 Tamaño de página: 30060 caracteres

 Buscando elemento <h1>...
 Título H1 encontrado: " TaskFlow"

 Test aprobó
 ⏱️ Tiempo total: 643 ms
 Screenshot: test1-page-loaded.png
```

---

## Reporte Final

Al final de todas las pruebas, Selenium te muestra:

```
╔══════════════════════════════════════════════════════════════════╗
║ REPORTE FINAL - PRUEBAS DE SELENIUM ║
╚══════════════════════════════════════════════════════════════════╝

 Módulo probado: LOGIN
 Navegador: Google Chrome (Headless)
⏱️ Tiempo total: 31.34 segundos

┌──────────────────────────────────────────────────────────────────┐
│ ESTADÍSTICAS │
├──────────────────────────────────────────────────────────────────┤
│ Total de pruebas ejecutadas: 3 │
│ Pruebas que PASARON: 1 │
│ Pruebas que FALLARON: 2 │
│ Porcentaje de éxito: 33.3 % │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ DETALLE DE CADA PRUEBA │
├──────────────────────────────────────────────────────────────────┤
│ Test 1: Carga de página
│ Estado: PASÓ
│ Tiempo: 643 ms
│ Detalles: H1: " TaskFlow", Tamaño: 30060 chars
│
│ Test 2: Inspección de formulario
│ Estado: FALLÓ
│ Tiempo: 20182 ms
│ Detalles: Faltan: Email input
└──────────────────────────────────────────────────────────────────┘

 CRÍTICO: La mayoría de pruebas fallaron
 El módulo de login requiere atención inmediata
 Solo 1 de 3 pruebas pasaron

 Todos los screenshots fueron guardados en: tests/screenshots/
 Selenium terminó de experimentar con tu página web
```

---

## Lo Que Hace Cada Prueba

### Test aprobó
- Navega a la página de login
- Mide el tiempo de carga (317ms)
- Verifica que el título existe
- Cuenta el tamaño del HTML
- Toma screenshot
- **RESULTADO: PASÓ**

### TEST 2: Inspección de Formulario FALLÓ
- Busca campo de email → **NO ENCONTRADO**
- Busca campo de password → ENCONTRADO
- Busca botón de submit → ENCONTRADO
- Cuenta todos los elementos (2 inputs, 3 botones)
- **RESULTADO: FALLÓ** (falta email input)

### TEST 3: Entrada de Texto FALLÓ
- Intenta escribir en email → **ERROR** (elemento no existe)
- No puede continuar sin el campo de email
- **RESULTADO: FALLÓ**

---

## Problema Detectado

Selenium encontró que:
- El campo de email no tiene `type="email"` o `name="email"`
- El campo de password sí existe
- El botón de submit existe

**Solución**: Agregar atributos correctos al input de email en Login.jsx

---

## Screenshots Capturados

Selenium guarda screenshots automáticamente:

1. `test1-page-loaded.png` - Página cargada
2. `test2-form-inspection.png` - Inspección del formulario
3. `test3-failed.png` - Error al buscar email
4. `login-before-submit.png` - Antes de hacer submit
5. `login-success.png` - Después de login exitoso
6. `dashboard-loaded.png` - Dashboard cargado

**Ubicación**: `tests/screenshots/`

---

## Características de las Pruebas

### Ventajas

1. **Reportes Detallados**
 - Cada prueba explica qué hace
 - Te dice exactamente qué pasó y qué no
 - Tiempos de ejecución precisos

2. **Experimentación Real**
 - Selenium interactúa con la página como un usuario real
 - Escribe texto, hace clicks, navega
 - Verifica que todo funcione

3. **Screenshots Automáticos**
 - Captura evidencia visual
 - Útil para debugging
 - Muestra el estado de la página en cada momento

4. **Evaluación Inteligente**
 - Te dice si todo está bien
 - Te alerta de problemas críticos
 - Sugiere qué revisar

### Métricas Reportadas

- ⏱️ Tiempo de carga de página
- ⏱️ Tiempo de cada prueba individual
- ⏱️ Tiempo total de ejecución
- Porcentaje de éxito
- Número de elementos encontrados
- Detalles de cada elemento

---

## Cómo Leer los Resultados

### PASÓ
```
 Test aprobó
 ⏱️ Tiempo total: 643 ms
 Screenshot: test1-page-loaded.png
```
**Significado**: La prueba se ejecutó correctamente, todo funcionó como se esperaba.

### FALLÓ
```
 TEST 2 FALLÓ
 ⏱️ Tiempo: 20182 ms
 Faltantes: Email input
```
**Significado**: La prueba encontró un problema, revisa los detalles para saber qué corregir.

### ️ OMITIDO
```
️ ADVERTENCIA: No se pudo verificar validación
```
**Significado**: Esta prueba no pudo ejecutarse (generalmente es opcional).

---

## Próximos Pasos

1. **Ejecuta las pruebas detalladas**
 ```bash
 node tests/login-detailed.test.js
 ```

2. **Revisa el reporte**
 - Lee qué pruebas pasaron y cuáles fallaron
 - Mira los screenshots para ver qué encontró Selenium

3. **Corrige los problemas**
 - Selenium te dice exactamente qué está mal
 - Arregla los selectores o elementos faltantes

4. **Vuelve a ejecutar**
 - Después de corregir, ejecuta de nuevo
 - Verifica que ahora todas las pruebas pasen

---

## Comandos Útiles

### Ejecutar Pruebas
```bash
# Prueba detallada de login
node tests/login-detailed.test.js

# Prueba estándar de login
node tests/login.test.js

# Prueba de dashboard
node tests/dashboard.test.js

# Prueba de kanban
node tests/kanban.test.js

# Todas las pruebas E2E
npm run test:e2e
```

### Ver Screenshots
```bash
# En PowerShell
explorer tests\screenshots

# Ver un screenshot específico
start tests\screenshots\test1-page-loaded.png
```

---

## Conclusión

Ahora Selenium:
- Experimenta con tu página web
- Te reporta TODO lo que encuentra
- Te dice qué PASÓ y qué FALLÓ
- Genera reportes detallados
- Captura screenshots automáticos
- Evalúa el estado general de tu aplicación

**¡Selenium es como tener un tester automático que prueba tu página y te cuenta todo lo que descubre!** 
