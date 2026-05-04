// slides.jsx — slide components per type (v2: matches PDF reference)
const { useState, useEffect, useMemo } = React;

const t = (val, lang) => {
  if (val == null) return "";
  if (typeof val === "string") return val;
  return val[lang] ?? val.en ?? "";
};

// ──────────────────────────────────────────────────────────────
// Decorative concentric rings — multiple variants by slide type.
// Each variant returns an inline SVG, full-bleed background.
// ──────────────────────────────────────────────────────────────

// Selector "stadium" rings — elongated pill arcs nested, rotated/offset
function RingsStadium() {
  const cx = 960, cy = 540;
  const baseRx = 720, baseRy = 200;
  const step = 24;
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
      <g fill="none" stroke="#3a382b" strokeWidth="1" strokeOpacity="0.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x={cx - (baseRx + i * step)}
            y={cy - (baseRy + i * step)}
            width={(baseRx + i * step) * 2}
            height={(baseRy + i * step) * 2}
            rx={baseRy + i * step}
            ry={baseRy + i * step}
          />
        ))}
      </g>
    </svg>
  );
}

// Asymmetric corner rings — top-right + bottom-left partial stadium arcs
function RingsCorner() {
  const count = 7;
  const step = 32;
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
      <g fill="none" stroke="#3a382b" strokeWidth="1" strokeOpacity="0.35">
        {Array.from({ length: count }).map((_, i) => {
          const rx = 520 + i * step;
          const ry = 200 + i * step;
          return (
            <g key={i}>
              <rect x={1860 - rx} y={-80 - ry} width={rx * 2} height={ry * 2} rx={ry} ry={ry} />
              <rect x={60 - rx}   y={1160 - ry} width={rx * 2} height={ry * 2} rx={ry} ry={ry} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// Section divider rings — kept for potential reuse but not rendered on section slide
// (the background photo already carries the decorative rings)

// Menu header rings — large concentric circles centered behind the photo
function RingsConcentric({ cx = 960, cy = 540, count = 12, base = 240, step = 18 }) {
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
      <g fill="none" stroke="#3a382b" strokeWidth="1" strokeOpacity="0.4">
        {Array.from({ length: count }).map((_, i) => (
          <circle key={i} cx={cx} cy={cy} r={base + i * step} />
        ))}
      </g>
    </svg>
  );
}

// ── Real Palace brand assets ─────────────────────────────────
function IconSetMenus() {
  return (
    <img
      src="_recursos/SVG/set_menus_icon.svg"
      alt="Set Menus"
      style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
    />
  );
}

function IconCustomizedMenu() {
  return (
    <img
      src="_recursos/SVG/Customized_menu_icon.svg"
      alt="Customized Menu"
      style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
    />
  );
}

function PalaceLogo() {
  return (
    <div className="cover-logo">
      <img
        src="_recursos/SVG/MP_THG_PUNTACANA_White.svg"
        alt="Moon Palace The Grand Punta Cana"
        className="palace-logo-img"
      />
    </div>
  );
}

// Diet icon map — uses real AyB SVGs
const DIET_ICON = {
  vegan:      { src: "_recursos/SVG/iconos AyB/SVG/vegano.svg",      label: "Vegano" },
  vegetarian: { src: "_recursos/SVG/iconos AyB/SVG/vegetariano.svg", label: "Vegetariano" },
  glutenFree: { src: "_recursos/SVG/iconos AyB/SVG/gluten_free.svg", label: "Gluten Free" },
  nueces:     { src: "_recursos/SVG/iconos AyB/SVG/nueces.svg",      label: "Nueces" },
  lacteos:    { src: "_recursos/SVG/iconos AyB/SVG/lacteos.svg",     label: "Lácteos" },
  huevos:     { src: "_recursos/SVG/iconos AyB/SVG/huevos.svg",      label: "Huevos" },
  picante:    { src: "_recursos/SVG/iconos AyB/SVG/picante.svg",     label: "Picante" },
  sustentable:{ src: "_recursos/SVG/iconos AyB/SVG/sustentable.svg",label: "Sustentable" },
  alcohol:    { src: "_recursos/SVG/iconos AyB/SVG/alcohol.svg",     label: "Alcohol" },
  noAlcohol:  { src: "_recursos/SVG/iconos AyB/SVG/no alcohol.svg",  label: "Sin Alcohol" },
};
function DietMarks({ tags }) {
  if (!tags || !tags.length) return null;
  return (
    <span className="diet-marks">
      {tags.map((tag) => {
        const icon = DIET_ICON[tag];
        if (!icon) return null;
        return (
          <span key={tag} className="diet-mark" title={icon.label}>
            <img src={icon.src} alt={icon.label} className="diet-mark-icon" />
          </span>
        );
      })}
    </span>
  );
}

// ── Slide: Cover ──────────────────────────────────────────────
function CoverSlide({ lang }) {
  const { meta } = window.DECK_CONTENT;
  return (
    <div className="slide cover-slide surface-olive">
      <div className="cover-bg" style={{ backgroundImage: 'url(_recursos/imagenes/B1.webp)' }} />
      <div className="grain" />
      <div className="cover-vignette" />
      <div className="cover-content">
        <h1 className="cover-title">Breakfast</h1>
        <div className="cover-subtitle">Buffet</div>
        <p className="cover-tagline">{t(meta.subtitle, lang)}</p>
      </div>
      <PalaceLogo />
    </div>
  );
}

// ── Slide: Section divider (two icons, clickable) ─────────────
function SectionSlide({ slide, lang, onGoToSelector }) {
  return (
    <div className="slide section-slide surface-olive">
      <div className="section-bg" style={{ backgroundImage: 'url(_recursos/imagenes/B2.webp)' }} />
      <div className="grain" />
      <div className="section-content">
        <button className="section-option" onClick={onGoToSelector} aria-label="Ver Set Menus">
          <div className="section-option-icon"><IconSetMenus /></div>
          <div className="section-option-label">Set Menus</div>
        </button>
        <button className="section-option" onClick={onGoToSelector} aria-label="Ver Customized Menu">
          <div className="section-option-icon"><IconCustomizedMenu /></div>
          <div className="section-option-label">Customized<br />Menu</div>
        </button>
      </div>
    </div>
  );
}

// ── Slide: Selector (panoramic pill) ─────────────────────────
function SelectorSlide({ slide, lang, onPickMenu }) {
  const { menus, ui } = window.DECK_CONTENT;
  const tagline = ui[slide.taglineKey];
  return (
    <div className="slide selector-slide surface-paper">
      <div className="selector-content">
        <header className="selector-header">
          <h2 className="selector-title">Set Menus</h2>
          <div className="selector-sub">Choose 1 option</div>
          <p className="selector-tagline">{t(tagline, lang)}</p>
        </header>
        <div className="selector-panorama-pill">
          {slide.options.map((menuId) => {
            const m = menus[menuId];
            return (
              <button
                key={menuId}
                className="menu-pill-section"
                onClick={() => onPickMenu(menuId)}
                aria-label={t(m.title, lang)}
              >
                <div className="menu-pill-image" style={{ backgroundImage: `url(${m.hero})` }} />
                <div className="menu-pill-overlay" />
                <span className="menu-pill-label">{t(m.title, lang)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Slide: Menu header (circular photo, split title) ──────────
function MenuHeaderSlide({ slide, lang }) {
  const m = window.DECK_CONTENT.menus[slide.menuId];
  const title = t(m.title, lang);
  // Split into two words for the side labels (PDF puts MEXICAN | photo | MORNING)
  const [first, ...rest] = title.split(" ");
  const second = rest.join(" ") || "";
  return (
    <div className="slide menu-header-slide surface-paper">
      <div className="grain" />
      <div className="menu-header-rings"><RingsConcentric count={14} base={220} step={20} /></div>
      <div className="menu-header-content">
        <div className="menu-header-side">{first}</div>
        <div className="menu-photo-circle" style={{ backgroundImage: `url(${m.hero})` }} />
        <div className="menu-header-side is-soft">{second}</div>
      </div>
    </div>
  );
}

// ── Slide: Menu detail (circle photo left, list right) ────────
function MenuDetailSlide({ slide, lang }) {
  const m = window.DECK_CONTENT.menus[slide.menuId];
  const ui = window.DECK_CONTENT.ui;
  const title = t(m.title, lang);
  const [first, ...rest] = title.split(" ");
  const second = rest.join(" ") || "";
  return (
    <div className="slide menu-detail-slide surface-paper">
      <div className="grain" />
      <div className="menu-detail-rings">
        <RingsConcentric cx={480} cy={540} count={14} base={200} step={18} />
      </div>

      <div className="menu-detail-content">
        <div className="menu-detail-photo-wrap">
          <div className="menu-detail-photo" style={{ backgroundImage: `url(${m.hero})` }} />
        </div>

        <div className="menu-detail-text">
          <h2 className="menu-detail-title">
            <span className="first">{first}</span>{" "}
            <span className="second">{second}</span>
          </h2>

          <div className="menu-categories">
            {m.categories.map((cat, i) => (
              <section key={i} className="menu-category">
                <h3 className="menu-category-title">{t(cat.title, lang)}</h3>
                <ul className="menu-category-items">
                  {cat.items.map((it, j) => (
                    <li key={j}>
                      <span>{t(it, lang)}</span>
                      <DietMarks tags={cat.tags} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {m.hasNuts && (
            <div className="allergy-note">
              <div>✻ {t(ui.allergyDisclaimer, lang)}</div>
              <div className="allergy-legend">
                {Object.entries(DIET_ICON).slice(0,3).map(([key, icon]) => (
                  <span key={key} className="allergy-legend-item">
                    <img src={icon.src} alt={icon.label} className="allergy-legend-icon" />
                    {icon.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Dispatcher ────────────────────────────────────────────────
function Slide({ slide, lang, onPickMenu, onGoToSelector }) {
  switch (slide.type) {
    case "cover":      return <CoverSlide lang={lang} />;
    case "section":    return <SectionSlide slide={slide} lang={lang} onGoToSelector={onGoToSelector} />;
    case "selector":   return <SelectorSlide slide={slide} lang={lang} onPickMenu={onPickMenu} />;
    case "menuHeader": return <MenuHeaderSlide slide={slide} lang={lang} />;
    case "menuDetail": return <MenuDetailSlide slide={slide} lang={lang} />;
    default: return <div className="slide">Unknown: {slide.type}</div>;
  }
}

// Helper: detect olive-bg slides for chrome theming
window.SLIDE_IS_OLIVE = (slide) => slide.type === "cover" || slide.type === "section";

Object.assign(window, { Slide, t });
