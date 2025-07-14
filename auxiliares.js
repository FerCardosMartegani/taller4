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
  constructor(img_, x_, y_, d_) {
    this.posX = x_;
    this.posY = y_;
    this.rot = 0;

    this.iposX = this.posX;
    this.iposY = this.posY;

    this.img = img_;
    this.width = this.img.width;
    this.height = this.img.height;

    this.isDragging = false;

    if (Array.isArray(d_)) {
      this.destino = d_;
    } else {
      this.destino = [];
      this.destino[0] = d_;
    }
    this.canDrag = true;
    this.preCanDrag = this.canDrag;
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    this.preCanDrag = this.canDrag;

    push();
    translate(this.posX, this.posY);
    rotate(radians(this.rot));

    // ----------------------------------------------INICIAR ARRASTRE
    if (_touchStarted && canDrag && this.canDrag) {
      if (
        isInside(touchX, touchY, this.posX, this.posY, this.width, this.height)
      ) {
        dragging = this;
      }
    }
    this.isDragging = dragging == this; //reconocer si este es el objeto draggeado

    // ----------------------------------------------ARRASTRAR
    if (this.canDrag) {
      if (this.isDragging) {
        this.posX = touchX; //mover al cursor
        this.posY = touchY;
      } else {
        let ubicado = undefined;
        for (let destino of this.destino) {
          if (
            isInside(
              this.posX,
              this.posY,
              destino.x,
              destino.y,
              destino.w,
              destino.h
            ) &&
            destino.empty
          ) {
            ubicado = destino;
            break;
          }
        }
        if (ubicado != undefined) {
          this.posX = ubicado.x; //ubicarse en el destino
          this.posY = ubicado.y;

          this.canDrag = false;
          ubicado.empty = false;
        } else {
          this.posX = this.iposX; //volver al inicio
          this.posY = this.iposY;
        }
      }
    }

    // rect(0, 0, this.width, this.height);
    image(this.img, 0, 0);
    pop();
  }
}

// -------------------------------------------------------------------------------CLASE LUGAR AL QUE DRAGGEAR
class DragTo {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(x_, y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    if (h_ != undefined) {
      this.h = h_;
    } else {
      this.h = this.w;
    }

    this.empty = true;
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {}
}

// -------------------------------------------------------------------------------CLASE INFOGRAFÍA
class Infog {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    this.fondo = info_fondo_img;

    this.entrando = true;
    this.saliendo = false;
    this.animTimer = new Timer();
    this.animEtapa = 0;
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    push();
    // ----------------------------------------------ANIMACIÓN DE ENTRAR
    if (this.entrando) {
      this.animTimer.correr();

      if (!this.animTimer.delayed(1)) {
        translate(0, this.animTimer.map(-this.fondo.height / 3, 0));
        scale(this.animTimer.map(2, 1));
        tint(255, this.animTimer.map(0, 500));
      } else {
        pantalla = nextPantalla;
        this.entrando = false;
        this.animTimer.reset();
      }
    }

    // ----------------------------------------------ANIMACIÓN DE SALIR
    if (this.saliendo) {
      this.animTimer.correr();

      if (!this.animTimer.delayed(1)) {
        translate(0, this.animTimer.map(0, -this.fondo.height / 3));
        scale(this.animTimer.map(1, 2));
        tint(255, this.animTimer.map(500, -100));
      } else {
        pantalla = nextPantalla;
        this.saliendo = false;
        this.animTimer.reset();

        translate(-this.fondo.width, -this.fondo.height);
      }
    }

    // ----------------------------------------------Botón al menú
    if (pantalla > MENU) {
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

    // ----------------------------------------------Imagen de fondo
    push();
    imageMode(CORNER);
    image(this.fondo, 0, 0);

    if (pantalla > MENU && !pantallaCambiando) {
      imageMode(CENTER);
      image(menu_btn_img, menu_btn_img.width, menu_btn_img.height);
    }
    pop();
  }
}

// -------------------------------------------------------------------------------CLASE TEMPORIZADOR
class Timer {
  constructor() {
    this.tiempo = 0;
    this.delay = frameRate();
  }

  correr() {
    if (this.delay >= 0) {
      this.tiempo++;
    }
  }

  delayed(d_) {
    this.delay = d_ * frameRate();
    return this.tiempo >= this.delay;
  }

  reset() {
    this.tiempo = 0;
  }

  map(a_, b_) {
    return map(this.tiempo, 0, this.delay, a_, b_);
  }
}

// -------------------------------------------------------------------------------CLASE MÓVIL
class Desplazable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(img_, a_, p1_) {
    this.img = img_;

    this.posiciones = a_;
    this.pos = p1_;
    this.posX = a_[this.pos].x;
    this.posY = a_[this.pos].y;
    this.prePos = this.pos;

    this.terminado = false;

    this.vel = new Timer();

    this.sentido = +1;
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar(d_) {
    push();
    if (!pantallaCambiando && !this.terminado) {
      this.prePos = this.pos;

      this.vel.correr();

      if (this.pos < this.posiciones.length - 1) {
        if (!this.vel.delayed(d_)) {
          this.posX = this.vel.map(
            this.posiciones[this.pos].x,
            this.posiciones[this.pos + 1].x
          );
          this.posY = this.vel.map(
            this.posiciones[this.pos].y,
            this.posiciones[this.pos + 1].y
          );
        } else {
          this.vel.reset();
          this.pos++;
        }
      } else {
        this.terminado = true;
      }
    }

    translate(this.posX, this.posY);
    scale(this.sentido, 1);
    image(this.img, 0, 0);
    // ellipse(this.posX, this.posY, 50);

    pop();
  }
}

// -------------------------------------------------------------------------------CLASE MÓVIL
class Sonido {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(s_) {
    this.sonido = s_;

    this.sonado = false;
  }

  // -----------------------------------------------------------------PLAY
  play(b_) {
    this.preSonado = this.sonado;
    if ((b_ === true && !this.isPlaying()) || !this.sonado) {
      this.sonido.play();

      this.sonado = true;
    }
  }

  // -----------------------------------------------------------------VOLVER A HABILITAR
  replay() {
    this.sonado = false;
  }

  // -----------------------------------------------------------------¿ESTÁ SONANDO?
  isPlaying() {
    return this.sonido.isPlaying();
  }
}
