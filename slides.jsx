// slides.jsx v5 — clean rebuild
// Fonts: var(--serif) = Cormorant Garamond · var(--sans) = DM Sans
// Do NOT override fonts inside components.
const { useState } = React;

const t = (val, lang) => {
  if (val == null) return "";
  if (typeof val === "string") return val;
  return val[lang] ?? val.en ?? "";
};

// ── Decorative rings ──────────────────────────────────────────
function RingsCorner() {
  const count = 7, step = 32;
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
      <g fill="none" stroke="#3a382b" strokeWidth="1" strokeOpacity="0.35">
        {Array.from({ length: count }).map((_, i) => {
          const rx = 520 + i * step, ry = 200 + i * step;
          return (
            <g key={i}>
              <rect x={1860-rx} y={-80-ry} width={rx*2} height={ry*2} rx={ry} ry={ry} />
              <rect x={60-rx}   y={1160-ry} width={rx*2} height={ry*2} rx={ry} ry={ry} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

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

// ── Brand assets ──────────────────────────────────────────────
function IconSetMenus() {
  return <img src="_recursos/SVG/set_menus_icon.svg" alt="Set Menus"
    style={{ width:'100%', height:'100%', objectFit:'contain', filter:'brightness(0) invert(1)' }} />;
}
function IconCustomizedMenu() {
  return <img src="_recursos/SVG/Customized_menu_icon.svg" alt="Customized Menu"
    style={{ width:'100%', height:'100%', objectFit:'contain', filter:'brightness(0) invert(1)' }} />;
}
function PalaceLogo() {
  return (
    <div className="cover-logo">
      <img src="_recursos/SVG/MP_THG_PUNTACANA_White.svg"
        alt="Moon Palace The Grand Punta Cana" className="palace-logo-img" />
    </div>
  );
}

// ── Diet icons ────────────────────────────────────────────────
const DIET_ICON = {
  vegan:       { src: "_recursos/SVG/iconos AyB/SVG/vegano.svg",       label: "Vegano" },
  vegetarian:  { src: "_recursos/SVG/iconos AyB/SVG/vegetariano.svg",  label: "Vegetariano" },
  glutenFree:  { src: "_recursos/SVG/iconos AyB/SVG/gluten_free.svg",  label: "Gluten Free" },
  nueces:      { src: "_recursos/SVG/iconos AyB/SVG/nueces.svg",       label: "Nueces" },
  lacteos:     { src: "_recursos/SVG/iconos AyB/SVG/lacteos.svg",      label: "Lácteos" },
  huevos:      { src: "_recursos/SVG/iconos AyB/SVG/huevos.svg",       label: "Huevos" },
  picante:     { src: "_recursos/SVG/iconos AyB/SVG/picante.svg",      label: "Picante" },
  sustentable: { src: "_recursos/SVG/iconos AyB/SVG/sustentable.svg",  label: "Sustentable" },
  alcohol:     { src: "_recursos/SVG/iconos AyB/SVG/alcohol.svg",      label: "Alcohol" },
  noAlcohol:   { src: "_recursos/SVG/iconos AyB/SVG/no alcohol.svg",   label: "Sin Alcohol" },
};

function DietMarks({ tags }) {
  if (!tags || !tags.length) return null;
  return (
    <span className="diet-marks">
      {tags.map(tag => {
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

// ── Cover ─────────────────────────────────────────────────────
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

// ── Section (Set Menu / Custom Menu choice) ───────────────────
function SectionSlide({ slide, lang, onGoToSelector, onGoToCustomMenu }) {
  return (
    <div className="slide section-slide surface-olive">
      <div className="section-bg" style={{ backgroundImage: 'url(_recursos/imagenes/B2.webp)' }} />
      <div className="grain" />
      <div className="section-content">
        <button className="section-option" onClick={onGoToSelector} aria-label="Ver Set Menus">
          <div className="section-option-icon"><IconSetMenus /></div>
          <div className="section-option-label">Set Menus</div>
        </button>
        <button className="section-option" onClick={onGoToCustomMenu} aria-label="Ver Customized Menu">
          <div className="section-option-icon"><IconCustomizedMenu /></div>
          <div className="section-option-label">Customized<br />Menu</div>
        </button>
      </div>
    </div>
  );
}

// ── Selector ──────────────────────────────────────────────────
function SelectorSlide({ slide, lang, onPickMenu }) {
  const { menus, ui } = window.DECK_CONTENT;
  return (
    <div className="slide selector-slide surface-paper">
      <div className="selector-rings"><RingsCorner /></div>
      <div className="selector-content">
        <header className="selector-header">
          <h2 className="selector-title">Set Menus</h2>
          <div className="selector-sub">{t(ui.chooseOne, lang)}</div>
          <p className="selector-tagline">{t(ui.setMenusTagline, lang)}</p>
        </header>
        <div className="selector-panorama-pill">
          {slide.options.map(menuId => {
            const m = menus[menuId];
            return (
              <button key={menuId} className="menu-pill-section"
                onClick={() => onPickMenu(menuId)} aria-label={t(m.title, lang)}>
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

// ── Menu Header ───────────────────────────────────────────────
function MenuHeaderSlide({ slide, lang }) {
  const m = window.DECK_CONTENT.menus[slide.menuId];
  const title = t(m.title, lang);
  const words = title.split(" ");
  const first  = words[0];
  const second = words.slice(1).join(" ");
  return (
    <div className="slide menu-header-slide surface-paper">
      <div className="grain" />
      <div className="menu-header-rings">
        <RingsConcentric count={14} base={220} step={20} />
      </div>
      <div className="menu-header-content">
        <div className="menu-header-side">{first}</div>
        <div className="menu-photo-circle" style={{ backgroundImage: `url(${m.hero})` }} />
        <div className="menu-header-side is-soft">{second}</div>
      </div>
    </div>
  );
}

// ── Menu Page 1 — Jugos / Fruta / Panadería ───────────────────
// Left: circle photo + rings. Right: 3 category groups with diet icons.
function MenuPage1Slide({ slide, lang }) {
  const m = window.DECK_CONTENT.menus[slide.menuId];
  const page = m.page1;
  const title = t(page.heading, lang);
  const words = title.split(" ");
  const first  = words[0];
  const second = words.slice(1).join(" ");

  return (
    <div className="slide menu-detail-slide surface-paper">
      <div className="grain" />
      <div className="menu-detail-rings">
        <RingsConcentric cx={480} cy={540} count={14} base={200} step={18} />
      </div>
      <div className="menu-detail-content">
        {/* Left — circular photo */}
        <div className="menu-detail-photo-wrap">
          <div className="menu-detail-photo" style={{ backgroundImage: `url(${m.hero})` }} />
        </div>

        {/* Right — category groups */}
        <div className="menu-detail-text">
          <h2 className="menu-detail-title">
            <span className="first">{first}</span>{" "}
            <span className="second">{second}</span>
          </h2>
          <div className="menu-categories">
            {page.groups.map((grp, i) => (
              <section key={i} className="menu-category">
                <h3 className="menu-category-title">{t(grp.title, lang)}</h3>
                <ul className="menu-category-items">
                  {grp.items.map((item, j) => (
                    <li key={j}>
                      <span>{t(item.label, lang)}</span>
                      <DietMarks tags={item.tags} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Menu Page 2 — Nuestra Selección (hot kitchen) ────────────
// Left: circle photo + rings. Right: dishes with description + diet icons.
function MenuPage2Slide({ slide, lang }) {
  const m    = window.DECK_CONTENT.menus[slide.menuId];
  const page = m.page2;
  const heading    = t(page.heading,    lang);
  const subheading = t(page.subheading, lang);
  const words = heading.split(" ");
  const first  = words[0];
  const second = words.slice(1).join(" ");

  return (
    <div className="slide menu-detail-slide surface-paper">
      <div className="grain" />
      <div className="menu-detail-rings">
        <RingsConcentric cx={480} cy={540} count={14} base={200} step={18} />
      </div>
      <div className="menu-detail-content">
        {/* Left — circular photo */}
        <div className="menu-detail-photo-wrap">
          <div className="menu-detail-photo" style={{ backgroundImage: `url(${m.hero})` }} />
        </div>

        {/* Right — dishes */}
        <div className="menu-detail-text">
          <h2 className="menu-detail-title">
            <span className="first">{first}</span>{" "}
            <span className="second">{second}</span>
          </h2>
          <div className="mp2-subheading">{subheading}</div>
          <div className="mp2-items">
            {page.items.map((item, i) => (
              <div key={i} className="mp2-item">
                <div className="mp2-item-header">
                  <span className="mp2-item-name">{t(item.label, lang)}</span>
                  <DietMarks tags={item.tags} />
                </div>
                {item.description && (
                  <p className="mp2-item-desc">{t(item.description, lang)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Custom Intro ──────────────────────────────────────────────
function CustomIntroSlide({ lang, clientName, setClientName, onContinue }) {
  const { ui } = window.DECK_CONTENT;
  return (
    <div className="slide custom-intro-slide surface-paper">
      <div className="grain" />
      <div className="custom-intro-rings"><RingsCorner /></div>
      <div className="custom-intro-content">
        <div className="custom-intro-text-block">
          <div className="custom-intro-overline">{t(ui.customMenu, lang)}</div>
          <h2 className="custom-intro-title">{t(ui.customMenuIntroTitle, lang)}</h2>
          <p className="custom-intro-body">{t(ui.customMenuIntroBody, lang)}</p>
          <p className="custom-intro-cta">{t(ui.customMenuIntroCTA, lang)}</p>
        </div>
        <div className="custom-intro-form">
          <label className="custom-intro-label" htmlFor="client-name-input">
            {t(ui.customMenuClientLabel, lang)}
          </label>
          <input id="client-name-input" className="custom-intro-input" type="text"
            value={clientName} onChange={e => setClientName(e.target.value)}
            placeholder={t(ui.customMenuClientPlaceholder, lang)}
            spellCheck autoComplete="off" />
          <button className="custom-intro-btn" onClick={onContinue} disabled={!clientName.trim()}>
            {t(ui.customMenuContinue, lang)}
            <span className="custom-intro-btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Custom Selector — 4 category pills ───────────────────────
function CustomSelectorSlide({ slide, lang, onPickCategory, selections }) {
  const { customCategories } = window.DECK_CONTENT;
  const categories = slide.categories.map(id => customCategories[id]);
  return (
    <div className="slide custom-selector-slide surface-paper">
      <div className="grain" />
      <div className="custom-selector-rings"><RingsCorner /></div>
      <div className="custom-selector-content">
        <header className="custom-selector-header">
          <div className="custom-selector-overline">Customized Menu</div>
          <h2 className="custom-selector-title">
            {lang === 'es' ? 'Arma tu menú' : 'Build your menu'}
          </h2>
          <p className="custom-selector-sub">
            {lang === 'es' ? 'Selecciona una categoría para comenzar' : 'Select a category to get started'}
          </p>
        </header>
        <div className="custom-category-pills">
          {categories.map(cat => {
            const selCount = (selections[cat.id] || []).length;
            const isDone   = selCount >= cat.max;
            return (
              <button key={cat.id} className={`custom-category-pill ${isDone ? 'is-done' : ''}`}
                onClick={() => onPickCategory(cat.id)} aria-label={t(cat.title, lang)}>
                <div className="custom-pill-bg" style={{ backgroundImage: `url(${cat.hero})` }} />
                <div className="custom-pill-overlay" />
                <div className="custom-pill-body">
                  <span className="custom-pill-label">{t(cat.title, lang)}</span>
                  <span className="custom-pill-count">
                    {isDone
                      ? (lang === 'es' ? '✓ Completo' : '✓ Done')
                      : t(cat.subtitle, lang)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Custom Section — selectable items ─────────────────────────
const CAT_ORDER = ['comienzo', 'dulce', 'principal', 'acompanar'];

function CustomSectionSlide({ slide, lang, selections, onToggleItem,
                               onGoToCustomSelector, onGoToSummary,
                               onGoToNextCategory }) {
  const { customCategories, ui } = window.DECK_CONTENT;
  const cat      = customCategories[slide.categoryId];
  const selected = selections[cat.id] || [];
  const count    = selected.length;
  const isFull   = count >= cat.max;

  const allDone   = CAT_ORDER.every(id => (selections[id] || []).length >= customCategories[id].max);
  const curIdx    = CAT_ORDER.indexOf(slide.categoryId);
  const nextCatId = CAT_ORDER.slice(curIdx + 1).find(
    id => (selections[id] || []).length < customCategories[id].max
  );

  const toggle = (itemId) => {
    if (selected.includes(itemId)) {
      onToggleItem(cat.id, selected.filter(id => id !== itemId));
    } else if (!isFull) {
      onToggleItem(cat.id, [...selected, itemId]);
    }
  };

  return (
    <div className="slide custom-section-slide surface-paper">
      <div className="grain" />
      <div className="custom-section-rings">
        <RingsConcentric cx={1560} cy={540} count={10} base={200} step={22} />
      </div>
      <div className="custom-section-content">
        {/* Left — hero photo with centered label */}
        <div className="custom-section-photo-wrap">
          <div className="custom-section-photo" style={{ backgroundImage: `url(${cat.hero})` }} />
          <div className="custom-section-photo-label">
            <span>{t(cat.title, lang)}</span>
          </div>
        </div>

        {/* Right — selectable items */}
        <div className="custom-section-items-panel">
          <div className="custom-section-panel-header">
            <h2 className="custom-section-title">{t(cat.title, lang)}</h2>
            <div className={`custom-section-counter ${isFull ? 'is-full' : ''}`}>
              <span className="counter-num">{count}</span>
              <span className="counter-sep">/</span>
              <span className="counter-max">{cat.max}</span>
              <span className="counter-label">
                {lang === 'es' ? 'seleccionados' : 'selected'}
              </span>
            </div>
          </div>

          <ul className="custom-section-list">
            {cat.items.map(item => {
              const sel      = selected.includes(item.id);
              const disabled = !sel && isFull;
              return (
                <li key={item.id}>
                  <button
                    className={`custom-item-row ${sel ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}`}
                    onClick={() => toggle(item.id)}
                    disabled={disabled}
                    aria-pressed={sel}
                  >
                    <span className={`custom-item-check ${sel ? 'is-checked' : ''}`}>
                      {sel ? <i className="ti ti-check" /> : null}
                    </span>
                    {/* label-wrap carries flex:1, so diet icons sit immediately after the label text */}
                    <span className="custom-item-label-wrap">
                      <span className="custom-item-label">{t(item.label, lang)}</span>
                      <DietMarks tags={item.tags} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="custom-section-footer">
            <button className="custom-section-back" onClick={onGoToCustomSelector}>
              <i className="ti ti-arrow-left" />
              {t(ui.backToCategories, lang)}
            </button>
            {isFull && (
              allDone
                ? (
                  <button className="custom-section-next" onClick={onGoToSummary}>
                    {lang === 'es' ? 'Ver mi menú' : 'See my menu'}
                    <i className="ti ti-arrow-right" />
                  </button>
                )
                : nextCatId && (
                  <button className="custom-section-next"
                    onClick={() => onGoToNextCategory(nextCatId)}>
                    {lang === 'es' ? 'Siguiente categoría' : 'Next category'}
                    <i className="ti ti-arrow-right" />
                  </button>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Custom Summary — Mexican Morning layout ───────────────────
function CustomSummarySlide({ lang, clientName, selections }) {
  const { customCategories } = window.DECK_CONTENT;
  const heroUrl = customCategories['comienzo'].hero;

  return (
    <div className="slide custom-summary-slide surface-paper">
      <div className="grain" />
      <div className="custom-summary-rings">
        <RingsConcentric cx={420} cy={540} count={14} base={220} step={20} />
      </div>

      <div className="custom-summary-content">
        {/* Left — circle photo */}
        <div className="custom-summary-left">
          <div className="custom-summary-photo-circle"
            style={{ backgroundImage: `url(${heroUrl})` }} />
        </div>

        {/* Right — name + 4 sections */}
        <div className="custom-summary-right">
          <div className="custom-summary-overline">Customized Menu</div>
          <h2 className="custom-summary-name">{clientName || '—'}</h2>
          <div className="custom-summary-tagline">
            {lang === 'es' ? 'Tu menú personalizado' : 'Your personalized menu'}
          </div>
          <div className="custom-summary-divider" />
          <div className="custom-summary-categories">
            {CAT_ORDER.map(catId => {
              const cat   = customCategories[catId];
              const ids   = selections[catId] || [];
              const items = cat.items.filter(it => ids.includes(it.id));
              return (
                <div key={catId} className="summary-cat-section">
                  <div className="summary-cat-heading">{t(cat.title, lang)}</div>
                  <ul className="summary-cat-items">
                    {items.length
                      ? items.map(it => (
                          <li key={it.id}>{t(it.label, lang)}</li>
                        ))
                      : <li className="empty">
                          {lang === 'es' ? 'Sin selección' : 'No selection'}
                        </li>
                    }
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="custom-summary-logo">
        <img src="_recursos/SVG/MP_THG_PUNTACANA_White.svg"
          alt="Moon Palace" className="summary-logo-img" />
      </div>
    </div>
  );
}

// ── Dispatcher ────────────────────────────────────────────────
function Slide({ slide, lang,
                 onPickMenu, onGoToSelector, onGoToCustomMenu,
                 onPickCategory, onGoToCustomSelector, onGoToSummary, onGoToNextCategory,
                 clientName, setClientName, onContinueToCustomSelector,
                 selections, onToggleItem }) {
  switch (slide.type) {
    case "cover":
      return <CoverSlide lang={lang} />;
    case "section":
      return <SectionSlide slide={slide} lang={lang}
               onGoToSelector={onGoToSelector} onGoToCustomMenu={onGoToCustomMenu} />;
    case "selector":
      return <SelectorSlide slide={slide} lang={lang} onPickMenu={onPickMenu} />;
    case "menuHeader":
      return <MenuHeaderSlide slide={slide} lang={lang} />;
    case "menuPage1":
      return <MenuPage1Slide slide={slide} lang={lang} />;
    case "menuPage2":
      return <MenuPage2Slide slide={slide} lang={lang} />;
    case "customIntro":
      return <CustomIntroSlide lang={lang} clientName={clientName}
               setClientName={setClientName} onContinue={onContinueToCustomSelector} />;
    case "customSelector":
      return <CustomSelectorSlide slide={slide} lang={lang}
               onPickCategory={onPickCategory} selections={selections} />;
    case "customSection":
      return <CustomSectionSlide slide={slide} lang={lang}
               selections={selections} onToggleItem={onToggleItem}
               onGoToCustomSelector={onGoToCustomSelector}
               onGoToSummary={onGoToSummary}
               onGoToNextCategory={onGoToNextCategory} />;
    case "customSummary":
      return <CustomSummarySlide lang={lang} clientName={clientName} selections={selections} />;
    default:
      return <div className="slide" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        Unknown slide type: {slide.type}
      </div>;
  }
}

window.SLIDE_IS_OLIVE = (slide) => slide.type === "cover" || slide.type === "section";
Object.assign(window, { Slide, t });
