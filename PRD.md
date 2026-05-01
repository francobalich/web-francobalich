# PRD: Portafolio Web — Franco Balich

**Versión**: 5.0  
**Fecha**: Mayo 2026  
**Dominio**: francobalich.com  
**Estado**: Fases 0–5 completadas. Pendiente: contenido real y deploy a producción.

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
| Storage | Supabase Storage (S3-compatible) |
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
- **Superficies**: glassmorphismo — `rgba(255,255,255,0.04)`, borde `rgba(255,255,255,0.08)`, blur 12px
- **Acento**: blue-500 / cyan-500
- **Tipografía**: Geist — display 700–800, headings 600, body 400
- **Animaciones**: FadeIn con Intersection Observer, `instant` para Hero. `prefers-reduced-motion` respetado.

---

## 5. Rutas

```
/                    Home (Hero + previews)
/projects            Grid de proyectos
/talks               Charlas y eventos
/blog                Listado de posts
/blog/[slug]         Post individual
/bio                 Biografía + Kit de prensa
/links               Hub de links
/admin               Payload CMS (protegido)
/sitemap.xml         Generado automáticamente
/robots.txt          Generado automáticamente
```

---

## 6. Estado Actual — Pendientes

### Pendiente técnico
- [ ] Deploy `feature/add-blog` → `main` → producción
- [ ] Vanity redirect `links.francobalich.com` → `/links` (nginx en EC2)
- [ ] Testing en Safari y Firefox (desktop + mobile)
- [ ] UptimeRobot para monitoreo de uptime

### Pendiente contenido (necesita Franco)
- [ ] Datos reales en `data/projects.ts` (nombre, descripción, tags, URLs, imagen)
- [ ] Datos reales en `data/talks.ts` (evento, fecha, ciudad, slides)
- [ ] Imágenes de proyectos en `/public/images/projects/`
- [ ] `press-kit.zip` en `/public/press/`
- [ ] Logos de social proof para `/bio`
- [ ] Fotos para galería en `/bio`

---

## 7. SEO y Open Graph

### Por ruta
| Ruta | Title | OG image |
|------|-------|----------|
| `/` | Franco Balich — Full Stack Developer & Data Engineer | Estática (opengraph-image.tsx) |
| `/blog/[slug]` | [Título] — Franco Balich | Dinámica por post (next/og) |
| Resto | [Sección] — Franco Balich | Estática |

### Structured Data
- `/`: `Person` con sameAs (todas las redes)
- `/blog/[slug]`: `Article` con author, publisher, keywords, `isPartOf Blog`

### Metadata por post
`canonical`, `og:url`, `og:locale`, `og:publishedTime`, `og:modifiedTime`, `og:tags`, `twitter:card summary_large_image`

---

## 8. Blog — Flujo de publicación

```
1. francobalich.com/admin → login
2. Crear post → editor Lexical WYSIWYG
3. Publicar → Payload guarda en Supabase PostgreSQL
4. Hook afterChange → revalidatePath('/blog') y revalidatePath('/blog/[slug]')
5. Post online en segundos. Sin deploy.
```

**Syntax highlighting**: Shiki convierte bloques de código en el servidor al renderizar cada post.  
**ISR**: las páginas se cachean y se revalidan a demanda (+ fallback cada 1h).

---

## 9. Performance y Calidad

| Métrica | Estado actual (dev) | Target (prod) |
|---------|-------------------|---------------|
| Lighthouse Performance | 78–82 | ≥ 90 |
| Lighthouse SEO | 100 ✅ | 100 |
| Lighthouse Accessibility | 100 ✅ | 100 |
| Lighthouse Best Practices | 100 ✅ | 100 |
| Color contrast | Pasando WCAG AA ✅ | WCAG AA |

---

## 10. Fuera de Alcance

- Formulario de contacto
- Modo claro
- Internacionalización
- Comentarios en el blog
- E-commerce o pagos
- Multi-autor
