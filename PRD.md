# PRD: Portafolio Web — Franco Balich

**Versión**: 4.0  
**Fecha**: Abril 2026  
**Autor**: Franco Balich  
**Estado**: Definición completa — stack cerrado, listo para desarrollo  
**Dominio**: francobalich.com

---

## 1. Visión del Producto

Un portafolio personal de nivel profesional senior que funcione como hub central de identidad digital: comunica quién es Franco, valida su expertise, muestra su trabajo y lo posiciona como referente en tecnología, IoT, data y laboratorio creativo.

**No es** un currículum online estático.  
**Es** una plataforma de marca personal construida con el mismo estándar que los productos que Franco desarrolla.

---

## 2. Decisiones de Producto (cerradas)

| Decisión | Definición | Razón |
|----------|------------|-------|
| Dominio principal | `francobalich.com` | Todo el contenido bajo un dominio acumula autoridad SEO |
| Subdominio contenido | ❌ No — usar `/ruta` | `blog.francobalich.com` = sitio separado para Google, autoridad cero |
| Vanity URL | `links.francobalich.com` → redirect 301 a `/links` | Para bio de Instagram: corta, de marca, sin costo SEO |
| Formulario de contacto | ❌ No — solo LinkedIn e Instagram | Email eliminado para evitar scraping y spam |
| Dark/light mode | Dark fijo | Identidad visual de marca |
| Blog contenido inicial | Sin posts — empty state elegante | Infraestructura lista para escribir |
| Proyectos | Cards placeholder — completar en fase 2 | Lanzar rápido, completar después |
| Proyectos: formato | Case studies (problema → enfoque → resultado) | Patrón validado: reclutadores evalúan el razonamiento, no solo el resultado |
| Foto de perfil | Disponible — cargar en Fase 1 | |
| Idioma | Español | |
| Responsive | Mobile-first | Obligatorio |
| Social proof | Logos de eventos y organizaciones en `/bio` | Valida autoridad al primer vistazo |
| CTA charlas | Sección explícita "Invitame a hablar" en `/bio` | Patrón de speakers exitosos: no esconder el CTA |

---

## 3. Stack Tecnológico

| Capa | Tecnología | Razón |
|------|------------|-------|
| Framework | Next.js 16 (App Router) | SSG/SSR, SEO nativo, OG dinámico |
| UI | React 19 | Componentes modernos |
| Estilos | Tailwind CSS v4 | Glassmorphismo con utilidades |
| Lenguaje | TypeScript | Calidad de código, datos tipados |
| CMS | Payload CMS v3 | Panel admin dentro del Next.js, live preview, publicar sin deploy ni código |
| Editor de blog | Lexical | WYSIWYG integrado en Payload — negrita, listas, código, imágenes, headings, live preview |
| Base de datos | Supabase (PostgreSQL) | Posts, drafts y usuarios del admin. POC: free tier → Producción: $25/mes |
| Storage / Imágenes | Supabase Storage | Imágenes subidas desde el editor. POC: free tier (1GB) → Producción: $25/mes |
| Autenticación | Supabase Auth | Sistema único de auth: email/password + OAuth (Google, GitHub, etc.) para acceder al admin |
| SEO / OG Images | Next.js Metadata API + `next/og` | Metadata por ruta, OG dinámico por post del blog |
| Sitemap | `app/sitemap.ts` nativo | Incluye rutas de blog generadas desde Supabase |
| Fuentes | Geist | Moderna, técnica, legible — ya configurada en el proyecto |
| Servidor web | nginx + PM2 | Reverse proxy + proceso Node.js persistente en EC2 |
| SSL | Let's Encrypt (Certbot) | HTTPS gratuito, renovación automática |
| Deploy | AWS EC2 | Hosting propio, control total, sin vendor lock-in |

---

## 4. Identidad Visual

### Paleta de colores

```
Fondo base:          #09090B  (zinc-950)
Superficie glass:    rgba(255, 255, 255, 0.04)
Borde glass:         rgba(255, 255, 255, 0.08)
Texto principal:     #F4F4F5  (zinc-100)
Texto secundario:    #71717A  (zinc-500)
Acento azul:         #3B82F6  (blue-500)
Acento cyan:         #06B6D4  (cyan-500)
Gradiente hero:      from-blue-600/20 via-transparent to-cyan-600/10
Hover glow:          blue-500/20 blur-xl
```

### Glassmorphismo — regla base

Todos los elementos "card" siguen esta receta:
- `background`: `rgba(255,255,255,0.04)`
- `border`: `1px solid rgba(255,255,255,0.08)`
- `backdrop-filter`: `blur(12px)`
- `border-radius`: `16px`
- Hover: el borde sube a `rgba(59,130,246,0.3)` (azul) con transición suave

### Tipografía

- **Display / Hero**: Geist, peso 700-800, tamaño grande (clamp responsive)
- **Headings**: Geist, peso 600
- **Body**: Geist, peso 400, zinc-400 para texto secundario
- **Código**: Geist Mono

### Efectos globales

- Fondo con mesh gradient sutil (dots o noise) para romper el negro plano
- Glow azul/cyan detrás de elementos hero y cards destacadas
- Scroll suave (`scroll-behavior: smooth`)
- Animaciones de entrada: `opacity 0→1` + `translateY 20px→0` al entrar al viewport
- Microinteracciones en hover de cards y botones

---

## 5. Arquitectura de Rutas

```
francobalich.com/
│
├── /                    Página principal (one-page con anclas)
│     ├── #hero          ¿Quién soy? — nombre, roles, foto, socials
│     ├── #projects      Grid de proyectos (preview — 6 cards)
│     ├── #talks         Charlas y eventos (preview — últimas 3)
│     └── #blog          Últimos posts (preview — últimas 3 entradas)
│
├── /bio                 Biografía completa + Kit de prensa
├── /projects            Grid completo de proyectos
├── /talks               Listado completo de charlas y eventos
├── /blog                Listado de todos los posts
├── /blog/[slug]         Post individual
├── /links               Hub de links (estilo Linktree)
│
└── (internos)
      /og                Endpoint generador de OG images dinámicas
      /sitemap.xml       Generado automáticamente
      /robots.txt        Generado automáticamente
```

---

## 6. Descripción Detallada de Secciones

---

### 6.1 Navbar

**Comportamiento**:
- Fixed en la parte superior con glass effect (`backdrop-blur-md bg-zinc-950/80`)
- Logo "Franco Balich" a la izquierda (texto, no imagen)
- Links de navegación a la derecha: Proyectos · Charlas · Blog · Bio
- En mobile: hamburger menu que despliega menú full-screen con animación
- Activo: el link de la sección visible se resalta con `text-blue-400`
- Al hacer scroll > 50px: añade borde inferior sutil

**Links del Navbar**:
```
Proyectos → /projects
Charlas   → /talks
Blog      → /blog
Bio       → /bio
```

---

### 6.2 Hero — "¿Quién soy?" (`#hero`)

**Layout**: Dos columnas en desktop (texto izq, foto der) → una columna en mobile (foto arriba centrada, texto abajo)

**Contenido**:
```
[Badge] "Director del Laboratorio Creativo 3D"

Hola, soy
Franco Balich

Full Stack Developer
Data Engineer · Doctorando en Informática

[Párrafo corto]
Desarrollo soluciones tecnológicas en la intersección
del software, los datos y el hardware. Lidero el
Laboratorio Creativo 3D donde construimos proyectos
con impacto real.

[Botones]
→ Ver proyectos       (primario, azul)
→ Descargar bio       (secundario, glass)

[Íconos sociales]
GitHub · LinkedIn · Instagram · Twitch · Email
```

**Foto de perfil**:
- Imagen circular o con border-radius grande
- Borde glass con glow azul sutil
- Frame con gradiente animado opcional (rotar hue)
- `next/image` con priority=true

**Animaciones**:
- Nombre aparece con stagger (letra por letra o línea por línea)
- Subtítulos aparecen con delay escalonado
- Foto entra desde la derecha con `translateX`

---

### 6.3 Proyectos (`/projects` + preview en `#projects`)

**Formato validado**: Cada proyecto como **case study**, no solo una card con imagen. Los reclutadores y colaboradores valoran entender el razonamiento, no solo ver el resultado.

**Layout**: Grid 3 columnas desktop → 2 tablet → 1 mobile

**Card de proyecto** (glass) — vista listado:
```
┌──────────────────────────┐
│   [Imagen / captura]     │
├──────────────────────────┤
│  Nombre del proyecto     │
│  Descripción corta       │
│                          │
│  [Python] [IoT] [React]  │
│                          │
│  [Demo ↗]  [Código ↗]   │
└──────────────────────────┘
```

**Página individual** `/projects/[slug]` (fase 2):
```
Problema    → Qué necesitaba resolver
Enfoque     → Cómo lo encaré / decisiones técnicas
Resultado   → Qué logré, métricas si las hay
Stack       → Tecnologías usadas
Links       → Demo + Repo
```

**Datos** (en `/data/projects.ts`):
- `id`, `name`, `slug`, `description`
- `problem`, `approach`, `outcome` (para case study)
- `tags: string[]`
- `imageUrl`, `demoUrl`, `repoUrl`
- `featured: boolean`
- `status: "published" | "wip" | "coming-soon"`

**Proyectos iniciales**: 6 cards con datos placeholder. Páginas individuales en Fase 2.

**En la home**: Preview de los 3 `featured: true` + botón "Ver todos".

---

### 6.4 Charlas y Eventos (`/talks` + preview en `#talks`)

**Propósito**: Validar presencia pública y actividad en la comunidad tech.

**Card de charla** (glass, horizontal en desktop):
```
┌─────────────────────────────────────────────────┐
│  [Próximo] / [Pasado]    Fecha · Ciudad          │
│  Nombre del Evento                               │
│  Nombre de la charla / workshop                  │
│  Rol: Speaker · Instructor · Panelista           │
│                          [Ver slides ↗] [Evento ↗]│
└─────────────────────────────────────────────────┘
```

**Datos** (en `/data/talks.ts`):
- `title` (nombre de la charla)
- `event` (nombre del evento)
- `role: "speaker" | "instructor" | "panelist" | "organizer"`
- `date`, `location`
- `slidesUrl?`, `eventUrl?`, `videoUrl?`
- `upcoming: boolean`

**Agrupación**: Próximos primero (badge azul), luego pasados ordenados por fecha desc.

**En la home**: Preview de los 3 más recientes o próximos + botón "Ver todos".

---

### 6.5 Blog (`/blog` + `/blog/[slug]` + preview en `#blog`)

**CMS**: Payload CMS v3, corriendo dentro del mismo Next.js en `francobalich.com/admin`.

**Flujo de publicación (sin tocar código ni hacer deploy)**:
```
1. Entrás a francobalich.com/admin
2. Login con tu cuenta (Payload Auth)
3. Creás un post nuevo → editor Lexical WYSIWYG
4. El panel muestra un iframe con el post en tiempo real mientras escribís
5. Subís imágenes → van a AWS S3 automáticamente
6. Publicás → PostgreSQL guarda el post
7. Next.js recibe webhook → revalida la ruta al instante
8. francobalich.com/blog/tu-post está online. Sin deploy.
```

**Panel admin** (`/admin`):
- Editor Lexical: negrita, itálica, listas, links, bloques de código, imágenes, headings
- Live preview: iframe del post real mientras escribís
- Campos: título, slug (auto-generado), excerpt, tags, cover image, fecha, estado (borrador / publicado)
- Gestión de imágenes integrada con S3
- Sin login externo: Payload maneja la autenticación

**Card de post en listado** (glass):
```
┌──────────────────────────┐
│   [Cover image]          │
├──────────────────────────┤
│  01 ABR 2026  · 5 min    │
│  Título del post         │
│  Excerpt corto...        │
│  [IoT] [Python]          │
└──────────────────────────┘
```

**Página de post individual**:
- Layout centrado, ancho máximo 680px, tipografía para lectura
- Header: título + fecha + tiempo de lectura + tags
- Cover image full-width
- Syntax highlighting de bloques de código
- Footer del post: links para compartir en Twitter/X y LinkedIn
- Navegación: post anterior / post siguiente

**Estado inicial**: Sin posts publicados → empty state elegante:
```
"El blog está en camino.
Mientras tanto, seguí mi contenido en Instagram y Twitch."
[Links a redes]
```

**OG dinámica por post**: Generada con `next/og` usando título, fecha y branding.

**En la home**: Si hay posts, muestra los últimos 3. Si no, muestra el empty state.

---

### 6.6 Biografía + Kit de Prensa (`/bio`)

**Propósito**: Que organizadores de eventos y medios tengan todo lo necesario sin pedírselo a Franco.

**Estructura de la página**:

#### Bloque 1 — Presentación
- Foto oficial (alta calidad)
- Nombre completo y títulos
- Bio corta (100 palabras) con botón "Copiar"
- Bio larga (300 palabras) con botón "Copiar"

#### Bloque 2 — Áreas de expertise
Lista de tags/badges:
```
Full Stack Development · Data Engineering · IoT · 
Investigación Académica · Laboratorio Creativo 3D ·
Creación de Contenido · Python · Arduino
```

#### Bloque 3 — Galería de Fotos
- Grid de fotos en eventos, charlas, laboratorio
- Cada foto con: descripción, evento, año, crédito fotográfico
- Hover: overlay con opción "Descargar foto"
- Fotos servidas en alta resolución al descargar

#### Bloque 4 — Kit de Prensa
```
┌────────────────────────────────────────────────┐
│  Kit de Prensa — Franco Balich                 │
│  Incluye: foto oficial · bio en .txt · logos   │
│                                                │
│       [Descargar Kit (.zip) ↓]                 │
└────────────────────────────────────────────────┘
```

#### Bloque 4.5 — Social proof (validado en casos de éxito)
- Logos de eventos y organizaciones donde Franco habló o participó
- Si hay menciones en medios o prensa, logos + links
- Fila de logos en escala de grises (se ven bien sobre fondo dark)

#### Bloque 5 — CTA para invitaciones a hablar
```
┌────────────────────────────────────────────────┐
│  ¿Querés invitarme a hablar?                   │
│  Doy charlas sobre IoT, datos, laboratorios    │
│  de innovación y desarrollo de software.       │
│                                                │
│  Escribime a franco@francobalich.com            │
│  o por LinkedIn                                │
└────────────────────────────────────────────────┘
```
- Este CTA es **explícito y visible**, no escondido al final
- Patrón validado: speakers exitosos como kentcdodds, cassidoo lo tienen prominente

#### Bloque 6 — Kit de Prensa
```
┌────────────────────────────────────────────────┐
│  Kit de Prensa — Franco Balich                 │
│  Incluye: foto oficial · bio en .txt · logos   │
│                                                │
│       [Descargar Kit (.zip) ↓]                 │
└────────────────────────────────────────────────┘
```

#### Bloque 7 — Links y redes
- Email directo (texto, sin formulario)
- Todos los links de redes sociales

---

### 6.7 Hub de Links (`/links`)

**Propósito**: Un solo link para poner en la bio de Instagram, TikTok, etc.

**Diseño**: Página full-screen, dark, centrada verticalmente. Logo/nombre arriba, lista de links abajo como cards glass.

```
Franco Balich

[GitHub          →]
[LinkedIn        →]
[Instagram       →]
[Twitch          →]
[Email           →]
[Ver portafolio  →]
[Descargar bio   →]
```

**Sin Navbar ni Footer** — página autónoma, ultra limpia.

---

### 6.8 Footer

Presente en todas las rutas excepto `/links`.

```
Franco Balich                    GitHub · LinkedIn · Instagram · Twitch · Email

© 2026 Franco Balich             [↑ Volver al inicio]
```

Línea de borde glass superior. Fondo mismo que el body (zinc-950).

---

## 7. SEO y Open Graph

### Metadata por ruta

| Ruta | Title | Description |
|------|-------|-------------|
| `/` | Franco Balich — Full Stack Developer & Data Engineer | Bio corta |
| `/bio` | Biografía — Franco Balich | Kit de prensa y recursos para medios |
| `/projects` | Proyectos — Franco Balich | Descripción del trabajo |
| `/talks` | Charlas y Eventos — Franco Balich | Historial y próximos eventos |
| `/blog` | Blog — Franco Balich | Descripción del blog |
| `/blog/[slug]` | [Título del post] — Franco Balich | excerpt del post |
| `/links` | Franco Balich — Links | Todos los links en un lugar |

### Open Graph Images

**Estáticas** (diseñadas una vez, en `/public/og/`):
- `og-home.png` — para `/`, `/projects`, `/talks`, `/bio`

**Dinámicas** (generadas en runtime con `next/og`):
- `/blog/[slug]` → genera OG con: título del post + "Franco Balich" + branding dark/blue

**Especificación OG**:
```
og:image size: 1200x630px
Campos: og:title, og:description, og:image, og:url, og:type
Twitter: twitter:card = summary_large_image, twitter:creator = @francobalich
```

### Structured Data (JSON-LD)

- **`/`**: tipo `Person` con name, url, sameAs (todas las redes)
- **`/blog/[slug]`**: tipo `Article` con headline, author, datePublished, image
- **`/talks`**: tipo `Event` por cada charla próxima

### Sitemap y Robots

- `app/sitemap.ts`: genera automáticamente rutas estáticas + todas las rutas de blog
- `app/robots.ts`: permite todo, apunta a sitemap
- Canonical URLs: siempre `https://francobalich.com/ruta`

---

## 8. Responsive — Mobile First

| Breakpoint | Comportamiento |
|------------|---------------|
| < 640px (mobile) | 1 columna, Navbar colapsada en hamburger, hero vertical |
| 640–1024px (tablet) | 2 columnas en grids, Navbar visible |
| > 1024px (desktop) | Layout completo, 3 columnas donde corresponde |

**Reglas obligatorias**:
- Touch targets mínimo 44px de alto en mobile
- Texto nunca menor a 16px en body
- Imágenes con `sizes` attr en `next/image` para responsive
- Hero: foto arriba centrada en mobile, texto debajo
- Navbar mobile: menú full-screen con lista vertical y cierre

---

## 9. Accesibilidad

- Contraste mínimo WCAG AA en todo el texto
- Todos los íconos con `aria-label`
- Imágenes con `alt` descriptivo
- Navegación posible 100% con teclado
- `prefers-reduced-motion`: desactivar animaciones si el usuario lo configura
- Landmark HTML semántico: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`

---

## 10. Performance

| Métrica | Objetivo |
|---------|----------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Imágenes | Formato WebP/AVIF con `next/image` |
| Fuentes | Display swap, preload de Geist |

---

## 11. Estructura de Archivos

```
app/
  layout.tsx                ← Root layout, metadata base, font
  page.tsx                  ← Home (Hero + previews)
  globals.css               ← Tailwind + design tokens
  robots.ts                 ← robots.txt
  sitemap.ts                ← sitemap.xml dinámico (incluye rutas de blog desde DB)
  og/route.tsx              ← Generador OG images dinámicas
  (admin)/                  ← Payload CMS admin panel (Next.js route group)
    [[...segments]]/
      page.tsx              ← Payload admin UI en /admin
  bio/
    page.tsx
  projects/
    page.tsx
  talks/
    page.tsx
  blog/
    page.tsx                ← Lista posts desde Payload/PostgreSQL
    [slug]/
      page.tsx              ← Post individual con on-demand revalidation
  links/
    page.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      MobileMenu.tsx
    ui/
      GlassCard.tsx         ← Card glass reutilizable
      Badge.tsx             ← Tags y badges
      SocialLinks.tsx       ← Íconos de redes
    sections/
      Hero.tsx
      ProjectsPreview.tsx
      TalksPreview.tsx
      BlogPreview.tsx
    projects/
      ProjectCard.tsx
      ProjectGrid.tsx
    talks/
      TalkCard.tsx
      TalkList.tsx
    blog/
      PostCard.tsx
      PostList.tsx
      PostHeader.tsx
    bio/
      BioText.tsx
      PhotoGallery.tsx
      PressKit.tsx

payload/
  payload.config.ts         ← Configuración de Payload CMS
  collections/
    Posts.ts                ← Colección de posts del blog
    Media.ts                ← Gestión de imágenes (S3)
    Users.ts                ← Usuarios del admin

data/
  projects.ts               ← Array tipado de proyectos (archivos, no DB)
  talks.ts                  ← Array tipado de charlas (archivos, no DB)
  social.ts                 ← Links de redes (una sola fuente de verdad)

public/
  images/
    profile/                ← Foto de perfil
    projects/               ← Capturas de proyectos
    press/                  ← Fotos para kit de prensa / bio
  og/
    og-default.png          ← OG image estática por defecto
  press/
    press-kit.zip           ← Kit descargable

# Supabase (POC) → producción: Cloudflare R2 o AWS S3
  supabase storage bucket   ← Imágenes subidas desde el editor de Payload
```

---

## 12. Plan de Desarrollo

> **Estado al 30 de abril 2026**: Fases 1, 2 y 3 completadas. Sitio online en `francobalich.com` con HTTPS. CI/CD pendiente.

---

### Fase 0 — Infraestructura y Entorno Local ✅ (CI/CD pendiente)
**Objetivo**: Entorno local funcionando para desarrollar, y entorno productivo listo para deployar.

**Entorno local**
- [x] Clonar repo, instalar dependencias (`npm install`)
- [x] Verificar `npm run dev` → `localhost:4135` corre correctamente
- [ ] Crear `.env.example` con todas las variables necesarias (sin valores reales)
- [ ] Verificar `localhost:4135/admin` accesible (pendiente — Payload no instalado aún)

**Supabase (configurar antes de Fase 4)**
- [ ] Crear proyecto en Supabase (free tier)
- [ ] Copiar `DATABASE_URL` → `.env.local`
- [ ] Crear bucket en Supabase Storage para imágenes del blog
- [ ] Copiar `SUPABASE_URL` y `SUPABASE_ANON_KEY` → `.env.local`

**AWS EC2** ✅
- [x] Configurar instancia EC2
- [x] Instalar Node.js, npm, PM2, nginx, Certbot
- [x] Configurar nginx como reverse proxy → Next.js
- [x] SSL con Let's Encrypt — `francobalich.com` con HTTPS
- [x] Apuntar dominio `francobalich.com` → IP pública de la EC2
- [x] Configurar variables de entorno de producción en el servidor

**CI/CD** ← pendiente
- [ ] GitHub Actions: push a `main` → build → deploy automático a EC2 vía SSH
- [ ] Verificar que el deploy automático funciona end-to-end

**Flujo de trabajo durante el desarrollo**
```
Desarrollar en local (npm run dev)
  → git push main
  → GitHub Actions deploya a EC2 automáticamente
  → francobalich.com actualizado
```

---

### Fase 1 — MVP: Design System + Home ✅
**Objetivo**: La home es el MVP. Online, diseño glassmorphism completo, posicionada en Google.

**Design system** ✅
- [x] Design tokens en Tailwind: paleta dark/blue/cyan, glass mixin, sombras, tipografía
- [x] Componente `GlassCard` base reutilizable (backdrop-blur, borde semitransparente, hover glow)
- [x] Componente `Badge` para tags y estados
- [x] Componente `SocialLinks` con íconos SVG inline

**Layout** ✅
- [x] Navbar fija con glass effect — links de navegación desktop
- [x] Hamburger menu full-screen para mobile
- [x] Footer con redes y volver al inicio

**Secciones de la home** ✅
- [x] Hero: nombre, roles, foto de perfil, íconos sociales, CTAs
- [x] Proyectos: 6 cards placeholder con `data/projects.ts`
- [x] Charlas: preview 3 items con `data/talks.ts` (empty state)
- [x] Blog: empty state elegante (sin posts aún)
- [x] `data/social.ts` con todos los links de redes (sin email — decisión de producto)

**SEO** ✅
- [x] Metadata base, OG image generada con `next/og`, `robots.ts`, `sitemap.ts`
- [x] JSON-LD tipo `Person` en la home
- [ ] Responsive: validar mobile 375px + tablet 768px + desktop 1440px (pendiente testing formal)
- [ ] Deploy automático vía GitHub Actions (CI/CD pendiente)

---

### Fase 2 — Secciones y Contenido Real ✅ (contenido pendiente)
**Objetivo**: Todas las rutas funcionando con información real de Franco.

- [x] Página `/projects` — grid completo con `data/projects.ts`
- [x] Página `/talks` — listado con agrupación próximos/pasados, empty state
- [x] Página `/links` — hub estilo Linktree, sin navbar ni footer
- [ ] Datos reales de proyectos en `data/projects.ts` (imágenes, URLs, descripciones)
- [ ] Datos reales de charlas en `data/talks.ts`
- [ ] Imágenes reales de proyectos en `/public/images/projects/`
- [ ] Vanity URL `links.francobalich.com` → redirect 301 a `/links`

---

### Fase 3 — Bio y Kit de Prensa ✅ (contenido pendiente)
**Objetivo**: Organizadores de eventos y medios tienen todo sin pedirlo por DM.

- [x] Página `/bio` — bio corta (~100 palabras) y larga (~300 palabras) con botón "Copiar"
- [x] Sección de áreas de expertise (badges)
- [x] CTA explícito "Invitame a hablar" con LinkedIn e Instagram (email eliminado)
- [x] Botón "Descargar Kit de Prensa" — estructura lista, falta el archivo ZIP
- [-] Social proof — sección placeholder, pendiente logos de eventos reales
- [-] Galería de fotos — sección placeholder, pendiente fotos reales
- [ ] Subir `press-kit.zip` a `/public/press/`
- [ ] OG image específica para `/bio`

---

### Fase 4 — Blog con Payload CMS + Supabase
**Objetivo**: Panel de escritura online, publicar posts sin tocar código ni hacer deploy.

**Setup Payload + Supabase**
- [ ] Instalar Payload CMS v3 en el proyecto Next.js
- [ ] Conectar Payload a Supabase PostgreSQL vía `DATABASE_URL`
- [ ] Configurar adaptador de Supabase Storage para imágenes del editor
- [ ] Proteger ruta `/admin` con autenticación de Payload

**Colecciones de Payload**
- [ ] Colección `Posts`: título, slug, excerpt, cover, tags, cuerpo (Lexical), estado (borrador/publicado)
- [ ] Colección `Media`: imágenes subidas a Supabase Storage desde el editor

**Blog público** (rutas ya creadas — falta conectar con Payload)
- [x] Página `/blog` — listado + empty state
- [x] Página `/blog/[slug]` — layout de lectura 680px, JSON-LD Article, compartir, prev/next
- [x] `data/blog.ts` — interface `Post`, helpers `readingTime()` y `formatDate()`
- [ ] Reemplazar array estático por fetch a Payload/Supabase
- [ ] Syntax highlighting en bloques de código
- [ ] Live preview en el admin
- [ ] Webhook: publicar → Next.js revalida la ruta al instante
- [ ] OG image dinámica por post con `next/og`
- [ ] Sitemap actualizado con rutas de blog desde Supabase

**Resultado**: Panel en `francobalich.com/admin`. Escribís, publicás, el post aparece online en segundos.

---

### Fase 5 — Pulimiento y Producción
**Objetivo**: Calidad de producción. Lighthouse ≥ 90 en todo.

- [ ] Animaciones de entrada (Intersection Observer, sin dependencias pesadas)
- [ ] `prefers-reduced-motion` respetado en todas las animaciones
- [ ] Lighthouse audit por ruta → corregir hasta ≥ 90 Performance, SEO, Accessibility
- [ ] Testing en Safari, Firefox y Chrome — desktop y mobile
- [ ] Testing manual en iPhone (Safari) y Android (Chrome)
- [ ] Configurar UptimeRobot para monitoreo de uptime
- [ ] Revisar todos los `aria-label`, `alt` y semántica HTML

**Resultado**: Producto terminado, con calidad de producción real.

---

## 13. Fuera de Alcance

- Formulario de contacto (solo email directo y redes)
- Modo claro (dark fijo por decisión de marca)
- Internacionalización
- Comentarios en el blog
- Analítica avanzada (opcional en Fase 5)
- E-commerce o pagos
- Editor colaborativo multi-autor (Payload maneja un solo usuario admin)

---

## 14. Métricas de Éxito

| Qué | Cómo medirlo | Target |
|-----|-------------|--------|
| SEO | Google Search Console → posición para "Franco Balich" | Top 3 |
| Performance | Lighthouse audit por ruta | ≥ 90 todas |
| Accesibilidad | Lighthouse | ≥ 95 |
| OG correcto | Verificar con metatags.io | 100% rutas principales |
| Mobile | Prueba manual en iPhone y Android | Sin scroll horizontal |
| Uptime | AWS CloudWatch o UptimeRobot | 99.9% |
