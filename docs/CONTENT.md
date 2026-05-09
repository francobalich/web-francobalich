# Checklist de Contenido — francobalich.com

Todo lo que hay que redactar y subir antes de ir a producción.  
Los archivos de código a editar están indicados en cada sección.

---

## 1. Proyectos → `data/projects.ts`

Cada proyecto necesita: **nombre**, **descripción** (1–2 oraciones, estilo case study: qué problema resuelve y cómo), **tags reales**, y opcionalmente **URL demo** y **URL repositorio**.

### InnovativalLab
```
description: "..."   ← ¿Qué es? ¿Qué problema resuelve?
tags: ["...", "..."] ← tecnologías reales usadas
demoUrl: ""          ← URL del sitio si está online
repoUrl: ""          ← URL del repo si es público
```

### Control Robots
```
description: "..."
tags: ["...", "..."]
demoUrl: ""
repoUrl: ""
```

### Disendum
```
description: "..."
tags: ["...", "..."]
demoUrl: ""
repoUrl: ""
```

### BS Dinner
```
description: "..."
tags: ["...", "..."]
demoUrl: ""
repoUrl: ""
```

### Alice
```
description: "..."
tags: ["...", "..."]
demoUrl: ""
repoUrl: ""
```

### LabFabId
```
description: "..."
tags: ["...", "..."]
demoUrl: ""
repoUrl: ""
```

---

## 2. Charlas y eventos → `data/talks.ts`

El array está vacío. Por cada participación completar:

```ts
{
  id: "1",
  title: "",       // título de la charla / workshop / panel
  event: "",       // nombre del evento o conferencia
  role: "speaker", // speaker | instructor | panelist | organizer
  date: "2024-MM-DD",
  location: "",    // ej. "Córdoba, Argentina"
  slidesUrl: "",   // opcional — enlace a slides
  videoUrl: "",    // opcional — enlace al video
  eventUrl: "",    // opcional — enlace al evento
  upcoming: false,
},
```

---

## 3. Posts del Blog → `/admin`

Los posts se crean desde `francobalich.com/admin` (Payload CMS), sin tocar código.  
Campos a completar por post: **título**, **slug**, **extracto** (1–2 oraciones), **tags**, **imagen de portada**, y el **contenido** en el editor WYSIWYG.

Ideas de posts basadas en tu perfil:

- Cómo montar un laboratorio creativo con hardware y software open source
- Python para IoT: de Arduino a servidor web en menos de 100 líneas
- Qué es un Data Pipeline y cómo construí el mío desde cero
- Enseñar tecnología en 2025: lo que aprendí con 120k seguidores
- Case study: LabFabId — identificación en laboratorios de fabricación
- De doctorando a creador de contenido: por qué ambas cosas se complementan

---

## 4. Imágenes de proyectos → `/public/images/projects/`

Una imagen por proyecto. Formato recomendado: JPG o WebP, 1200×630px (ratio 16:9) o 800×500px. Nombrar exactamente así:

```
/public/images/projects/innovativallab.jpg
/public/images/projects/control-robots.jpg
/public/images/projects/disendum.jpg
/public/images/projects/bs-dinner.jpg
/public/images/projects/alice.jpg
/public/images/projects/labfabid.jpg
```

Una vez subidas, agregar en `data/projects.ts`:
```ts
imageUrl: "/images/projects/innovativallab.jpg",
```

---

## 5. Fotos para galería → `/public/images/gallery/` *(o via Payload)*

6 fotos para la sección Galería en `/bio`. Pueden ser:
- Fotos en charlas o eventos
- Fotos en el laboratorio
- Fotos con equipos o proyectos

Formato: JPG o WebP, mínimo 800×600px, ratio 4:3. Nombrar:

```
/public/images/gallery/01.jpg
/public/images/gallery/02.jpg
/public/images/gallery/03.jpg
/public/images/gallery/04.jpg
/public/images/gallery/05.jpg
/public/images/gallery/06.jpg
```

Una vez subidas, reemplazar en `app/(site)/bio/page.tsx` los divs placeholder por `<Image>` con el path correspondiente.

---

## 6. Kit de prensa → `/public/press/press-kit.zip`

El ZIP debe incluir:

- `franco-balich-foto-oficial.jpg` — foto de alta resolución (mínimo 1200×1200px)
- `bio-corta.txt` — la bio corta (~100 palabras)
- `bio-larga.txt` — la bio larga (~300 palabras)
- `logo-negro.svg` o `.png` — logo si existe
- `logo-blanco.svg` o `.png` — versión blanca del logo si existe

Ruta final: `/public/press/press-kit.zip`

---

## 7. Perfil foto hero → ya subida ✅

`/public/images/profile/franco.jpeg` — ya existe.  
Si querés actualizarla, reemplazar el archivo con el mismo nombre.

---

## Resumen rápido

| Qué | Dónde editarlo | Estado |
|-----|---------------|--------|
| Descripciones de 6 proyectos | `data/projects.ts` | ⬜ pendiente |
| URLs demo/repo de proyectos | `data/projects.ts` | ⬜ pendiente |
| Tags reales de proyectos | `data/projects.ts` | ⬜ pendiente |
| Charlas y eventos | `data/talks.ts` | ⬜ pendiente |
| Posts del blog | `/admin` en el sitio | ⬜ pendiente |
| 6 imágenes de proyectos | `/public/images/projects/` | ⬜ pendiente |
| 6 fotos para galería bio | `/public/images/gallery/` | ⬜ pendiente |
| press-kit.zip | `/public/press/` | ⬜ pendiente |
| Foto perfil hero | `/public/images/profile/` | ✅ lista |
