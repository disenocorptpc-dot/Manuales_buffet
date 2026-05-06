import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// group:"cover"    → only → arrow
// group:"locked"   → NO arrows (section, selector)
// group:"set-menu" → arrows within ALL set-menu slides; boundaries → go to selector
// group:"custom"   → NO arrows

function App() {
  const [deckState, setDeckState] = useState(() => ({
    meta:  window.DECK_CONTENT.meta,
    ui:    window.DECK_CONTENT.ui,
    menus: window.DECK_CONTENT.menus,
    deck:  window.DECK_CONTENT.deck,
  }));

  const deck = deckState.deck;
  const ui   = deckState.ui;

  const [editMode,   setEditMode]   = useState(false);
  const [clientName, setClientName] = useState('');
  const [selections, setSelections] = useState({});

  const onToggleItem = useCallback((catId, newIds) => {
    setSelections(prev => ({ ...prev, [catId]: newIds }));
  }, []);

  const initial = useMemo(() => {
    const m = (window.location.hash||'').match(/#\/(\d+)(?:\/(es|en))?/);
    return { idx: m ? Math.min(deck.length-1, Math.max(0, parseInt(m[1],10)||0)) : 0, lang: m&&m[2]?m[2]:'en' };
  }, []);

  const [idx,  setIdx]  = useState(initial.idx);
  const [lang, setLang] = useState(initial.lang);

  useEffect(() => {
    const h=`#/${idx}/${lang}`;
    if (window.location.hash!==h) window.history.replaceState(null,'',h);
  }, [idx, lang]);

  useEffect(() => { if (idx>=deck.length) setIdx(deck.length-1); }, [deck.length]);

  const slide = deck[idx] || deck[0];

  const CUSTOM_TYPES = new Set(['customIntro','customSelector','customSection','customSummary']);
  const isCustomFlow  = CUSTOM_TYPES.has(slide.type);
  const isSetMenuFlow = slide.group === 'set-menu';
  const isCover       = slide.type === 'cover';
  const isSection     = slide.type === 'section';
  const isSelector    = slide.type === 'selector';

  const goTo = useCallback(i => setIdx(Math.min(deck.length-1, Math.max(0, i))), [deck.length]);

  // ── Semantic jumps ────────────────────────────────────────────
  const goHome = useCallback(() => {
    const i = deck.findIndex(s => s.type==='section'); goTo(i>=0?i:0);
  }, [deck, goTo]);

  const goSetMenus = useCallback(() => {
    const i = deck.findIndex(s => s.type==='selector'); if (i>=0) goTo(i);
  }, [deck, goTo]);

  const goCustomMenu = useCallback(() => {
    const i = deck.findIndex(s => s.type==='customIntro'); if (i>=0) goTo(i);
  }, [deck, goTo]);

  const goCustomSelector = useCallback(() => {
    const i = deck.findIndex(s => s.type==='customSelector'); if (i>=0) goTo(i);
  }, [deck, goTo]);

  const goSummary = useCallback(() => {
    const i = deck.findIndex(s => s.type==='customSummary'); if (i>=0) goTo(i);
  }, [deck, goTo]);

  const onPickMenu = useCallback(menuId => {
    const i = deck.findIndex(s => s.type==='menuHeader' && s.menuId===menuId);
    if (i>=0) goTo(i);
  }, [deck, goTo]);

  const onPickCategory = useCallback(catId => {
    const i = deck.findIndex(s => s.type==='customSection' && s.categoryId===catId);
    if (i>=0) goTo(i);
  }, [deck, goTo]);

  const onGoToNextCategory = useCallback(catId => {
    const i = deck.findIndex(s => s.type==='customSection' && s.categoryId===catId);
    if (i>=0) goTo(i);
  }, [deck, goTo]);

  // ── Arrow nav ─────────────────────────────────────────────────
  // For set-menu group: find bounds of ALL set-menu slides (both menus)
  const setMenuBounds = useMemo(() => {
    const indices = deck.map((s,i)=>s.group==='set-menu'?i:-1).filter(i=>i>=0);
    if (!indices.length) return { min:0, max:0 };
    return { min: indices[0], max: indices[indices.length-1] };
  }, [deck]);

  const group = slide.group || 'locked';
  const canArrow = group==='cover' || group==='set-menu';

  const arrowPrev = useCallback(() => {
    if (!canArrow) return;
    if (group==='set-menu') {
      if (idx > setMenuBounds.min) goTo(idx-1);
      else goSetMenus(); // at first set-menu slide → back to selector
    } else {
      if (idx>0) goTo(idx-1);
    }
  }, [canArrow, group, idx, setMenuBounds, goTo, goSetMenus]);

  const arrowNext = useCallback(() => {
    if (!canArrow) return;
    if (group==='set-menu') {
      if (idx < setMenuBounds.max) goTo(idx+1);
      else goSetMenus(); // at last set-menu slide → back to selector
    } else {
      if (idx < deck.length-1) goTo(idx+1);
    }
  }, [canArrow, group, idx, deck.length, setMenuBounds, goTo, goSetMenus]);

  const prevDisabled = !canArrow;
  const nextDisabled = !canArrow;

  useEffect(() => {
    if (editMode) return;
    const onKey = e => {
      if (e.key==='ArrowRight'||e.key==='PageDown') { arrowNext(); e.preventDefault(); }
      else if (e.key==='ArrowLeft'||e.key==='PageUp') { arrowPrev(); e.preventDefault(); }
      else if (e.key==='Escape'||e.key==='Home') goHome();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editMode, arrowNext, arrowPrev, goHome]);

  const chromeOnOlive = window.SLIDE_IS_OLIVE ? window.SLIDE_IS_OLIVE(slide) : false;

  const viewer = (
    <div className="app" data-screen-label={`${String(idx+1).padStart(2,'0')} ${slide.id}`}>
      <main className="stage">
        <Slide slide={slide} lang={lang}
          onPickMenu={onPickMenu}
          onGoToSelector={goSetMenus}
          onGoToCustomMenu={goCustomMenu}
          onPickCategory={onPickCategory}
          onGoToCustomSelector={goCustomSelector}
          onGoToSummary={goSummary}
          onGoToNextCategory={onGoToNextCategory}
          clientName={clientName} setClientName={setClientName}
          onContinueToCustomSelector={goCustomSelector}
          selections={selections} onToggleItem={onToggleItem}
        />
      </main>

      {/* Top chrome */}
      <header className={`chrome chrome-top ${chromeOnOlive?'chrome--olive':''}`}>
        <div className="chrome-left">
          {!isCover && !isSection && (
            <button className="chrome-link" onClick={goHome}>
              <i className="ti ti-home"/>{t(ui.home,lang)}
            </button>
          )}
          {(isSetMenuFlow||isSelector) && (
            <button className="chrome-link" onClick={goSetMenus}>{t(ui.setMenus,lang)}</button>
          )}
          {isCustomFlow && (
            <button className="chrome-link" onClick={goCustomSelector}>
              <i className="ti ti-layout-grid"/>{t(ui.customMenu,lang)}
            </button>
          )}
        </div>
        <div className="chrome-center" aria-hidden="true"/>
        <div className="chrome-right">
          <div className="lang-toggle" role="group">
            <button className={`lang-btn ${lang==='es'?'is-active':''}`} onClick={()=>setLang('es')}>ES</button>
            <span className="lang-divider">·</span>
            <button className={`lang-btn ${lang==='en'?'is-active':''}`} onClick={()=>setLang('en')}>EN</button>
          </div>
          <button className={`cms-open-btn ${chromeOnOlive?'cms-open-btn--olive':''}`}
            onClick={()=>setEditMode(true)}>EDITOR</button>
        </div>
      </header>

      {/* Bottom chrome */}
      <footer className={`chrome chrome-bottom ${chromeOnOlive?'chrome--olive':''}`}>
        <div className="chrome-left">
          <span className="counter">{String(idx+1).padStart(2,'0')} / {String(deck.length).padStart(2,'0')}</span>
        </div>
        <div className="chrome-center">
          {!isCustomFlow && group!=='locked' && (
            <div className="dots" aria-hidden="true">
              {deck.filter(s=>!CUSTOM_TYPES.has(s.type)&&s.group!=='locked').map(s=>{
                const ri=deck.indexOf(s);
                return (
                  <button key={s.id} className={`dot ${ri===idx?'is-active':''}`}
                    onClick={canArrow?()=>goTo(ri):undefined}
                    style={canArrow?{}:{pointerEvents:'none'}}
                    aria-label={`Slide ${ri+1}`}/>
                );
              })}
            </div>
          )}
          {isCustomFlow && (
            <div className="custom-progress-dots" aria-hidden="true">
              {['comienzo','dulce','principal','acompanar'].map(catId => {
                const cat=window.DECK_CONTENT.customCategories[catId];
                const isDone=(selections[catId]||[]).length>=cat.max;
                return <span key={catId} className={`custom-dot ${isDone?'is-done':''}`} title={t(cat.title,lang)}/>;
              })}
            </div>
          )}
        </div>
        <div className="chrome-right">
          {canArrow && (
            <>
              <button className="nav-btn" onClick={arrowPrev} disabled={prevDisabled} aria-label="Previous">
                <i className="ti ti-arrow-left"/>
              </button>
              <button className="nav-btn" onClick={arrowNext} disabled={nextDisabled} aria-label="Next">
                <i className="ti ti-arrow-right"/>
              </button>
            </>
          )}
        </div>
      </footer>
    </div>
  );

  if (editMode) {
    return (
      <EditorShell deckState={deckState} setDeckState={setDeckState}
        activeIdx={idx} setActiveIdx={setIdx} onClose={()=>setEditMode(false)}>
        {viewer}
      </EditorShell>
    );
  }
  return viewer;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
