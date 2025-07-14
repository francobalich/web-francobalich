# PRD: Modernización Portafolio Franco Balich

## 📋 Resumen Ejecutivo

**Objetivo**: Modernizar y actualizar el portafolio web de Franco Balich manteniendo el stack actual (Node.js/Express/EJS), mejorando contenido, diseño, eficiencia, seguridad y actualizando todas las dependencias.

**Problema**: El portafolio actual tiene dependencias desactualizadas (2022), vulnerabilidades de seguridad, imágenes no optimizadas, diseño desactualizado y contenido obsoleto.

**Solución**: Actualización completa de dependencias, modernización del diseño, optimización de rendimiento, actualización de contenido y eliminación de vulnerabilidades de seguridad.

## 🎯 Objetivos del Proyecto

### Objetivos Primarios
- ✅ Actualizar todas las dependencias a versiones actuales y seguras
- ✅ Eliminar vulnerabilidades de seguridad
- 🔄 Modernizar diseño y experiencia de usuario
- 🔄 Actualizar contenido personal y profesional
- 🔄 Optimizar rendimiento y carga del sitio
- ✅ Mejorar SEO y accesibilidad

### Objetivos Secundarios
- Implementar mejores prácticas de desarrollo
- Añadir funcionalidades modernas (dark mode, mejor responsive)
- Optimizar imágenes y assets
- Mejorar formulario de contacto

## 👤 Análisis de Usuario

### Persona Principal
- **Reclutadores técnicos**: Buscan evaluar habilidades y experiencia actuales
- **Colaboradores potenciales**: Quieren conocer proyectos y capacidades recientes
- **Estudiantes/Seguidores**: Buscan contenido educativo y recursos actualizados

### Necesidades del Usuario
- Navegación rápida y intuitiva
- Información actualizada sobre experiencia y proyectos
- Contacto fácil y directo
- Visualización de trabajos recientes
- Acceso a redes sociales y contenido actual

## 🔧 Stack Tecnológico (Mantenido)

### Backend
- **Framework**: Node.js + Express.js (actualizado)
- **Motor de plantillas**: EJS (mantenido)
- **Email**: Nodemailer (actualizado)
- **Servidor**: HTTP nativo de Node.js

### Frontend
- **CSS**: CSS moderno + variables CSS
- **JavaScript**: Vanilla JS moderno (ES6+)
- **Responsive**: CSS Grid + Flexbox
- **Iconos**: Actualizados a versiones recientes

### Herramientas de Desarrollo
- **Linting**: ESLint (actualizado)
- **Seguridad**: Helmet.js, express-rate-limit
- **Monitoreo**: Morgan para logging
- **Deployment**: Mantener configuración actual

## 📁 Estructura del Proyecto (Mantenida)

```
Portafolio-FrancoBalich/
├── src/
│   ├── index.js          # Servidor principal (actualizado)
│   └── singup-mail.js    # Configuración de correo (mejorado)
├── views/
│   ├── css/             # Estilos (modernizados)
│   ├── js/              # Scripts (actualizados)
│   ├── img/             # Imágenes (optimizadas)
│   ├── pages/           # Páginas principales (actualizadas)
│   └── partials/        # Componentes reutilizables (mejorados)
├── package.json         # Dependencias actualizadas
├── .env                 # Variables de entorno
├── .gitignore           # Actualizado
└── README.md            # Documentación actualizada
```

## 🚀 Funcionalidades Principales

### F1: Actualización de Dependencias
**Descripción**: Actualizar todas las dependencias a versiones seguras y actuales

**Criterios de Aceptación**:
- Actualizar Express.js a última versión estable
- Actualizar EJS a última versión
- Actualizar Nodemailer y todas las dependencias
- Eliminar dependencias obsoletas o innecesarias
- Resolver todas las vulnerabilidades de seguridad
- Mantener compatibilidad con el código existente

**Archivos a modificar**:
- `package.json`
- `src/index.js`
- `src/singup-mail.js`

### F2: Modernización del Diseño
**Descripción**: Actualizar el diseño visual manteniendo la identidad

**Criterios de Aceptación**:
- Modernizar paleta de colores
- Implementar diseño más limpio y profesional
- Mejorar tipografía y jerarquía visual
- Actualizar componentes UI (botones, cards, formularios)
- Implementar hover effects y microinteracciones
- Mantener responsive design pero mejorado

**Archivos a modificar**:
- `views/css/styles.css`
- `views/css/normalize.css`
- `views/pages/index.ejs`
- `views/partials/head.ejs`
- `views/partials/menu.ejs`
- `views/partials/footer.ejs`

### F3: Optimización de Imágenes
**Descripción**: Optimizar todas las imágenes del sitio

**Criterios de Aceptación**:
- Actualizar foto de perfil (la imagen vieja mencionada)
- Comprimir y optimizar todas las imágenes
- Implementar lazy loading con JavaScript
- Usar formatos modernos cuando sea posible
- Reducir tamaños de archivo sin perder calidad
- Implementar responsive images

**Archivos a modificar**:
- `views/img/` (todas las imágenes)
- `views/js/index.js` (para lazy loading)
- `views/css/styles.css` (para responsive images)

### F4: Actualización de Contenido
**Descripción**: Actualizar toda la información personal y profesional

**Criterios de Aceptación**:
- Actualizar información profesional actual
- Actualizar proyectos recientes
- Actualizar habilidades técnicas
- Actualizar enlaces de redes sociales
- Revisar y corregir textos
- Actualizar meta tags y SEO

**Archivos a modificar**:
- `views/pages/index.ejs`
- `views/pages/contacto.ejs`
- `views/pages/redes.ejs`
- `views/partials/head.ejs`

### F5: Mejoras de Seguridad
**Descripción**: Implementar mejores prácticas de seguridad

**Criterios de Aceptación**:
- Implementar Helmet.js para headers de seguridad
- Añadir rate limiting al formulario de contacto
- Validar y sanitizar inputs del formulario
- Configurar CORS apropiadamente
- Implementar CSP (Content Security Policy)
- Ocultar información sensible del servidor

**Archivos a crear/modificar**:
- `src/index.js` (middleware de seguridad)
- `src/singup-mail.js` (validación mejorada)
- `.env` (variables de entorno)

### F6: Optimización de Rendimiento
**Descripción**: Mejorar velocidad de carga y rendimiento

**Criterios de Aceptación**:
- Minificar CSS y JavaScript
- Implementar compresión gzip
- Optimizar carga de recursos
- Implementar cache headers apropiados
- Reducir requests HTTP
- Mejorar Core Web Vitals

**Archivos a modificar**:
- `src/index.js` (middleware de compresión)
- `views/css/styles.css` (optimización)
- `views/js/index.js` (optimización)

## 🎨 Requisitos de Diseño

### Paleta de Colores Modernizada
- **Primario**: Mantener identidad pero más moderno
- **Secundario**: Colores complementarios actuales
- **Neutros**: Grises más sofisticados
- **Acentos**: Colores vibrantes para CTAs

### Tipografía Mejorada
- **Heading**: Fuente más moderna (Google Fonts)
- **Body**: Legibilidad mejorada
- **Jerarquía**: Mejor contraste y espaciado

### Componentes UI Modernos
- Botones con mejor diseño y estados
- Cards con sombras más suaves
- Formularios con mejor UX
- Navegación más intuitiva
- Animaciones CSS modernas

## 📊 Métricas de Éxito

### Seguridad
- **Vulnerabilidades**: 0 vulnerabilidades críticas o altas
- **Dependencias**: 100% dependencias actualizadas
- **Headers**: Todos los headers de seguridad implementados

### Rendimiento
- **Lighthouse Performance**: > 85
- **Tamaño de imágenes**: Reducción del 50%
- **Tiempo de carga**: < 3 segundos
- **Core Web Vitals**: Dentro de rangos verdes

### Funcionalidad
- **Formulario de contacto**: 100% funcional
- **Enlaces**: Todos funcionando correctamente
- **Responsive**: Perfecto en todos los dispositivos

## 🔒 Mejoras de Seguridad Específicas

### Headers de Seguridad
```javascript
// Helmet.js configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"]
    }
  }
}));
```

### Rate Limiting
```javascript
// Rate limiting para formulario
const rateLimit = require('express-rate-limit');
const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos por IP
  message: 'Demasiados intentos, intenta más tarde'
});
```

## 🛠️ Dependencias a Actualizar

### Dependencias Principales ✅ COMPLETADO
```json
{
  "dotenv": "^16.4.5",
  "ejs": "^3.1.10",
  "express": "^4.19.2",
  "nodemailer": "^6.9.15",
  "nodemon": "^3.1.7"
}
```

### Estado de Actualización
- ✅ **dotenv**: Actualizado de ^16.0.1 a ^16.4.5
- ✅ **ejs**: Actualizado de ^3.1.8 a ^3.1.10  
- ✅ **express**: Actualizado de ^4.18.1 a ^4.19.2
- ✅ **nodemailer**: Actualizado de ^6.7.5 a ^6.9.15
- ✅ **nodemon**: Actualizado de ^2.0.16 a ^3.1.7
- ✅ **Vulnerabilidades**: 0 vulnerabilidades críticas o altas (resuelto)

## 📋 Checklist de Modernización

### Pre-actualización ✅ COMPLETADO
- [x] Backup completo del proyecto actual
- [x] Auditoría de dependencias (`npm audit`)
- [x] Inventario de assets y contenido
- [x] Análisis de rendimiento actual

### Durante la actualización
- [x] Actualizar dependencias una por una
- [x] Resolver conflictos de compatibilidad
- [x] Implementar mejoras de seguridad
- [x] Optimizar SEO y metadata
- [x] Implementar datos estructurados
- [x] Crear robots.txt y sitemap.xml
- [x] Corregir información personal y enlaces
- [x] Actualizar habilidades técnicas
- [x] Mejorar manejo de errores del servidor
- [x] Añadir scripts de desarrollo útiles
- [ ] Optimizar imágenes y assets
- [ ] Actualizar contenido
- [ ] Modernizar diseño

### Post-actualización
- [x] Testing exhaustivo de funcionalidades
- [x] Verificar formulario de contacto
- [ ] Validar responsive design
- [ ] Performance audit con Lighthouse
- [x] Verificar que no hay vulnerabilidades
- [ ] Testing en diferentes navegadores

## 🚀 Plan de Actualización

### Fase 1: Seguridad y Dependencias (Días 1-2) ✅ COMPLETADO
- [x] Auditar dependencias actuales
- [x] Actualizar package.json
- [x] Resolver vulnerabilidades
- [ ] Implementar middleware de seguridad
- [x] Testing de funcionalidad básica

### Fase 2: Optimización de Assets (Días 3-4) 🔄 EN PROGRESO
- [ ] Optimizar y actualizar imágenes
- [ ] Modernizar CSS
- [ ] Actualizar JavaScript
- [ ] Implementar lazy loading
- [ ] Testing de rendimiento

### Fase 3: Actualización de Contenido (Días 5-6) ⏳ PENDIENTE
- [ ] Actualizar información personal
- [ ] Revisar y corregir textos
- [ ] Actualizar proyectos
- [ ] Actualizar enlaces de redes sociales
- [ ] Mejorar SEO

### Fase 4: Testing y Pulimiento (Día 7) ⏳ PENDIENTE
- [ ] Testing exhaustivo
- [ ] Verificar formularios
- [ ] Validar responsive design
- [ ] Performance audit final
- [ ] Deployment

## 📝 Criterios de Aceptación Generales

### Técnicos
- 0 vulnerabilidades de seguridad críticas o altas
- Todas las dependencias actualizadas
- Código funcionando sin errores
- Performance mejorado significativamente
- SEO optimizado

### Funcionales
- Navegación intuitiva mantenida
- Contenido completamente actualizado
- Formulario de contacto mejorado
- Enlaces funcionando correctamente
- Responsive design perfeccionado

### Calidad
- Código limpio y bien estructurado
- Comentarios actualizados
- Manejo de errores mejorado
- Loading states implementados
- Feedback visual mejorado

## 🔧 Configuración de Desarrollo Actualizada

### Variables de Entorno
```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password

# Security
SESSION_SECRET=tu_session_secret_seguro
```

### Scripts Actualizados
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "lint": "eslint src/",
    "audit": "npm audit",
    "audit-fix": "npm audit fix"
  }
}
```

## 📚 Recursos y Referencias

### Documentación
- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

### Herramientas de Seguridad
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/) - Vulnerability scanning
- [Helmet.js](https://helmetjs.github.io/) - Security headers

### Performance
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [GTmetrix](https://gtmetrix.com/) - Performance testing
- [WebPageTest](https://www.webpagetest.org/) - Speed testing

---

**Fecha de creación**: Enero 2025
**Versión**: 2.1 (Actualizada - Fase 1 completada)
**Autor**: Franco Balich
**Enfoque**: Modernización sin migración de stack
**Última actualización**: Enero 2025 - Dependencias actualizadas y vulnerabilidades resueltas 