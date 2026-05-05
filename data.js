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
    customMenu:  { es: "Customized Menu", en: "Customized Menu" },
    chooseOne:   { es: "Elige 1 opción", en: "Choose 1 option" },
    chooseThree: { es: "Elige 3 opciones", en: "Choose 3 options" },
    chooseSection: { es: "Set Menus  ·  Customized Menu", en: "Set Menus  ·  Customized Menu" },
    setMenusTagline: {
      es: "Cada experiencia ha sido cuidadosamente diseñada y elaborada a la más alta calidad.",
      en: "Each experience has been carefully crafted and custom made to the highest quality.",
    },
    customMenuIntroTitle: {
      es: "Crea tu experiencia perfecta",
      en: "Create your perfect experience",
    },
    customMenuIntroBody: {
      es: "Descubra cada una de nuestras estaciones para crear una experiencia perfecta a la hora del desayuno. En cada sección se indica el número de platillos que podrá elegir para armar su propio menú.",
      en: "Discover each of our stations to create a perfect breakfast experience. Each section indicates the number of dishes you may choose to build your own menu.",
    },
    customMenuIntroCTA: {
      es: "¡Buen provecho!",
      en: "Bon appétit!",
    },
    customMenuClientLabel: {
      es: "Nombre del cliente",
      en: "Client name",
    },
    customMenuClientPlaceholder: {
      es: "Ingrese el nombre aquí...",
      en: "Enter name here...",
    },
    customMenuContinue: {
      es: "Continuar",
      en: "Continue",
    },
    backToCategories: {
      es: "Categorías",
      en: "Categories",
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

  // ── Custom Menu categories ─────────────────────────────────────
  // Each category has a max of 3 selectable items.
  customCategories: {
    "comienzo": {
      id: "comienzo",
      title: { es: "Para un buen comienzo", en: "A Great Start" },
      subtitle: { es: "Elige 3 opciones", en: "Choose 3 options" },
      max: 3,
      icon: "🌿",
      hero: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
      items: [
        { id: "c1", label: { es: "Jugo de naranja natural", en: "Fresh orange juice" }, tags: ["vegan", "vegetarian", "glutenFree"] },
        { id: "c2", label: { es: "Jugo verde detox", en: "Green detox juice" }, tags: ["vegan", "vegetarian", "glutenFree"] },
        { id: "c3", label: { es: "Fruta de temporada", en: "Seasonal fruit" }, tags: ["vegan", "vegetarian", "glutenFree"] },
        { id: "c4", label: { es: "Granola con yogurt y miel", en: "Granola with yogurt & honey" }, tags: ["vegetarian", "glutenFree"] },
        { id: "c5", label: { es: "Avena cremosa con frutos rojos", en: "Creamy oatmeal with berries" }, tags: ["vegetarian"] },
        { id: "c6", label: { es: "Ensalada de frutas exóticas", en: "Exotic fruit salad" }, tags: ["vegan", "vegetarian", "glutenFree"] },
        { id: "c7", label: { es: "Smoothie de plátano y fresa", en: "Banana & strawberry smoothie" }, tags: ["vegetarian", "glutenFree"] },
        { id: "c8", label: { es: "Agua fresca de jamaica", en: "Hibiscus agua fresca" }, tags: ["vegan", "vegetarian", "glutenFree"] },
      ],
    },
    "dulce": {
      id: "dulce",
      title: { es: "Una dulce elección", en: "A Sweet Choice" },
      subtitle: { es: "Elige 3 opciones", en: "Choose 3 options" },
      max: 3,
      icon: "🥐",
      hero: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
      items: [
        { id: "d1", label: { es: "Croissant de mantequilla", en: "Butter croissant" }, tags: ["vegetarian"] },
        { id: "d2", label: { es: "Pain au chocolat", en: "Pain au chocolat" }, tags: ["vegetarian"] },
        { id: "d3", label: { es: "Concha de vainilla", en: "Vanilla concha" }, tags: ["vegetarian"] },
        { id: "d4", label: { es: "Hotcakes con maple y berries", en: "Pancakes with maple & berries" }, tags: ["vegetarian"] },
        { id: "d5", label: { es: "Waffles con crema y fresas", en: "Waffles with cream & strawberries" }, tags: ["vegetarian"] },
        { id: "d6", label: { es: "French toast con canela", en: "Cinnamon french toast" }, tags: ["vegetarian"] },
        { id: "d7", label: { es: "Muffin de arándano", en: "Blueberry muffin" }, tags: ["vegetarian"] },
        { id: "d8", label: { es: "Rol de canela glaseado", en: "Glazed cinnamon roll" }, tags: ["vegetarian"] },
      ],
    },
    "principal": {
      id: "principal",
      title: { es: "Plato Principal", en: "Main Course" },
      subtitle: { es: "Elige 3 opciones", en: "Choose 3 options" },
      max: 3,
      icon: "🍳",
      hero: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
      items: [
        { id: "p1", label: { es: "Huevos al gusto (estrellados, tibios, revueltos)", en: "Eggs your way (fried, soft-boiled, scrambled)" }, tags: ["vegetarian"] },
        { id: "p2", label: { es: "Omelette de tres quesos", en: "Three-cheese omelette" }, tags: ["vegetarian"] },
        { id: "p3", label: { es: "Eggs Benedict con salsa holandesa", en: "Eggs Benedict with hollandaise" }, tags: [] },
        { id: "p4", label: { es: "Chilaquiles verdes con pollo deshebrado", en: "Green chilaquiles with shredded chicken" }, tags: [] },
        { id: "p5", label: { es: "Machaca con huevo a la mexicana", en: "Machaca with Mexican-style egg" }, tags: [] },
        { id: "p6", label: { es: "Huevos divorciados (salsa roja y verde)", en: "Divorced eggs (red & green salsa)" }, tags: ["vegetarian"] },
        { id: "p7", label: { es: "Shakshuka de jitomate y pimiento", en: "Tomato & pepper shakshuka" }, tags: ["vegetarian"] },
        { id: "p8", label: { es: "Tortilla española con papas", en: "Spanish omelette with potatoes" }, tags: ["vegetarian"] },
      ],
    },
    "acompanar": {
      id: "acompanar",
      title: { es: "Para acompañar", en: "On the Side" },
      subtitle: { es: "Elige 3 opciones", en: "Choose 3 options" },
      max: 3,
      icon: "🥓",
      hero: "https://images.unsplash.com/photo-1533920379810-6bedac961555?auto=format&fit=crop&w=1200&q=80",
      items: [
        { id: "a1", label: { es: "Tocino crujiente", en: "Crispy bacon" }, tags: ["glutenFree"] },
        { id: "a2", label: { es: "Salchicha de pavo", en: "Turkey sausage" }, tags: ["glutenFree"] },
        { id: "a3", label: { es: "Hash browns dorados", en: "Golden hash browns" }, tags: ["vegan", "vegetarian"] },
        { id: "a4", label: { es: "Frijoles refritos con queso", en: "Refried beans with cheese" }, tags: ["vegetarian", "glutenFree"] },
        { id: "a5", label: { es: "Tortillas de maíz hechas a mano", en: "Hand-made corn tortillas" }, tags: ["vegan", "vegetarian", "glutenFree"] },
        { id: "a6", label: { es: "Tostadas integrales con mantequilla", en: "Whole wheat toast with butter" }, tags: ["vegetarian"] },
        { id: "a7", label: { es: "Aguacate en rebanadas con limón", en: "Sliced avocado with lime" }, tags: ["vegan", "vegetarian", "glutenFree"] },
        { id: "a8", label: { es: "Queso fresco con epazote", en: "Fresh cheese with epazote" }, tags: ["vegetarian", "glutenFree"] },
      ],
    },
  },

  // ── Deck structure ─────────────────────────────────────────────
  // Each entry is a slide. Type maps to a component in slides.jsx.
  deck: [
    { id: "cover",     type: "cover" },
    { id: "section-menu-type", type: "section" },
    // ── Set Menus flow ──────────────────────────────────────────
    { id: "selector",  type: "selector",
      overline: { es: "Set Menus", en: "Set Menus" },
      heading:  { es: "Elige 1 opción", en: "Choose 1 option" },
      taglineKey: "setMenusTagline",
      options: ["mexican-morning", "classic-american"],
    },
    { id: "menu-mexican-morning",        type: "menuHeader", menuId: "mexican-morning" },
    { id: "menu-mexican-morning-detail", type: "menuDetail", menuId: "mexican-morning" },
    { id: "menu-classic-american",       type: "menuHeader", menuId: "classic-american" },
    { id: "menu-classic-american-detail",type: "menuDetail", menuId: "classic-american" },
    { id: "menu-continental",            type: "menuHeader", menuId: "continental" },
    { id: "menu-continental-detail",     type: "menuDetail", menuId: "continental" },
    // ── Custom Menu flow ────────────────────────────────────────
    { id: "custom-intro",      type: "customIntro" },
    { id: "custom-selector",   type: "customSelector",
      categories: ["comienzo", "dulce", "principal", "acompanar"],
    },
    { id: "custom-comienzo",   type: "customSection", categoryId: "comienzo" },
    { id: "custom-dulce",      type: "customSection", categoryId: "dulce" },
    { id: "custom-principal",  type: "customSection", categoryId: "principal" },
    { id: "custom-acompanar",  type: "customSection", categoryId: "acompanar" },
  ],
};
