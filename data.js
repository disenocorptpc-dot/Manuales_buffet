// data.js — Buffet Breakfast deck content (bilingual)
// Single source of truth. To add slides: append to deck array.
// To add menus: append to menus object; reference id in selector slide.

window.DECK_CONTENT = {
  meta: {
    brand: "Palace",
    program: "Buffet",
    version: "OP2 · MPPC",
    title: { es: "Buffet Breakfast", en: "Buffet Breakfast" },
    subtitle: {
      es: "Una experiencia para compartir",
      en: "An experience to share",
    },
    coverImage:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=2400&q=80",
  },

  ui: {
    home:        { es: "Inicio",     en: "Home" },
    setMenus:    { es: "Set Menus",  en: "Set Menus" },
    chooseOne:   { es: "Elige 1 opción", en: "Choose 1 option" },
    chooseSection: { es: "Set Menus  ·  Customized Menu", en: "Set Menus  ·  Customized Menu" },
    setMenusTagline: {
      es: "Cada experiencia ha sido cuidadosamente diseñada y elaborada a la más alta calidad.",
      en: "Each experience has been carefully crafted and custom made to the highest quality.",
    },
    allergyDisclaimer: {
      es: "Este alimento contiene frutos secos o semillas que pueden causar alergias.",
      en: "This food contains nuts or seeds that can cause allergies.",
    },
    dietary: {
      vegan:      { es: "Vegano",      en: "Vegan" },
      vegetarian: { es: "Vegetariano", en: "Vegetarian" },
      glutenFree: { es: "Sin gluten",  en: "Gluten free" },
      contains:   { es: "Contiene",    en: "Contains" },
    },
  },

  // ── Set menus library ──────────────────────────────────────────
  menus: {
    "mexican-morning": {
      title: { es: "Mexican Morning", en: "Mexican Morning" },
      subtitle: {
        es: "Sabores tradicionales del amanecer mexicano",
        en: "Traditional flavors from the Mexican sunrise",
      },
      hero:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=2400&q=80",
      categories: [
        {
          title: { es: "Jugo", en: "Juice" },
          tags: ["vegan", "vegetarian"],
          items: [
            { es: "Naranja",         en: "Orange" },
            { es: "Verde",           en: "Green" },
          ],
        },
        {
          title: { es: "Fruta", en: "Fruit" },
          tags: ["vegan", "vegetarian", "glutenFree"],
          items: [
            { es: "Piña",            en: "Pineapple" },
            { es: "Papaya",          en: "Papaya" },
            { es: "Melón verde",     en: "Honeydew" },
          ],
        },
        {
          title: { es: "Recién horneado", en: "Freshly baked" },
          tags: ["vegetarian"],
          items: [
            { es: "Concha",          en: "Concha" },
            { es: "Palmera",         en: "Palmier" },
            { es: "Rol de canela",   en: "Cinnamon roll" },
          ],
        },
        {
          title: { es: "Cocina caliente", en: "Hot kitchen" },
          tags: [],
          items: [
            { es: "Chilaquiles verdes con pollo deshebrado", en: "Green chilaquiles with shredded chicken" },
            { es: "Huevos divorciados",                       en: "Divorced eggs" },
            { es: "Frijoles refritos",                        en: "Refried beans" },
            { es: "Machaca con huevo",                        en: "Machaca with egg" },
          ],
        },
        {
          title: { es: "Estación de comales", en: "Comal station" },
          tags: [],
          items: [
            { es: "Tortillas a mano de maíz",   en: "Hand-pressed corn tortillas" },
            { es: "Quesadillas de flor de calabaza", en: "Squash blossom quesadillas" },
            { es: "Sopes de tinga",             en: "Tinga sopes" },
          ],
        },
      ],
      hasNuts: true,
    },

    "classic-american": {
      title: { es: "Classic American", en: "Classic American" },
      subtitle: {
        es: "El desayuno americano clásico, reinventado",
        en: "The classic American breakfast, reimagined",
      },
      hero:
        "https://images.unsplash.com/photo-1533920379810-6bedac961555?auto=format&fit=crop&w=2400&q=80",
      categories: [
        {
          title: { es: "Jugo", en: "Juice" },
          tags: ["vegan", "vegetarian"],
          items: [
            { es: "Naranja",     en: "Orange" },
            { es: "Toronja",     en: "Grapefruit" },
            { es: "Manzana",     en: "Apple" },
          ],
        },
        {
          title: { es: "Cereal & lácteos", en: "Cereal & dairy" },
          tags: ["vegetarian"],
          items: [
            { es: "Granola casera",      en: "House-made granola" },
            { es: "Hojuelas de maíz",    en: "Corn flakes" },
            { es: "Yogurt griego",       en: "Greek yogurt" },
            { es: "Leche de almendra",   en: "Almond milk" },
          ],
        },
        {
          title: { es: "Panadería", en: "Bakery" },
          tags: ["vegetarian"],
          items: [
            { es: "Bagel con queso crema", en: "Bagel with cream cheese" },
            { es: "Muffin de blueberry",   en: "Blueberry muffin" },
            { es: "Croissant",             en: "Croissant" },
          ],
        },
        {
          title: { es: "Estación de huevos", en: "Egg station" },
          tags: [],
          items: [
            { es: "Huevos al gusto",          en: "Eggs your way" },
            { es: "Omelette de tres quesos",  en: "Three-cheese omelette" },
            { es: "Eggs Benedict",            en: "Eggs Benedict" },
          ],
        },
        {
          title: { es: "Acompañamientos", en: "Sides" },
          tags: [],
          items: [
            { es: "Tocino crujiente",     en: "Crispy bacon" },
            { es: "Salchicha de pavo",    en: "Turkey sausage" },
            { es: "Hash browns",          en: "Hash browns" },
            { es: "Hotcakes con maple",   en: "Pancakes with maple syrup" },
          ],
        },
      ],
      hasNuts: true,
    },

    "continental": {
      title: { es: "Continental", en: "Continental" },
      subtitle: {
        es: "Una mañana ligera al estilo europeo",
        en: "A light European-style morning",
      },
      hero:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=2400&q=80",
      categories: [
        {
          title: { es: "Jugo", en: "Juice" },
          tags: ["vegan", "vegetarian"],
          items: [
            { es: "Naranja",     en: "Orange" },
            { es: "Toronja rosa",en: "Pink grapefruit" },
          ],
        },
        {
          title: { es: "Charcutería & quesos", en: "Charcuterie & cheese" },
          tags: [],
          items: [
            { es: "Prosciutto di Parma",   en: "Prosciutto di Parma" },
            { es: "Salami napolitano",     en: "Neapolitan salami" },
            { es: "Brie",                  en: "Brie" },
            { es: "Manchego curado",       en: "Aged Manchego" },
          ],
        },
        {
          title: { es: "Panadería europea", en: "European bakery" },
          tags: ["vegetarian"],
          items: [
            { es: "Croissant de mantequilla", en: "Butter croissant" },
            { es: "Pain au chocolat",         en: "Pain au chocolat" },
            { es: "Brioche",                  en: "Brioche" },
          ],
        },
        {
          title: { es: "Fruta & yogurt", en: "Fruit & yogurt" },
          tags: ["vegetarian", "glutenFree"],
          items: [
            { es: "Berries de temporada", en: "Seasonal berries" },
            { es: "Yogurt natural",       en: "Plain yogurt" },
            { es: "Compota de durazno",   en: "Peach compote" },
          ],
        },
      ],
      hasNuts: false,
    },
  },

  // ── Deck structure ─────────────────────────────────────────────
  // Each entry is a slide. Type maps to a component in slides.jsx.
  deck: [
    { id: "cover",     type: "cover" },
    { id: "section-set-menus", type: "section", overline: { es: "Capítulo 01", en: "Chapter 01" }, title: { es: "Set Menus", en: "Set Menus" }, subtitle: { es: "Customized Menu", en: "Customized Menu" } },
    { id: "selector",  type: "selector",
      overline: { es: "Set Menus", en: "Set Menus" },
      heading:  { es: "Elige 1 opción", en: "Choose 1 option" },
      taglineKey: "setMenusTagline",
      options: ["mexican-morning", "classic-american", "continental"],
    },
    { id: "menu-mexican-morning",  type: "menuHeader", menuId: "mexican-morning" },
    { id: "menu-mexican-morning-detail", type: "menuDetail", menuId: "mexican-morning" },
    { id: "menu-classic-american", type: "menuHeader", menuId: "classic-american" },
    { id: "menu-classic-american-detail", type: "menuDetail", menuId: "classic-american" },
    { id: "menu-continental",      type: "menuHeader", menuId: "continental" },
    { id: "menu-continental-detail", type: "menuDetail", menuId: "continental" },
  ],
};
