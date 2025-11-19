# 🎯 Instrucciones Rápidas

## 1️⃣ Instalación Inicial

```bash
npm install
npm run dev
```

## 2️⃣ Personalización Rápida

### Edita SOLO este archivo:
📄 **`app/config/invitacion.ts`**

Cambia:
- ✅ Nombre de la homenajeada
- ✅ Fecha y hora del evento
- ✅ Ubicación y dirección
- ✅ URLs de Google Maps
- ✅ Mensajes de agradecimiento
- ✅ **Fotos especiales con carrusel** (mínimo 5 por sector)
- ✅ Código de vestimenta

## 3️⃣ Agregar Recursos

### Imágenes de Flores (opcional)
Coloca en `/public/flowers/`:
- `corner-top-left.png`
- `corner-top-right.png`
- `corner-bottom-left.png`
- `corner-bottom-right.png`

### Música (opcional)
Coloca en `/public/audio/`:
- `ambient.mp3`

### Imagen de Código de Vestimenta
Coloca en `/public/`:
- `dresscode.png`

### Fotos para Agradecimientos Especiales (NUEVO ✨)
Coloca en `/public/photos/`:
- Mínimo 5 imágenes por sector recomendado
- Ejemplo: `family1.jpg`, `family2.jpg`, `family3.jpg`, etc.

**Luego configura en `app/config/invitacion.ts`** en la sección `specialAcknowledgements`:
```typescript
specialAcknowledgements: [
  {
    images: [
      { src: "/photos/family1.jpg", alt: "Descripción" },
      { src: "/photos/family2.jpg", alt: "Descripción" },
      // Mínimo 5 imágenes recomendado
    ],
    text: "Tu mensaje de agradecimiento",
  },
]
```

**Características:**
- ✨ Carrusel automático con efecto de profundidad
- 🖼️ Múltiples imágenes visibles simultáneamente
- 🎯 Click para ver en grande (modal tipo álbum)
- ➡️ Flechas de navegación siempre visibles

## 4️⃣ Obtener URLs de Google Maps

1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca tu ubicación
3. Haz clic en "Compartir" → "Insertar un mapa"
4. Copia la URL del iframe → `googleMapsEmbedUrl`
5. Copia la URL de compartir → `googleMapsPlaceUrl`

## 5️⃣ Listo! 🎉

Tu tarjeta de invitación está lista. Solo edita el archivo de configuración y agrega tus recursos.

---

**¿Dudas?** Revisa el `README.md` para más detalles.

