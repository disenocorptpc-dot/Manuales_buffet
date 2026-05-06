import React, { useState } from 'react';

const t = (val, lang) => { if (!val) return ""; if (typeof val === "string") return val; return val[lang] ?? val.en ?? ""; };

// ── Design tokens hardcoded (immune to CSS cache/proxy issues) ──
const C = {
  ink:       "#2a2820",
  inkSoft:   "rgba(42,40,32,0.62)",
  inkFaint:  "rgba(42,40,32,0.32)",
  bronze:    "#61613C",   // Fuentes.pdf — editorial dark (títulos, categorías)
  bronzeSoft:"#8D887D",  // Fuentes.pdf — editorial muted (items, leyenda)
  paper:     "#e9e3d4",
  olive:     "#2d3528",
  line:      "rgba(42,40,32,0.20)",
  onOlive:   "#d8d2bf",
};
const SERIF = "'Cormorant Garamond','Cormorant',Garamond,serif";
const SANS  = "'DM Sans',ui-sans-serif,system-ui,-apple-system,sans-serif";

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
    <div className="slide menu-header-slide" style={{
      backgroundColor: C.paper,
      backgroundImage:"url(_recursos/imagenes/04_Fondo_beige_portada.jpg)",
      backgroundSize:"cover", backgroundPosition:"center"
    }}>
      <div className="grain" />

      {/* Full-slide concentric rings */}
      <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none" }}>
        <RingsCorner />
      </div>

      {/* Split title + circle photo */}
      <div style={{
        position:"absolute", inset:0, zIndex:2,
        display:"flex", alignItems:"center", justifyContent:"center",
        gap:"clamp(32px,4vw,72px)", padding:"0 8vw"
      }}>
        {/* Left word — bold olive */}
        <div style={{
          fontFamily:SANS, fontWeight:700,
          fontSize:"clamp(18px,2.2vw,30px)",
          letterSpacing:"0.42em", textTransform:"uppercase",
          color:C.bronze, whiteSpace:"nowrap", flex:1, textAlign:"center"
        }}>{first}</div>

        {/* Circular photo */}
        <div style={{
          width:"clamp(260px,34vw,480px)", height:"clamp(260px,34vw,480px)",
          borderRadius:"50%", overflow:"hidden", flexShrink:0,
          backgroundImage:`url(${m.hero})`,
          backgroundSize:"cover", backgroundPosition:"center",
          boxShadow:"0 12px 40px -10px rgba(0,0,0,0.32)"
        }} />

        {/* Right word — light muted */}
        <div style={{
          fontFamily:SANS, fontWeight:300,
          fontSize:"clamp(18px,2.2vw,30px)",
          letterSpacing:"0.42em", textTransform:"uppercase",
          color:C.inkSoft, whiteSpace:"nowrap", flex:1, textAlign:"center"
        }}>{second}</div>
      </div>
    </div>
  );
}

// ── Menu Content (shared for page 0 and page 1) ───────────────
function MenuContentSlide({ slide, lang }) {
  const m    = window.DECK_CONTENT.menus[slide.menuId];
  const page = m.pages[slide.pageIndex];
  const words = t(m.title,lang).split(" ");
  const first=words[0], second=words.slice(1).join(" ");

  return (
    <div className="slide" style={{
      backgroundColor: C.paper,
      backgroundImage:"url(_recursos/imagenes/05_Fondo_beige_menu.jpg)",
      backgroundSize:"cover", backgroundPosition:"center"
    }}>
      <div className="grain" />

      {/* Full-slide concentric rings */}
      <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none" }}>
        <RingsCorner />
      </div>

      {/* Two-column grid */}
      <div style={{
        position:"absolute", inset:0, zIndex:2,
        display:"grid",
        gridTemplateColumns:"1fr 1.2fr",
        alignItems:"center",
        gap:"clamp(16px,2vw,40px)",
        padding:"clamp(60px,8vh,100px) clamp(32px,4vw,64px) clamp(60px,8vh,100px) clamp(20px,2.5vw,44px)"
      }}>

        {/* LEFT: circular photo centered */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%" }}>
          <div style={{
            width:"clamp(200px,26vw,360px)", height:"clamp(200px,26vw,360px)",
            borderRadius:"50%", overflow:"hidden", flexShrink:0,
            backgroundImage:`url(${m.hero})`,
            backgroundSize:"cover", backgroundPosition:"center",
            boxShadow:"0 12px 40px -10px rgba(0,0,0,0.30)"
          }} />
        </div>

        {/* RIGHT: title + categories */}
        <div style={{
          display:"flex", flexDirection:"column",
          overflowY:"auto", maxHeight:"100%",
          padding:"16px 0"
        }}>
          {/* Title: MEXICAN bold | MORNING light */}
          <div style={{
            marginBottom:20, paddingBottom:18,
            borderBottom:`1px solid ${C.line}`
          }}>
            <span style={{
              fontFamily:SANS, fontWeight:700,
              fontSize:"clamp(16px,1.7vw,24px)",
              letterSpacing:"0.40em", textTransform:"uppercase", color:C.bronze
            }}>{first} </span>
            {second && <span style={{
              fontFamily:SANS, fontWeight:300,
              fontSize:"clamp(16px,1.7vw,24px)",
              letterSpacing:"0.40em", textTransform:"uppercase", color:C.inkSoft
            }}>{second}</span>}
          </div>

          {/* Categories */}
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {page.groups.map((grp, gi) => (
              <div key={gi} style={{
                paddingBottom: gi < page.groups.length-1 ? 16 : 0,
                borderBottom: gi < page.groups.length-1 ? `1px solid rgba(42,40,32,0.08)` : "none"
              }}>
                {/* Category label — PDF: #61613C, tracking 400, DM Sans bold */}
                <div style={{
                  marginBottom:6, fontFamily:SANS, fontWeight:700,
                  fontSize:"clamp(9px,0.85vw,12px)", letterSpacing:"0.40em",
                  textTransform:"uppercase", color:C.bronze
                }}>{t(grp.title, lang)}</div>

                {/* Items — PDF: #8D887D, tracking 25, interlineado 30 */}
                <div style={{ display:"flex", flexDirection:"column", gap: grp.isHotKitchen ? 10 : 3 }}>
                  {grp.items.map((item, ii) => (
                    <div key={ii}>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                        <span style={{
                          fontFamily:SANS,
                          fontSize:"clamp(11px,1.05vw,14px)",
                          lineHeight:1.5,
                          letterSpacing: grp.isHotKitchen ? "0.01em" : "0.06em",
                          color: grp.isHotKitchen ? C.ink : C.bronzeSoft,
                          fontWeight: grp.isHotKitchen ? 500 : 400
                        }}>{t(item.label, lang)}</span>
                        <DietMarks tags={item.tags} size={12} />
                      </div>
                      {grp.isHotKitchen && item.description && (
                        <p style={{
                          margin:"2px 0 0", fontFamily:SERIF, fontStyle:"italic",
                          fontSize:"clamp(10px,0.9vw,12px)", color:C.inkFaint, lineHeight:1.5
                        }}>{t(item.description, lang)}</p>
                      )}
                    </div>
                  ))}
                </div>
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
