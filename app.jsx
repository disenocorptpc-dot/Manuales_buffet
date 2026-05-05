// app.jsx — Buffet Breakfast shell + navigation
// Navigation rules:
//   group:"cover"    → only → to advance (no ← from cover)
//   group:"locked"   → NO arrows (section chooser, set-menu selector)
//   group:"set-menu" → free arrows, BUT constrained within same menuId group
//   group:"custom"   → NO arrows (use on-screen buttons)
const { useState, useEffect, useCallback, useMemo } = React;

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

  // ── Initial position from URL hash ───────────────────────────
  const initial = useMemo(() => {
    const m = (window.location.hash || '').match(/#\/(\d+)(?:\/(es|en))?/);
    return {
      idx:  m ? Math.min(deck.length - 1, Math.max(0, parseInt(m[1], 10) || 0)) : 0,
      lang: m && m[2] ? m[2] : 'en',
    };
  }, []);

  const [idx,  setIdx]  = useState(initial.idx);
  const [lang, setLang] = useState(initial.lang);

  useEffect(() => {
    const h = `#/${idx}/${lang}`;
    if (window.location.hash !== h) window.history.replaceState(null, '', h);
  }, [idx, lang]);

  useEffect(() => {
    if (idx >= deck.length) setIdx(deck.length - 1);
  }, [deck.length]);

  const slide = deck[idx] || deck[0];

  // ── Type helpers ──────────────────────────────────────────────
  const CUSTOM_TYPES = new Set(['customIntro','customSelector','customSection','customSummary']);
  const isCustomFlow  = CUSTOM_TYPES.has(slide.type);
  const isSetMenuFlow = slide.type === 'menuHeader' || slide.type === 'menuPage1' || slide.type === 'menuPage2';
  const isCover       = slide.type === 'cover';
  const isSection     = slide.type === 'section';
  const isSelector    = slide.type === 'selector';

  // ── goTo — unconstrained index jump ──────────────────────────
  const goTo = useCallback(i => setIdx(Math.min(deck.length - 1, Math.max(0, i))), [deck.length]);

  // ── Semantic navigation ───────────────────────────────────────
  const goHome = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'section');
    goTo(i >= 0 ? i : 0);
  }, [deck, goTo]);

  const goSetMenus = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'selector');
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  const goCustomMenu = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'customIntro');
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  const goCustomSelector = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'customSelector');
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  const goSummary = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'customSummary');
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  const onPickMenu = useCallback(menuId => {
    const i = deck.findIndex(s => s.type === 'menuHeader' && s.menuId === menuId);
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  const onPickCategory = useCallback(catId => {
    const i = deck.findIndex(s => s.type === 'customSection' && s.categoryId === catId);
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  const onGoToNextCategory = useCallback(catId => {
    const i = deck.findIndex(s => s.type === 'customSection' && s.categoryId === catId);
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  // ── Arrow navigation — group-aware ───────────────────────────
  // canArrow: true only for cover and set-menu group slides
  // cover: only → (prev is blocked because idx===0)
  // set-menu: free within same menuId
  const group = slide.group || 'locked';
  const canArrow = group === 'cover' || group === 'set-menu';

  // For set-menu, determine prev/next within the same menuId group
  const getSetMenuBounds = useCallback(() => {
    if (!slide.menuId) return { minIdx: idx, maxIdx: idx };
    const same = deck
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.menuId === slide.menuId);
    return {
      minIdx: same[0].i,
      maxIdx: same[same.length - 1].i,
    };
  }, [deck, slide, idx]);

  const arrowPrev = useCallback(() => {
    if (!canArrow) return;
    if (group === 'set-menu') {
      const { minIdx } = getSetMenuBounds();
      if (idx > minIdx) goTo(idx - 1);
      // if at first slide of group, go back to selector
      else goSetMenus();
    } else {
      if (idx > 0) goTo(idx - 1);
    }
  }, [canArrow, group, idx, goTo, getSetMenuBounds, goSetMenus]);

  const arrowNext = useCallback(() => {
    if (!canArrow) return;
    if (group === 'set-menu') {
      const { maxIdx } = getSetMenuBounds();
      if (idx < maxIdx) goTo(idx + 1);
      // if at last slide of group, loop back to selector
      else goSetMenus();
    } else {
      if (idx < deck.length - 1) goTo(idx + 1);
    }
  }, [canArrow, group, idx, deck.length, goTo, getSetMenuBounds, goSetMenus]);

  // Prev button disabled state
  const prevDisabled = !canArrow || (group === 'cover' && idx === 0);
  const nextDisabled = !canArrow;

  // ── Keyboard ──────────────────────────────────────────────────
  useEffect(() => {
    if (editMode) return;
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { arrowNext(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { arrowPrev(); e.preventDefault(); }
      else if (e.key === 'Escape' || e.key === 'Home') goHome();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editMode, arrowNext, arrowPrev, goHome]);

  const chromeOnOlive = window.SLIDE_IS_OLIVE ? window.SLIDE_IS_OLIVE(slide) : false;

  // ── Viewer ────────────────────────────────────────────────────
  const viewer = (
    <div className="app" data-screen-label={`${String(idx+1).padStart(2,'0')} ${slide.id}`}>
      <main className="stage">
        <Slide
          slide={slide}
          lang={lang}
          onPickMenu={onPickMenu}
          onGoToSelector={goSetMenus}
          onGoToCustomMenu={goCustomMenu}
          onPickCategory={onPickCategory}
          onGoToCustomSelector={goCustomSelector}
          onGoToSummary={goSummary}
          onGoToNextCategory={onGoToNextCategory}
          clientName={clientName}
          setClientName={setClientName}
          onContinueToCustomSelector={goCustomSelector}
          selections={selections}
          onToggleItem={onToggleItem}
        />
      </main>

      {/* Top chrome */}
      <header className={`chrome chrome-top ${chromeOnOlive ? 'chrome--olive' : ''}`}>
        <div className="chrome-left">
          {!isCover && !isSection && (
            <button className="chrome-link" onClick={goHome}>
              <i className="ti ti-home" />{t(ui.home, lang)}
            </button>
          )}
          {(isSetMenuFlow || isSelector) && (
            <button className="chrome-link" onClick={goSetMenus}>{t(ui.setMenus, lang)}</button>
          )}
          {isCustomFlow && (
            <button className="chrome-link" onClick={goCustomSelector}>
              <i className="ti ti-layout-grid" />
              {t(ui.customMenu, lang)}
            </button>
          )}
        </div>
        <div className="chrome-center" aria-hidden="true" />
        <div className="chrome-right">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={`lang-btn ${lang==='es' ? 'is-active' : ''}`} onClick={() => setLang('es')}>ES</button>
            <span className="lang-divider">·</span>
            <button className={`lang-btn ${lang==='en' ? 'is-active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
          <button
            className={`cms-open-btn ${chromeOnOlive ? 'cms-open-btn--olive' : ''}`}
            onClick={() => setEditMode(true)} title="Abrir editor de contenido">
            EDITOR
          </button>
        </div>
      </header>

      {/* Bottom chrome */}
      <footer className={`chrome chrome-bottom ${chromeOnOlive ? 'chrome--olive' : ''}`}>
        <div className="chrome-left">
          <span className="counter">{String(idx+1).padStart(2,'0')} / {String(deck.length).padStart(2,'0')}</span>
        </div>
        <div className="chrome-center">
          {/* Standard dots: only for non-custom, non-locked slides */}
          {!isCustomFlow && group !== 'locked' && (
            <div className="dots" aria-hidden="true">
              {deck
                .filter(s => !CUSTOM_TYPES.has(s.type) && s.group !== 'locked')
                .map(s => {
                  const realIdx = deck.indexOf(s);
                  return (
                    <button key={s.id}
                      className={`dot ${realIdx === idx ? 'is-active' : ''}`}
                      onClick={canArrow ? () => goTo(realIdx) : undefined}
                      aria-label={`Slide ${realIdx+1}`}
                      style={canArrow ? {} : { pointerEvents: 'none' }}
                    />
                  );
                })}
            </div>
          )}
          {/* Custom flow: category progress dots */}
          {isCustomFlow && (
            <div className="custom-progress-dots" aria-hidden="true">
              {['comienzo','dulce','principal','acompanar'].map(catId => {
                const cat    = window.DECK_CONTENT.customCategories[catId];
                const isDone = (selections[catId] || []).length >= cat.max;
                return (
                  <span key={catId} className={`custom-dot ${isDone ? 'is-done' : ''}`}
                    title={t(cat.title, lang)} />
                );
              })}
            </div>
          )}
        </div>
        <div className="chrome-right">
          {canArrow && (
            <>
              <button className="nav-btn" onClick={arrowPrev}
                disabled={prevDisabled} aria-label="Previous">
                <i className="ti ti-arrow-left" />
              </button>
              <button className="nav-btn" onClick={arrowNext}
                disabled={nextDisabled} aria-label="Next">
                <i className="ti ti-arrow-right" />
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
        activeIdx={idx} setActiveIdx={setIdx} onClose={() => setEditMode(false)}>
        {viewer}
      </EditorShell>
    );
  }

  return viewer;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
