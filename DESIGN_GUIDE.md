# Guía de Diseño

## Principios de Diseño

### Minimalismo
- Diseño limpio y sin saturación
- Espaciado generoso
- Tipografía clara y legible

### Consistencia
- Colores coherentes en toda la aplicación
- Componentes reutilizables
- Patrones de interacción predecibles

### Accesibilidad
- Contraste adecuado (WCAG AA)
- Navegación con teclado
- Textos descriptivos

## Paleta de Colores

### Colores Primarios
```css
Primary 50: #eff6ff /* Fondos suaves */
Primary 100: #dbeafe /* Hover states */
Primary 500: #3b82f6 /* Color principal */
Primary 600: #2563eb /* Elementos activos */
Primary 700: #1d4ed8 /* Estados pressed */
```

### Colores de Estado
```css
Success: #10b981 /* Tareas completadas */
Warning: #f59e0b /* Prioridad media */
Danger: #ef4444 /* Prioridad alta */
Info: #3b82f6 /* Información general */
```

### Colores Neutros
```css
Gray 50: #f9fafb /* Fondo de la app */
Gray 100: #f3f4f6 /* Fondos de cards */
Gray 500: #6b7280 /* Texto secundario */
Gray 900: #111827 /* Texto principal */
```

## Espaciado

Sistema basado en múltiplos de 4px:

```css
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 16px (1rem)
lg: 24px (1.5rem)
xl: 32px (2rem)
2xl: 48px (3rem)
```

## Tipografía

### Tamaños
```css
xs: 0.75rem (12px) /* Etiquetas pequeñas */
sm: 0.875rem (14px) /* Texto secundario */
base: 1rem (16px) /* Texto principal */
lg: 1.125rem (18px) /* Títulos pequeños */
xl: 1.25rem (20px) /* Títulos medianos */
2xl: 1.5rem (24px) /* Títulos grandes */
3xl: 1.875rem (30px) /* Títulos principales */
```

### Pesos
```css
normal: 400 /* Texto regular */
medium: 500 /* Énfasis leve */
semibold: 600 /* Títulos */
bold: 700 /* Énfasis fuerte */
```

## Componentes

### Botones

#### Primario
```jsx
<button className="btn btn-primary">
 Acción Principal
</button>
```
- Fondo: Primary 600
- Hover: Primary 700
- Texto: Blanco
- Padding: 12px 16px
- Border-radius: 8px

#### Secundario
```jsx
<button className="btn btn-secondary">
 Acción Secundaria
</button>
```
- Fondo: Gray 200
- Hover: Gray 300
- Texto: Gray 800

#### Peligro
```jsx
<button className="btn btn-danger">
 Eliminar
</button>
```
- Fondo: Red 500
- Hover: Red 600
- Texto: Blanco

### Cards
```jsx
<div className="card">
 {/* Contenido */}
</div>
```
- Fondo: Blanco
- Border: 1px Gray 200
- Border-radius: 12px
- Padding: 24px
- Shadow: subtle

### Inputs
```jsx
<input className="input" type="text" />
```
- Border: 1px Gray 300
- Border-radius: 8px
- Padding: 10px 12px
- Focus: Ring Primary 500

### Badges

#### Status
```jsx
<span className="badge badge-todo">Por Hacer</span>
<span className="badge badge-in-progress">En Progreso</span>
<span className="badge badge-completed">Completada</span>
```

#### Priority
```jsx
<span className="badge badge-low">Baja</span>
<span className="badge badge-medium">Media</span>
<span className="badge badge-high">Alta</span>
```

## Animaciones

### Transiciones
```css
transition: all 200ms ease-in-out;
```

### Efectos de entrada
```css
.animate-fade-in {
 animation: fadeIn 0.3s ease-in-out;
}

.animate-slide-up {
 animation: slideUp 0.3s ease-out;
}
```

### Hover States
- Botones: Oscurecen levemente
- Cards: Shadow más pronunciado
- Links: Color primary más oscuro

## Responsive Design

### Breakpoints
```css
sm: 640px /* Tablets pequeñas */
md: 768px /* Tablets */
lg: 1024px /* Desktop pequeño */
xl: 1280px /* Desktop */
2xl: 1536px /* Desktop grande */
```

### Grid System
```jsx
/* Mobile first */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## ️ Iconos

Usamos **Lucide React** para iconos consistentes:

```jsx
import { User, Calendar, CheckCircle } from 'lucide-react';

<User size={20} className="text-primary-600" />
```

Tamaños estándar:
- Pequeño: 16px
- Mediano: 20px
- Grande: 24px

## Estados Visuales

### Loading
```jsx
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
```

### Empty State
```jsx
<div className="text-center py-12">
 <p className="text-gray-500">No hay datos</p>
</div>
```

### Error State
```jsx
<div className="bg-red-50 border border-red-200 rounded-lg p-4">
 <p className="text-red-800">Error al cargar</p>
</div>
```

## Dark Mode (Preparado)

Variables preparadas para implementación futura:
```css
--color-bg: theme('colors.gray.50');
--color-card: theme('colors.white');
--color-text: theme('colors.gray.900');
```

## Mejores Prácticas

1. **Usa clases de Tailwind** en lugar de CSS custom
2. **Componentes reutilizables** para consistencia
3. **Mobile-first approach** siempre
4. **Espaciado consistente** usando sistema de 4px
5. **Colores semánticos** (success, warning, danger)
6. **Animaciones sutiles** no distraen
7. **Alto contraste** para legibilidad
8. **Icons consistentes** del mismo set

## Ejemplos

### Card de Tarea
```jsx
<div className="card hover:shadow-md transition-shadow">
 <div className="flex items-start justify-between mb-3">
 <h3 className="font-semibold text-gray-900">
 Título de la tarea
 </h3>
 <span className="badge badge-high">Alta</span>
 </div>
 <p className="text-sm text-gray-600 mb-4">
 Descripción de la tarea...
 </p>
 <div className="flex items-center gap-4 text-sm text-gray-500">
 <span className="flex items-center gap-1">
 <User size={14} />
 Usuario
 </span>
 <span className="flex items-center gap-1">
 <Clock size={14} />
 5h
 </span>
 </div>
</div>
```

### Form Input
```jsx
<div className="space-y-2">
 <label className="block text-sm font-medium text-gray-700">
 Nombre de la tarea
 </label>
 <input
 type="text"
 className="input"
 placeholder="Escribe el nombre..."
 />
 <p className="text-xs text-gray-500">
 Usa un nombre descriptivo
 </p>
</div>
```

---

**Recursos:**
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [Material Design Guidelines](https://material.io/design)
