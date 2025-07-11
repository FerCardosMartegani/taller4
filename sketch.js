// -------------------------------------------------------------------------------GLOBALES
let isTouching, preIsTouching, _touchStarted, dragging, canDrag;
let touchX, touchY;

let pantalla, prePantalla, nextPantalla, pantallaCambiando;
const MENU = 0;
const ADAPTACION = 1;
const INTERDEPENDENCIA = 2;
const ATRACTORES = 3;
const SINERGIA = 4;
const UMBRALES = 5;
const JERARQUIA = 6;

let estados = [];
let menu_fondo_img, info_fondo_img, menu_btn_img;

// -------------------------------------------------------------------------------PRELOAD
function preload() {
  info_fondo_img = loadImage("./0_menu/assets/fondo2.png");

  menu_fondo_img = loadImage("./0_menu/assets/fondo.png");
  menu_btn_img = loadImage("./0_menu/assets/menu_btn.png");
}

// -------------------------------------------------------------------------------SETUP
function setup() {
  createCanvas(1133, 744);

  rectMode(CENTER);
  imageMode(CENTER);

  estados[MENU] = new Menu();
  estados[ADAPTACION] = new Adaptacion();
  estados[INTERDEPENDENCIA] = new Interdependencia();

  isTouching = false;

  pantalla = prePantalla = nextPantalla = MENU;
  pantallaCambiando = false;
}

// -------------------------------------------------------------------------------DRAW
function draw() {
  push();

  // -----------------------------------------------------------------Dedo del usuario
  canDrag = isTouching && dragging == undefined; //sólo puede draggear si no está draggeando otra cosa
  touchX = mouseX; //touches[0].x;
  touchY = mouseY; //touches[0].y;

  // -----------------------------------------------------------------Ejecutar infografías
  if (!pantallaCambiando) {
    estados[pantalla].ejecutar();
  }

  // -----------------------------------------------------------------Transición infografía ←→ menú
  if (nextPantalla != pantalla && !pantallaCambiando) {
    pantallaCambiando = true;

    estados[MENU].ejecutar();

    if (pantalla == MENU) {
      estados[nextPantalla].anim_in.reset(); //menú → Infografía
    } else if (nextPantalla == MENU) {
      estados[pantalla].anim_out.reset(); //Infografía → Menú
    }
  }

  prePantalla = pantalla;
  _touchStarted = false;

  text(mouseX + " , " + mouseY, mouseX, mouseY);
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
