// slides.jsx v6
const { useState } = React;
const t = (val, lang) => { if (!val) return ""; if (typeof val === "string") return val; return val[lang] ?? val.en ?? ""; };

// ── Rings — contained left panel (always centered) ────────────
function RingsPanel({ count = 12, base = 90, step = 14 }) {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet"
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block" }}>
      <g fill="none" stroke="#3a382b" strokeWidth="1" strokeOpacity="0.38">
        {Array.from({length:count}).map((_,i) => (
          <circle key={i} cx={200} cy={200} r={base + i * step} />
        ))}
      </g>
    </svg>
  );
}

function RingsCorner() {
  const count=7, step=32;
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet"
      style={{width:"100%",height:"100%",display:"block"}}>
      <g fill="none" stroke="#3a382b" strokeWidth="1" strokeOpacity="0.3">
        {Array.from({length:count}).map((_,i) => {
          const rx=520+i*step, ry=200+i*step;
          return (
            <g key={i}>
              <rect x={1860-rx} y={-80-ry} width={rx*2} height={ry*2} rx={ry} ry={ry}/>
              <rect x={60-rx}   y={1160-ry} width={rx*2} height={ry*2} rx={ry} ry={ry}/>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ── Brand ─────────────────────────────────────────────────────
function PalaceLogo() {
  return (
    <div className="cover-logo">
      <img src="_recursos/SVG/MP_THG_PUNTACANA_White.svg" alt="Moon Palace" className="palace-logo-img" />
    </div>
  );
}

// ── Diet icons ────────────────────────────────────────────────
const DIET_ICON = {
  vegan:       { src:"_recursos/SVG/iconos AyB/SVG/vegano.svg",      label:"Vegano"       },
  vegetarian:  { src:"_recursos/SVG/iconos AyB/SVG/vegetariano.svg", label:"Vegetariano"  },
  glutenFree:  { src:"_recursos/SVG/iconos AyB/SVG/gluten_free.svg", label:"Gluten Free"  },
  nueces:      { src:"_recursos/SVG/iconos AyB/SVG/nueces.svg",      label:"Nueces"       },
  picante:     { src:"_recursos/SVG/iconos AyB/SVG/picante.svg",     label:"Picante"      },
};

function DietMarks({ tags, size = 14 }) {
  if (!tags || !tags.length) return null;
  return (
    <span className="diet-marks" style={{ display:"inline-flex", gap:3, alignItems:"center", flexShrink:0 }}>
      {tags.map(tag => {
        const icon = DIET_ICON[tag]; if (!icon) return null;
        return (
          <span key={tag} className="diet-mark" title={icon.label}>
            <img src={icon.src} alt={icon.label}
              style={{ width:size, height:size, objectFit:"contain", opacity:0.7, filter:"saturate(0)" }} />
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
      <div className="cover-bg" style={{backgroundImage:"url(_recursos/imagenes/B1.webp)"}} />
      <div className="grain" /><div className="cover-vignette" />
      <div className="cover-content">
        <h1 className="cover-title">Breakfast</h1>
        <div className="cover-subtitle">Buffet</div>
        <p className="cover-tagline">{t(meta.subtitle,lang)}</p>
      </div>
      <PalaceLogo />
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────
function SectionSlide({ lang, onGoToSelector, onGoToCustomMenu }) {
  return (
    <div className="slide section-slide surface-olive">
      <div className="section-bg" style={{backgroundImage:"url(_recursos/imagenes/B2.webp)"}} />
      <div className="grain" />
      <div className="section-content">
        <button className="section-option" onClick={onGoToSelector}>
          <div className="section-option-icon">
            <img src="_recursos/SVG/set_menus_icon.svg" alt="Set Menus"
              style={{width:"100%",height:"100%",objectFit:"contain",filter:"brightness(0) invert(1)"}} />
          </div>
          <div className="section-option-label">Set Menus</div>
        </button>
        <button className="section-option" onClick={onGoToCustomMenu}>
          <div className="section-option-icon">
            <img src="_recursos/SVG/Customized_menu_icon.svg" alt="Customized Menu"
              style={{width:"100%",height:"100%",objectFit:"contain",filter:"brightness(0) invert(1)"}} />
          </div>
          <div className="section-option-label">Customized<br/>Menu</div>
        </button>
      </div>
    </div>
  );
}

// ── Selector ──────────────────────────────────────────────────
function SelectorSlide({ slide, lang, onPickMenu }) {
  const { menus, ui } = window.DECK_CONTENT;
  return (
    <div className="slide selector-slide surface-paper" style={{
      backgroundImage: "url(_recursos/imagenes/03_Fondo_beige.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="selector-content">
        <header className="selector-header">
          <h2 className="selector-title">Set Menus</h2>
          <div className="selector-sub">{t(ui.chooseOne,lang)}</div>
          <p className="selector-tagline">{t(ui.setMenusTagline,lang)}</p>
        </header>
        <div className="selector-panorama-pill">
          {slide.options.map(menuId => {
            const m = menus[menuId];
            return (
              <button key={menuId} className="menu-pill-section"
                onClick={() => onPickMenu(menuId)} aria-label={t(m.title,lang)}>
                <div className="menu-pill-image" style={{backgroundImage:`url(${m.hero})`}} />
                <div className="menu-pill-overlay" />
                <span className="menu-pill-label">{t(m.title,lang)}</span>
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
  const words = t(m.title,lang).split(" ");
  const first=words[0], second=words.slice(1).join(" ");
  return (
    <div className="slide menu-header-slide surface-paper" style={{
      position:"relative",
      backgroundImage:"url(_recursos/imagenes/04_Fondo_beige_portada.jpg)",
      backgroundSize:"cover", backgroundPosition:"center"
    }}>
      <div className="grain" />
      {/* Left 50% Hero Image */}
      <div style={{
        position:"absolute", top:0, left:0, width:"50%", height:"100%",
        backgroundImage:`url(${m.hero})`,
        backgroundSize:"cover", backgroundPosition:"center",
        filter:"saturate(0.85) brightness(0.88)"
      }} />
      <div style={{
        position:"absolute", top:0, left:"40%", width:"15%", height:"100%",
        background:"linear-gradient(to right, rgba(0,0,0,0.14) 0%, transparent 100%)",
        pointerEvents:"none"
      }} />

      {/* Right 50% Text */}
      <div style={{
        position:"absolute", top:0, left:"50%", right:0, bottom:0,
        display:"flex", flexDirection:"column",
        alignItems:"flex-start", justifyContent:"center",
        padding:"0 6vw"
      }}>
        <div style={{fontFamily:"var(--sans)",fontSize:"10px",letterSpacing:"0.44em",fontWeight:700,textTransform:"uppercase",color:"var(--buffet-bronze)",marginBottom:18,opacity:0.8}}>Set Menu</div>
        <h2 style={{margin:0,fontFamily:"var(--serif)",fontWeight:700,fontSize:"clamp(38px,4.8vw,72px)",lineHeight:1,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--buffet-ink)"}}>
          <span style={{display:"block"}}>{first}</span>
          {second && <span style={{display:"block",color:"var(--buffet-bronze)",fontWeight:400,fontSize:"0.72em",letterSpacing:"0.22em",marginTop:8}}>{second}</span>}
        </h2>
        <div style={{width:48,height:2,background:"var(--buffet-bronze)",margin:"28px 0",borderRadius:2}} />
        {m.subtitle && <p style={{margin:0,fontFamily:"var(--serif)",fontStyle:"italic",fontSize:"clamp(14px,1.5vw,20px)",color:"var(--buffet-ink-soft)",lineHeight:1.6}}>{t(m.subtitle,lang)}</p>}
      </div>
    </div>
  );
}

// ── Menu Content (shared for page 0 and page 1) ───────────────
// Left: contained rings + circle photo (always aligned)
// Right: category groups with items + diet icons
function MenuContentSlide({ slide, lang }) {
  const m    = window.DECK_CONTENT.menus[slide.menuId];
  const page = m.pages[slide.pageIndex];
  const titleWords = t(m.title,lang).split(" ");
  const first=titleWords[0], second=titleWords.slice(1).join(" ");

  return (
    <div className="slide menu-detail-slide" style={{
      position:"relative",
      backgroundImage:"url(_recursos/imagenes/05_Fondo_beige_menu.jpg)",
      backgroundSize:"cover", backgroundPosition:"center"
    }}>
      <div className="grain" />

      {/* Left 50%: full-bleed hero photo */}
      <div style={{
        position:"absolute", top:0, left:0, width:"50%", height:"100%",
        backgroundImage:`url(${m.hero})`,
        backgroundSize:"cover", backgroundPosition:"center",
        filter:"saturate(0.85) brightness(0.88)"
      }} />
      {/* Gradient edge */}
      <div style={{
        position:"absolute", top:0, left:"40%", width:"15%", height:"100%",
        background:"linear-gradient(to right, rgba(0,0,0,0.14) 0%, transparent 100%)",
        pointerEvents:"none"
      }} />

      {/* Right 50%: title + menu groups */}
      <div className="menu-detail-text" style={{
        position:"absolute", top:0, left:"50%", right:0, bottom:0,
        overflowY:"auto", padding:"60px clamp(28px,4vw,56px) 80px",
        display:"flex", flexDirection:"column", justifyContent:"center"
      }}>
        <h2 className="menu-detail-title">
          <span className="first">{first}</span>
          {second ? <span className="second"> {second}</span> : null}
        </h2>

          <div className="menu-categories">
            {page.groups.map((grp, gi) => (
              <section key={gi} className="menu-category">
                <h3 className="menu-category-title">{t(grp.title,lang)}</h3>
                <ul className="menu-category-items">
                  {grp.items.map((item, ii) => (
                    <li key={ii} className={grp.isHotKitchen ? "menu-item-hot" : ""}>
                      <span className="menu-item-name-wrap" style={{display:"inline-flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                        <span className="menu-item-name">{t(item.label,lang)}</span>
                        <DietMarks tags={item.tags} size={13} />
                      </span>
                      {grp.isHotKitchen && item.description && (
                        <p className="menu-item-desc">{t(item.description,lang)}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
      </div>
    </div>
  );
}

// ── Custom Intro ──────────────────────────────────────────────
function CustomIntroSlide({ lang, clientName, setClientName, onContinue }) {
  const { ui } = window.DECK_CONTENT;
  return (
    <div className="slide custom-intro-slide surface-paper" style={{
      backgroundImage: "url(_recursos/imagenes/03_Fondo_beige.jpg)",
      backgroundSize: "cover", backgroundPosition: "center"
    }}>
      <div className="grain" />
      <div className="custom-intro-content">
        <div className="custom-intro-text-block">
          <div className="custom-intro-overline">{t(ui.customMenu,lang)}</div>
          <h2 className="custom-intro-title">{t(ui.customMenuIntroTitle,lang)}</h2>
          <p className="custom-intro-body">{t(ui.customMenuIntroBody,lang)}</p>
          <p className="custom-intro-cta">{t(ui.customMenuIntroCTA,lang)}</p>
        </div>
        <div className="custom-intro-form">
          <label className="custom-intro-label" htmlFor="client-input">{t(ui.customMenuClientLabel,lang)}</label>
          <input id="client-input" className="custom-intro-input" type="text"
            value={clientName} onChange={e=>setClientName(e.target.value)}
            placeholder={t(ui.customMenuClientPlaceholder,lang)} spellCheck autoComplete="off"/>
          <button className="custom-intro-btn" onClick={onContinue} disabled={!clientName.trim()}>
            {t(ui.customMenuContinue,lang)}<span className="custom-intro-btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Custom Selector ───────────────────────────────────────────
function CustomSelectorSlide({ slide, lang, onPickCategory, selections }) {
  const { customCategories } = window.DECK_CONTENT;
  const cats = slide.categories.map(id => customCategories[id]);
  return (
    <div className="slide custom-selector-slide surface-paper" style={{
      backgroundImage: "url(_recursos/imagenes/03_Fondo_beige.jpg)",
      backgroundSize: "cover", backgroundPosition: "center"
    }}>
      <div className="grain" />
      <div className="custom-selector-content">
        <header className="custom-selector-header">
          <div className="custom-selector-overline">Customized Menu</div>
          <h2 className="custom-selector-title">{lang==='es'?'Arma tu menú':'Build your menu'}</h2>
          <p className="custom-selector-sub">{lang==='es'?'Selecciona una categoría':'Select a category to get started'}</p>
        </header>
        <div className="custom-category-pills">
          {cats.map(cat => {
            const selCount=(selections[cat.id]||[]).length, isDone=selCount>=cat.max;
            return (
              <button key={cat.id} className={`custom-category-pill ${isDone?'is-done':''}`}
                onClick={()=>onPickCategory(cat.id)}>
                <div className="custom-pill-bg" style={{backgroundImage:`url(${cat.hero})`}}/>
                <div className="custom-pill-overlay"/>
                <div className="custom-pill-body">
                  <span className="custom-pill-label">{t(cat.title,lang)}</span>
                  <span className="custom-pill-count">
                    {isDone?(lang==='es'?'✓ Completo':'✓ Done'):t(cat.subtitle,lang)}
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

// ── Custom Section ────────────────────────────────────────────
const CAT_ORDER = ['comienzo','dulce','principal','acompanar'];

function CustomSectionSlide({ slide, lang, selections, onToggleItem,
                               onGoToCustomSelector, onGoToSummary, onGoToNextCategory }) {
  const { customCategories, ui } = window.DECK_CONTENT;
  const cat      = customCategories[slide.categoryId];
  const selected = selections[cat.id] || [];
  const count    = selected.length;
  const isFull   = count >= cat.max;
  const allDone  = CAT_ORDER.every(id => (selections[id]||[]).length >= customCategories[id].max);
  const curIdx   = CAT_ORDER.indexOf(slide.categoryId);
  const nextCatId= CAT_ORDER.slice(curIdx+1).find(id=>(selections[id]||[]).length < customCategories[id].max);

  const toggle = itemId => {
    if (selected.includes(itemId)) onToggleItem(cat.id, selected.filter(id=>id!==itemId));
    else if (!isFull) onToggleItem(cat.id, [...selected, itemId]);
  };

  return (
    <div className="slide custom-section-slide surface-paper" style={{
      backgroundImage: "url(_recursos/imagenes/05_Fondo_beige_menu.jpg)",
      backgroundSize: "cover", backgroundPosition: "center"
    }}>
      <div className="grain" />
      <div className="custom-section-content">

        {/* Left photo */}
        <div className="custom-section-photo-wrap">
          <div className="custom-section-photo" style={{backgroundImage:`url(${cat.hero})`}}/>
          <div className="custom-section-photo-label"><span>{t(cat.title,lang)}</span></div>
        </div>

        {/* Right panel */}
        <div className="custom-section-items-panel">
          <div className="custom-section-panel-header">
            <h2 className="custom-section-title">{t(cat.title,lang)}</h2>
            <div className={`custom-section-counter ${isFull?'is-full':''}`}>
              <span className="counter-num">{count}</span>
              <span className="counter-sep">/</span>
              <span className="counter-max">{cat.max}</span>
              <span className="counter-label">{lang==='es'?'seleccionados':'selected'}</span>
            </div>
          </div>

          {/* Items list — same style as set menu categories */}
          <ul className="custom-section-list">
            {cat.items.map(item => {
              const sel=selected.includes(item.id), disabled=!sel&&isFull;
              return (
                <li key={item.id} className="cs-item-wrap">
                  <button
                    className={`custom-item-row ${sel?'is-selected':''} ${disabled?'is-disabled':''}`}
                    onClick={()=>toggle(item.id)} disabled={disabled} aria-pressed={sel}>
                    <span className={`custom-item-check ${sel?'is-checked':''}`}>
                      {sel ? <i className="ti ti-check"/> : null}
                    </span>
                    <span className="custom-item-label-wrap">
                      <span className="custom-item-label">{t(item.label,lang)}</span>
                      <DietMarks tags={item.tags} size={14} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="custom-section-footer">
            <button className="custom-section-back" onClick={onGoToCustomSelector}>
              <i className="ti ti-arrow-left"/>{t(ui.backToCategories,lang)}
            </button>
            {isFull && (
              allDone
                ? <button className="custom-section-next" onClick={onGoToSummary}>
                    {lang==='es'?'Ver mi menú':'See my menu'}<i className="ti ti-arrow-right"/>
                  </button>
                : nextCatId && (
                  <button className="custom-section-next" onClick={()=>onGoToNextCategory(nextCatId)}>
                    {lang==='es'?'Siguiente categoría':'Next category'}<i className="ti ti-arrow-right"/>
                  </button>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Custom Summary ────────────────────────────────────────────
function CustomSummarySlide({ lang, clientName, selections }) {
  const { customCategories } = window.DECK_CONTENT;
  const heroUrl = customCategories['comienzo'].hero;
  return (
    <div className="slide custom-summary-slide surface-paper" style={{
      backgroundImage: "url(_recursos/imagenes/04_Fondo_beige_portada.jpg)",
      backgroundSize: "cover", backgroundPosition: "center"
    }}>
      <div className="grain" />
      <div className="custom-summary-content">
        <div className="custom-summary-left">
          <div className="custom-summary-photo-circle" style={{backgroundImage:`url(${heroUrl})`}}/>
        </div>
        <div className="custom-summary-right">
          <div className="custom-summary-overline">Customized Menu</div>
          <h2 className="custom-summary-name">{clientName||'—'}</h2>
          <div className="custom-summary-tagline">
            {lang==='es'?'Tu menú personalizado':'Your personalized menu'}
          </div>
          <div className="custom-summary-divider"/>
          <div className="custom-summary-categories">
            {CAT_ORDER.map(catId => {
              const cat=customCategories[catId];
              const ids=selections[catId]||[];
              const items=cat.items.filter(it=>ids.includes(it.id));
              return (
                <div key={catId} className="summary-cat-section">
                  <div className="summary-cat-heading">{t(cat.title,lang)}</div>
                  <ul className="summary-cat-items">
                    {items.length
                      ? items.map(it=>(
                          <li key={it.id} className="summary-item-row">
                            <span>{t(it.label,lang)}</span>
                            <DietMarks tags={it.tags} size={12}/>
                          </li>
                        ))
                      : <li className="empty">{lang==='es'?'Sin selección':'No selection'}</li>
                    }
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="custom-summary-logo">
        <img src="_recursos/SVG/MP_THG_PUNTACANA_White.svg" alt="Moon Palace" className="summary-logo-img"/>
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
    case "cover":         return <CoverSlide lang={lang}/>;
    case "section":       return <SectionSlide lang={lang} onGoToSelector={onGoToSelector} onGoToCustomMenu={onGoToCustomMenu}/>;
    case "selector":      return <SelectorSlide slide={slide} lang={lang} onPickMenu={onPickMenu}/>;
    case "menuHeader":    return <MenuHeaderSlide slide={slide} lang={lang}/>;
    case "menuContent":   return <MenuContentSlide slide={slide} lang={lang}/>;
    case "customIntro":   return <CustomIntroSlide lang={lang} clientName={clientName} setClientName={setClientName} onContinue={onContinueToCustomSelector}/>;
    case "customSelector":return <CustomSelectorSlide slide={slide} lang={lang} onPickCategory={onPickCategory} selections={selections}/>;
    case "customSection": return <CustomSectionSlide slide={slide} lang={lang} selections={selections} onToggleItem={onToggleItem} onGoToCustomSelector={onGoToCustomSelector} onGoToSummary={onGoToSummary} onGoToNextCategory={onGoToNextCategory}/>;
    case "customSummary": return <CustomSummarySlide lang={lang} clientName={clientName} selections={selections}/>;
    default: return <div className="slide" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>Unknown: {slide.type}</div>;
  }
}

window.SLIDE_IS_OLIVE = s => s.type==="cover" || s.type==="section";
Object.assign(window, { Slide, t });
