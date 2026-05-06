import './tokens.css';
import './styles.css';
import './editor.css';

// Re-export DECK_CONTENT as window global so existing components
// can be migrated incrementally without changing all references at once.
import { DECK_CONTENT } from './data.js';
window.DECK_CONTENT = DECK_CONTENT;

// Components are imported in order: slides → editor → app
import './slides.jsx';
import './editor.jsx';
import './app.jsx';
