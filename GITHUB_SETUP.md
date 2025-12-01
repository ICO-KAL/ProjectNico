# Guía de Inicialización del Repositorio GitHub

Esta guía te ayudará a conectar este proyecto con tu repositorio de GitHub.

## Pre-requisitos

- Git instalado ([Descargar](https://git-scm.com/))
- Cuenta de GitHub
- Repositorio creado en GitHub: `https://github.com/ICO-KAL/ProjectNico.git`

## Configuración Inicial

### 1. Inicializar Git (si aún no está inicializado)

```bash
# Navega a la carpeta del proyecto
cd "c:\Users\kalco\OneDrive\Desktop\Gestion de Tareas Nico\Github\GestionDeTareas"

# Inicializar repositorio Git
git init
```

### 2. Configurar Usuario Git (si es la primera vez)

```bash
# Configurar nombre
git config --global user.name "Tu Nombre"

# Configurar email (usa el de GitHub)
git config --global user.email "tu-email@ejemplo.com"
```

### 3. Añadir Archivos al Repositorio

```bash
# Ver estado actual
git status

# Añadir todos los archivos
git add .

# Crear primer commit
git commit -m "feat: initial commit - proyecto completo de gestión de tareas"
```

### 4. Conectar con GitHub

```bash
# Añadir repositorio remoto
git remote add origin https://github.com/ICO-KAL/ProjectNico.git

# Verificar que se añadió correctamente
git remote -v
```

### 5. Subir al Repositorio

```bash
# Crear y cambiar a rama main
git branch -M main

# Subir código al repositorio
git push -u origin main
```

## Autenticación con GitHub

Si es tu primera vez subiendo código, GitHub te pedirá autenticación:

### Opción 1: Personal Access Token (Recomendado)

1. Ve a GitHub.com
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token
4. Selecciona scopes: `repo`, `workflow`
5. Copia el token generado
6. Úsalo como contraseña cuando Git te lo pida

### Opción 2: GitHub CLI

```bash
# Instalar GitHub CLI
# Windows: descargar desde https://cli.github.com/

# Autenticar
gh auth login

# Seguir las instrucciones
```

## Configurar GitHub (Después del Push)

### 1. Configurar Branch Protection Rules

En GitHub.com → Tu repositorio → Settings → Branches:

1. Añadir regla para `main`:
 - Require pull request before merging
 - Require status checks to pass
 - Require branches to be up to date
 - Include administrators

### 2. Configurar GitHub Actions

Los workflows ya están en `.github/workflows/`:
- `ci-cd.yml` - Pipeline principal
- `pr-checks.yml` - Validaciones de PR

Las Actions se ejecutarán automáticamente en cada push y PR.

### 3. Configurar Secrets (Opcional)

Para CI/CD avanzado:

Settings → Secrets and variables → Actions → New repository secret

```
JWT_SECRET=tu_secreto_super_seguro_para_produccion
```

### 4. Habilitar Issues y Projects

Settings → General:
- Issues
- Projects
- Preserve this repository

## Trabajar con GitHub Flow

### Crear una Nueva Feature

```bash
# Actualizar main
git checkout main
git pull origin main

# Crear rama de feature
git checkout -b feature/nombre-funcionalidad

# Hacer cambios y commits
git add .
git commit -m "feat: descripción del cambio"

# Subir rama
git push origin feature/nombre-funcionalidad
```

### Crear Pull Request

1. Ve a GitHub.com → Tu repositorio
2. Verás un banner "Compare & pull request"
3. Completa el template de PR
4. Asigna reviewers
5. Espera aprobación
6. Merge cuando esté listo

### Después del Merge

```bash
# Volver a main local
git checkout main

# Actualizar con los cambios mergeados
git pull origin main

# Eliminar rama local
git branch -d feature/nombre-funcionalidad

# Eliminar rama remota (opcional, GitHub lo hace automáticamente)
git push origin --delete feature/nombre-funcionalidad
```

## Comandos Git Útiles

### Ver Estado y Logs

```bash
# Ver estado actual
git status

# Ver historial de commits
git log --oneline --graph --all

# Ver ramas
git branch -a
```

### Deshacer Cambios

```bash
# Deshacer cambios no staged
git checkout -- <archivo>

# Deshacer último commit (manteniendo cambios)
git reset --soft HEAD~1

# Deshacer último commit (eliminando cambios)
git reset --hard HEAD~1
```

### Actualizar Rama con Main

```bash
# Estando en tu feature branch
git checkout feature/mi-rama

# Opción 1: Merge
git merge main

# Opción 2: Rebase (mantiene historial limpio)
git rebase main
```

### Resolver Conflictos

```bash
# Después de un merge con conflictos
# 1. Editar archivos con conflictos manualmente
# 2. Marcar como resueltos
git add <archivo-resuelto>

# 3. Continuar merge/rebase
git merge --continue
# o
git rebase --continue
```

## ️ Etiquetas y Releases

### Crear Tag de Versión

```bash
# Crear tag anotado
git tag -a v1.0.0 -m "Version 1.0.0 - Release inicial"

# Subir tag
git push origin v1.0.0

# Subir todos los tags
git push origin --tags
```

### Crear Release en GitHub

1. Releases → Create a new release
2. Seleccionar tag: v1.0.0
3. Título: Version 1.0.0
4. Descripción: Copiar de CHANGELOG.md
5. Publish release

## GitHub Insights

Explora las métricas de tu repositorio:

- **Pulse**: Actividad reciente
- **Contributors**: Quién ha contribuido
- **Traffic**: Visitas y clones
- **Code frequency**: Líneas añadidas/eliminadas

## ️ Seguridad

### Habilitar Dependabot

Settings → Code security and analysis:
- Dependabot alerts
- Dependabot security updates

### Code Scanning

Settings → Code security and analysis:
- CodeQL analysis

## Extras

### README Badges

Añade badges a tu README para mostrar el estado:

```markdown
![Build](https://github.com/ICO-KAL/ProjectNico/workflows/CI%2FCD%20Pipeline/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)
```

### GitHub Pages

Para documentación estática:

Settings → Pages → Source: gh-pages branch

## Ayuda

### Recursos Útiles

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Comandos de Emergencia

```bash
# Ver ayuda de cualquier comando
git help <comando>

# Ver configuración actual
git config --list

# Limpiar archivos no trackeados
git clean -fd

# Ver diferencias antes de commit
git diff
```

## Checklist Final

- [ ] Repositorio inicializado con git
- [ ] Primer commit realizado
- [ ] Remote origin configurado
- [ ] Código subido a GitHub
- [ ] Branch protection configurado
- [ ] GitHub Actions habilitadas
- [ ] Issues y Projects habilitados
- [ ] README actualizado
- [ ] Dependabot configurado
- [ ] License añadida

---

¡Listo! Tu repositorio está configurado y listo para trabajo colaborativo con GitHub Flow. 

**Siguiente paso:** Lee [GITHUB_FLOW.md](.github/GITHUB_FLOW.md) para el flujo de trabajo completo.
