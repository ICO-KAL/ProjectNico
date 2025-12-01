# Sistema de Gestión de Tareas - NICO

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Tests](https://img.shields.io/badge/tests-passing-success.svg)

Sistema completo de gestión de tareas con metodología Scrum, desarrollado con tecnologías modernas y mejores prácticas.

[ Inicio Rápido](QUICKSTART.md) • [ Documentación](API_DOCUMENTATION.md) • [ Contribuir](CONTRIBUTING.md) • [ GitHub Flow](.github/GITHUB_FLOW.md)

</div>

---

## Características Principales

<table>
<tr>
<td width="50%">

### Gestión Visual
- **Tablero Kanban** con drag & drop
- **Dashboard** con métricas en tiempo real
- **Sprints** con seguimiento ágil
- **Filtros avanzados** de búsqueda

</td>
<td width="50%">

### Diseño Moderno
- **Interfaz intuitiva** y responsiva
- **Animaciones suaves**
- **Tailwind CSS** para estilizado
- **Mobile-first** design

</td>
</tr>
<tr>
<td width="50%">

### Seguridad
- **Autenticación JWT**
- **Validación de datos**
- **Protección de rutas**
- **Auditoría de seguridad**

</td>
<td width="50%">

### Testing Robusto
- **Pruebas unitarias** (Jest)
- **Pruebas de integración**
- **Pruebas E2E** (Selenium)
- **CI/CD automatizado**

</td>
</tr>
</table>

## Tecnologías

### Frontend
- ️ **React 18** - Biblioteca UI
- **Vite** - Build tool ultra rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Zustand** - Gestión de estado
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos modernos

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **Express Validator** - Validación

### Testing & DevOps
- **Jest** - Testing framework
- **React Testing Library** - Testing de componentes
- **Selenium WebDriver** - Pruebas E2E
- **GitHub Actions** - CI/CD
- **Supertest** - Testing de APIs

## Estructura del Proyecto

```
GestionDeTareas/
│
├── frontend/ # Aplicación React
│ ├── src/
│ │ ├── components/ # Componentes reutilizables
│ │ ├── pages/ # Páginas principales
│ │ ├── services/ # API calls
│ │ ├── store/ # Estado global (Zustand)
│ │ └── test/ # Pruebas unitarias
│ ├── index.html
│ ├── vite.config.js
│ └── tailwind.config.js
│
├── backend/ # API REST
│ ├── src/
│ │ ├── routes/ # Rutas de API
│ │ ├── database.js # Gestión de datos JSON
│ │ └── server.js # Servidor Express
│ └── __tests__/ # Pruebas unitarias
│
├── database/ # Base de datos JSON
│ ├── tasks.json # Tareas
│ ├── users.json # Usuarios
│ └── sprints.json # Sprints
│
├── tests/ # Pruebas E2E
│ ├── helpers/ # Utilidades de testing
│ ├── tests/ # Tests con Selenium
│ └── screenshots/ # Capturas de errores
│
├── .github/ # GitHub Config
│ ├── workflows/ # CI/CD pipelines
│ ├── ISSUE_TEMPLATE/ # Templates de issues
│ └── PULL_REQUEST_TEMPLATE.md # Template de PRs
│
└── Documentación
 ├── README.md # Este archivo
 ├── QUICKSTART.md # Inicio rápido
 ├── CONTRIBUTING.md # Guía de contribución
 ├── API_DOCUMENTATION.md # Docs de API
 ├── DESIGN_GUIDE.md # Guía de diseño
 └── CHANGELOG.md # Historial de cambios
```

## Inicio Rápido

### Requisitos Previos
- Node.js 18+ ([Descargar](https://nodejs.org/))
- Git ([Descargar](https://git-scm.com/))

### Instalación Automática

```bash
# 1. Clonar el repositorio
git clone https://github.com/ICO-KAL/ProjectNico.git
cd ProjectNico

# 2. Ejecutar script de instalación
node setup.js

# 3. Iniciar servidores
npm run dev
```

### Instalación Manual

<details>
<summary>Ver pasos manuales</summary>

```bash
# 1. Instalar dependencias del backend
cd backend
npm install

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Instalar dependencias del frontend
cd ../frontend
npm install

# 4. Instalar dependencias de tests
cd ../tests
npm install

# 5. Volver a la raíz e iniciar
cd ..
npm run dev
```

</details>

### Acceder a la Aplicación

Una vez iniciado, abre tu navegador en:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

** Credenciales de Demo:**
```
Usuario: admin
Contraseña: cualquiera (acepta cualquier contraseña)
```

## Ejecutar Pruebas

### Pruebas Unitarias

```bash
# Backend (Jest + Supertest)
cd backend
npm test

# Frontend (Vitest + React Testing Library)
cd frontend
npm test

# Con cobertura
npm test -- --coverage
```

### Pruebas E2E (Selenium)

```bash
# Asegúrate de tener backend y frontend corriendo
cd tests
npm run test:e2e

# Pruebas individuales
npm run test:login
npm run test:dashboard
npm run test:kanban
```

## Documentación Completa

| Documento | Descripción |
|-----------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | Guía de inicio rápido (5 minutos) |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Documentación completa de la API REST |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Cómo contribuir al proyecto |
| [GITHUB_FLOW.md](.github/GITHUB_FLOW.md) | Flujo de trabajo con Git |
| [DESIGN_GUIDE.md](DESIGN_GUIDE.md) | Guía de diseño y componentes |
| [CHANGELOG.md](CHANGELOG.md) | Historial de versiones |

## GitHub Flow

Este proyecto sigue **GitHub Flow** para un desarrollo ágil y colaborativo:

```
main (producción) ─┬─ feature/nueva-funcionalidad ──→ PR ──→ Merge
 ├─ bugfix/corregir-error ────────→ PR ──→ Merge
 └─ hotfix/urgente ───────────────→ PR ──→ Merge
```

**Proceso:**
1. Crear rama desde `main`
2. Desarrollar feature
3. Escribir tests
4. Push y crear Pull Request
5. Code review
6. Merge a `main`
7. Deploy automático

[ Leer guía completa de GitHub Flow](.github/GITHUB_FLOW.md)

## CI/CD Pipeline

Cada push y PR ejecuta automáticamente:

- **Lint** - Verificación de código
- **Tests unitarios** - Backend y Frontend
- **Tests E2E** - Pruebas con Selenium
- **Security audit** - Análisis de vulnerabilidades
- **Build** - Compilación del proyecto
- **Deploy** (solo en `main`)

## Características Detalladas

### Dashboard
- Vista general con métricas clave
- Gráficos de progreso
- Sprint activo
- Tareas recientes
- Distribución de prioridades

### ️ Tablero Kanban
- Tres columnas: Por Hacer, En Progreso, Completadas
- Drag & drop para mover tareas
- Contador de tareas por columna
- Filtrado en tiempo real

### Gestión de Tareas
- CRUD completo de tareas
- Asignación a usuarios
- Prioridades (Alta, Media, Baja)
- Etiquetas personalizables
- Estimación de horas
- Búsqueda y filtros avanzados

### Gestión de Sprints
- Creación y edición de sprints
- Asignación de tareas al sprint
- Métricas y velocidad
- Progreso visual
- Historial de sprints

### Gestión de Usuarios
- Roles (Admin, Scrum Master, Developer)
- Avatares personalizados
- Vista de tareas por usuario
- Autenticación segura

## ️ Scripts Disponibles

### Raíz del Proyecto
```bash
npm run install:all # Instalar todas las dependencias
npm run dev # Iniciar backend y frontend
npm test # Ejecutar todas las pruebas
```

### Backend
```bash
npm run dev # Servidor en modo desarrollo
npm start # Servidor en modo producción
npm test # Ejecutar pruebas
```

### Frontend
```bash
npm run dev # Servidor de desarrollo
npm run build # Build para producción
npm run preview # Preview del build
npm test # Ejecutar pruebas
```

### Tests E2E
```bash
npm run test:e2e # Todas las pruebas E2E
npm run test:login # Solo pruebas de login
npm run test:dashboard # Solo pruebas de dashboard
npm run test:kanban # Solo pruebas de Kanban
```

## Configuración

### Variables de Entorno (Backend)

Crea un archivo `.env` en la carpeta `backend/`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRE=7d
DATABASE_PATH=../database
```

### Configuración del Frontend

El frontend está preconfigurado en `vite.config.js`. El proxy API apunta a `http://localhost:3000`.

## Despliegue

### Opción 1: Vercel (Frontend) + Render (Backend)

**Frontend (Vercel):**
```bash
cd frontend
npm run build
# Subir carpeta dist/ a Vercel
```

**Backend (Render):**
- Conecta tu repositorio
- Build command: `cd backend && npm install`
- Start command: `cd backend && npm start`

### Opción 2: Docker

```bash
# Próximamente: Dockerfile incluido
docker-compose up
```

### Opción 3: VPS (Linux)

```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar y configurar
git clone https://github.com/ICO-KAL/ProjectNico.git
cd ProjectNico
npm run install:all

# Usar PM2 para producción
npm install -g pm2
pm2 start backend/src/server.js --name taskflow-backend
pm2 start "cd frontend && npm run preview" --name taskflow-frontend
pm2 save
```

## Contribuir

¡Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Lee nuestra [Guía de Contribución](CONTRIBUTING.md) para más detalles.

## Roadmap

### Version 1.1 (Próximamente)
- [ ] Migración a PostgreSQL/MongoDB
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] Sistema de notificaciones
- [ ] Modo oscuro (Dark mode)
- [ ] Internacionalización (i18n)

### Version 1.2
- [ ] Adjuntar archivos a tareas
- [ ] Comentarios y menciones
- [ ] Calendario integrado
- [ ] Exportar a PDF/Excel
- [ ] Gráficos de burndown

### Version 2.0
- [ ] Integración con Slack/Discord
- [ ] App móvil (React Native)
- [ ] IA para estimación de tareas
- [ ] Dashboard personalizable
- [ ] Multi-proyecto

## Reportar Problemas

¿Encontraste un bug? [Abre un issue](https://github.com/ICO-KAL/ProjectNico/issues/new?template=bug_report.md)

## Solicitar Funcionalidades

¿Tienes una idea? [Solicita una feature](https://github.com/ICO-KAL/ProjectNico/issues/new?template=feature_request.md)

## Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más información.

## Reconocimientos

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [Selenium](https://www.selenium.dev/)
- [Lucide Icons](https://lucide.dev/)

## Contacto

**Proyecto:** [https://github.com/ICO-KAL/ProjectNico](https://github.com/ICO-KAL/ProjectNico)

**Issues:** [https://github.com/ICO-KAL/ProjectNico/issues](https://github.com/ICO-KAL/ProjectNico/issues)

---

<div align="center">

Hecho con ️ usando React, Node.js y mucho 

⭐ ¡Dale una estrella si te gusta el proyecto!

</div>
