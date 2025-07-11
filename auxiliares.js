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
  return dentro && !pantallaCambiando;
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

    this.isDragging = false;

    if (Array.isArray(d_)) {
      this.destino = d_;
    } else {
      this.destino;
    }
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    push();
    translate(this.posX, this.posY);

    // ----------------------------------------------INICIAR ARRASTRE
    if (_touchStarted && canDrag) {
      if (
        isInside(touchX, touchY, this.posX, this.posY, this.width, this.height)
      ) {
        dragging = this;
      }
    }
    this.isDragging = dragging == this; //reconocer si este es el objeto draggeado

    // ----------------------------------------------ARRASTRAR
    if (this.isDragging) {
      this.posX = touchX;
      this.posY = touchY;
    } else {
      this.posX = this.iposX;
      this.posY = this.iposY;
    }

    // image(this.img, this.posX, this.posY);
    fill(0);
    rect(0, 0, this.width, this.height);
    pop();
  }
}

// -------------------------------------------------------------------------------CLASE INFOGRAFÍA
class Infog {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    this.fondo = info_fondo_img;

    this.anim_in = new Timer();
    this.anim_out = new Timer();
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    push();
    image(this.fondo, width / 2, height / 2); //imágen de fondo

    // ----------------------------------------------En todas menos el menú
    if (pantalla > 0) {
      fill(255, 100);
      rectMode(CORNERS);
      rect(0, 0, width, height); //desaturar el fondo

      image(menu_btn_img, menu_btn_img.width, menu_btn_img.height); //botón al menú
      if (
        isInside(
          touchX,
          touchY,
          menu_btn_img.width,
          menu_btn_img.height,
          menu_btn_img.width,
          menu_btn_img.height
        ) &&
        _touchStarted
      ) {
        nextPantalla = MENU;
      }
    }
    pop();
  }
}

// -------------------------------------------------------------------------------CLASE TEMPORIZADOR
class Timer {
  constructor() {
    this.tiempo = 0;
  }

  correr() {
    this.tiempo++;
  }

  delay(d_) {
    return this.tiempo >= d_ * frameRate();
  }

  reset() {
    this.tiempo = 0;
  }
}
