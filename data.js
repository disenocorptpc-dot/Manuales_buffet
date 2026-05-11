// data.js — Buffet Breakfast deck content (bilingual)
export const DECK_CONTENT = {
  meta: {
    brand: "Palace", program: "Buffet", version: "OP2 · MPPC",
    title:    { es: "Buffet Breakfast", en: "Buffet Breakfast" },
    subtitle: { es: "Una experiencia para compartir", en: "An experience to share" },
  },

  ui: {
    home:        { es: "Inicio",          en: "Home" },
    setMenus:    { es: "Set Menus",       en: "Set Menus" },
    customMenu:  { es: "Customized Menu", en: "Customized Menu" },
    chooseOne:   { es: "Elige 1 opción",  en: "Choose 1 option" },
    setMenusTagline: {
      es: "Cada experiencia ha sido cuidadosamente diseñada y elaborada a la más alta calidad.",
      en: "Each experience has been carefully crafted and custom made to the highest quality.",
    },
    customMenuIntroTitle:       { es: "Crea tu experiencia perfecta",       en: "Create your perfect experience" },
    customMenuIntroBody:        { es: "Descubra cada una de nuestras estaciones para crear una experiencia perfecta a la hora del desayuno. En cada sección se indica el número de platillos que podrá elegir para armar su propio menú.", en: "Discover each of our stations to create a perfect breakfast experience. Each section indicates the number of dishes you may choose to build your own menu." },
    customMenuIntroCTA:         { es: "¡Buen provecho!",                    en: "Bon appétit!" },
    customMenuClientLabel:      { es: "Nombre del cliente",                 en: "Client name" },
    customMenuClientPlaceholder:{ es: "Ingrese el nombre aquí...",           en: "Enter name here..." },
    customMenuContinue:         { es: "Continuar",                          en: "Continue" },
    backToCategories:           { es: "Categorías",                         en: "Categories" },
  },

  // ── Set menus ──────────────────────────────────────────────────
  menus: {
    "mexican-morning": {
      title:    { es: "Mañana Mexicana",                        en: "Mexican Morning" },
      subtitle: { es: "Sabores tradicionales del amanecer mexicano", en: "Traditional flavors from the Mexican sunrise" },
      hero: "assets/img/02_mexican_morning.webp",
      slideImg: "assets/img/03_mexican_morning_slide_1.webp",
      hasNuts: true,
      pages: [
        {
          groups: [
            {
              title: { es: "Jugos", en: "Juices" },
              items: [
                { label: { es: "Naranja", en: "Orange" }, tags: ["vegan"] },
                { label: { es: "Verde",   en: "Green"  }, tags: ["vegan"] },
              ],
            },
            {
              title: { es: "Fruta", en: "Fruit" },
              items: [
                { label: { es: "Piña",        en: "Pineapple"  }, tags: ["vegan"] },
                { label: { es: "Papaya",      en: "Papaya"     }, tags: ["vegan"] },
                { label: { es: "Melón chino", en: "Cantaloupe" }, tags: ["vegan"] },
              ],
            },
            {
              title: { es: "Panadería", en: "Bakery" },
              items: [
                { label: { es: "Concha",          en: "Concha"        }, tags: ["vegetarian"] },
                { label: { es: "Oreja",           en: "Palmier"       }, tags: ["vegetarian"] },
                { label: { es: "Rollo de canela", en: "Cinnamon roll" }, tags: ["vegetarian","nueces"] },
              ],
            },
          ],
        },
        {
          groups: [
            {
              title: { es: "Nuestra Selección", en: "Our Selection" },
              isHotKitchen: true,
              items: [
                { label: { es: "Hot Cake Natural",              en: "Plain Hot Cake"             }, tags: ["vegetarian"] },
                { label: { es: "Chilaquiles Verdes",            en: "Green Chilaquiles"           }, tags: ["picante"] },
                { label: { es: "Huevos con Jamón",              en: "Ham & Eggs"                 }, tags: [] },
                { label: { es: "Rollitos de Pollo y Vegetales", en: "Chicken & Vegetable Rolls"  }, tags: [] },
                { label: { es: "Frijoles Refritos",             en: "Refried Beans"              }, tags: ["vegetarian"] },
                { label: { es: "Salchicha Asada",               en: "Grilled Sausage"            }, tags: [] },
                { label: { es: "Champiñones",                   en: "Mushrooms"                  }, tags: ["vegan"] },
              ],
            },
          ],
        },
      ],
    },

    "classic-american": {
      title:    { es: "Tradicional Americano", en: "Classic American" },
      subtitle: { es: "El desayuno americano clásico, reinventado", en: "The classic American breakfast, reimagined" },
      hero: "assets/img/08_desayuno_americano.webp",
      slideImg: "assets/img/05_desayuno_americano.webp",
      hasNuts: true,
      pages: [
        {
          groups: [
            {
              title: { es: "Jugos", en: "Juices" },
              items: [
                { label: { es: "Naranja", en: "Orange" }, tags: ["vegan"] },
                { label: { es: "Verde",   en: "Green"  }, tags: ["vegan"] },
              ],
            },
            {
              title: { es: "Fruta", en: "Fruit" },
              items: [
                { label: { es: "Piña",        en: "Pineapple"  }, tags: ["vegan"] },
                { label: { es: "Papaya",      en: "Papaya"     }, tags: ["vegan"] },
                { label: { es: "Melón chino", en: "Cantaloupe" }, tags: ["vegan"] },
              ],
            },
            {
              title: { es: "Panadería", en: "Bakery" },
              items: [
                { label: { es: "Croissant de Chocolate", en: "Chocolate Croissant" }, tags: ["vegetarian"] },
                { label: { es: "Rollo de Canela",        en: "Cinnamon Roll"       }, tags: ["vegetarian","nueces"] },
                { label: { es: "Concha",                 en: "Concha"              }, tags: ["vegetarian"] },
              ],
            },
          ],
        },
        {
          groups: [
            {
              title: { es: "Nuestra Selección", en: "Our Selection" },
              isHotKitchen: true,
              items: [
                { label: { es: "Waffles",                en: "Waffles"              }, tags: ["vegetarian"] },
                { label: { es: "Avena Caliente",         en: "Hot Oatmeal"          }, tags: ["vegetarian","nueces"] },
                { label: { es: "Huevos con Jamón",       en: "Ham & Eggs"           }, tags: [] },
                { label: { es: "Queso Panela Asado",     en: "Grilled Panela Cheese"}, tags: ["vegetarian"] },
                { label: { es: "Muffin de Huevo y Tocino", en: "Egg & Bacon Muffin"}, tags: [] },
                { label: { es: "Mix de Embutidos",       en: "Sausage Mix"          }, tags: [] },
                { label: { es: "Tomates Asados",         en: "Roasted Tomatoes"     }, tags: ["vegan"] },
              ],
            },
          ],
        },
      ],
    },
  },

  // ── Custom categories ──────────────────────────────────────────
  customCategories: {
    "comienzo": {
      id:"comienzo", title:{es:"Para un buen comienzo",en:"A Great Start"},
      subtitle:{es:"Elige 3 opciones",en:"Choose 3 options"}, max:3,
      hero:"assets/img/09_un_buen_comienzo_custom_menu.webp",
      items:[
        {id:"c1", label:{es:"Agua de piña",                 en:"Pineapple water"              },tags:["vegan"]},
        {id:"c2", label:{es:"Jugo de manzana",              en:"Apple juice"                  },tags:["vegan"]},
        {id:"c3", label:{es:"Jugo de naranja",              en:"Orange juice"                 },tags:["vegan"]},
        {id:"c4", label:{es:"Jugo de toronja",              en:"Grapefruit juice"             },tags:["vegan"]},
        {id:"c5", label:{es:"Jugo de zanahoria y betabel",  en:"Carrot & beet juice"          },tags:["vegan"]},
        {id:"c6", label:{es:"Jugo verde",                   en:"Green juice"                  },tags:["vegan"]},
        {id:"c7", label:{es:"Piña",                         en:"Pineapple"                    },tags:["vegan"]},
        {id:"c8", label:{es:"Papaya",                       en:"Papaya"                       },tags:["vegan"]},
        {id:"c9", label:{es:"Melón chino",                  en:"Cantaloupe"                   },tags:["vegan"]},
        {id:"c10",label:{es:"Melón Valencia",               en:"Honeydew melon"               },tags:["vegan"]},
        {id:"c11",label:{es:"Sandía",                       en:"Watermelon"                   },tags:["vegan"]},
        {id:"c12",label:{es:"Toronja",                      en:"Grapefruit"                   },tags:["vegan"]},
        {id:"c13",label:{es:"Concha",                       en:"Concha"                       },tags:["vegetarian"]},
        {id:"c14",label:{es:"Oreja",                        en:"Palmier"                      },tags:["vegetarian"]},
        {id:"c15",label:{es:"Croissant natural",            en:"Plain croissant"              },tags:["vegetarian"]},
        {id:"c16",label:{es:"Croissant de chocolate",       en:"Chocolate croissant"          },tags:["vegetarian"]},
        {id:"c17",label:{es:"Brioche de vainilla",          en:"Vanilla brioche"              },tags:["vegetarian"]},
        {id:"c18",label:{es:"Rollo de canela",              en:"Cinnamon roll"                },tags:["vegetarian","nueces"]},
      ],
    },
    "dulce": {
      id:"dulce", title:{es:"Una dulce elección",en:"A Sweet Choice"},
      subtitle:{es:"Elige 3 opciones",en:"Choose 3 options"}, max:3,
      hero:"assets/img/06_una_dulce_eleccion_custom_menu.webp",
      items:[
        {id:"d1", label:{es:"Arroz con leche",              en:"Rice pudding"                 },tags:["vegetarian"]},
        {id:"d2", label:{es:"Avena caliente",               en:"Hot oatmeal"                  },tags:["vegetarian","nueces"]},
        {id:"d3", label:{es:"Budín de croissant",           en:"Croissant pudding"            },tags:["vegetarian"]},
        {id:"d4", label:{es:"Hot cake de avena y coco",     en:"Oatmeal & coconut pancake"    },tags:["vegan"]},
        {id:"d5", label:{es:"Hot cakes con arándanos",      en:"Blueberry pancakes"           },tags:["vegetarian"]},
        {id:"d6", label:{es:"Hot cake natural",             en:"Plain pancake"                },tags:["vegetarian"]},
        {id:"d7", label:{es:"Pan francés de vainilla",      en:"Vanilla french toast"         },tags:["vegetarian"]},
        {id:"d8", label:{es:"Roles de canela glaseados",    en:"Glazed cinnamon rolls"        },tags:["vegetarian"]},
        {id:"d9", label:{es:"Waffles",                      en:"Waffles"                      },tags:["vegetarian"]},
        {id:"d10",label:{es:"Plátanos",                     en:"Bananas"                      },tags:["vegan"]},
      ],
    },
    "principal": {
      id:"principal", title:{es:"Plato Principal",en:"Main Course"},
      subtitle:{es:"Elige 3 opciones",en:"Choose 3 options"}, max:3,
      hero:"assets/img/01_plato_principal_custom_menu.webp",
      items:[
        {id:"p1", label:{es:"Chilaquiles rojos",                 en:"Red chilaquiles"                 },tags:["picante"]},
        {id:"p2", label:{es:"Huevo a la mexicana",               en:"Mexican-style eggs"              },tags:["vegetarian"]},
        {id:"p3", label:{es:"Huevo con longaniza",               en:"Eggs with longaniza"             },tags:[]},
        {id:"p4", label:{es:"Huevo con salsa verde",             en:"Eggs with green salsa"           },tags:["vegetarian"]},
        {id:"p5", label:{es:"Huevos naturales",                  en:"Plain eggs"                      },tags:["vegetarian"]},
        {id:"p6", label:{es:"Huevo con jamón",                   en:"Ham & eggs"                      },tags:[]},
        {id:"p7", label:{es:"Muffin de huevo y chorizo",         en:"Egg & chorizo muffin"            },tags:[]},
        {id:"p8", label:{es:"Muffin de huevo y tocino",          en:"Egg & bacon muffin"              },tags:[]},
        {id:"p9", label:{es:"Chilaquiles verdes",                en:"Green chilaquiles"               },tags:["picante"]},
        {id:"p10",label:{es:"Queso panela asado",                en:"Grilled panela cheese"           },tags:["vegetarian"]},
        {id:"p11",label:{es:"Tacos dorados",                     en:"Fried tacos"                     },tags:[]},
        {id:"p12",label:{es:"Quiche croissant de jamón y queso", en:"Ham & cheese croissant quiche"   },tags:[]},
        {id:"p13",label:{es:"Tinga de pollo",                    en:"Chicken tinga"                   },tags:["picante"]},
        {id:"p14",label:{es:"Rajas con papas",                   en:"Poblano strips with potatoes"    },tags:["vegetarian","picante"]},
        {id:"p15",label:{es:"Rollitos de pollo y vegetales",     en:"Chicken & vegetable rolls"       },tags:[]},
        {id:"p16",label:{es:"Tortilla española",                 en:"Spanish omelette"                },tags:["vegetarian"]},
        {id:"p17",label:{es:"Tortitas de coliflor y queso",      en:"Cauliflower & cheese patties"    },tags:["vegetarian"]},
      ],
    },
    "acompanar": {
      id:"acompanar", title:{es:"Para acompañar",en:"On the Side"},
      subtitle:{es:"Elige 3 opciones",en:"Choose 3 options"}, max:3,
      hero:"assets/img/07_para_acompanar_custom_menu.webp",
      items:[
        {id:"a1", label:{es:"Chorizo español",            en:"Spanish chorizo"             },tags:[]},
        {id:"a2", label:{es:"Arroz blanco",               en:"White rice"                  },tags:["vegan"]},
        {id:"a3", label:{es:"Verduras al vapor",          en:"Steamed vegetables"          },tags:["vegan"]},
        {id:"a4", label:{es:"Puré de papa",               en:"Mashed potatoes"             },tags:["vegetarian"]},
        {id:"a5", label:{es:"Frijoles refritos",          en:"Refried beans"               },tags:["vegetarian"]},
        {id:"a6", label:{es:"Verduras a la mantequilla",  en:"Buttered vegetables"         },tags:["vegetarian"]},
        {id:"a7", label:{es:"Mix de embutidos",           en:"Sausage mix"                 },tags:[]},
        {id:"a8", label:{es:"Salchicha asada",            en:"Grilled sausage"             },tags:[]},
        {id:"a9", label:{es:"Tocino crujiente",           en:"Crispy bacon"                },tags:[]},
        {id:"a10",label:{es:"Brócoli al gratín",          en:"Broccoli au gratin"          },tags:["vegetarian"]},
        {id:"a11",label:{es:"Champiñones salteados",      en:"Sautéed mushrooms"           },tags:["vegan"]},
        {id:"a12",label:{es:"Espinacas salteadas",        en:"Sautéed spinach"             },tags:["vegan"]},
        {id:"a13",label:{es:"Tomates asados",             en:"Roasted tomatoes"            },tags:["vegan"]},
      ],
    },
  },

  // ── Deck ───────────────────────────────────────────────────────
  // group: "cover" | "locked" | "set-menu" | "custom"
  deck: [
    { id:"cover",           type:"cover",         group:"cover"    },
    { id:"section-type",    type:"section",        group:"locked"   },
    { id:"selector",        type:"selector",       group:"locked",
      options:["mexican-morning","classic-american"] },

    // Mexican Morning (3 slides)
    { id:"mx-header", type:"menuHeader",  menuId:"mexican-morning",  group:"set-menu" },
    { id:"mx-pg0",    type:"menuContent", menuId:"mexican-morning",  pageIndex:0, group:"set-menu" },
    { id:"mx-pg1",    type:"menuContent", menuId:"mexican-morning",  pageIndex:1, group:"set-menu" },

    // Classic American (3 slides)
    { id:"am-header", type:"menuHeader",  menuId:"classic-american", group:"set-menu" },
    { id:"am-pg0",    type:"menuContent", menuId:"classic-american", pageIndex:0, group:"set-menu" },
    { id:"am-pg1",    type:"menuContent", menuId:"classic-american", pageIndex:1, group:"set-menu" },

    // Custom Menu flow
    { id:"custom-intro",     type:"customIntro",    group:"custom" },
    { id:"custom-selector",  type:"customSelector", group:"custom",
      categories:["comienzo","dulce","principal","acompanar"] },
    { id:"custom-comienzo",  type:"customSection",  group:"custom", categoryId:"comienzo"  },
    { id:"custom-dulce",     type:"customSection",  group:"custom", categoryId:"dulce"     },
    { id:"custom-principal", type:"customSection",  group:"custom", categoryId:"principal" },
    { id:"custom-acompanar", type:"customSection",  group:"custom", categoryId:"acompanar" },
    { id:"custom-summary",   type:"customSummary",  group:"custom" },
  ],
};
