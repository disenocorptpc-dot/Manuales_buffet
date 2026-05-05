// app.jsx — main shell, navigation, language toggle + CMS editor toggle
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

  // Edit mode toggle — no URL param needed
  const [editMode, setEditMode] = useState(false);

  // ── Custom Menu state ──────────────────────────────────────────
  // clientName: string entered on the intro slide
  const [clientName, setClientName] = useState('');
  // selections: { [categoryId]: string[] } — selected item IDs per category
  const [selections, setSelections] = useState({});

  const onToggleItem = useCallback((catId, newIds) => {
    setSelections(prev => ({ ...prev, [catId]: newIds }));
  }, []);

  // Read initial position from URL hash
  const initial = useMemo(() => {
    const m = (window.location.hash || '').match(/#\/(\d+)(?:\/(es|en))?/);
    return {
      idx:  m ? Math.min(deck.length - 1, Math.max(0, parseInt(m[1], 10) || 0)) : 0,
      lang: m && m[2] ? m[2] : 'en',
    };
  }, []);

  const [idx,  setIdx]  = useState(initial.idx);
  const [lang, setLang] = useState(initial.lang);

  // Persist to hash
  useEffect(() => {
    const h = `#/${idx}/${lang}`;
    if (window.location.hash !== h) window.history.replaceState(null, '', h);
  }, [idx, lang]);

  // Clamp idx when deck length changes (editor deletes slides)
  useEffect(() => {
    if (idx >= deck.length) setIdx(deck.length - 1);
  }, [deck.length]);

  const slide = deck[idx] || deck[0];

  const goTo       = useCallback((i) => setIdx(Math.min(deck.length - 1, Math.max(0, i))), [deck.length]);

  // Home → section slide (Set Menu / Custom Menu selector), NOT the cover
  const goHome     = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'section');
    if (i >= 0) goTo(i); else goTo(0);
  }, [deck, goTo]);

  // Navigate to Set Menus selector pill
  const goSetMenus = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'selector');
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  // Navigate to Custom Menu intro
  const goCustomMenu = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'customIntro');
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  // Navigate to Custom Menu category selector
  const goCustomSelector = useCallback(() => {
    const i = deck.findIndex(s => s.type === 'customSelector');
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  // Pick a Set Menu by ID → go to its header slide
  const onPickMenu = useCallback((menuId) => {
    const i = deck.findIndex(s => s.type === 'menuHeader' && s.menuId === menuId);
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  // Pick a Custom Category by ID → go to its section slide
  const onPickCategory = useCallback((catId) => {
    const i = deck.findIndex(s => s.type === 'customSection' && s.categoryId === catId);
    if (i >= 0) goTo(i);
  }, [deck, goTo]);

  // Keyboard nav (only in presentation mode)
  useEffect(() => {
    if (editMode) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { goTo(idx + 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { goTo(idx - 1); e.preventDefault(); }
      else if (e.key === 'Home' || e.key === 'Escape') goHome();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, editMode]);

  const isCover        = slide.type === 'cover';
  const isSection      = slide.type === 'section';
  const isMenuSlide    = slide.type === 'menuHeader' || slide.type === 'menuDetail';
  const isCustomFlow   = slide.type === 'customIntro' || slide.type === 'customSelector' || slide.type === 'customSection';
  const chromeOnOlive  = window.SLIDE_IS_OLIVE ? window.SLIDE_IS_OLIVE(slide) : false;

  // ── Viewer ─────────────────────────────────────────────────────
  const viewer = (
    <div className="app" data-screen-label={`${String(idx + 1).padStart(2, '0')} ${slide.id}`}>
      <main className="stage">
        <Slide
          slide={slide}
          lang={lang}
          onPickMenu={onPickMenu}
          onGoToSelector={goSetMenus}
          onGoToCustomMenu={goCustomMenu}
          onPickCategory={onPickCategory}
          onGoToCustomSelector={goCustomSelector}
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
          {isMenuSlide && (
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
            <button className={`lang-btn ${lang === 'es' ? 'is-active' : ''}`} onClick={() => setLang('es')}>ES</button>
            <span className="lang-divider">·</span>
            <button className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
          <button
            className={`cms-open-btn ${chromeOnOlive ? 'cms-open-btn--olive' : ''}`}
            onClick={() => setEditMode(true)}
            title="Abrir editor de contenido"
          >
            EDITOR
          </button>
        </div>
      </header>

      {/* Bottom chrome */}
      <footer className={`chrome chrome-bottom ${chromeOnOlive ? 'chrome--olive' : ''}`}>
        <div className="chrome-left">
          <span className="counter">{String(idx + 1).padStart(2, '0')} / {String(deck.length).padStart(2, '0')}</span>
        </div>
        <div className="chrome-center">
          <div className="dots" aria-hidden="true">
            {deck.map((_, i) => (
              <button key={i} className={`dot ${i === idx ? 'is-active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="chrome-right">
          <button className="nav-btn" onClick={() => goTo(idx - 1)} disabled={idx === 0} aria-label="Previous"><i className="ti ti-arrow-left" /></button>
          <button className="nav-btn" onClick={() => goTo(idx + 1)} disabled={idx === deck.length - 1} aria-label="Next"><i className="ti ti-arrow-right" /></button>
        </div>
      </footer>

    </div>
  );

  // ── CMS mode ───────────────────────────────────────────────────
  if (editMode) {
    return (
      <EditorShell
        deckState={deckState}
        setDeckState={setDeckState}
        activeIdx={idx}
        setActiveIdx={setIdx}
        onClose={() => setEditMode(false)}
      >
        {viewer}
      </EditorShell>
    );
  }

  return viewer;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
