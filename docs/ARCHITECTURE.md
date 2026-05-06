# 🏗️ Arquitectura — Manuales Buffet

## Stack Tecnológico

| Capa | Tecnología | Razón |
|------|-----------|-------|
| Framework UI | React (via Vite) | SPA sin server-side rendering |
| Build tool | Vite | HMR instantáneo, más rápido que CRA |
| Styling | CSS Vanilla + inline styles | Control total, sin frameworks |
| Fuentes | Adobe Typekit (kit `chj8dep`) | Licencia corporativa Palace Resorts |
| Íconos | Tabler Icons (local woff2) | Funciona offline en PWA |
| Deploy | Cloudflare Pages | CDN global, integrado con GitHub |

---

## Estructura de Archivos

```
manuales-buffet/
├── public/
│   ├── fonts/
│   │   └── tabler-icons.woff2     ← CRÍTICO para PWA offline
│   ├── tabler-icons.css
│   ├── manifest.json              ← config PWA
│   ├── icon-180/192/512.png       ← iconos Add to Home Screen
│   └── _recursos/imagenes/        ← imágenes optimizadas
├── src/
│   ├── app.jsx        ← navegación, estado global, chrome bars
│   ├── slides.jsx     ← todos los componentes de slides
│   ├── data.js        ← contenido bilingüe ES/EN
│   └── styles.css     ← sistema de diseño
├── docs/              ← documentación técnica
├── index.html         ← meta PWA, links externos (Typekit)
└── vite.config.js     ← outDir: dist/assets-build
```

---

## Layout del Chrome

```
┌────────────────────────────────────────────────┐
│ .chrome-top  (position:absolute; top:0; z:10)  │
│ [logo]  [ES/EN]  [contador]  [home]            │
├────────────────────────────────────────────────┤
│         slide activo (position:absolute inset:0)│
├────────────────────────────────────────────────┤
│ .chrome-bottom (position:absolute; bottom:0)   │
│ [dots]  [← nav-btn]  [→ nav-btn]              │
└────────────────────────────────────────────────┘
```

**Altura chrome:** ~56px arriba + ~56px abajo + `env(safe-area-inset-*)` en iOS PWA.

> ⚠️ Los slides usan `inset:0` — ocupan el 100% incluyendo el área DETRÁS del chrome.
> Los componentes deben usar `paddingTop/Bottom: 56px` para quedar en la zona visible.

---

## Sistema de Diseño (CSS Variables)

```css
--buffet-paper: #e9e3d4      /* crema principal */
--buffet-olive: #2d3528      /* texto/chrome */
--buffet-bronze: #8a6c3a     /* acentos dorados */
--buffet-ink-soft: #5a5040   /* texto secundario */
--serif: 'cormorant-garamond', Georgia, serif
--sans:  'DM Sans', ui-sans-serif, system-ui, sans-serif
```

---

## Contenido Bilingüe

```js
// data.js — todos los strings son objetos bilingüe:
{ es: "Mañana Mexicana", en: "Mexican Morning" }

// slides.jsx — helper:
const t = (obj, lang) => (typeof obj === 'string') ? obj : (obj?.[lang] ?? obj?.es ?? '');
```

Estado del idioma: URL hash `/#/{slideIndex}/{lang}`.

---

## Decisiones Clave

**`vmin` para el círculo de imagen:**
`vmin` usa el lado más corto del viewport. En iPad landscape (1024×768), `38vmin` = 291px. En desktop (1920×1080), `38vmin` = 410px. Consistente en cualquier orientación.

**Typekit en CDN, nunca bundleado:**
Vite intenta copiar las fuentes de Typekit localmente durante el build. Al no tener acceso al CDN de Adobe en build-time, crea archivos `.woff2` corruptos. Ver `TROUBLESHOOTING.md #1`.

**CSS patches al final del archivo:**
El CSS principal está en una sola línea larga. Todos los overrides se agregan al **final** del archivo con `Add-Content` de PowerShell. Ver `TROUBLESHOOTING.md #10`.

---

*Mayo 2026 — v2.3-stable*
