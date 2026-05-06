# 🚀 Guía de Desarrollo y Deployment

## Requisitos Previos

- Node.js ≥ 18
- npm
- Wrangler CLI (`npm install -g wrangler`)
- Cuenta Cloudflare autenticada (`wrangler login`)

---

## Comandos de Desarrollo

```powershell
# Instalar dependencias (primera vez)
npm install

# Servidor de desarrollo local
npm run dev
# → http://localhost:5173

# Build de producción
npx vite build
# → genera dist/

# Verificar build (sin errores de fuente)
Get-ChildItem "dist" -Recurse -Filter "*.woff2" | Format-Table Name, Length
# Solo debe aparecer: tabler-icons.woff2 (~877984 bytes)
# Si aparece DMSans-*.woff2 → revisar TROUBLESHOOTING.md #1
```

---

## Flujo de Deployment

```
Código local → git push → Cloudflare Pages (auto-deploy)
           ↑
     vite build (manual antes de push si se quiere verificar)
```

### Deployment Manual (cuando el auto-deploy falla)

```powershell
# 1. Build
npx vite build

# 2. Deploy directo a Cloudflare Pages
npx wrangler pages deploy dist --project-name manuales-buffet --commit-dirty=true

# La URL de preview aparece al final:
# ✨ Deployment complete! https://XXXXX.manuales-buffet.pages.dev
```

### URL Permanente
```
https://manuales-buffet.pages.dev
```

---

## Versionamiento

```powershell
# Crear tag de versión estable
git tag -a v2.X-stable -m "Descripción de la versión"
git push origin v2.X-stable

# Ver todos los tags
git tag -l
```

### Historial de versiones

| Tag | Descripción |
|-----|-------------|
| `v2.3-stable` | Footer buttons aligned, circle border, bold-italic desc |
| `v2.2-stable` | Arrows fixed, pill labels centered, iPad overlap fix |
| `v2.1-stable` | PWA setup, swipe navigation, font woff2 local, typography +15% |
| `v2.0-stable` | Set menu workflow, navegación por grupos |

---

## Agregar Nuevo Contenido

### Modificar texto del menú
Editar `src/data.js`. Todos los strings son objetos bilingüe:
```js
{ es: "Texto en español", en: "English text" }
```

### Cambiar imagen de un slide
1. Optimizar imagen: máximo 300KB, preferir `.webp`
2. Colocar en `public/_recursos/imagenes/`
3. Actualizar la referencia en `src/data.js`

### Agregar nuevo slide
1. Definir el objeto en el array `DECK_SLIDES` de `src/data.js`
2. Crear el componente en `src/slides.jsx` si el tipo es nuevo
3. Registrar el tipo en el switch de `app.jsx`

---

## Modificar CSS

> ⚠️ El CSS principal (`src/styles.css`) está en una sola línea larga que NO debe reformatearse.

**Para agregar overrides:**
```powershell
$patch = @'

/* Override: descripción del cambio */
.mi-clase {
  propiedad: valor !important;
}
'@
Add-Content -Path "src\styles.css" -Value $patch -Encoding UTF8
```

**Para editar variables CSS (`:root`):**
Las variables están en las primeras ~20 líneas del archivo — estas sí pueden editarse directamente ya que están en formato normal.

---

## Checklist Pre-Deploy

```
□ npm run build sin errores
□ dist/ no contiene DMSans-*.woff2 (solo tabler-icons.woff2)
□ Imágenes optimizadas (< 300KB cada una)
□ Probar en Chrome desktop (localhost)
□ Probar en Safari iOS (simulador o dispositivo real)
□ Verificar swipe en iPad
□ Verificar iconos visibles en modo PWA (sin conexión)
□ Consola sin errores rojos (warnings amarillos son OK)
□ git tag si es versión estable
```

---

## Debugging en iPad

Para ver la consola de un iPad conectado a Mac:
1. iPad: Ajustes → Safari → Avanzado → Web Inspector: ON
2. Mac: Safari → Desarrollar → [nombre del iPad]

Para testear PWA sin iPad físico:
1. Chrome DevTools → Toggle Device Toolbar
2. Seleccionar "iPad Pro" o similar
3. Application → Service Workers para verificar PWA

---

*Mayo 2026 — v2.3-stable*
