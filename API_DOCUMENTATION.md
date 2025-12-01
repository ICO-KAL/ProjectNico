# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
 "username": "admin",
 "password": "password123"
}
```

**Response:**
```json
{
 "message": "Login successful",
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 "user": {
 "id": "user-1",
 "username": "admin",
 "name": "Administrador",
 "role": "admin"
 }
}
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
 "username": "newuser",
 "email": "user@example.com",
 "password": "password123",
 "name": "New User"
}
```

## Tasks

### Get All Tasks
```http
GET /tasks
GET /tasks?status=todo
GET /tasks?priority=high
GET /tasks?sprintId=sprint-1
```

### Get Task by ID
```http
GET /tasks/:id
```

### Create Task
```http
POST /tasks
Content-Type: application/json
Authorization: Bearer {token}

{
 "title": "Nueva Tarea",
 "description": "Descripción de la tarea",
 "status": "todo",
 "priority": "medium",
 "assignedTo": "user-1",
 "sprintId": "sprint-1",
 "estimatedHours": 5,
 "tags": ["frontend", "react"]
}
```

### Update Task
```http
PUT /tasks/:id
Content-Type: application/json
Authorization: Bearer {token}

{
 "title": "Tarea Actualizada",
 "status": "in-progress"
}
```

### Update Task Status
```http
PATCH /tasks/:id/status
Content-Type: application/json
Authorization: Bearer {token}

{
 "status": "completed"
}
```

### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer {token}
```

### Get Task Statistics
```http
GET /tasks/stats/overview
```

## Users

### Get All Users
```http
GET /users
```

### Get User by ID
```http
GET /users/:id
```

### Get User Tasks
```http
GET /users/:id/tasks
```

## Sprints

### Get All Sprints
```http
GET /sprints
GET /sprints?status=active
```

### Get Sprint by ID
```http
GET /sprints/:id
```

### Get Sprint Tasks
```http
GET /sprints/:id/tasks
```

**Response:**
```json
{
 "sprint": {...},
 "tasks": [...],
 "total": 5,
 "completed": 2,
 "inProgress": 2,
 "todo": 1,
 "totalHours": 25
}
```

### Create Sprint
```http
POST /sprints
Content-Type: application/json
Authorization: Bearer {token}

{
 "name": "Sprint 1",
 "description": "Primer sprint del proyecto",
 "startDate": "2025-12-01T00:00:00Z",
 "endDate": "2025-12-14T23:59:59Z",
 "goal": "Completar funcionalidades básicas",
 "teamMembers": ["user-1", "user-2"]
}
```

### Update Sprint
```http
PUT /sprints/:id
Content-Type: application/json
Authorization: Bearer {token}

{
 "status": "active",
 "velocity": 32
}
```

## ️ Health Check
```http
GET /health
```

**Response:**
```json
{
 "status": "OK",
 "timestamp": "2025-11-30T12:00:00Z",
 "uptime": 12345
}
```

## Authentication

Para endpoints protegidos, incluye el header:
```
Authorization: Bearer {your-jwt-token}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Task Status Values
- `todo` - Por Hacer
- `in-progress` - En Progreso
- `completed` - Completada

## Priority Values
- `low` - Baja
- `medium` - Media
- `high` - Alta

## Sprint Status Values
- `planned` - Planificado
- `active` - Activo
- `completed` - Completado
