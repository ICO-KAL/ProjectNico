# Guía de Inicio Rápido

Esta guía te ayudará a tener el proyecto funcionando en menos de 5 minutos.

## Instalación Rápida

### Requisitos Previos
- Node.js 18+ ([Descargar](https://nodejs.org/))
- Git ([Descargar](https://git-scm.com/))

### Paso 1: Clonar Repositorio
```bash
git clone https://github.com/ICO-KAL/ProjectNico.git
cd ProjectNico
```

### Paso 2: Instalar Dependencias
```bash
npm run install:all
```
Esto instalará las dependencias de backend, frontend y tests.

### Paso 3: Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp backend/.env.example backend/.env
```

### Paso 4: Iniciar Servidores
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Paso 5: Abrir Aplicación
Abre tu navegador en: [http://localhost:5173](http://localhost:5173)

**Credenciales de prueba:**
- Usuario: `admin`
- Contraseña: cualquiera

## Ejecutar Pruebas

### Pruebas Unitarias
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

### Pruebas E2E con Selenium
```bash
# Asegúrate de tener backend y frontend corriendo
cd tests
npm install
npm run test:e2e
```

## Estructura del Proyecto

```
├── backend/ # API REST (Node.js + Express)
├── frontend/ # Aplicación web (React + Vite)
├── database/ # Archivos JSON (datos)
├── tests/ # Pruebas E2E (Selenium)
└── .github/ # CI/CD y workflows
```

## Funcionalidades Principales

1. **Dashboard** - Vista general con métricas
2. **Kanban Board** - Gestión visual con drag & drop
3. **Lista de Tareas** - Filtrado y búsqueda avanzada
4. **Sprints** - Planificación y seguimiento ágil

## Comandos Útiles

```bash
# Instalar todas las dependencias
npm run install:all

# Ejecutar backend y frontend simultáneamente
npm run dev

# Ejecutar todas las pruebas
npm test

# Pruebas E2E
npm run test:e2e
```

## Solución de Problemas

### Error: Puerto 3000 o 5173 en uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: Módulos no encontrados
```bash
# Reinstalar dependencias
rm -rf node_modules
npm run install:all
```

## Siguientes Pasos

1. Lee el [README completo](README.md)
2. Revisa la [Guía de GitHub Flow](.github/GITHUB_FLOW.md)
3. Consulta [Cómo Contribuir](CONTRIBUTING.md)
4. Explora el [Changelog](CHANGELOG.md)

## Tips

- Usa `Ctrl/Cmd + K` para búsqueda rápida (próximamente)
- El dashboard se actualiza automáticamente
- Arrastra tareas en el Kanban para cambiar estado
- Los filtros se combinan para búsquedas avanzadas

## ¡Listo!

Ahora tienes el proyecto corriendo. ¡Comienza a explorar! 

---

¿Problemas? [Abre un issue](https://github.com/ICO-KAL/ProjectNico/issues)
