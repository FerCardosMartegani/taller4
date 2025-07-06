// -------------------------------------------------------------------------------GLOBALES
let isTouching, touchStarted_, dragging, canDrag;

let pantalla, prePantalla;
const MENU = 0;
const ADAPTACION = 1;
const INTERDEPENDENCIA = 2;
const ATRACTORES = 3;
const SINERGIA = 4;
const UMBRALES = 5;
const JERARQUIA = 6;

let producto;

// -------------------------------------------------------------------------------PRELOAD
function preload() {}

// -------------------------------------------------------------------------------SETUP
function setup() {
  createCanvas(400, 400);

  isTouching = false;
  pantalla = prePantalla = MENU;

  producto = new Tren_Producto(width / 2, height / 2);
}

// -------------------------------------------------------------------------------DRAW
function draw() {
  push();
  background(220);

  // -----------------------------------------------------------------¿El usuario metió el dedo?
  isTouching = touches.length > 0;
  canDrag = isTouching && dragging != undefined; //sólo puede draggear si no está draggeando otra cosa

  producto.ejecutar();

  console.log(producto);

  if (pantalla == prePantalla) {
    switch (pantalla) {
      // -----------------------------------------------------------------MENU
      case MENU:
        break;
      // -----------------------------------------------------------------ADAPTACIÓN
      case ADAPTACION:
        break;
      // -----------------------------------------------------------------INTERDEPENDENCIA
      case INTERDEPENDENCIA:
        interdependencia();
        break;
      // -----------------------------------------------------------------ATRACTORES
      case ATRACTORES:
        break;
      // -----------------------------------------------------------------SINERGIA
      case SINERGIA:
        break;
      // -----------------------------------------------------------------UMBRALES
      case UMBRALES:
        break;
      // -----------------------------------------------------------------JERARQUÍA
      case JERARQUIA:
        break;
    }
  } else {
  }

  prePantalla = pantalla;
  isTouching = touchStarted_ = false;
  pop();
}

// -------------------------------------------------------------------------------TACTIL
function touchStarted() {
  touchStarted_ = true;
}
function touchEnded() {
  dragging = undefined;
}

// -------------------------------------------------------------------------------DETECTAR AREA REDONDA O CUADRADA
function isInside(x1_, y1_, x_, y_, t1_, t2_) {
  let dentro = false;
  if (t2_ != undefined) {
    // Seis parámetros para área cuadrada (x,y dentro del área x,y,ancho,alto)
    dentro =
      x1_ > x_ - t1_ / 2 &&
      x1_ < x_ + t1_ / 2 &&
      y1_ > y_ - t2_ / 2 &&
      y1_ < y_ + t2_ / 2;
  } else {
    // Cinco parámetros para área circular (x,y dentro del área x,y,diámetro)
    dentro = dist(x1_, y1_, x_, y_) < t1_ / 2;
  }
  return dentro;
}

// -------------------------------------------------------------------------------CLASE DRAG
// x1,y1,r1 -> touchMoved -> x2,y2,r2
class Draggeable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(x_, y_, d_) {
    this.posX = x_;
    this.posY = y_;

    this.iposX = this.posX;
    this.iposY = this.posY;

    this.img;
    // this.width = this.img.width;
    // this.height = this.img.height;
    this.width = 50;
    this.height = 50;

    if (Array.isArray(d_)) {
      this.destino = d_;
    } else {
      this.destino = [];
      // for(let d  this.destino){

      // }
    }
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    push();
    if (touchStarted_ && canDrag) {
      let touch = touches[0];
      if (
        isInside(
          touch.x,
          touch.y,
          this.posX,
          this.posY,
          this.width,
          this.height
        )
      ) {
        dragging = this;
      }
    } else {
      this.posX = this.iposX;
      this.posY = this.iposY;
    }

    // image(this.img, this.posX, this.posY);
    fill(0);
    rect(this.posX, this.posY, this.width, this.height);
    pop();
  }
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
