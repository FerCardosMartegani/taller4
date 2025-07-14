// -------------------------------------------------------------------------------GLOBALES
let isTouching,
  isMoving,
  _touchStarted,
  _touchEnded,
  dragging,
  preDragging,
  canDrag;
let touchX, touchY;

let manos;

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
let adap_bolitas_fx, adap_nueva1_fx, adap_nueva2_fx;

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

let jerar_personajesSin_img = [];
let jerar_lideres_img = [];
let jerar_personajesCon_img = [];
let jerar_torres_img = [],
  jerar_podio_img;
let jerar_sube_fx, jerar_torre_fx, jerar_caida_fx;

// let atra_mascara_img;
// let atra_imagenes_img = [];
// let atra_sonidoArrastre_fx;
// let atra_sonidosTipo_fx = {};
// let atra_fondo_img;
// let atra_sonidoFondo_fx;

let atra_fondo1_img,
  atra_fondo2_img,
  sine_fondo1_img,
  sine_fondo2_img,
  umbra_fondo1_img,
  umbra_fondo2_img;

let musica_fx;

let logos_img = [];
let manos_img;

let debug = false;

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

  adap_bolitas_fx = loadSound("./i_adaptacion/assets/bolitas.wav");
  adap_nueva1_fx = loadSound("./i_adaptacion/assets/nuevaDrag.wav");
  adap_nueva2_fx = loadSound("./i_adaptacion/assets/nuevaPoner.wav");

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

  //------------------------------------------------------------------Jerarquía
  for (let i = 0; i < 4; i++) {
    jerar_personajesSin_img[i] = loadImage(
      "./i_jerarquia/assets/persona" + i + "-0" + ".png"
    );
    jerar_personajesCon_img[i] = loadImage(
      "./i_jerarquia/assets/persona" + i + "-1" + ".png"
    );
    jerar_lideres_img[i] = loadImage("./i_jerarquia/assets/lider" + i + ".png");
    jerar_torres_img[i] = loadImage("./i_jerarquia/assets/torre" + i + ".png");
  }
  jerar_podio_img = loadImage("./i_jerarquia/assets/podio.png");

  // Cargar sonidos
  jerar_sube_fx = loadSound("./i_jerarquia/assets/poner.wav");
  jerar_torre_fx = loadSound("./i_jerarquia/assets/edificios.wav");
  jerar_caida_fx = loadSound("./i_jerarquia/assets/caer.wav");

  //------------------------------------------------------------------Atractores
  // atra_fondo_img = loadImage("./i_atractores/fondo.png");
  // atra_mascara_img = loadImage("./i_atractores/mascara.png");
  // for (let i = 0; i < 8; i++) {
  //   atra_imagenes_img[i] = loadImage("./i_atractores/obj" + i + ".png");
  // }

  // atra_sonidoFondo_fx = loadSound("./i_atractores/musica_fondo.mp3");
  // atra_sonidoArrastre_fx = loadSound("./i_atractores/arrastre.wav");
  // atra_sonidosTipo_fx["sol"] = loadSound("./i_atractores/sol.mp3");
  // atra_sonidosTipo_fx["nube"] = loadSound("./i_atractores/nube.mp3");
  // atra_sonidosTipo_fx["trueno"] = loadSound("./i_atractores/trueno.mp3");
  // atra_sonidosTipo_fx["agua"] = loadSound("./i_atractores/agua.mp3");

  // Cargar imágenes
  atra_fondo1_img = loadImage("./0_menu/assets/atra_fondo1.png");
  atra_fondo2_img = loadImage("./0_menu/assets/atra_fondo0.png");
  sine_fondo1_img = loadImage("./0_menu/assets/sine_fondo1.png");
  sine_fondo2_img = loadImage("./0_menu/assets/sine_fondo0.png");
  umbra_fondo1_img = loadImage("./0_menu/assets/umbra_fondo1.png");
  umbra_fondo2_img = loadImage("./0_menu/assets/umbra_fondo0.png");

  musica_fx = loadSound("./0_menu/assets/musica_fondo.mp3");

  for (let i = 1; i <= 6; i++) {
    logos_img[i - 1] = loadImage("./0_menu/assets/logo" + i + ".png");
  }
  manos_img = loadImage("./0_menu/assets/manos.png");
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

  isTouching = _touchStarted = _touchEnded = isMoving = false;

  pantalla = MENU;
  prePantalla = nextPantalla = MENU;
  pantallaCambiando = false;

  musica_fx.setLoop(true);
  musica_fx.setVolume(0.3);
  musica_fx.play();
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
          estado = new Atractores();
          break;
        case JERARQUIA:
          estado = new Jerarquia();
          break;
        case SINERGIA:
          estado = new Sinergia();
          break;
        case UMBRALES:
          estado = new Umbrales();
          break;
      }

      // estados[nextPantalla].entrando = true; //menú → Infografía
    } else if (nextPantalla == MENU) {
      menu = new Menu();
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
  _touchStarted = isMoving = _touchEnded = false;
  preDragging = dragging;

  pop();
}

// -------------------------------------------------------------------------------TACTIL
function touchStarted() {
  _touchStarted = true;
  isTouching = true;
}
function mousePressed() {
  touchStarted();
}
function touchMoved() {
  isMoving = true;
}
function mouseDragged() {
  touchMoved();
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

class Atractores extends Infog {
  constructor() {
    super();

    this.tiempo = new Timer();

    atra_fondo1_img.resize(width, height);
    atra_fondo2_img.resize(width, height);
  }

  ejecutar() {
    this.tiempo.correr();
    if (!this.tiempo.delayed(4)) {
      this.fondo = atra_fondo1_img;
    } else {
      this.fondo = atra_fondo2_img;
    }
    super.ejecutar();
  }
}
class Sinergia extends Infog {
  constructor() {
    super();

    this.tiempo = new Timer();

    sine_fondo1_img.resize(width, height);
    sine_fondo2_img.resize(width, height);
  }

  ejecutar() {
    this.tiempo.correr();
    if (!this.tiempo.delayed(4)) {
      this.fondo = sine_fondo1_img;
    } else {
      this.fondo = sine_fondo2_img;
    }
    super.ejecutar();
  }
}
class Umbrales extends Infog {
  constructor() {
    super();

    this.tiempo = new Timer();

    umbra_fondo1_img.resize(width, height);
    umbra_fondo2_img.resize(width, height);
  }

  ejecutar() {
    this.tiempo.correr();
    if (!this.tiempo.delayed(4)) {
      this.fondo = umbra_fondo1_img;
    } else {
      this.fondo = umbra_fondo2_img;
    }
    super.ejecutar();
  }
}
