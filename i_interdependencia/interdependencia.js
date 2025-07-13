// -------------------------------------------------------------------------------INTERDEPENDENCIA
class Interdependencia extends Infog {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    super();

    // ----------------------------------------------Tren
    this.tren = new Tren();

    // this.zanahorias = new Producto();

    // ----------------------------------------------Mejoras
    this.nivel = 0;
    this.preNivel = this.nivel;

    this.mejorasCiudad = [];
    for (let i = 1; i <= 4; i++) {
      let img = inter_edificios_img[i];
      let x = random(700, 1080);
      let y = random(600, 550) - img.height / 2;
      this.mejorasCiudad[i + 1] = new JugueteNuevo(img, x, y);
    }

    this.mejorasGranja = [];
    for (let i = 0; i < this.mejorasCiudad.length; i++) {
      let img = inter_gallina_img;
      let x = random(280, 450);
      let y = random(570, 600) - img.height / 2;
      this.mejorasCiudad[i] = new JugueteNuevo(img, x, y);
    }
    this.mejorasGranja[int(random(2, 5))] = new JugueteNuevo(
      inter_tractor_img,
      80,
      550
    );
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    super.ejecutar();

    // ----------------------------------------------Imagen de refe
    if (debug) {
      this.fondo = inter_refe_img;
    } else {
      this.fondo = info_fondo_img;
    }

    // ----------------------------------------------EDIFICIOS
    // image(inter_granja_img, 295, 390);

    // ----------------------------------------------CULTIVOS

    // ----------------------------------------------TREN
    this.tren.ejecutar();

    this.preNivel = this.nivel;
    pop();
  }
}

// -------------------------------------------------------------------------------CLASE TREN
class Tren extends Desplazable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    let y = height*0.8;
    let a = [];
    a[0] = { x: 360, y: y };
    a[1] = { x: 1000, y: y };
    a[2] = { x: width + inter_tren_img.width / 2, y: y };

    super(inter_tren_img, a, 0);

    this.terminado = true;

    this.carga = new DragTo(
      this.posX,
      this.posY,
      this.img.width,
      this.img.height
    );
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    super.ejecutar(1);

    // this.carga.empty = true;

    // ----------------------------------------------Ruedas
    let cantRuedas = 8;
    for (let i = 0; i < cantRuedas; i++) {
      push();
      let xi = this.posX - this.img.width / 2;
      let x = xi + (this.img.width * i) / cantRuedas;
      translate(x, this.posY);
      rotate(this.vel.map(0, 360));

      image(inter_rueda_img, 0, 0);
      pop();
    }
  }
}

// -------------------------------------------------------------------------------PRODUCTO PARA CARGAR EN EL TREN
class Producto extends Draggeable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    super();
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    super.ejecutar();
  }
}

// -------------------------------------------------------------------------------CLASE JUGUETE NUEVO
class JugueteNuevo extends Desplazable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(img_, x_, y_) {
    let a = [];
    a[0] = { x: x_, y: -img_.height };
    a[1] = { x: x_, y: y_ + 100 };
    a[2] = { x: x_, y: y_ };
    a[3] = { x: x_, y: y_ + 50 };
    a[4] = { x: x_, y: y_ };

    super(img_, a, 0);
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    let d = 0;
    if (this.pos > 0) {
      d = 1;
    } else {
      d = 0.5;
    }

    super.ejecutar(d);
  }
}
