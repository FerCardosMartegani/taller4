// -------------------------------------------------------------------------------INTERDEPENDENCIA
class Interdependencia extends Infog {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    super();

    // ----------------------------------------------Tren
    this.tren = new Tren();
    this.prePos = 0;

    this.productos = [];
    this.productos[0] = new Producto(
      inter_cosecha_img,
      inter_cosechaTren_img,
      135,
      570,
      this.tren.carga
    );

    this.productosStart = [];
    this.productosStart.push(this.productos[0].start);

    // ----------------------------------------------Mejoras
    this.nivel = 0;
    this.preNivel = this.nivel;

    let poses = [
      { x: 770, y: 400 },
      { x: 1070, y: 420 },
      { x: 1020, y: 445 },
      { x: 890, y: 435 },
    ];
    this.mejorasCiudad = [];
    for (let i = 0; i < poses.length; i++) {
      let img = inter_edificios_img[i + 1];
      this.mejorasCiudad[i] = new JugueteNuevo(img, poses[i].x, poses[i].y);
    }

    this.ciudadDragTo = [];
    for (let i = 0; i < this.mejorasCiudad.length; i++) {
      this.ciudadDragTo[i] = new DragTo(
        this.mejorasCiudad[i].posiciones[1].x,
        this.mejorasCiudad[i].posiciones[1].y,
        this.mejorasCiudad[i].img.width,
        this.mejorasCiudad[i].img.height
      );
    }
    this.ciudadDragTo.push(
      new DragTo(
        940,
        350,
        inter_edificios_img[0].width,
        inter_edificios_img[0].height
      )
    );

    poses = [
      { x: 280, y: 540 },
      { x: 450, y: 570 },
      { x: 490, y: 470 },
      { x: 80, y: 470 },
    ];
    this.mejorasGranja = [];
    for (let i = 0; i < poses.length - 1; i++) {
      let img = inter_gallina_img;
      this.mejorasGranja[i] = new JugueteNuevo(img, poses[i].x, poses[i].y);
    }
    this.mejorasGranja[poses.length - 1] = new JugueteNuevo(
      inter_tractor_img,
      poses[poses.length - 1].x,
      poses[poses.length - 1].y
    );
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    super.ejecutar();

    // // ----------------------------------------------Imagen de refe
    // if (debug) {
    //   this.fondo = inter_refe_img;
    // } else {
    //   this.fondo = info_fondo_img;
    // }

    // ----------------------------------------------EDIFICIOS
    image(
      inter_granja_img,
      width / 2,
      height - inter_granja_img.height / 2 - 10
    );
    image(inter_edificios_img[0], 940, 350);

    let nivel = constrain(this.nivel, 0, this.mejorasCiudad.length);
    for (let i = 0; i < nivel; i++) {
      this.mejorasCiudad[i].ejecutar();
      this.mejorasGranja[i].ejecutar();
    }

    // ----------------------------------------------CULTIVOS
    let cargados = 0;
    nivel = constrain(this.nivel, 0, this.productos.length - 1);
    if (this.prePos == this.tren.pos) {
      for (let i = 0; i < this.productos.length; i++) {
        this.productos[i].ejecutar();

        if (!this.productos[i].canDrag) {
          cargados++;

          if (this.tren.pos == 0) {
            this.productos[i].posX = this.tren.posX-70;
            this.productos[i].posY = this.tren.posY+15;
            this.productos[i].img = this.productos[i].start.i2[0];
          } else {
            if (this.productos[i].preCanDrag) {
              this.productos[i].posX = width * 2;
              this.nivel++;
            }
          }
        }
      }
    }

    // ----------------------------------------------TREN
    this.tren.ejecutar(cargados, nivel);

    for (let i = 0; i <= nivel; i++) {
      // console.log(this.prePos + " → " + this.tren.pos);

      // ----------------------------------------------Reiniciar
      if (this.tren.pos == 0) {
        if (this.prePos == 3) {
          this.productos[i] = new Producto(
            this.productosStart[i].i1,
            this.productosStart[i].i2,
            this.productosStart[i].x,
            this.productosStart[i].y,
            this.productosStart[i].d
          );
        }
      } else if (this.tren.pos == 1) {
        // ----------------------------------------------subir al tren
        if (this.prePos == 0) {
          this.productos[i] = new Producto(
            this.productosStart[i].i2,
            this.productosStart[i].i1,
            this.tren.posX-70,
            this.tren.posY+15,
            this.ciudadDragTo
          );
        }
      }
    }

    if (this.tren.pos == 0) {
      // ----------------------------------------------generar huevos
      if (this.prePos == 3 && this.nivel < 2) {
        this.productos[1] = new Producto(
          inter_huevo_img,
          inter_huevoTren_img,
          380,
          560,
          this.tren.carga
        );
        this.productosStart.push(this.productos[1].start);
      }
    } else if (this.tren.pos == 1) {
      // ----------------------------------------------habilitar descarga en ciudad
      // console.log(cargados + " , " + this.productos.length);
      for (let c of this.ciudadDragTo) {
        if (cargados < this.productos.length) {
          c.empty = true;
        }
      }
    }

    this.preNivel = this.nivel;
    this.prePos = this.tren.pos;
    pop();
  }
}

// -------------------------------------------------------------------------------CLASE TREN
class Tren extends Desplazable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    let y = height * 0.85;
    let a = [];
    a[0] = { x: 360, y: y };
    a[1] = { x: 1000, y: y };
    a[2] = { x: width + inter_tren_img.width / 2, y: y };
    a[3] = { x: 0 - inter_tren_img.width / 2, y: y };
    a[4] = a[0];

    super(inter_tren_img, a, 0);

    this.terminado = true;

    this.carga = new DragTo(
      this.posX - this.img.width / 8,
      this.posY + this.img.height / 4,
      (this.img.width * 3) / 4,
      this.img.height / 3
    );
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar(c_, n_) {
    push();
    super.ejecutar(1);

    if (this.pos == 0) {
      this.sentido = +1;
      if (c_ <= n_) {
        this.carga.empty = true;
      } else {
        this.terminado = false;
      }
    } else if (this.pos == 1) {
      if (c_ <= n_) {
        this.terminado = true;
      } else {
        this.terminado = false;
      }
    } else if (this.pos == 2) {
      this.vel.delay = 2;
      this.sentido = -1;
    } else if (this.pos == 3) {
      this.sentido = +1;
    } else if (this.pos == 4) {
      this.pos = 0;
      this.terminado = true;
    }

    // ----------------------------------------------Ruedas
    if (this.sentido > 0) {
      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 2; i++) {
          push();

          let x = 0;
          let y = 0;
          if (j < 3) {
            x =
              this.posX -
              this.img.width / 2 +
              inter_rueda_img.width * 1.5 +
              60 * i +
              155 * j;
            y = this.posY + this.img.height / 2 - inter_rueda_img.height - 7.5;
          } else {
            x =
              this.posX +
              this.img.width / 2 -
              inter_rueda_img.width * 3.7 +
              70 * i;
            y = this.posY + this.img.height / 2 - inter_rueda_img.height - 11;
          }

          translate(x, y);
          rotate(this.vel.map(0, 360));

          if (j < 3) {
            image(inter_rueda_img, 0, 0);
          } else {
            let escala = 1.25;
            image(
              inter_rueda_img,
              0,
              0,
              inter_rueda_img.width * escala,
              inter_rueda_img.height * escala
            );
          }
          pop();
        }
      }
    }

    // ellipse(this.carga.x, this.carga.y, 10);
    // noFill();
    // rect(this.carga.x, this.carga.y, this.carga.w, this.carga.h);
    pop();
  }
}

// -------------------------------------------------------------------------------PRODUCTO PARA CARGAR EN EL TREN
class Producto extends Draggeable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(img1_, img2_, x_, y_, d_) {
    super(img1_[0], x_, y_, d_);
    this.imgs = img1_;

    this.start = { i1: img1_, i2: img2_, x: x_, y: y_, d: d_ };
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    super.ejecutar();

    if (this.isDragging) {
      this.img = this.imgs[1];
    } else {
      this.img = this.imgs[0];
    }
  }
}

// -------------------------------------------------------------------------------CLASE JUGUETE NUEVO
class JugueteNuevo extends Desplazable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(img_, x_, y_) {
    let a = [];
    a.push({ x: x_, y: -img_.height });
    a.push({ x: x_, y: y_ });
    a.push({ x: x_, y: y_ - 50 });
    a.push({ x: x_, y: y_ });

    super(img_, a, 0);

    this.var = 0.25 * random(+1);
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    let d = 0;
    if (this.pos > 0) {
      d = 0.075;
    } else {
      d = 0.25 + this.var;
    }

    super.ejecutar(d);
  }
}
