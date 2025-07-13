// -------------------------------------------------------------------------------GLOBALES
let isTouching, preIsTouching, _touchStarted, dragging, preDragging, canDrag;
let touchX, touchY;

let pantalla, prePantalla, nextPantalla, pantallaCambiando;
const MENU = 0;
const ADAPTACION = 1;
const INTERDEPENDENCIA = 2;
const ATRACTORES = 3;
const SINERGIA = 4;
const UMBRALES = 5;
const JERARQUIA = 6;

// let estados = [];
let estado, menu;

let menu_fondo_img, info_fondo_img, menu_btn_img;
let adap_refe_img,
  adap_torreIzq_img,
  adap_torreDer_img,
  adap_baseIzq_img,
  adap_baseDer_img,
  adap_tuboNuevo_img,
  adap_rampaNuevaIzq_img,
  adap_rampaNuevaDer_img,
  adap_rampaRotaIzq_img,
  adap_rampaRotaDer_img = [],
  adap_embudoNuevo_img,
  adap_embudoRoto_img,
  adap_bolitas_img = [],
  adap_tubosRotos_img = [];
let inter_refe_img,
  inter_granja_img,
  inter_huerta_img,
  inter_gallina_img,
  inter_tren_img,
  inter_rueda_img,
  inter_tractor_img,
  inter_cosecha_img = [],
  inter_huevo_img = [],
  inter_cosechaTren_img = [],
  inter_huevoTren_img = [],
  inter_edificios_img = [];
let inter_tren_fx,
  inter_edificios_fx,
  inter_moneda_fx,
  inter_cosecha_fx,
  inter_gallina_fx;

let debug = true;

// -------------------------------------------------------------------------------PRELOAD
function preload() {
  info_fondo_img = loadImage("./0_menu/assets/fondo2.png");

  // -----------------------------------------------------------------Menú
  menu_fondo_img = loadImage("./0_menu/assets/fondo.png");
  menu_btn_img = loadImage("./0_menu/assets/menu_btn.png");

  // -----------------------------------------------------------------Adaptación
  adap_refe_img = loadImage("./i_adaptacion/assets/referencia.png");
  adap_baseDer_img = loadImage("./i_adaptacion/assets/baseDer.png");
  adap_baseIzq_img = loadImage("./i_adaptacion/assets/baseIzq.png");
  for (let i = 1; i <= 5; i++) {
    adap_bolitas_img[i - 1] = loadImage(
      "./i_adaptacion/assets/bolita" + i + ".png"
    );
  }
  adap_rampaNuevaDer_img = loadImage("./i_adaptacion/assets/nuevaRampaDer.png");
  adap_rampaNuevaIzq_img = loadImage("./i_adaptacion/assets/nuevaRampaIzq.png");
  adap_embudoNuevo_img = loadImage("./i_adaptacion/assets/nuevoEmbudo.png");
  adap_tuboNuevo_img = loadImage("./i_adaptacion/assets/nuevoTubo.png");
  for (let i = 1; i <= 2; i++) {
    adap_rampaRotaDer_img[i - 1] = loadImage(
      "./i_adaptacion/assets/rotaRampaDer" + i + ".png"
    );
  }
  adap_rampaRotaIzq_img = loadImage("./i_adaptacion/assets/rotaRampaIzq.png");
  adap_embudoRoto_img = loadImage("./i_adaptacion/assets/rotoEmbudo.png");
  for (let i = 1; i <= 3; i++) {
    adap_tubosRotos_img[i - 1] = loadImage(
      "./i_adaptacion/assets/rotoTubo" + i + ".png"
    );
  }
  adap_torreDer_img = loadImage("./i_adaptacion/assets/torreDer.png");
  adap_torreIzq_img = loadImage("./i_adaptacion/assets/torreIzq.png");

  // -----------------------------------------------------------------Interdependencia
  inter_refe_img = loadImage("./i_interdependencia/assets/referencia.png");
  for (let i = 0; i < 5; i++) {
    inter_edificios_img[i] = loadImage(
      "./i_interdependencia/assets/edificio" + i + ".png"
    );
  }
  inter_gallina_img = loadImage("./i_interdependencia/assets/gallina.png");
  inter_granja_img = loadImage("./i_interdependencia/assets/granero.png");
  inter_huerta_img = loadImage("./i_interdependencia/assets/huertaVacia.png");
  inter_tractor_img = loadImage("./i_interdependencia/assets/tractor.png");
  inter_tren_img = loadImage("./i_interdependencia/assets/tren.png");
  inter_rueda_img = loadImage("./i_interdependencia/assets/trenRueda.png");
  inter_cosecha_img[0] = loadImage(
    "./i_interdependencia/assets/zanahorias1.png"
  );
  inter_cosecha_img[1] = loadImage(
    "./i_interdependencia/assets/zanahorias2.png"
  );
  inter_huevo_img[0] = loadImage("./i_interdependencia/assets/huevo1.png");
  inter_huevo_img[1] = loadImage("./i_interdependencia/assets/huevo2.png");
  inter_cosechaTren_img[0] = loadImage(
    "./i_interdependencia/assets/zanahorias3.png"
  );
  inter_cosechaTren_img[1] = loadImage(
    "./i_interdependencia/assets/zanahorias4.png"
  );
  inter_huevoTren_img[0] = loadImage("./i_interdependencia/assets/huevo3.png");
  inter_huevoTren_img[1] = loadImage("./i_interdependencia/assets/huevo4.png");

  inter_cosecha_fx = loadSound("./i_interdependencia/assets/cosecha.wav");
  inter_edificios_fx = loadSound("./i_interdependencia/assets/edificios.wav");
  inter_gallina_fx = loadSound("./i_interdependencia/assets/gallinas.wav");
  inter_moneda_fx = loadSound("./i_interdependencia/assets/moneda.wav");
  inter_tren_fx = loadSound("./i_interdependencia/assets/tren.wav");
}

// -------------------------------------------------------------------------------SETUP
function setup() {
  createCanvas(1133, 744);

  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);

  menu = new Menu();
  menu.entrando = false;
  // estados[MENU] = new Menu();
  // estados[ADAPTACION] = new Adaptacion();
  // estados[INTERDEPENDENCIA] = new Interdependencia();

  isTouching = false;

  pantalla = MENU;
  prePantalla = nextPantalla = INTERDEPENDENCIA;
  pantallaCambiando = false;
}

// -------------------------------------------------------------------------------DRAW
function draw() {
  push();

  // -----------------------------------------------------------------Dedo del usuario
  canDrag = isTouching && dragging == undefined; //sólo puede draggear si no está draggeando otra cosa
  touchX = mouseX; //touches[0].x;
  touchY = mouseY; //touches[0].y;

  // -----------------------------------------------------------------Transición infografía ←→ menú
  if (nextPantalla != pantalla && !pantallaCambiando) {
    pantallaCambiando = true; //evento de cambiar de pantalla

    if (pantalla == MENU) {
      switch (nextPantalla) {
        case ADAPTACION:
          estado = new Adaptacion();
          break;
        case INTERDEPENDENCIA:
          estado = new Interdependencia();
          break;
        case ATRACTORES:
          estado = new Adaptacion();
          break;
        case JERARQUIA:
          estado = new Adaptacion();
          break;
        case SINERGIA:
          estado = new Adaptacion();
          break;
        case UMBRALES:
          estado = new Adaptacion();
          break;
      }
      // estados[nextPantalla].entrando = true; //menú → Infografía
    } else if (nextPantalla == MENU) {
      // estados[pantalla].saliendo = true; //Infografía → Menú
      estado.saliendo = true;
    }
  }
  if (pantalla == nextPantalla && pantallaCambiando) {
    pantallaCambiando = false;
  }
  if (pantallaCambiando) {
    // estados[MENU].ejecutar(); //el menú siempre de fondo
    menu.ejecutar();
    estado.ejecutar();

    // if (pantalla == MENU) {
    //   estados[nextPantalla].ejecutar(); //menú → Infografía
    // } else if (nextPantalla == MENU) {
    //   estados[pantalla].ejecutar(); //Infografía → Menú
    // }
  }

  if (!pantallaCambiando) {
    // -----------------------------------------------------------------Ejecutar infografías
    // estados[pantalla].ejecutar();
    if (pantalla == MENU) {
      menu.ejecutar();
    } else {
      estado.ejecutar();
    }
  }

  if (debug) {
    push();
    textSize(16);
    textAlign(RIGHT, CENTER);
    text(
      prePantalla +
        " → " +
        pantalla +
        " → " +
        nextPantalla +
        " , " +
        pantallaCambiando,
      width - 10,
      10
    );
    textAlign(CENTER, BOTTOM);
    text(touchX + " , " + touchY, touchX, touchY);

    if (prePantalla != pantalla) {
      console.log("PONER POP() AL FINAL DE INFOG.EJECUTAR()");
    }
    pop();
  }

  prePantalla = pantalla;
  _touchStarted = false;
  preDragging = dragging;

  pop();
}

// -------------------------------------------------------------------------------TACTIL
function touchStarted() {
  _touchStarted = true;
  isTouching = true;
}
function touchEnded() {
  dragging = undefined;
  isTouching = false;
}
function mouseReleased() {
  touchEnded();
}

function keyTyped() {
  debug = !debug;
}

// -------------------------------------------------------------------------------CLASE RUTA
// x1,y1,r1,v1 -> x[n],y[n],r[n],v[n] -> x2,y2,r2,v2

/* -------------------------------------------------------------------------------COMPORTAMIENTOS:
Laberinto de bolitas:
  Piezas del laberinto:
    -drag and drop con rotación
  Bolitas:
    -desplazamiento por ruta prefijada
    -la ruta cambia
Interdependencia:
  Tren:
    -varios espacios para droppear
    -desplazamiento por ruta prefijada
    -que giren las ruedas
  Edificios:
    -van apareciendo nuevos elementos en lugares específicos
    -algunos elementos son draggeables
Clima:
  Objetos:
    -se draggean por rutas preestablecidas
    -las rutas se bifurcan
*/
