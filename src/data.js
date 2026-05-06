// data.js â€” Buffet Breakfast deck content (bilingual)
export const DECK_CONTENT = {
  meta: {
    brand: "Palace", program: "Buffet", version: "OP2 Â· MPPC",
    title:    { es: "Buffet Breakfast", en: "Buffet Breakfast" },
    subtitle: { es: "Una experiencia para compartir", en: "An experience to share" },
  },

  ui: {
    home:        { es: "Inicio",          en: "Home" },
    setMenus:    { es: "Set Menus",       en: "Set Menus" },
    customMenu:  { es: "Customized Menu", en: "Customized Menu" },
    chooseOne:   { es: "Elige 1 opciÃ³n",  en: "Choose 1 option" },
    setMenusTagline: {
      es: "Cada experiencia ha sido cuidadosamente diseÃ±ada y elaborada a la mÃ¡s alta calidad.",
      en: "Each experience has been carefully crafted and custom made to the highest quality.",
    },
    customMenuIntroTitle:       { es: "Crea tu experiencia perfecta",       en: "Create your perfect experience" },
    customMenuIntroBody:        { es: "Descubra cada una de nuestras estaciones para crear una experiencia perfecta a la hora del desayuno. En cada secciÃ³n se indica el nÃºmero de platillos que podrÃ¡ elegir para armar su propio menÃº.", en: "Discover each of our stations to create a perfect breakfast experience. Each section indicates the number of dishes you may choose to build your own menu." },
    customMenuIntroCTA:         { es: "Â¡Buen provecho!",                    en: "Bon appÃ©tit!" },
    customMenuClientLabel:      { es: "Nombre del cliente",                 en: "Client name" },
    customMenuClientPlaceholder:{ es: "Ingrese el nombre aquÃ­...",           en: "Enter name here..." },
    customMenuContinue:         { es: "Continuar",                          en: "Continue" },
    backToCategories:           { es: "CategorÃ­as",                         en: "Categories" },
  },

  // â”€â”€ Set menus â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  menus: {
    "mexican-morning": {
      title:    { es: "Ma\u00f1ana Mexicana",                       en: "Mexican Morning" },
      subtitle: { es: "Sabores tradicionales del amanecer mexicano", en: "Traditional flavors from the Mexican sunrise" },
      hero: "assets/img/02_mexican_morning.webp",
      slideImg: "assets/img/03_mexican_morning_slide_1.webp",
      hasNuts: true,
      // pages[0] â†’ jugos + fruta
      pages: [
        {
          groups: [
            {
              title: { es: "Jugos", en: "Juices" },
              items: [
                { label: { es: "Naranja", en: "Orange" }, tags: ["vegan","vegetarian"] },
                { label: { es: "Verde",   en: "Green"  }, tags: ["vegan","vegetarian"] },
              ],
            },
            {
              title: { es: "Fruta", en: "Fruit" },
              items: [
                { label: { es: "PiÃ±a",        en: "Pineapple"  }, tags: ["vegan","vegetarian"] },
                { label: { es: "Papaya",      en: "Papaya"     }, tags: ["vegan","vegetarian"] },
                { label: { es: "MelÃ³n chino", en: "Cantaloupe" }, tags: ["vegan","vegetarian"] },
              ],
            },
          ],
        },
        // pages[1] â†’ panaderÃ­a + nuestra selecciÃ³n
        {
          groups: [
            {
              title: { es: "PanaderÃ­a", en: "Bakery" },
              items: [
                { label: { es: "Concha",          en: "Concha"        }, tags: ["vegetarian"] },
                { label: { es: "Oreja",           en: "Palmier"       }, tags: ["vegetarian"] },
                { label: { es: "Rollo de canela", en: "Cinnamon roll" }, tags: ["vegetarian","nueces"] },
              ],
            },
            {
              title: { es: "Nuestra SelecciÃ³n", en: "Our Selection" },
              isHotKitchen: true,
              items: [
                { label: { es: "Hot Cake Natural",             en: "Plain Hot Cake"              }, tags: ["vegetarian"], description: { es: "Nuestros clÃ¡sicos e imperdibles hot cakes.", en: "Our classic and unmissable hot cakes." } },
                { label: { es: "Chilaquiles Verdes",           en: "Green Chilaquiles"            }, tags: ["picante"],   description: { es: "BaÃ±ados con salsa verde, crema y queso.", en: "Bathed in green sauce with cream and cheese." } },
                { label: { es: "Huevos con JamÃ³n",             en: "Ham & Eggs"                  }, tags: [],            description: { es: "Esponjoso huevo revuelto con jamÃ³n y mantequilla.", en: "Fluffy scrambled egg with ham and butter." } },
                { label: { es: "Rollitos de Pollo y Vegetales",en: "Chicken & Vegetable Rolls"   }, tags: [],            description: { es: "Pechuga rellena de calabaza, zanahoria y pimientos.", en: "Chicken stuffed with squash, carrot and peppers." } },
                { label: { es: "Frijoles Refritos",            en: "Refried Beans"               }, tags: ["vegetarian"],description: { es: "Con cubos de queso panela asado.", en: "With cubes of grilled panela cheese." } },
                { label: { es: "Salchicha Asada",              en: "Grilled Sausage"             }, tags: [],            description: { es: "Elaborada con carne de cerdo y especias.", en: "Made with pork meat and spices." } },
                { label: { es: "ChampiÃ±ones",                  en: "Mushrooms"                   }, tags: ["vegan"],     description: { es: "Salteados.", en: "SautÃ©ed." } },
              ],
            },
          ],
        },
      ],
    },

    "classic-american": {
      title:    { es: "Tradicional Americano", en: "Classic American" },
      subtitle: { es: "El desayuno americano clÃ¡sico, reinventado", en: "The classic American breakfast, reimagined" },
      hero: "assets/img/08_desayuno_americano.webp",
      slideImg: "assets/img/05_desayuno_americano.webp",
      hasNuts: true,
      pages: [
        {
          groups: [
            {
              title: { es: "Jugos", en: "Juices" },
              items: [
                { label: { es: "Naranja", en: "Orange"     }, tags: ["vegan","vegetarian"] },
                { label: { es: "Toronja", en: "Grapefruit" }, tags: ["vegan","vegetarian"] },
              ],
            },
            {
              title: { es: "Fruta", en: "Fruit" },
              items: [
                { label: { es: "MelÃ³n chino", en: "Cantaloupe" }, tags: ["vegan","vegetarian"] },
                { label: { es: "SandÃ­a",      en: "Watermelon"  }, tags: ["vegan","vegetarian"] },
                { label: { es: "Toronja",     en: "Grapefruit"  }, tags: ["vegan","vegetarian"] },
              ],
            },
          ],
        },
        {
          groups: [
            {
              title: { es: "PanaderÃ­a", en: "Bakery" },
              items: [
                { label: { es: "Croissant de Chocolate", en: "Chocolate Croissant" }, tags: ["vegetarian"] },
                { label: { es: "Rollo de Canela",        en: "Cinnamon Roll"       }, tags: ["vegetarian","nueces"] },
                { label: { es: "Concha",                 en: "Concha"              }, tags: ["vegetarian"] },
              ],
            },
            {
              title: { es: "Nuestra SelecciÃ³n", en: "Our Selection" },
              isHotKitchen: true,
              items: [
                { label: { es: "Waffles",               en: "Waffles"              }, tags: ["vegetarian"],         description: { es: "De sabor suave, espolvoreados con azÃºcar glass.", en: "Light and fluffy, dusted with powdered sugar." } },
                { label: { es: "Avena Caliente",        en: "Hot Oatmeal"          }, tags: ["vegetarian","nueces"],description: { es: "Avena con leche y nuez.", en: "Oatmeal with milk and walnuts." } },
                { label: { es: "Huevos con JamÃ³n",      en: "Ham & Eggs"           }, tags: [],                    description: { es: "Esponjoso huevo revuelto con jamÃ³n y mantequilla.", en: "Fluffy scrambled egg with ham and butter." } },
                { label: { es: "Queso Panela Asado",    en: "Grilled Panela Cheese"}, tags: ["vegetarian"],         description: { es: "Rebanadas asadas con salsa de tomate y orÃ©gano.", en: "Grilled slices with tomato sauce and oregano." } },
                { label: { es: "Muffin de Huevo y Tocino", en: "Egg & Bacon Muffin"}, tags: [],                   description: { es: "Huevo con tocino crujiente y salsa de tomate.", en: "Egg with crispy bacon and tomato sauce." } },
                { label: { es: "Mix de Embutidos",      en: "Sausage Mix"          }, tags: [],                    description: { es: "Chistorra, chorizo y salchicha asada.", en: "Chistorra, chorizo and grilled sausage." } },
                { label: { es: "Tomates Asados",        en: "Roasted Tomatoes"     }, tags: ["vegan"],              description: { es: "Sazonados con finas hierbas.", en: "Seasoned with fine herbs." } },
              ],
            },
          ],
        },
      ],
    },
  },

  // â”€â”€ Custom categories â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  customCategories: {
    "comienzo": {
      id:"comienzo", title:{es:"Para un buen comienzo",en:"A Great Start"},
      subtitle:{es:"Elige 3 opciones",en:"Choose 3 options"}, max:3,
      hero:"assets/img/09_un_buen_comienzo_custom_menu.webp",
      items:[
        {id:"c1",label:{es:"Jugo de naranja natural",      en:"Fresh orange juice"          },tags:["vegan","vegetarian","glutenFree"]},
        {id:"c2",label:{es:"Jugo verde detox",             en:"Green detox juice"           },tags:["vegan","vegetarian","glutenFree"]},
        {id:"c3",label:{es:"Fruta de temporada",           en:"Seasonal fruit"              },tags:["vegan","vegetarian","glutenFree"]},
        {id:"c4",label:{es:"Granola con yogurt y miel",   en:"Granola with yogurt & honey" },tags:["vegetarian","glutenFree"]},
        {id:"c5",label:{es:"Avena cremosa con frutos rojos",en:"Creamy oatmeal with berries"},tags:["vegetarian"]},
        {id:"c6",label:{es:"Ensalada de frutas exÃ³ticas", en:"Exotic fruit salad"          },tags:["vegan","vegetarian","glutenFree"]},
        {id:"c7",label:{es:"Smoothie de plÃ¡tano y fresa", en:"Banana & strawberry smoothie"},tags:["vegetarian","glutenFree"]},
        {id:"c8",label:{es:"Agua fresca de jamaica",      en:"Hibiscus agua fresca"        },tags:["vegan","vegetarian","glutenFree"]},
      ],
    },
    "dulce": {
      id:"dulce", title:{es:"Una dulce elecciÃ³n",en:"A Sweet Choice"},
      subtitle:{es:"Elige 3 opciones",en:"Choose 3 options"}, max:3,
      hero:"assets/img/06_una_dulce_eleccion_custom_menu.webp",
      items:[
        {id:"d1",label:{es:"Croissant de mantequilla",    en:"Butter croissant"           },tags:["vegetarian"]},
        {id:"d2",label:{es:"Pain au chocolat",            en:"Pain au chocolat"           },tags:["vegetarian"]},
        {id:"d3",label:{es:"Concha de vainilla",          en:"Vanilla concha"             },tags:["vegetarian"]},
        {id:"d4",label:{es:"Hotcakes con maple y berries",en:"Pancakes with maple & berries"},tags:["vegetarian"]},
        {id:"d5",label:{es:"Waffles con crema y fresas",  en:"Waffles with cream & strawberries"},tags:["vegetarian"]},
        {id:"d6",label:{es:"French toast con canela",     en:"Cinnamon french toast"      },tags:["vegetarian"]},
        {id:"d7",label:{es:"Muffin de arÃ¡ndano",          en:"Blueberry muffin"           },tags:["vegetarian"]},
        {id:"d8",label:{es:"Rol de canela glaseado",      en:"Glazed cinnamon roll"       },tags:["vegetarian"]},
      ],
    },
    "principal": {
      id:"principal", title:{es:"Plato Principal",en:"Main Course"},
      subtitle:{es:"Elige 3 opciones",en:"Choose 3 options"}, max:3,
      hero:"assets/img/01_plato_principal_custom_menu.webp",
      items:[
        {id:"p1",label:{es:"Huevos al gusto (estrellados, tibios, revueltos)",en:"Eggs your way (fried, soft-boiled, scrambled)"},tags:["vegetarian"]},
        {id:"p2",label:{es:"Omelette de tres quesos",                          en:"Three-cheese omelette"                        },tags:["vegetarian"]},
        {id:"p3",label:{es:"Eggs Benedict con salsa holandesa",                en:"Eggs Benedict with hollandaise"               },tags:[]},
        {id:"p4",label:{es:"Chilaquiles verdes con pollo deshebrado",          en:"Green chilaquiles with shredded chicken"      },tags:[]},
        {id:"p5",label:{es:"Machaca con huevo a la mexicana",                  en:"Machaca with Mexican-style egg"               },tags:[]},
        {id:"p6",label:{es:"Huevos divorciados (salsa roja y verde)",          en:"Divorced eggs (red & green salsa)"            },tags:["vegetarian"]},
        {id:"p7",label:{es:"Shakshuka de jitomate y pimiento",                 en:"Tomato & pepper shakshuka"                    },tags:["vegetarian"]},
        {id:"p8",label:{es:"Tortilla espaÃ±ola con papas",                      en:"Spanish omelette with potatoes"               },tags:["vegetarian"]},
      ],
    },
    "acompanar": {
      id:"acompanar", title:{es:"Para acompaÃ±ar",en:"On the Side"},
      subtitle:{es:"Elige 3 opciones",en:"Choose 3 options"}, max:3,
      hero:"assets/img/07_para_acompaÃ±ar_custom_menu.webp",
      items:[
        {id:"a1",label:{es:"Tocino crujiente",                en:"Crispy bacon"               },tags:["glutenFree"]},
        {id:"a2",label:{es:"Salchicha de pavo",               en:"Turkey sausage"             },tags:["glutenFree"]},
        {id:"a3",label:{es:"Hash browns dorados",             en:"Golden hash browns"         },tags:["vegan","vegetarian"]},
        {id:"a4",label:{es:"Frijoles refritos con queso",     en:"Refried beans with cheese"  },tags:["vegetarian","glutenFree"]},
        {id:"a5",label:{es:"Tortillas de maÃ­z hechas a mano",en:"Hand-made corn tortillas"   },tags:["vegan","vegetarian","glutenFree"]},
        {id:"a6",label:{es:"Tostadas integrales con mantequilla",en:"Whole wheat toast with butter"},tags:["vegetarian"]},
        {id:"a7",label:{es:"Aguacate en rebanadas con limÃ³n", en:"Sliced avocado with lime"   },tags:["vegan","vegetarian","glutenFree"]},
        {id:"a8",label:{es:"Queso fresco con epazote",        en:"Fresh cheese with epazote"  },tags:["vegetarian","glutenFree"]},
      ],
    },
  },

  // â”€â”€ Deck â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

