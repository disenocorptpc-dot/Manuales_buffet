# 🔧 Guía de Resolución de Problemas — Manuales Buffet

> Documento vivo. Cada sección documenta un problema real encontrado en producción, su causa raíz y la solución aplicada.

---

## 📋 Índice
- [Error de fuente corrupta (OTS parsing error)](#1-error-de-fuente-corrupta-ots-parsing-error)
- [Iconos de navegación no visibles en iPad PWA](#2-iconos-de-navegación-no-visibles-en-ipad-pwa)
- [Flechas dobles en botones de navegación](#3-flechas-dobles-en-botones-de-navegación)
- [Círculo de imagen no centrado en iPad](#4-círculo-de-imagen-no-centrado-en-ipad)
- [Swipe táctil no funciona en iPad](#5-swipe-táctil-no-funciona-en-ipad)
- [Botones footer desalineados](#6-botones-footer-desalineados)
- [Barra de estado iOS visible en modo PWA](#7-barra-de-estado-ios-visible-en-modo-pwa)
- [Selector de idioma se superpone con contador en iPad](#8-selector-de-idioma-se-superpone-con-contador-en-ipad)
- [Preload de imagen genera warning de consola](#9-preload-de-imagen-genera-warning-de-consola)
- [CSS en una sola línea — herramienta de edición falla](#10-css-en-una-sola-línea--herramienta-de-edición-falla)

---

## 1. Error de fuente corrupta (OTS parsing error)

**Síntoma en consola:**
```
Failed to decode downloaded font: .../assets-build/fonts/DMSans-Regular.woff2
OTS parsing error: invalid sfntVersion: 1008821359
```

**Causa raíz:**  
Vite, durante el `build`, analiza el CSS de Typekit (`use.typekit.net`), encuentra referencias a archivos `.woff2` y los intenta copiar localmente como assets. Al no poder acceder a los CDN de Adobe en tiempo de build, guarda un XML de error con extensión `.woff2` → el navegador rechaza el archivo.

**Diagnóstico rápido:**  
```powershell
# Verificar si el archivo es válido (debe iniciar con bytes "wOF2" = 77 4F 46 32)
$bytes = [System.IO.File]::ReadAllBytes("dist/assets-build/fonts/DMSans-Regular.woff2")
$hex = ($bytes[0..3] | ForEach-Object { $_.ToString("X2") }) -join " "
Write-Host $hex  # Si NO dice "77 4F 46 32" → archivo corrupto
```

**Solución:**  
En `index.html`, asegurarse de que el `<link>` de Typekit esté ANTES del script de Vite y marcado como CDN externo, **sin** `<link rel="preload">` que lo anteceda:

```html
<!-- ✅ CORRECTO — Vite lo trata como link externo -->
<link rel="preconnect" href="https://use.typekit.net" crossorigin />
<link rel="stylesheet" href="https://use.typekit.net/chj8dep.css" />

<!-- ❌ INCORRECTO — el preload hace que Vite intente bundlear la fuente -->
<link rel="preload" href="https://use.typekit.net/chj8dep.css" as="style" />
<link rel="stylesheet" href="https://use.typekit.net/chj8dep.css" />
```

**Verificación post-fix:**
```powershell
Get-ChildItem "dist" -Recurse -Filter "*.woff2" | Format-Table Name, Length
# Solo debe aparecer: tabler-icons.woff2  (877984 bytes)
# Si aparece DMSans-Regular.woff2 → el problema persiste
```

---

## 2. Iconos de navegación no visibles en iPad PWA

**Síntoma:** Las flechas ← → y el ícono de home desaparecen cuando la app se abre como PWA (modo standalone) en iPad.

**Causa raíz:**  
`tabler-icons.css` referencia `./fonts/tabler-icons.woff2`, pero ese archivo **no existía** en `public/fonts/`. En modo PWA offline, los CDN externos no están disponibles, y el cache del service worker no tenía el archivo.

**Solución:**  
Descargar el archivo de fuentes de Tabler y colocarlo localmente:
```
public/
  fonts/
    tabler-icons.woff2   ← DEBE existir (877,984 bytes)
tabler-icons.css         ← referencia ./fonts/tabler-icons.woff2
```

**Verificación:**
```powershell
Test-Path "public/fonts/tabler-icons.woff2"   # debe ser True
(Get-Item "public/fonts/tabler-icons.woff2").Length  # debe ser ~877984
```

> ⚠️ **IMPORTANTE:** Si se actualizan los iconos de Tabler a una versión nueva, el archivo `woff2` TAMBIÉN debe actualizarse manualmente en `public/fonts/`.

---

## 3. Flechas dobles en botones de navegación

**Síntoma:** Los botones de navegar muestran tanto el ícono de Tabler como el carácter HTML `←` / `→` al mismo tiempo.

**Causa raíz:**  
Como fallback para cuando la fuente no cargaba, se agregó el HTML entity `&#8592;` junto al `<i>`. Una vez que la fuente `.woff2` está correctamente bundleada, ambos se muestran.

**Solución en `app.jsx`:**
```jsx
// ❌ INCORRECTO — muestra doble
<button className="nav-btn">
  <i className="ti ti-arrow-left" aria-hidden="true"/>&#8592;
</button>

// ✅ CORRECTO — solo el ícono (el font carga correctamente)
<button className="nav-btn" aria-label="Previous">
  <i className="ti ti-arrow-left" />
</button>
```

---

## 4. Círculo de imagen no centrado en iPad

**Síntoma:** En desktop el círculo aparece bien centrado en el panel izquierdo, pero en iPad se desplaza hacia arriba o abajo.

**Causa raíz:**  
El panel izquierdo usa `height: 100%` del slide completo, que incluye las barras de chrome superior e inferior (cada una ~56px). Con `align-items: center`, el centro matemático del panel **incluye** el área bajo las barras, pero visualmente el área disponible empieza 56px más arriba.

En iPad, las barras chrome son proporcionalmente más grandes relativo al viewport, exagerando el desplazamiento.

**Solución:**
```jsx
// Agregar padding igual arriba y abajo para compensar chrome bars
<div style={{
  position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
  display: "flex", alignItems: "center", justifyContent: "center",
  paddingTop: "56px", paddingBottom: "56px",  // ← CLAVE
  boxSizing: "border-box"
}}>
  <div style={{
    width: "clamp(200px,38vmin,400px)",   // vmin = usa el lado CORTO
    height: "clamp(200px,38vmin,400px)",  // consistente en portrait y landscape
    borderRadius: "50%", overflow: "hidden",
    border: "1.5px solid rgba(42,40,32,0.18)",  // borde decorativo sutil
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover", backgroundPosition: "center"
  }} />
</div>
```

**Por qué `vmin` y no `vw`:**
| Unidad | iPad landscape (1024×768) | Desktop (1920×1080) |
|--------|--------------------------|---------------------|
| `26vw` | 266px (demasiado pequeño) | 499px (correcto) |
| `38vmin` | 291px (proporcional) | 410px (correcto) |

`vmin` usa el **lado más corto** de la pantalla, lo que da proporciones consistentes independientemente de la orientación.

---

## 5. Swipe táctil no funciona en iPad

**Síntoma:** Deslizar el dedo horizontalmente en iPad no cambia de slide.

**Causa raíz:**  
Los eventos `touchstart`/`touchend` no estaban implementados. Las flechas del teclado solo funcionan en desktop.

**Solución en `app.jsx`:**
```jsx
// Estado para trackear posición inicial del toque
const touchStartX = useRef(null);
const touchStartY = useRef(null);

const handleTouchStart = (e) => {
  touchStartX.current = e.touches[0].clientX;
  touchStartY.current = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  if (touchStartX.current === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX.current;
  const dy = e.changedTouches[0].clientY - touchStartY.current;
  // Solo activar si el swipe es principalmente horizontal (no scroll vertical)
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
    if (dx < 0) arrowNext(); // swipe izquierda → siguiente
    else arrowPrev();         // swipe derecha → anterior
  }
  touchStartX.current = null;
};

// Aplicar en el contenedor principal del stage
<main className="stage"
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
>
```

---

## 6. Botones footer desalineados

**Síntoma:** "← Categorías" y "Siguiente categoría →" aparecen a alturas diferentes.

**Causa raíz:**  
Las clases CSS `.custom-section-back` y `.custom-section-next` definidas en el bloque monolítico de `styles.css` tienen propiedades (`padding-top`, `align-self`) que ganan en especificidad sobre el `align-items: center` del contenedor flex.

**Solución — dos capas:**

**Capa 1:** Inline styles en el contenedor y botones (JSX):
```jsx
<div style={{
  display: "flex", flexDirection: "row",
  alignItems: "center", justifyContent: "space-between",
  gap: 12, marginTop: 16, flexShrink: 0
}}>
  <button className="custom-section-back"
    style={{ display: "inline-flex", alignItems: "center", height: 40 }}>
    ...
  </button>
  <button className="custom-section-next"
    style={{ display: "inline-flex", alignItems: "center", height: 40 }}>
    ...
  </button>
</div>
```

**Capa 2:** Override CSS con `!important` (al final de `styles.css`):
```css
.custom-section-back,
.custom-section-next {
  align-self: center !important;
  height: 40px !important;
  min-height: 40px !important;
  max-height: 40px !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
}
```

> ⚠️ **Nota:** Los `!important` son necesarios porque el CSS principal está en una sola línea gigante (línea 42) que no puede editarse fácilmente. Los overrides se agregan al **final** del archivo.

---

## 7. Barra de estado iOS visible en modo PWA

**Síntoma:** Al abrir como PWA en iPad/iPhone, la barra de estado del sistema (hora, batería, señal) sigue visible.

**Respuesta:** **Esto es por diseño de Apple y NO se puede ocultar programáticamente.**

En modo `standalone`, Apple mantiene la barra de estado por razones de seguridad. Lo que SÍ se puede controlar:

```html
<!-- Hace la barra de estado transparente (muestra el fondo de la app) -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

**Ajuste de safe area** para que el contenido no quede detrás de la barra:
```css
@supports (padding-top: env(safe-area-inset-top)) {
  .chrome-top {
    padding-top: calc(22px + env(safe-area-inset-top));
  }
  .chrome-bottom {
    padding-bottom: calc(22px + env(safe-area-inset-bottom));
  }
}
```

---

## 8. Selector de idioma se superpone con contador en iPad

**Síntoma:** En la sección de selección de items del custom menu, el toggle ES/EN del chrome superior se superpone visualmente con el contador "2/3 seleccionados".

**Causa raíz:**  
El panel de items tenía `padding-top: 60px` — exactamente la altura del chrome estándar. En iOS PWA con `safe-area-inset-top`, el chrome es más alto, y el contenido queda debajo de él.

**Solución en `styles.css`:**
```css
.custom-section-items-panel {
  padding-top: 80px !important;
}

@supports (padding-top: env(safe-area-inset-top)) {
  .custom-section-items-panel {
    padding-top: calc(80px + env(safe-area-inset-top)) !important;
  }
}
```

---

## 9. Preload de imagen genera warning de consola

**Síntoma:**
```
The resource ...04_Fondo_beige_portada.jpg was preloaded using link preload 
but not used within a few seconds from the window's load event.
```

**Causa raíz:**  
Se hacía preload de la imagen de portada, pero React Router carga `/#/0/` como primer slide — el preload se activaba antes de que React montara la ruta, y para cuando se usaba la imagen ya había pasado el timeout de "a few seconds".

**Solución:** Eliminar el `<link rel="preload">` para esa imagen de `index.html`. El costo es mínimo (la imagen de portada es de baja prioridad en el flujo principal que empieza en slides de contenido).

---

## 10. CSS en una sola línea — herramienta de edición falla

**Síntoma interno de desarrollo:** Las herramientas de edición de texto no pueden encontrar substrings en el CSS porque todo está en una sola línea comprimida (línea 42 de `styles.css`).

**Workaround:** Todos los overrides y patches se agregan al **final** del archivo con `Add-Content` de PowerShell:

```powershell
$patch = @'
/* Override aquí */
.mi-clase { propiedad: valor !important; }
'@
Add-Content -Path "src\styles.css" -Value $patch -Encoding UTF8
```

> ⚠️ **NO reformatear** el CSS principal — hacerlo podría romper las herramientas de build o introducir errores no detectados fácilmente.

---

*Última actualización: Mayo 2026 — Sesión de estabilización PWA/iPad v2.3*
