# 🚀 Plan de Arquitectura - Sistema SaaS de Invitaciones Digitales

> **Fecha de creación:** Diciembre 1, 2025  
> **Objetivo:** Transformar el sistema actual de invitación única en una plataforma SaaS multi-tenant para gestionar eventos de múltiples clientes.

---

## 📊 Tabla de Contenidos

1. [Estado Actual](#estado-actual)
2. [Visión del Producto](#visión-del-producto)
3. [Arquitectura Propuesta](#arquitectura-propuesta)
4. [Stack Tecnológico](#stack-tecnológico)
5. [Modelo de Datos](#modelo-de-datos)
6. [APIs y Endpoints](#apis-y-endpoints)
7. [Roadmap de Desarrollo](#roadmap-de-desarrollo)
8. [Modelo de Monetización](#modelo-de-monetización)
9. [Consideraciones Técnicas](#consideraciones-técnicas)
10. [Próximos Pasos](#próximos-pasos)

---

## 🔍 Estado Actual

### ✅ Lo que Tenemos
- **Frontend:** Next.js 14 con App Router
- **Estilos:** Tailwind CSS + Framer Motion
- **Funcionalidad:** Sistema RSVP básico funcional
- **Datos:** Hardcodeados en TypeScript (`app/data/invitados.ts`)
- **Persistencia:** En memoria (se pierde al reiniciar servidor)
- **Alcance:** Una sola invitación por deployment

### ❌ Problemas Actuales
- No hay backend real (solo API routes de Next.js)
- Sin base de datos persistente
- No se pueden gestionar múltiples eventos
- No hay sistema multi-cliente
- Datos se pierden al reiniciar
- No hay autenticación ni autorización
- No escalable comercialmente

---

## 🎯 Visión del Producto

### Nombre del Producto (Sugerencias)
- **EventoCard** - Invitaciones digitales inteligentes
- **InviteHub** - Tu centro de eventos digitales
- **FiestaLink** - Conecta con tus invitados
- **CelebraWeb** - Celebraciones en la nube

### Propuesta de Valor
> *"Crea invitaciones digitales hermosas, gestiona tus invitados y recibe confirmaciones automáticas por WhatsApp. Todo en una plataforma."*

### Público Objetivo
1. **Organizadores de eventos personales:**
   - Bodas, XV años, graduaciones, cumpleaños
   - Personas que buscan alternativa moderna a invitaciones físicas

2. **Planificadores profesionales:**
   - Wedding planners
   - Event managers
   - Agencias de eventos

3. **Empresas:**
   - Eventos corporativos
   - Lanzamientos de productos
   - Conferencias

### Diferenciadores vs Competencia
- ✅ **Mercado latino:** Interface en español, números de Paraguay/LATAM
- ✅ **RSVP integrado:** Confirmación por WhatsApp automática
- ✅ **Precio accesible:** Más barato que Greenvelope/Paperless Post
- ✅ **Personalización total:** CSS custom, múltiples plantillas
- ✅ **Analytics:** Dashboard con estadísticas en tiempo real

---

## 🏗️ Arquitectura Propuesta

### Diagrama de Arquitectura

```
┌────────────────────────────────────────────────────────────┐
│                     USUARIOS FINALES                        │
│  - Organizadores (Clientes)                                │
│  - Invitados (Visitantes)                                  │
└────────────────────────────────────────────────────────────┘
                            ↕
┌────────────────────────────────────────────────────────────┐
│                  FRONTEND (Next.js 14)                     │
│                                                             │
│  ┌─────────────────┐  ┌──────────────────┐                │
│  │  Landing Page   │  │  Panel Admin     │                │
│  │  - Pricing      │  │  - Eventos       │                │
│  │  - Features     │  │  - Invitados     │                │
│  │  - Login/Signup │  │  - Analytics     │                │
│  └─────────────────┘  └──────────────────┘                │
│                                                             │
│  ┌─────────────────────────────────────┐                  │
│  │  Vista Pública de Invitación        │                  │
│  │  - Múltiples plantillas             │                  │
│  │  - Personalización por evento       │                  │
│  │  - Sistema RSVP integrado           │                  │
│  │  - Countdown, galería, ubicación    │                  │
│  └─────────────────────────────────────┘                  │
│                                                             │
│  Tecnologías:                                              │
│  - Next.js 14 (App Router)                                │
│  - TypeScript                                              │
│  - Tailwind CSS + Framer Motion                           │
│  - React Query (servidor state)                           │
│  - Zustand (client state)                                 │
│  - NextAuth.js (autenticación)                            │
└────────────────────────────────────────────────────────────┘
                            ↕
                      HTTPS/REST API
                            ↕
┌────────────────────────────────────────────────────────────┐
│              BACKEND (ASP.NET Core 8 Web API)              │
│                                                             │
│  ┌─────────────────┐  ┌──────────────────┐                │
│  │ Authentication  │  │  Authorization   │                │
│  │ - JWT Tokens    │  │  - Role-based    │                │
│  │ - Refresh Token │  │  - Policy-based  │                │
│  └─────────────────┘  └──────────────────┘                │
│                                                             │
│  ┌────────────────────────────────────────┐               │
│  │            API Controllers             │               │
│  │  - ClientesController                  │               │
│  │  - EventosController                   │               │
│  │  - InvitadosController                 │               │
│  │  - RsvpController                      │               │
│  │  - PlantillasController                │               │
│  │  - AnalyticsController                 │               │
│  └────────────────────────────────────────┘               │
│                                                             │
│  ┌────────────────────────────────────────┐               │
│  │         Business Logic Layer           │               │
│  │  - Servicios                           │               │
│  │  - Validaciones                        │               │
│  │  - Reglas de negocio                   │               │
│  └────────────────────────────────────────┘               │
│                                                             │
│  ┌────────────────────────────────────────┐               │
│  │         Data Access Layer (EF Core)    │               │
│  │  - DbContext                           │               │
│  │  - Repositories (opcional)             │               │
│  │  - Migrations                          │               │
│  └────────────────────────────────────────┘               │
│                                                             │
│  Tecnologías:                                              │
│  - ASP.NET Core 8 Web API                                 │
│  - Entity Framework Core 8                                │
│  - FluentValidation                                        │
│  - AutoMapper                                              │
│  - Serilog (logging)                                       │
│  - MediatR (opcional, CQRS)                               │
└────────────────────────────────────────────────────────────┘
                            ↕
                    Entity Framework Core
                            ↕
┌────────────────────────────────────────────────────────────┐
│           DATABASE (Neon PostgreSQL - Serverless)          │
│                                                             │
│  Tablas principales:                                       │
│  - Clientes (Usuarios organizadores)                      │
│  - Eventos                                                 │
│  - Invitados                                               │
│  - Confirmaciones (RSVP)                                   │
│  - Plantillas                                              │
│  - Planes (Free, Pro, Premium)                            │
│  - Pagos (Stripe/MercadoPago)                             │
│  - Logs de Auditoría                                      │
│                                                             │
│  Ventajas de Neon:                                         │
│  - ✅ Serverless (paga solo por uso)                      │
│  - ✅ Free tier generoso (500MB storage, 10GB transfer)   │
│  - ✅ Branching (DB branches como Git)                    │
│  - ✅ Auto-scaling                                         │
│  - ✅ Backups automáticos                                 │
└────────────────────────────────────────────────────────────┘
                            ↕
                    Servicios Externos
                            ↕
┌────────────────────────────────────────────────────────────┐
│                  SERVICIOS INTEGRADOS                       │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Stripe    │  │  MercadoPago │  │  WhatsApp    │     │
│  │   (Pagos)   │  │   (LATAM)    │  │     API      │     │
│  └─────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  SendGrid   │  │   Cloudinary │  │    Vercel    │     │
│  │  (Emails)   │  │  (Imágenes)  │  │  (Hosting)   │     │
│  └─────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────────────────────────────────────────┘
```

### Flujo de Datos Típico

#### 1. Cliente crea un evento
```
Usuario → Login (Frontend)
       → POST /api/auth/login (Backend)
       → JWT Token devuelto
       → POST /api/eventos (con JWT)
       → EF Core guarda en PostgreSQL
       → Respuesta: EventoId + Slug único
```

#### 2. Cliente agrega invitados
```
Usuario → Sube Excel o agrega manual
       → POST /api/eventos/{id}/invitados (batch)
       → Backend valida + normaliza teléfonos
       → EF Core guarda en batch
       → Respuesta: Lista de invitados creados
```

#### 3. Invitado confirma asistencia
```
Invitado → Abre URL: /evento/{slug}
        → GET /api/eventos/{slug} (público)
        → Frontend renderiza invitación
        → Ingresa teléfono → POST /api/rsvp/buscar
        → Muestra grupo → Confirma
        → POST /api/rsvp/confirmar
        → Backend guarda confirmación
        → (Opcional) Envía WhatsApp confirmación
```

---

## 🛠️ Stack Tecnológico

### Backend - ASP.NET Core 8

```csharp
// Estructura del proyecto
InvitacionesAPI/
├── InvitacionesAPI.sln
├── src/
│   ├── InvitacionesAPI.API/              // Web API
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   ├── Program.cs
│   │   └── appsettings.json
│   │
│   ├── InvitacionesAPI.Application/      // Lógica de negocio
│   │   ├── Services/
│   │   ├── DTOs/
│   │   ├── Validators/
│   │   └── Interfaces/
│   │
│   ├── InvitacionesAPI.Domain/           // Modelos de dominio
│   │   ├── Entities/
│   │   ├── Enums/
│   │   └── ValueObjects/
│   │
│   └── InvitacionesAPI.Infrastructure/   // Acceso a datos
│       ├── Data/
│       │   ├── AppDbContext.cs
│       │   └── Migrations/
│       ├── Repositories/
│       └── ExternalServices/
│
└── tests/
    ├── InvitacionesAPI.UnitTests/
    └── InvitacionesAPI.IntegrationTests/
```

#### Paquetes NuGet principales
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.*" />
<PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.*" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.*" />
<PackageReference Include="FluentValidation.AspNetCore" Version="11.3.*" />
<PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.*" />
<PackageReference Include="Serilog.AspNetCore" Version="8.0.*" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.*" />
```

### Frontend - Next.js 14

```
invitaciones-frontend/
├── app/
│   ├── (public)/                    // Rutas públicas
│   │   └── evento/
│   │       └── [slug]/
│   │           └── page.tsx         // Vista de invitación
│   │
│   ├── (auth)/                      // Rutas de autenticación
│   │   ├── login/
│   │   └── registro/
│   │
│   ├── (dashboard)/                 // Panel de admin (protegido)
│   │   ├── layout.tsx
│   │   ├── eventos/
│   │   ├── invitados/
│   │   ├── plantillas/
│   │   └── configuracion/
│   │
│   ├── api/                         // API routes (mínimas, proxy)
│   │   └── auth/
│   │       └── [...nextauth]/
│   │
│   ├── components/
│   │   ├── ui/                      // Componentes base (shadcn/ui)
│   │   ├── invitacion/              // Componentes de invitación
│   │   └── dashboard/               // Componentes del panel
│   │
│   ├── lib/
│   │   ├── api-client.ts            // Cliente HTTP para API
│   │   ├── utils.ts
│   │   └── validations.ts
│   │
│   └── types/
│       └── api-types.ts             // Types compartidos con backend
│
├── public/
│   ├── plantillas/                  // Assets por plantilla
│   │   ├── graduacion/
│   │   ├── boda/
│   │   └── xv-anos/
│   └── ...
│
└── package.json
```

#### Dependencias principales
```json
{
  "dependencies": {
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.5.4",
    "tailwindcss": "^3.4.7",
    "framer-motion": "^11.3.19",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0",
    "next-auth": "^5.0.0-beta",
    "axios": "^1.6.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.0"
  }
}
```

### Base de Datos - Neon PostgreSQL

#### Configuración
```json
// Connection string de Neon
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=ep-xxx.neon.tech;Database=invitaciones_db;Username=user;Password=pass;SSL Mode=Require;Trust Server Certificate=true"
  }
}
```

#### Ventajas de Neon
- **Serverless:** No necesitas gestionar servidores
- **Branching:** Crea branches de DB para testing (como Git)
- **Auto-scaling:** Escala automáticamente según carga
- **Free tier:** 500MB storage, 10GB transferencia/mes
- **Backups:** Automáticos y point-in-time recovery
- **PostgreSQL full:** Compatible 100% con PostgreSQL

---

## 📋 Modelo de Datos

### Diagrama ER (Entity Relationship)

```
┌─────────────────┐
│    Clientes     │
├─────────────────┤
│ Id (PK)         │
│ Nombre          │
│ Email (unique)  │
│ PasswordHash    │
│ PlanId (FK)     │───┐
│ FechaRegistro   │   │
│ IsActive        │   │
└─────────────────┘   │
        │             │
        │ 1           │
        │             │
        │ N           │
        ↓             │
┌─────────────────┐   │
│     Eventos     │   │
├─────────────────┤   │
│ Id (PK)         │   │
│ ClienteId (FK)  │───┘
│ Titulo          │
│ Descripcion     │
│ FechaEvento     │
│ HoraEvento      │
│ Ubicacion       │
│ DireccionMap    │
│ GoogleMapsUrl   │
│ Slug (unique)   │
│ PlantillaId(FK) │───┐
│ Configuracion   │   │  (JSON: colores, textos, etc.)
│ IsPublic        │   │
│ FechaCreacion   │   │
└─────────────────┘   │
        │             │
        │ 1           │
        │             │
        │ N           │
        ↓             │
┌─────────────────┐   │
│   Invitados     │   │
├─────────────────┤   │
│ Id (PK)         │   │
│ EventoId (FK)   │───┘
│ Nombre          │
│ Apellido        │
│ Telefono        │
│ Email           │
│ NumAcompanantes │
│ LiderId (FK)    │───┐ (Self-reference)
│ FechaCreacion   │   │
└─────────────────┘   │
        │             │
        │ 1           │
        │             │
        │ 0..1        │
        ↓             │
┌─────────────────┐   │
│ Confirmaciones  │   │
├─────────────────┤   │
│ Id (PK)         │   │
│ InvitadoId (FK) │───┘
│ Asistencia      │  (Enum: Pendiente, Si, No)
│ Comentarios     │
│ FechaRespuesta  │
│ IpAddress       │
└─────────────────┘

┌─────────────────┐
│   Plantillas    │
├─────────────────┤
│ Id (PK)         │
│ Nombre          │
│ Categoria       │  (Boda, Graduacion, XV, etc.)
│ Descripcion     │
│ ThumbnailUrl    │
│ ConfigDefecto   │  (JSON: estructura por defecto)
│ IsActive        │
│ OrdenVisual     │
└─────────────────┘
        ↑
        │
        └──────────────────────┐
                               │
┌─────────────────┐            │
│     Planes      │            │
├─────────────────┤            │
│ Id (PK)         │            │
│ Nombre          │            │
│ Precio          │            │
│ MaxEventos      │            │
│ MaxInvitados    │            │
│ Features        │  (JSON)    │
└─────────────────┘            │
                               │
                               │
┌─────────────────────────────┘
│
│  Otras tablas auxiliares:
│  - Pagos (histórico de transacciones)
│  - AuditLogs (registro de cambios)
│  - Notificaciones (emails/WhatsApp enviados)
```

### Código de las Entidades (C#)

```csharp
// Cliente.cs
public class Cliente
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public int PlanId { get; set; }
    public DateTime FechaRegistro { get; set; }
    public bool IsActive { get; set; }
    
    // Navegación
    public Plan Plan { get; set; } = null!;
    public ICollection<Evento> Eventos { get; set; } = new List<Evento>();
}

// Evento.cs
public class Evento
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public DateTime FechaEvento { get; set; }
    public TimeSpan HoraEvento { get; set; }
    public string Ubicacion { get; set; } = string.Empty;
    public string? DireccionMap { get; set; }
    public string? GoogleMapsUrl { get; set; }
    public string Slug { get; set; } = string.Empty; // URL amigable
    public int PlantillaId { get; set; }
    public string? Configuracion { get; set; } // JSON
    public bool IsPublic { get; set; }
    public DateTime FechaCreacion { get; set; }
    
    // Navegación
    public Cliente Cliente { get; set; } = null!;
    public Plantilla Plantilla { get; set; } = null!;
    public ICollection<Invitado> Invitados { get; set; } = new List<Invitado>();
}

// Invitado.cs
public class Invitado
{
    public int Id { get; set; }
    public int EventoId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string? Email { get; set; }
    public int? NumAcompanantes { get; set; }
    public int? LiderId { get; set; }
    public DateTime FechaCreacion { get; set; }
    
    // Navegación
    public Evento Evento { get; set; } = null!;
    public Invitado? Lider { get; set; }
    public ICollection<Invitado> Grupo { get; set; } = new List<Invitado>();
    public Confirmacion? Confirmacion { get; set; }
}

// Confirmacion.cs
public class Confirmacion
{
    public int Id { get; set; }
    public int InvitadoId { get; set; }
    public EstadoAsistencia Asistencia { get; set; }
    public string? Comentarios { get; set; }
    public DateTime FechaRespuesta { get; set; }
    public string? IpAddress { get; set; }
    
    // Navegación
    public Invitado Invitado { get; set; } = null!;
}

// EstadoAsistencia.cs (Enum)
public enum EstadoAsistencia
{
    Pendiente = 0,
    Si = 1,
    No = 2
}

// Plantilla.cs
public class Plantilla
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public CategoriaEvento Categoria { get; set; }
    public string? Descripcion { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? ConfigDefecto { get; set; } // JSON
    public bool IsActive { get; set; }
    public int OrdenVisual { get; set; }
    
    // Navegación
    public ICollection<Evento> Eventos { get; set; } = new List<Evento>();
}

// CategoriaEvento.cs (Enum)
public enum CategoriaEvento
{
    Boda = 1,
    Graduacion = 2,
    XVAnos = 3,
    Cumpleanos = 4,
    BabyShower = 5,
    Corporativo = 6,
    Otro = 99
}

// Plan.cs
public class Plan
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int MaxEventos { get; set; }
    public int MaxInvitados { get; set; }
    public string? Features { get; set; } // JSON
    
    // Navegación
    public ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();
}
```

---

## 🌐 APIs y Endpoints

### Autenticación

```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password123!"
}

Response 201:
{
  "userId": 1,
  "email": "juan@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "abc123..."
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "Password123!"
}

Response 200:
{
  "userId": 1,
  "email": "juan@example.com",
  "nombre": "Juan Pérez",
  "plan": "Free",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "abc123...",
  "expiresAt": "2025-12-02T15:00:00Z"
}
```

```http
POST /api/auth/refresh
Authorization: Bearer {refreshToken}

Response 200:
{
  "token": "new_access_token",
  "refreshToken": "new_refresh_token",
  "expiresAt": "2025-12-02T16:00:00Z"
}
```

### Eventos

```http
GET /api/eventos
Authorization: Bearer {token}

Response 200:
{
  "eventos": [
    {
      "id": 1,
      "titulo": "Graduación de Fatima",
      "fechaEvento": "2025-12-13T20:00:00Z",
      "ubicacion": "Club Primero de Enero",
      "slug": "graduacion-fatima-2025",
      "totalInvitados": 25,
      "confirmadosSi": 18,
      "confirmadosNo": 2,
      "pendientes": 5
    }
  ],
  "total": 1
}
```

```http
POST /api/eventos
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Graduación de Fatima",
  "descripcion": "Acto de colación 2025",
  "fechaEvento": "2025-12-13",
  "horaEvento": "20:00:00",
  "ubicacion": "Club Primero de Enero",
  "direccionMap": "Av. Coronel Alfredo Ramos, San Juan Btta.",
  "googleMapsUrl": "https://maps.app.goo.gl/...",
  "plantillaId": 2,
  "configuracion": {
    "colorPrimario": "#d4af37",
    "colorSecundario": "#8b7355",
    "nombreHomenajeado": "Fatima Cubells Gomez",
    "textoBienvenida": "Acompáñanos en este día especial..."
  }
}

Response 201:
{
  "id": 1,
  "slug": "graduacion-fatima-2025",
  "urlPublica": "https://tu-dominio.com/evento/graduacion-fatima-2025"
}
```

```http
GET /api/eventos/{id}
Authorization: Bearer {token}

Response 200:
{
  "id": 1,
  "titulo": "Graduación de Fatima",
  "fechaEvento": "2025-12-13T20:00:00Z",
  "ubicacion": "Club Primero de Enero",
  "slug": "graduacion-fatima-2025",
  "plantilla": {
    "id": 2,
    "nombre": "Elegancia Dorada",
    "categoria": "Graduacion"
  },
  "configuracion": {...},
  "estadisticas": {
    "totalInvitados": 25,
    "confirmadosSi": 18,
    "confirmadosNo": 2,
    "pendientes": 5
  }
}
```

```http
PUT /api/eventos/{id}
DELETE /api/eventos/{id}
```

### Invitados

```http
GET /api/eventos/{eventoId}/invitados
Authorization: Bearer {token}

Response 200:
{
  "invitados": [
    {
      "id": 1,
      "nombre": "Marta",
      "apellido": "Lerra",
      "telefono": "+5493764323215",
      "email": null,
      "numAcompanantes": 0,
      "esLider": true,
      "confirmacion": {
        "asistencia": "Si",
        "comentarios": "",
        "fechaRespuesta": "2025-11-30T10:30:00Z"
      }
    }
  ],
  "total": 25
}
```

```http
POST /api/eventos/{eventoId}/invitados
Authorization: Bearer {token}
Content-Type: application/json

{
  "invitados": [
    {
      "nombre": "Juan",
      "apellido": "Pérez",
      "telefono": "+595981234567",
      "email": "juan@example.com",
      "numAcompanantes": 0,
      "liderId": null
    },
    {
      "nombre": "María",
      "apellido": "Pérez",
      "telefono": "+595981234567",
      "numAcompanantes": 0,
      "liderId": 1  // Juan es el líder
    }
  ]
}

Response 201:
{
  "invitadosCreados": 2,
  "invitados": [...]
}
```

```http
POST /api/eventos/{eventoId}/invitados/importar-excel
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
- file: invitados.xlsx

Response 200:
{
  "totalProcesados": 25,
  "exitosos": 24,
  "errores": 1,
  "detalleErrores": [
    {
      "fila": 5,
      "error": "Teléfono inválido"
    }
  ]
}
```

```http
PUT /api/invitados/{id}
DELETE /api/invitados/{id}
```

### RSVP (Público - sin autenticación)

```http
GET /api/rsvp/{slug}/buscar?telefono=+595981234567

Response 200:
{
  "encontrado": true,
  "lider": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez"
  },
  "grupo": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez"
    },
    {
      "id": 2,
      "nombre": "María",
      "apellido": "Pérez"
    }
  ],
  "totalPersonas": 2,
  "yaConfirmo": false,
  "evento": {
    "titulo": "Graduación de Fatima",
    "fechaEvento": "2025-12-13T20:00:00Z",
    "ubicacion": "Club Primero de Enero"
  }
}
```

```http
POST /api/rsvp/{slug}/confirmar
Content-Type: application/json

{
  "liderId": 1,
  "asistencia": "Si",
  "numAcompanantes": 2,
  "comentarios": "Sin gluten por favor"
}

Response 200:
{
  "mensaje": "¡Gracias por confirmar tu asistencia!",
  "totalPersonas": 4,
  "asistencia": "Si"
}
```

```http
GET /api/rsvp/{slug}/evento

Response 200:
{
  "titulo": "Graduación de Fatima",
  "descripcion": "Acto de colación 2025",
  "fechaEvento": "2025-12-13T20:00:00Z",
  "ubicacion": "Club Primero de Enero",
  "direccionMap": "Av. Coronel Alfredo Ramos",
  "googleMapsUrl": "https://maps.app.goo.gl/...",
  "plantilla": {
    "nombre": "Elegancia Dorada",
    "categoria": "Graduacion"
  },
  "configuracion": {
    "colorPrimario": "#d4af37",
    "nombreHomenajeado": "Fatima Cubells Gomez",
    ...
  }
}
```

### Plantillas

```http
GET /api/plantillas
Authorization: Bearer {token}

Response 200:
{
  "plantillas": [
    {
      "id": 1,
      "nombre": "Romance Clásico",
      "categoria": "Boda",
      "thumbnailUrl": "/plantillas/boda-1.jpg",
      "descripcion": "Elegante diseño para bodas con flores y dorado"
    },
    {
      "id": 2,
      "nombre": "Elegancia Dorada",
      "categoria": "Graduacion",
      "thumbnailUrl": "/plantillas/graduacion-1.jpg"
    }
  ]
}
```

### Analytics

```http
GET /api/eventos/{eventoId}/analytics
Authorization: Bearer {token}

Response 200:
{
  "resumen": {
    "totalInvitados": 25,
    "confirmadosSi": 18,
    "confirmadosNo": 2,
    "pendientes": 5,
    "tasaConfirmacion": 80.0
  },
  "porDia": [
    {
      "fecha": "2025-11-28",
      "confirmaciones": 5
    },
    {
      "fecha": "2025-11-29",
      "confirmaciones": 8
    }
  ],
  "topComentarios": [
    "Vegetariano",
    "Sin gluten"
  ]
}
```

### Exportar

```http
GET /api/eventos/{eventoId}/exportar/excel
Authorization: Bearer {token}

Response 200:
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="invitados-graduacion-fatima.xlsx"

(Archivo Excel descargado)
```

---

## 📅 Roadmap de Desarrollo

### FASE 0: Setup Inicial (1 semana)
**Objetivo:** Preparar infraestructura y repos

#### Tareas Backend
- [ ] Crear cuenta en Neon.tech
- [ ] Crear base de datos PostgreSQL
- [ ] Crear solución ASP.NET Core (Clean Architecture)
- [ ] Configurar Entity Framework Core
- [ ] Configurar JWT Authentication
- [ ] Setup logging (Serilog)
- [ ] Configurar Swagger/OpenAPI
- [ ] Crear repo Git y CI/CD básico

#### Tareas Frontend
- [ ] Crear proyecto Next.js 14
- [ ] Configurar Tailwind CSS
- [ ] Setup TypeScript estricto
- [ ] Configurar ESLint + Prettier
- [ ] Instalar dependencias base (React Query, Zustand, etc.)
- [ ] Crear estructura de carpetas
- [ ] Configurar variables de entorno

#### Tareas DevOps
- [ ] Configurar GitHub/GitLab repo
- [ ] Setup Docker para desarrollo local
- [ ] Configurar CI con GitHub Actions
- [ ] Preparar deployment en Railway/Render (backend)
- [ ] Preparar deployment en Vercel (frontend)

---

### FASE 1: MVP Backend (2-3 semanas)
**Objetivo:** API funcional con autenticación y CRUD básico

#### Week 1: Autenticación y Base de Datos
- [ ] Definir todas las entidades (Clientes, Eventos, Invitados, etc.)
- [ ] Crear migraciones de Entity Framework
- [ ] Aplicar migraciones a Neon DB
- [ ] Implementar AuthController (Register, Login, Refresh)
- [ ] Configurar JWT tokens (access + refresh)
- [ ] Middleware de autenticación y autorización
- [ ] Testing de endpoints de auth

#### Week 2: CRUD de Eventos e Invitados
- [ ] EventosController (CRUD completo)
- [ ] InvitadosController (CRUD completo)
- [ ] Lógica de grupos (líder + miembros)
- [ ] Validaciones con FluentValidation
- [ ] AutoMapper para DTOs
- [ ] Testing unitario

#### Week 3: Sistema RSVP
- [ ] RsvpController (búsqueda por teléfono, confirmación)
- [ ] Normalización de teléfonos (Paraguay/LATAM)
- [ ] Lógica de confirmación de grupos
- [ ] Endpoint público para invitaciones (sin auth)
- [ ] Sistema de slugs únicos
- [ ] Testing de flujo completo

---

### FASE 2: MVP Frontend (2-3 semanas)
**Objetivo:** Interface funcional para crear eventos y confirmar asistencia

#### Week 1: Autenticación y Dashboard
- [ ] Páginas de Login y Registro
- [ ] Integración con NextAuth.js
- [ ] Cliente HTTP (axios + interceptors)
- [ ] Layout del dashboard
- [ ] Navegación y sidebar
- [ ] Página de inicio con resumen

#### Week 2: Gestión de Eventos
- [ ] Formulario crear evento
- [ ] Lista de eventos
- [ ] Editar evento
- [ ] Vista detalle de evento
- [ ] Estadísticas básicas
- [ ] Integración con API backend

#### Week 3: Gestión de Invitados + RSVP
- [ ] Formulario agregar invitados (manual)
- [ ] Importar Excel de invitados
- [ ] Lista de invitados con filtros
- [ ] Vista pública de invitación (slug)
- [ ] Formulario de confirmación RSVP
- [ ] Testing end-to-end

---

### FASE 3: Sistema de Plantillas (2 semanas)
**Objetivo:** Múltiples diseños de invitación personalizables

#### Week 1: Infraestructura de Plantillas
- [ ] Modelo de datos para plantillas
- [ ] API endpoints de plantillas
- [ ] Sistema de configuración JSON
- [ ] Selector de plantillas en crear evento
- [ ] Preview de plantillas

#### Week 2: Diseño de Plantillas
- [ ] Plantilla: Graduación Elegante
- [ ] Plantilla: Boda Romántica
- [ ] Plantilla: XV Años Moderna
- [ ] Plantilla: Cumpleaños Festivo
- [ ] Sistema de colores dinámicos
- [ ] Personalización de textos

---

### FASE 4: Multi-tenant y Planes (2 semanas)
**Objetivo:** Sistema de planes y límites por cliente

#### Week 1: Sistema de Planes
- [ ] Modelo de Planes (Free, Pro, Premium)
- [ ] Seed data con planes iniciales
- [ ] Lógica de límites (eventos, invitados)
- [ ] Middleware de validación de límites
- [ ] Página de planes en frontend
- [ ] Indicador de plan actual en dashboard

#### Week 2: Gestión de Cuenta
- [ ] Página de configuración de cuenta
- [ ] Cambiar plan (UI)
- [ ] Ver uso actual vs límites
- [ ] Historial de eventos
- [ ] Configuración de perfil

---

### FASE 5: Analytics y Exportación (1-2 semanas)
**Objetivo:** Dashboard de estadísticas y exportación de datos

- [ ] API de analytics por evento
- [ ] Dashboard de estadísticas (gráficos)
- [ ] Exportar a Excel (backend)
- [ ] Descargar reporte PDF
- [ ] Gráficos de confirmaciones por día
- [ ] Top comentarios/restricciones

---

### FASE 6: Integración de Pagos (2 semanas)
**Objetivo:** Monetización con Stripe/MercadoPago

#### Stripe (Internacional)
- [ ] Crear cuenta Stripe
- [ ] Integrar Stripe Checkout
- [ ] Webhooks de pagos
- [ ] Manejo de subscripciones
- [ ] Página de éxito/cancelación

#### MercadoPago (LATAM)
- [ ] Crear cuenta MercadoPago
- [ ] Integrar MercadoPago SDK
- [ ] Webhooks de pagos
- [ ] Testing en sandbox

---

### FASE 7: Features Avanzados (3+ semanas)

#### WhatsApp Integration
- [ ] Integración con Twilio/WhatsApp Business API
- [ ] Envío automático de invitaciones
- [ ] Confirmaciones por WhatsApp
- [ ] Recordatorios automáticos

#### Otros Features
- [ ] Subida de imágenes (Cloudinary)
- [ ] Galería de fotos personalizable
- [ ] Música de fondo personalizada
- [ ] Dominio custom por evento
- [ ] Códigos QR para invitaciones
- [ ] Multi-idioma (español, inglés, portugués)

---

### FASE 8: Testing y Optimización (1-2 semanas)

- [ ] Testing end-to-end completo
- [ ] Performance testing
- [ ] Security audit
- [ ] Optimización de queries (EF Core)
- [ ] Caching (Redis opcional)
- [ ] SEO optimization
- [ ] Lighthouse audit (>90 score)

---

### FASE 9: Lanzamiento Beta (1 semana)

- [ ] Deploy a producción
- [ ] Configurar dominio
- [ ] SSL certificates
- [ ] Monitoring (Application Insights/Sentry)
- [ ] Beta testing con usuarios reales
- [ ] Feedback y ajustes

---

### FASE 10: Marketing y Crecimiento

- [ ] Landing page comercial
- [ ] Contenido de blog (SEO)
- [ ] Redes sociales
- [ ] Google Ads / Facebook Ads
- [ ] Programa de referidos
- [ ] Soporte al cliente

---

## 💰 Modelo de Monetización

### Planes Propuestos

| Característica | Free | Pro | Premium |
|---------------|------|-----|---------|
| **Precio** | $0/mes | $29/mes | $79/mes |
| **Eventos simultáneos** | 1 | 5 | Ilimitados |
| **Invitados por evento** | 50 | 500 | Ilimitados |
| **Plantillas** | 1 básica | Todas (10+) | Todas + Custom CSS |
| **RSVP** | ✅ | ✅ | ✅ |
| **Exportar Excel** | ❌ | ✅ | ✅ |
| **Exportar PDF** | ❌ | ✅ | ✅ |
| **Analytics** | Básico | Avanzado | Avanzado + AI Insights |
| **WhatsApp automático** | ❌ | ❌ | ✅ |
| **Email automático** | ❌ | ✅ | ✅ |
| **Dominio custom** | ❌ | ❌ | ✅ |
| **Branding** | Con marca "PoweredBy" | Sin marca | Sin marca |
| **Soporte** | Email | Email + Chat | Prioritario + Teléfono |
| **Historial** | 30 días | 1 año | Ilimitado |

### Proyección de Ingresos (Conservadora)

#### Año 1
- **Mes 1-3 (Beta):** 0-10 usuarios free
- **Mes 4-6:** 50 usuarios (40 free, 8 pro, 2 premium) = ~$390/mes
- **Mes 7-9:** 150 usuarios (120 free, 25 pro, 5 premium) = ~$1,120/mes
- **Mes 10-12:** 300 usuarios (250 free, 40 pro, 10 premium) = ~$1,950/mes

**Total Año 1:** ~$10,000 - $15,000

#### Año 2 (Crecimiento)
- **Q1:** 500 usuarios = ~$3,500/mes
- **Q2:** 800 usuarios = ~$6,000/mes
- **Q3:** 1,200 usuarios = ~$9,500/mes
- **Q4:** 1,500 usuarios = ~$12,000/mes

**Total Año 2:** ~$90,000

### Costos Estimados

#### Infraestructura (Mensual)
- **Neon PostgreSQL:** $0 - $20 (free tier suficiente al inicio)
- **Backend hosting (Render/Railway):** $7 - $25
- **Frontend (Vercel):** $0 - $20 (free tier o Pro)
- **CDN (Cloudinary):** $0 - $15
- **Email (SendGrid):** $0 - $15
- **WhatsApp (Twilio):** Variable según uso
- **Total:** ~$20 - $100/mes

#### Costos Fijos
- **Dominio:** $12/año
- **SSL:** Gratis (Let's Encrypt)
- **Tools (GitHub, etc.):** $0 - $20/mes

#### Margen
Con 100 clientes pagos:
- Ingresos: ~$2,000/mes
- Costos: ~$100/mes
- **Margen: ~95%** (SaaS típico)

---

## 🔒 Consideraciones Técnicas

### Seguridad

#### Backend
- ✅ JWT con refresh tokens
- ✅ HTTPS obligatorio en producción
- ✅ Rate limiting (prevenir abuse)
- ✅ CORS configurado correctamente
- ✅ SQL Injection protection (EF Core parametrizado)
- ✅ XSS protection (validación de inputs)
- ✅ CSRF tokens en formularios
- ✅ Passwords hasheados (BCrypt)
- ✅ Validación de datos en todos los endpoints
- ✅ Logs de auditoría para cambios críticos

#### Frontend
- ✅ Input sanitization
- ✅ Validación client-side + server-side
- ✅ Tokens en httpOnly cookies (cuando sea posible)
- ✅ CSP headers
- ✅ No exponer secrets en código cliente

### Performance

#### Backend
- Índices en PostgreSQL:
  - `Eventos.Slug` (unique)
  - `Eventos.ClienteId`
  - `Invitados.EventoId`
  - `Invitados.Telefono`
  - `Clientes.Email` (unique)
- Paginación en listados (nunca devolver todo)
- Eager loading con `.Include()` (evitar N+1)
- Caching de plantillas (estáticas)
- Compresión gzip de respuestas

#### Frontend
- Lazy loading de componentes pesados
- Imágenes optimizadas (Next.js Image)
- Suspense boundaries
- React Query para caché de API
- Prefetching de rutas
- Bundle size < 200KB inicial

### Escalabilidad

#### Base de Datos
- **Vertical scaling:** Neon permite upgrade fácil
- **Read replicas:** Neon soporta replicas de lectura
- **Connection pooling:** PgBouncer incluido en Neon
- **Índices:** Agregar según crecimiento

#### Backend API
- **Stateless:** API completamente stateless (JWT)
- **Horizontal scaling:** Múltiples instancias detrás de load balancer
- **Caching:** Redis para sesiones/caché (opcional)
- **Queue system:** Background jobs con Hangfire (emails, WhatsApp)

#### Frontend
- **CDN:** Vercel incluye CDN global
- **Static generation:** Next.js ISR para páginas públicas
- **Edge functions:** Para lógica simple (geolocalización, etc.)

### Monitoreo

#### Tools Recomendadas
- **Sentry:** Error tracking (frontend + backend)
- **Application Insights:** Métricas de performance
- **Uptime Robot:** Monitoring de disponibilidad
- **LogRocket:** Session replay (opcional)
- **Google Analytics:** Tráfico y conversiones

#### Métricas Clave
- Tiempo de respuesta API (p95 < 200ms)
- Error rate (< 0.1%)
- Uptime (> 99.9%)
- Core Web Vitals (LCP, FID, CLS)

---

## 📝 Próximos Pasos Inmediatos

### ¿Por dónde empezar?

#### Opción A: Backend First (Recomendado)
**Ventaja:** Lógica de negocio sólida desde el inicio

1. ✅ Crear cuenta en Neon.tech
2. ✅ Crear proyecto ASP.NET Core
3. ✅ Definir entidades y DbContext
4. ✅ Crear migraciones
5. ✅ Implementar autenticación JWT
6. ✅ CRUD de Eventos e Invitados
7. Luego conectar frontend

#### Opción B: Refactor Frontend First
**Ventaja:** Visualizar arquitectura modular antes

1. Crear nuevo proyecto Next.js limpio
2. Copiar componentes actuales
3. Refactorizar para multi-tenant
4. Mock de APIs con MSW
5. Luego conectar con backend real

#### Opción C: Paralelo (Requiere más coordinación)
- Backend: Tú o desarrollador backend
- Frontend: Tú o desarrollador frontend
- Definir contrato de API primero (OpenAPI)

### Mi Recomendación: **Opción A (Backend First)**

**Semana 1: Backend Setup**
1. Crear cuenta Neon
2. Proyecto ASP.NET Core
3. Modelos + Migraciones
4. Auth básico

**Semana 2-3: Backend MVP**
1. CRUD completo
2. Sistema RSVP
3. Testing

**Semana 4-5: Frontend MVP**
1. Login + Dashboard
2. Crear eventos
3. Vista pública RSVP

**Semana 6: Integración**
1. Conectar todo
2. Testing E2E
3. Deploy beta

---

## 🎯 Checklist de Decisiones Pendientes

Antes de empezar a codear, necesitamos decidir:

### Naming
- [ ] ¿Nombre del producto? (EventoCard, InviteHub, etc.)
- [ ] ¿Dominio? (.com, .io, .app)

### Stack
- [ ] ¿ASP.NET Core confirmado para backend?
- [ ] ¿Next.js confirmado para frontend?
- [ ] ¿Neon confirmado para DB?

### Infraestructura
- [ ] ¿Dónde hostear backend? (Railway, Render, Azure)
- [ ] ¿Dónde hostear frontend? (Vercel, Netlify)
- [ ] ¿Monorepo o repos separados?

### Pagos
- [ ] ¿Stripe, MercadoPago o ambos?
- [ ] ¿Precios finales de planes?

### Features
- [ ] ¿Qué features son MUST para MVP?
- [ ] ¿Qué dejamos para después?

---

## 📚 Recursos y Referencias

### Documentación Oficial
- [ASP.NET Core Docs](https://learn.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Neon PostgreSQL](https://neon.tech/docs)

### Tutoriales Recomendados
- [Clean Architecture en .NET](https://www.youtube.com/watch?v=dK4Yb6-LxAk)
- [Next.js 14 Full Course](https://www.youtube.com/watch?v=wm5gMKuwSYk)
- [JWT Auth en ASP.NET](https://www.youtube.com/watch?v=mgeuh8k3I4g)

### Repos de Ejemplo
- [dotnet-architecture/eShopOnWeb](https://github.com/dotnet-architecture/eShopOnWeb)
- [fullstackhero/dotnet-webapi-boilerplate](https://github.com/fullstackhero/dotnet-webapi-boilerplate)

### Tools
- [Postman](https://www.postman.com/) - Testing de APIs
- [DB Diagram](https://dbdiagram.io/) - Diseño de DB
- [Excalidraw](https://excalidraw.com/) - Diagramas

---

## 🚀 Conclusión

Este proyecto tiene **GRAN potencial** de convertirse en un SaaS rentable. El mercado de eventos es enorme y constante.

### Ventajas Competitivas
1. **Mercado latino desatendido**
2. **Integración WhatsApp nativa**
3. **Precio más accesible**
4. **UI/UX moderna**

### Tiempo Estimado Total
- **MVP funcional:** 8-10 semanas
- **Beta pública:** 12-14 semanas
- **v1.0 completa:** 16-20 semanas

### Inversión Inicial
- **Tiempo:** 200-300 horas
- **Dinero:** ~$50-100 (dominio + hosting primeros meses)

### Retorno Esperado
- **Año 1:** $10,000 - $15,000
- **Año 2:** $80,000 - $120,000 (con marketing)

---

## 📞 Contacto y Notas

Este documento es un **living document** y se actualizará según avancemos.

**Última actualización:** Diciembre 1, 2025

---

¡Vamos a construir algo grande! 🚀

