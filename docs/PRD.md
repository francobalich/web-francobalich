# PRD: Portafolio Web — Franco Balich

**Versión**: 6.0  
**Fecha**: Mayo 2026  
**Dominio**: francobalich.com  
**Estado**: Fases 0–5 completadas. Fase 6 en planning.

---

## 1. Visión del Producto

Un portafolio personal de nivel profesional senior que funcione como hub central de identidad digital: comunica quién es Franco, valida su expertise, muestra su trabajo y lo posiciona como referente en tecnología, IoT, data y laboratorio creativo.

**No es** un currículum online estático.  
**Es** una plataforma de marca personal construida con el mismo estándar que los productos que Franco desarrolla.

---

## 2. Decisiones de Producto

| Decisión | Definición |
|----------|------------|
| Dominio principal | `francobalich.com` |
| Vanity URL | `links.francobalich.com` → redirect 301 a `/links` |
| Formulario de contacto | ❌ No — solo LinkedIn e Instagram |
| Dark/light mode | Dark fijo |
| Idioma | Español |
| Blog | Payload CMS v3 — publicar sin código ni deploy |
| Proyectos | Case studies (problema → enfoque → resultado) |
| Nombre sección blog | "Blog" — cubre noticias de IA, tutoriales de Arduino y programación |
| Analytics | Google Analytics 4 (GA4) — métricas de vistas y tráfico por red social |

---

## 3. Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS v4 + glassmorphismo custom |
| CMS | Payload CMS v3 — admin en `/admin` |
| Editor | Lexical (WYSIWYG integrado en Payload) |
| Base de datos | Supabase PostgreSQL |
| Storage | Supabase Storage (S3-compatible) — imágenes Y archivos adjuntos |
| Analytics | Google Analytics 4 via `@next/third-parties` |
| SEO / OG | Next.js Metadata API + `next/og` |
| Sitemap | `app/sitemap.ts` (incluye rutas de blog dinámicas) |
| Syntax highlighting | Shiki (server-side, sin JS en cliente) |
| Fuentes | Geist |
| Servidor | AWS EC2 + nginx + PM2 |
| SSL | Let's Encrypt (Certbot) |
| Deploy | GitHub Actions → EC2 automático en push a `main` |

---

## 4. Identidad Visual

- **Fondo**: `#09090B` (zinc-950) con mesh gradient azul/cyan sutil
- **Superficies**: glassmorphismo — `rgba(255,255,255,0.05)`, borde `rgba(255,255,255,0.12)`, blur 12px
- **Acento**: blue-500 / cyan-500
- **Tipografía**: Geist — display 700–800, headings 600, body 400
- **Animaciones**: FadeIn con Intersection Observer, `instant` para Hero. `prefers-reduced-motion` respetado.
- **Favicon**: pendiente de cambio — ver Fase 6

---

## 5. Rutas

```
/                    Home (Hero + previews)
/projects            Grid de proyectos
/talks               Charlas y eventos
/blog                Listado de posts (noticias IA, tutoriales Arduino, programación)
/blog/[slug]         Post individual con soporte de archivos adjuntos
/bio                 Biografía + Kit de prensa
/links               Hub de links
/admin               Payload CMS (protegido)
/sitemap.xml         Generado automáticamente
/robots.txt          Generado automáticamente
```

---

## 6. Blog — Tipos de contenido soportados

El blog ya soporta sin cambios de código:

| Tipo | Cómo |
|------|------|
| Artículo / opinión | Texto en editor Lexical |
| Noticia de IA | Texto + imagen de portada |
| Tutorial de Arduino | Texto + bloques de código (syntax highlight automático) |
| Tutorial de programación | Ídem + imágenes inline |
| Instructivo con archivos | Texto + link de descarga al archivo (PDF, ZIP, .ino) subido a Supabase Storage |

**Para subir un archivo adjunto a un post:**
1. `/admin` → Media → Upload (subir el archivo)
2. En el editor del post → insertar link → seleccionar el archivo subido
3. El archivo queda en Supabase Storage con URL permanente

---

## 7. Google Analytics 4 — Fase 6

### Objetivo
Saber qué páginas tienen más vistas, desde qué redes sociales llega el tráfico y qué contenido del blog genera más interés.

### Implementación
Usar `@next/third-parties` (paquete oficial de Next.js para terceros):

```bash
npm install @next/third-parties
```

En `app/(site)/layout.tsx`:
```tsx
import { GoogleAnalytics } from "@next/third-parties/google";

// dentro del <body>:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

El `gaId` (Measurement ID) se obtiene en Google Analytics 4 → Administrar → Streams de datos → Web.

### Métricas clave a revisar
- **Páginas más visitadas** → Informes → Interacción → Páginas y pantallas
- **Fuente de tráfico** (desde qué red llegaron) → Informes → Adquisición → Adquisición de tráfico
- **Tráfico por referral** (clicks desde Instagram/LinkedIn/Twitch) → mismo informe, canal "Referral"

### Pendiente
- [ ] Crear propiedad GA4 en analytics.google.com
- [ ] Obtener Measurement ID (`G-XXXXXXXXXX`)
- [ ] Agregar `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` al `.env.local` y al servidor EC2
- [ ] Instalar `@next/third-parties` y agregar `<GoogleAnalytics>` al layout
- [ ] Verificar que las vistas se registren en el dashboard de GA4

---

## 8. Favicon — Fase 6

### Situación actual
`app/favicon.ico` — 25KB, 16×16 y 32×32px. Es el favicon por defecto de Next.js.

### Qué necesita Franco
Proveer el diseño del ícono (iniciales "FB", símbolo del laboratorio, o logo personal).

### Archivos a generar (una vez que tenés el diseño)
| Archivo | Tamaño | Dónde va |
|---------|--------|----------|
| `favicon.ico` | 16×16 + 32×32 + 48×48px | `app/favicon.ico` (reemplazar) |
| `icon.svg` | SVG vectorial | `app/icon.svg` (nuevo) |
| `icon.png` | 512×512px | `app/icon.png` (nuevo) |
| `apple-icon.png` | 180×180px | `app/apple-icon.png` (nuevo) |

Next.js detecta estos archivos automáticamente y genera los meta tags correspondientes.  
Con solo reemplazar `app/favicon.ico` ya se actualiza el ícono en todos los navegadores.

### Herramienta recomendada
[favicon.io](https://favicon.io) — generás el `.ico`, `.png` y el SVG a partir de texto o imagen en segundos, sin costo.

---

## 9. SEO y Open Graph

### Por ruta
| Ruta | Title | OG image |
|------|-------|----------|
| `/` | Franco Balich — Full Stack Developer & Data Engineer | Estática (opengraph-image.tsx) |
| `/blog/[slug]` | [Título] — Franco Balich | Dinámica por post (next/og) |
| Resto | [Sección] — Franco Balich | Estática |

### Structured Data
- `/`: `Person` con sameAs (todas las redes)
- `/blog/[slug]`: `Article` con author, publisher, keywords, `isPartOf Blog`, inLanguage

### Metadata por post
`canonical`, `og:url`, `og:locale`, `og:publishedTime`, `og:modifiedTime`, `og:tags`, `twitter:card summary_large_image`

---

## 10. Blog — Flujo de publicación

```
1. francobalich.com/admin → login
2. Crear post → editor Lexical WYSIWYG
3. (Opcional) subir archivo adjunto a Media y linkearlo en el contenido
4. Publicar → Payload guarda en Supabase PostgreSQL / archivos en Supabase Storage
5. Hook afterChange → revalidatePath('/blog') y revalidatePath('/blog/[slug]')
6. Post online en segundos. Sin deploy.
```

**Syntax highlighting**: Shiki convierte bloques de código en el servidor al renderizar cada post.  
**ISR**: las páginas se cachean y se revalidan a demanda (+ fallback cada 1h).

---

## 11. Performance y Calidad

| Métrica | Estado actual (dev) | Target (prod) |
|---------|-------------------|---------------|
| Lighthouse Performance | 78–82 | ≥ 90 |
| Lighthouse SEO | 100 ✅ | 100 |
| Lighthouse Accessibility | 100 ✅ | 100 |
| Lighthouse Best Practices | 100 ✅ | 100 |
| Color contrast | Pasando WCAG AA ✅ | WCAG AA |

---

## 12. Pendientes técnicos

- [ ] **Google Analytics** — instalar `@next/third-parties`, agregar `<GoogleAnalytics>` al layout con el Measurement ID
- [ ] **Favicon** — reemplazar `app/favicon.ico` con diseño propio + agregar `icon.svg`, `icon.png`, `apple-icon.png`
- [ ] **Deploy** `feature/add-blog` → `main` → producción
- [ ] **Vanity redirect** `links.francobalich.com` → `/links` (nginx en EC2)
- [ ] **Testing** en Safari y Firefox (desktop + mobile)
- [ ] **UptimeRobot** para monitoreo de uptime

## 13. Pendientes de contenido

Ver `CONTENT.md` para el detalle completo.

- [ ] Descripciones y URLs reales de los 6 proyectos (`data/projects.ts`)
- [ ] Charlas y eventos (`data/talks.ts`)
- [ ] Posts del blog vía `/admin`
- [ ] 6 imágenes de proyectos en `/public/images/projects/`
- [ ] 6 fotos para galería en `/public/images/gallery/`
- [ ] `press-kit.zip` en `/public/press/`

---

## 14. Mejoras Planificadas — Blog (Fase 7)

### 14.1 Índice lateral (Table of Contents)
Parsear los headings `<h2>` y `<h3>` del contenido renderizado y mostrar un índice sticky en el lateral derecho del post. Highlight del heading activo según scroll con IntersectionObserver.

### 14.2 Posts recomendados por tags
Al pie de cada post, mostrar 2–3 posts que compartan al menos un tag con el post actual. Query a Payload filtrando por tags, excluyendo el post actual.

### 14.3 Tags reutilizables con autocompletado
Extraer los tags a una colección propia (`Tags`) y reemplazar el campo de texto libre por una relación many-to-many. El admin de Payload mostraría autocompletado con los tags existentes al escribir.

### 14.4 UI de tags más compacta en el admin
Customizar el componente del campo `tags` en Payload admin para que ocupe menos espacio vertical. Requiere un custom field component en React.

### 14.5 Logo e identidad visual propia
Diseñar un símbolo/logo personal (iniciales "FB" o símbolo del laboratorio) para reemplazar el favicon genérico de Next.js. Ver sección 8 (Favicon) para los formatos requeridos.

---

## 15. Fuera de Alcance

- Formulario de contacto
- Modo claro
- Internacionalización
- Comentarios en el blog
- E-commerce o pagos
- Multi-autor
