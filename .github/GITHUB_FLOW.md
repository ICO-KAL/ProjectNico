# GitHub Flow - Guía de Trabajo

## Principios de GitHub Flow

Este proyecto sigue **GitHub Flow**, un flujo de trabajo simple y efectivo para desarrollo ágil.

### Rama Principal

- **`main`** - Rama de producción (siempre estable y desplegable)

### Ramas de Trabajo

Todas las nuevas funcionalidades y correcciones se desarrollan en ramas específicas:

- `feature/nombre-funcionalidad` - Nuevas características
- `bugfix/nombre-error` - Corrección de errores
- `hotfix/nombre-urgente` - Correcciones urgentes de producción
- `docs/nombre-documentacion` - Cambios en documentación

## Workflow Completo

### 1️⃣ Crear una Rama

```bash
# Actualizar main
git checkout main
git pull origin main

# Crear nueva rama
git checkout -b feature/nueva-funcionalidad
```

### 2️⃣ Desarrollar y Commitear

```bash
# Hacer cambios en el código

# Ver estado
git status

# Añadir cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: implementar nueva funcionalidad de login"
```

#### Formato de Commits (Conventional Commits)

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de error
- `docs:` - Cambios en documentación
- `style:` - Formato, espacios, etc.
- `refactor:` - Refactorización de código
- `test:` - Añadir o modificar pruebas
- `chore:` - Mantenimiento, dependencias

### 3️⃣ Subir Cambios

```bash
# Subir rama al repositorio remoto
git push origin feature/nueva-funcionalidad
```

### 4️⃣ Crear Pull Request

1. Ve a GitHub.com
2. Haz clic en "Compare & pull request"
3. Completa la información:
 - **Título**: Descripción clara (sigue Conventional Commits)
 - **Descripción**: Explica los cambios realizados
 - **Reviewers**: Asigna revisores
 - **Labels**: Añade etiquetas relevantes

#### Template de Pull Request

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Nueva funcionalidad (feature)
- [ ] Corrección de error (bugfix)
- [ ] Cambio que rompe compatibilidad (breaking change)
- [ ] Documentación

## Checklist
- [ ] Mi código sigue las convenciones del proyecto
- [ ] He añadido pruebas unitarias
- [ ] He actualizado la documentación
- [ ] Todas las pruebas pasan exitosamente
- [ ] No hay conflictos con main

## Pruebas Realizadas
Describe las pruebas realizadas.

## Screenshots (si aplica)
Añade capturas de pantalla si hay cambios visuales.
```

### 5️⃣ Code Review

El equipo revisa tu código:
- Aprobar cambios
- Comentar sugerencias
- Solicitar cambios

### 6️⃣ Realizar Cambios si es Necesario

```bash
# Hacer ajustes basados en review
git add .
git commit -m "fix: corregir validación según review"
git push origin feature/nueva-funcionalidad
```

### 7️⃣ Merge a Main

Una vez aprobado:
1. Asegúrate que todas las pruebas pasen 
2. Haz "Squash and merge" o "Merge pull request"
3. Elimina la rama después del merge

```bash
# Localmente, actualiza main
git checkout main
git pull origin main

# Elimina la rama local
git branch -d feature/nueva-funcionalidad
```

## Hotfixes (Correcciones Urgentes)

Para bugs críticos en producción:

```bash
# Crear hotfix desde main
git checkout main
git checkout -b hotfix/corregir-bug-critico

# Hacer cambios y commit
git add .
git commit -m "hotfix: corregir error crítico en autenticación"

# Push y crear PR inmediato
git push origin hotfix/corregir-bug-critico
```

## ️ Protección de Ramas

La rama `main` está protegida con:
- Requiere aprobación de Pull Request
- Pruebas automatizadas deben pasar
- No permite push directo
- Requiere que la rama esté actualizada

## CI/CD Automatizado

Cada push y PR ejecuta:
- Pruebas unitarias (Jest)
- Pruebas de integración
- Pruebas E2E con Selenium
- Auditoría de seguridad
- Build del proyecto

## Branch Strategy Visual

```
main (producción)
 |
 |-- feature/login-oauth
 | |
 | |-- commits...
 | |
 | `-- PR → merge
 |
 |-- feature/dashboard-charts
 | |
 | `-- PR → merge
 |
 |-- hotfix/security-patch
 |
 `-- PR urgente → merge
```

## Mejores Prácticas

1. **Commits pequeños y frecuentes**: Mejor muchos commits pequeños que uno grande
2. **Mensajes descriptivos**: Explica QUÉ y POR QUÉ
3. **Actualiza frecuentemente**: Mantén tu rama al día con main
4. **Prueba localmente**: Antes de hacer push, asegúrate que todo funciona
5. **Revisa tu propio código**: Antes de pedir review
6. **Responde rápido**: A los comentarios en tus PRs
7. **Documenta cambios**: Actualiza README si es necesario

## Comandos Útiles

```bash
# Ver historial de commits
git log --oneline --graph

# Ver diferencias
git diff

# Deshacer último commit (manteniendo cambios)
git reset --soft HEAD~1

# Actualizar rama con cambios de main
git checkout feature/mi-rama
git merge main

# Ver ramas remotas
git branch -r

# Limpiar ramas eliminadas
git fetch --prune
```

## ¿Necesitas Ayuda?

- Lee la documentación del proyecto
- Pregunta al equipo en Slack/Discord
- Reporta problemas en GitHub Issues

---

**Recuerda**: GitHub Flow es simple - crea una rama, haz cambios, abre un PR, revisa, merge. ¡Así de fácil! 
