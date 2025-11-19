# Tarjeta de Invitación Web - Colación

Una landing page elegante y totalmente responsiva para invitaciones de colación, inspirada en tarjetas físicas con diseño de papel, colores pastel y flores acuarela.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
npm run build
npm start
```

## 📝 Personalización

### Configuración Principal

**Todo el contenido se personaliza editando un solo archivo:**

📄 `app/config/invitacion.ts`

En este archivo puedes cambiar:
- Nombre de la homenajeada
- Fecha y hora del evento
- Ubicación y dirección
- URLs de Google Maps
- Código de vestimenta
- Mensajes de agradecimiento
- **Fotos especiales con carrusel** (mínimo 5 imágenes por sector recomendado)
- Colores (opcional)
- Y más...

### Recursos Gráficos

#### Imagen de Fondo del Hero (recomendado)

Coloca tu imagen de fondo decorativa en `/public/`:

- `hero-background.png` - Imagen de fondo elegante con flores acuarela y decoraciones doradas

**Nota:** Esta imagen se usará como fondo completo del Hero. Si no la colocas, se mostrará un fondo blanco con textura de papel.

#### Imagen de Código de Vestimenta

Coloca la imagen de referencia en:
- `/public/dresscode.png`

#### Música de Fondo

Coloca tu archivo de música en:
- `/public/audio/ambient.mp3`

**Nota:** La música NO se reproduce automáticamente (por políticas del navegador). El usuario debe hacer clic en el botón de música para iniciarla.

#### Fotos para Agradecimientos Especiales

Coloca las fotos en `/public/photos/` y referencia en `app/config/invitacion.ts`:

**Recomendación:** Mínimo 5 imágenes por sector para el efecto aesthetic completo del carrusel.

Ejemplo de estructura:
```
/public/photos/
  ├── family1.jpg
  ├── family2.jpg
  ├── family3.jpg
  ├── family4.jpg
  ├── family5.jpg
  ├── friends1.jpg
  ├── friends2.jpg
  └── ...
```

**Características del carrusel:**
- Cada sector puede tener múltiples imágenes (mínimo 5 recomendado)
- Las imágenes se muestran en marcos dorados animados
- Carrusel automático con efecto de profundidad
- Click en cualquier imagen para verla en grande (modal tipo álbum)
- Flechas de navegación siempre visibles

## 🎨 Personalización de Colores

Los colores están definidos en `tailwind.config.ts`. Puedes modificarlos allí o usar los valores personalizados en `app/config/invitacion.ts`.

Colores principales:
- `paper` - Fondo tipo papel (#FAF7F2)
- `rose` - Rosa pastel (#F4E4E1)
- `peach` - Durazno (#F8E5D6)
- `beige` - Beige (#E8DDD4)
- `sage` - Verde oliva suave (#D4D9C7)
- `accent-rose` - Rosa acento (#E8B8B0)
- `accent-peach` - Durazno acento (#F0C9A8)

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   └── rsvp/
│   │       └── route.ts          # API para confirmaciones
│   ├── components/
│   │   ├── Hero.tsx              # Portada principal
│   │   ├── Countdown.tsx         # Contador regresivo
│   │   ├── Acknowledgements.tsx  # Sección de agradecimientos
│   │   ├── DressCode.tsx         # Código de vestimenta
│   │   ├── LocationSection.tsx   # Ubicación y mapa
│   │   ├── RsvpSection.tsx       # Confirmación de asistencia
│   │   ├── MusicPlayer.tsx       # Reproductor de música
│   │   ├── Modal.tsx             # Componente modal reutilizable
│   │   ├── Button.tsx            # Botón elegante
│   │   └── Section.tsx           # Contenedor de sección
│   ├── config/
│   │   └── invitacion.ts         # ⭐ ARCHIVO DE CONFIGURACIÓN PRINCIPAL
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal con fuentes
│   └── page.tsx                  # Página principal
├── public/
│   ├── flowers/                  # Imágenes de flores decorativas
│   ├── audio/                     # Archivo de música
│   └── dresscode.png             # Imagen de código de vestimenta
└── data/
    └── rsvp.json                 # Confirmaciones guardadas (se crea automáticamente)
```

## 🔧 Tecnologías Utilizadas

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones suaves
- **Google Fonts** - Tipografías elegantes:
  - Playfair Display (serif para títulos)
  - Great Vibes (script para nombres)
  - Inter (sans-serif para texto general)

## 📱 Características

- ✅ Totalmente responsivo (mobile-first)
- ✅ Animaciones suaves con Framer Motion
- ✅ Reproductor de música con control manual
- ✅ Contador regresivo en tiempo real
- ✅ Modal para código de vestimenta
- ✅ Integración con Google Maps
- ✅ Formulario RSVP con validación
- ✅ Guardado de confirmaciones en JSON
- ✅ Diseño tipo tarjeta física elegante

## 📧 Confirmaciones de Asistencia (RSVP)

Las confirmaciones se guardan en `/data/rsvp.json`. Cada confirmación incluye:
- Nombre completo
- Número de acompañantes
- Teléfono/WhatsApp
- Comentarios/restricciones alimentarias
- Fecha y hora de la confirmación

**Para producción:** Considera integrar con un servicio externo (Google Sheets API, Airtable, base de datos, etc.) en lugar de guardar en archivo JSON.

## 🎯 Próximos Pasos

1. Edita `app/config/invitacion.ts` con tus datos
2. Coloca las imágenes de flores en `/public/flowers/`
3. Coloca la imagen de código de vestimenta en `/public/dresscode.png`
4. Coloca el archivo de música en `/public/audio/ambient.mp3`
5. **Coloca las fotos para agradecimientos en `/public/photos/`** (mínimo 5 por sector)
6. Configura los agradecimientos especiales en `app/config/invitacion.ts` con las rutas de las fotos
7. Obtén las URLs de Google Maps y actualízalas en la configuración
8. Ejecuta `npm run dev` y personaliza según necesites

## 📸 Configurar Agradecimientos Especiales con Carrusel de Imágenes

### Paso 1: Coloca las fotos

Crea la carpeta `/public/photos/` y coloca tus fotos allí. Ejemplo:
- `/public/photos/family1.jpg`
- `/public/photos/family2.jpg`
- `/public/photos/family3.jpg`
- etc.

**Recomendación:** Mínimo 5 imágenes por sector para el efecto aesthetic completo.

### Paso 2: Configura en `app/config/invitacion.ts`

En la sección `specialAcknowledgements`, configura así:

```typescript
specialAcknowledgements: [
  {
    // Array de imágenes (mínimo 5 recomendado)
    images: [
      { src: "/photos/family1.jpg", alt: "Descripción de la foto 1" },
      { src: "/photos/family2.jpg", alt: "Descripción de la foto 2" },
      { src: "/photos/family3.jpg", alt: "Descripción de la foto 3" },
      { src: "/photos/family4.jpg", alt: "Descripción de la foto 4" },
      { src: "/photos/family5.jpg", alt: "Descripción de la foto 5" },
      // Puedes agregar más imágenes si quieres
    ],
    text: "Tu mensaje de agradecimiento aquí",
  },
  // Más sectores...
]
```

### Características del Carrusel

- **Múltiples imágenes visibles:** Se muestran mínimo 5 imágenes simultáneamente
- **Efecto de profundidad:** La imagen central tiene opacidad completa, las laterales tienen menos opacidad
- **Navegación:** Flechas izquierda/derecha siempre visibles para navegar
- **Auto-play:** El carrusel cambia automáticamente cada 5 segundos
- **Modal tipo álbum:** Click en cualquier imagen para verla en grande y navegar entre todas
- **Marcos dorados animados:** Cada imagen está en un marco dorado con decoraciones florales

### Ejemplo Completo

```typescript
specialAcknowledgements: [
  {
    images: [
      { src: "/photos/family1.jpg", alt: "Fatima con su familia" },
      { src: "/photos/family2.jpg", alt: "Momento especial con la familia" },
      { src: "/photos/family3.jpg", alt: "Celebración familiar" },
      { src: "/photos/family4.jpg", alt: "Recuerdo familiar especial" },
      { src: "/photos/family5.jpg", alt: "Momento único con la familia" },
    ],
    text: "A mi familia, por ser mi pilar y mi inspiración en cada paso de este camino.",
  },
]
```

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de modificarlo según tus necesidades.

---

**¿Necesitas ayuda?** Revisa los comentarios en el código, especialmente en `app/config/invitacion.ts` donde se explica cada campo.

