# Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto! 

## Código de Conducta

- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en lo mejor para la comunidad
- Muestra empatía hacia otros colaboradores

## Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub

# Clonar tu fork
git clone https://github.com/TU-USUARIO/ProjectNico.git
cd ProjectNico
```

### 2. Configurar Entorno

```bash
# Instalar todas las dependencias
npm run install:all

# Copiar variables de entorno
cp backend/.env.example backend/.env

# Iniciar en modo desarrollo
npm run dev
```

### 3. Crear una Rama

```bash
# Actualizar main
git checkout main
git pull origin main

# Crear rama según el tipo de cambio
git checkout -b feature/mi-nueva-funcionalidad
# o
git checkout -b bugfix/corregir-error
```

### 4. Desarrollar

- Escribe código limpio y legible
- Sigue las convenciones del proyecto
- Añade comentarios cuando sea necesario
- Escribe pruebas para tu código

### 5. Probar

```bash
# Pruebas backend
cd backend && npm test

# Pruebas frontend
cd frontend && npm test

# Pruebas E2E
cd tests && npm run test:e2e
```

### 6. Commit

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: añadir nueva funcionalidad X"
```

Tipos de commit:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de error
- `docs:` Documentación
- `style:` Formato
- `refactor:` Refactorización
- `test:` Pruebas
- `chore:` Mantenimiento

### 7. Push y Pull Request

```bash
git push origin feature/mi-nueva-funcionalidad
```

Luego crea un Pull Request en GitHub siguiendo el template.

## Estándares de Código

### JavaScript/React

- Usa nombres descriptivos
- Funciones pequeñas y enfocadas
- Componentes reutilizables
- Evita lógica compleja en JSX

### CSS/Tailwind

- Usa clases de Tailwind cuando sea posible
- Mantén consistencia en espaciado
- Mobile-first approach

### Tests

- Cada funcionalidad debe tener tests
- Tests claros y descriptivos
- Cobertura mínima del 70%

## Documentación

- Actualiza README si cambias funcionalidad
- Documenta APIs nuevas
- Añade ejemplos cuando sea útil
- Mantén comentarios actualizados

## Reportar Bugs

Usa el [template de bug report](.github/ISSUE_TEMPLATE/bug_report.md) e incluye:

- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Información del entorno

## Sugerir Funcionalidades

Usa el [template de feature request](.github/ISSUE_TEMPLATE/feature_request.md) e incluye:

- Descripción de la funcionalidad
- Problema que resuelve
- Propuesta de solución
- Mockups si aplica

## Checklist Pre-PR

- [ ] El código compila sin errores
- [ ] Todas las pruebas pasan
- [ ] He añadido nuevas pruebas si es necesario
- [ ] La documentación está actualizada
- [ ] He revisado mi propio código
- [ ] No hay console.logs innecesarios
- [ ] El código sigue las convenciones
- [ ] Los commits son descriptivos

## Proceso de Revisión

1. **Automated checks** - CI/CD ejecuta pruebas automáticas
2. **Code review** - Un maintainer revisa tu código
3. **Feedback** - Puede haber comentarios o solicitud de cambios
4. **Iteración** - Realiza los cambios solicitados
5. **Aprobación** - Una vez aprobado, se hace merge

## ¿Necesitas Ayuda?

- Lee la [documentación completa](README.md)
- Revisa [GitHub Flow](.github/GITHUB_FLOW.md)
- Pregunta en las issues
- Contacta a los maintainers

## Reconocimientos

¡Todos los contribuidores serán añadidos a la lista de reconocimientos!

---

**¡Gracias por hacer este proyecto mejor!** 
