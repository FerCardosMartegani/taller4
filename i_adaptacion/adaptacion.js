// -------------------------------------------------------------------------------ADAPTACIÓN
class Adaptacion extends Infog {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    super();

    // ----------------------------------------------Torre de la izquierda
    this.col1 = 230;
    this.col2 = 450;

    let puntosIzq = [];
    puntosIzq[0] = { x: this.col2, y: -100 };
    puntosIzq[1] = { x: this.col2, y: 170 };
    puntosIzq[2] = { x: this.col1, y: 250 };
    puntosIzq[3] = { x: this.col1, y: 450 };
    puntosIzq[4] = { x: this.col2, y: 500 };
    puntosIzq[5] = { x: this.col2, y: 590 };

    this.bolitasIzq = [];
    for (let i = 0; i < puntosIzq.length - 1; i++) {
      this.bolitasIzq[i] = new Bolita(
        adap_bolitas_img[int(random(adap_bolitas_img.length - 1))],
        puntosIzq,
        i
      );
    }

    // ----------------------------------------------Torre de la derecha
    this.col3 = 670;
    this.col4 = 890;

    let puntosDer = [];
    puntosDer[0] = { x: this.col3, y: -100 };
    puntosDer[1] = { x: this.col3, y: 105 };
    puntosDer[2] = { x: this.col4, y: 180 };
    puntosDer[3] = { x: this.col4, y: 250 };
    puntosDer[4] = { x: this.col3, y: 290 };
    puntosDer[5] = { x: this.col3, y: 340 };
    puntosDer[6] = { x: this.col4, y: 400 };
    puntosDer[7] = { x: this.col4, y: 465 };
    puntosDer[8] = { x: this.col3, y: 500 };
    puntosDer[9] = { x: this.col3, y: 590 };

    this.bolitasDer = [];
    for (let i = 0; i < puntosDer.length - 1; i++) {
      this.bolitasDer[i] = new Bolita(
        adap_bolitas_img[int(random(adap_bolitas_img.length - 1))],
        puntosDer,
        i
      );
    }

    // ----------------------------------------------Piezas rotas
    this.embudoRoto = new DragTo(this.col1, 290, 140);

    this.tubosRotos = [];
    this.tubosRotos[0] = new DragTo(this.col2, 125, 90);
    this.tubosRotos[1] = new DragTo(this.col3, 125, 90);
    this.tubosRotos[2] = new DragTo(this.col3, 340, 90);

    this.rampaRotaIzq = new DragTo(
      340,
      495,
      adap_rampaRotaIzq_img.width,
      adap_rampaRotaIzq_img.height
    );

    this.rampasRotasDer = [];
    this.rampasRotasDer[0] = new DragTo(
      775,
      285,
      adap_rampaRotaDer_img[0].width,
      adap_rampaRotaDer_img[0].height
    );
    this.rampasRotasDer[1] = new DragTo(
      775,
      505,
      adap_rampaRotaDer_img[1].width,
      adap_rampaRotaDer_img[1].height
    );

    // ----------------------------------------------Piezas draggeables
    this.nuevas = [];

    // -----------------------------------------Embudo
    this.nuevas[6] = new Draggeable(
      adap_embudoNuevo_img,
      150,
      645,
      this.embudoRoto
    );

    // -----------------------------------------Tubos
    this.nuevas[0] = new Draggeable(
      adap_tuboNuevo_img,
      560,
      680,
      this.tubosRotos
    );
    this.nuevas[1] = new Draggeable(
      adap_tuboNuevo_img,
      660,
      700,
      this.tubosRotos
    );
    this.nuevas[2] = new Draggeable(
      adap_tuboNuevo_img,
      760,
      690,
      this.tubosRotos
    );

    // -----------------------------------------Rampas derecha
    this.nuevas[3] = new Draggeable(
      adap_rampaNuevaDer_img,
      400,
      670,
      this.rampasRotasDer
    );
    this.nuevas[4] = new Draggeable(
      adap_rampaNuevaDer_img,
      370,
      715,
      this.rampasRotasDer
    );

    // -----------------------------------------Rampa izquierda
    this.nuevas[5] = new Draggeable(
      adap_rampaNuevaIzq_img,
      940,
      700,
      this.rampaRotaIzq
    );

    this.colocadas = 0;

    // -----------------------------------------Sonidos
    this.bolitas_fx = new Sonido(adap_bolitas_fx);
    this.nuevas1_fx = new Sonido(adap_nueva1_fx);
    this.nuevas2_fx = new Sonido(adap_nueva2_fx);

    this.sonidoBolitas = new Timer();
    this.sonidoBolitasDelay = random(0.25, 0.5);
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    super.ejecutar();

    // // ----------------------------------------------Imagen de refe
    // if (debug) {
    //   this.fondo = adap_refe_img;
    // } else {
    //   this.fondo = info_fondo_img;
    // }

    let velocidad = map(this.colocadas, 0, this.nuevas.length, 2, 0.25);

    // ----------------------------------------------Bases
    let by = 610;
    image(adap_baseIzq_img, this.col2, by);
    image(adap_baseDer_img, this.col3, by);

    // ----------------------------------------------Bolitas
    for (let i = 0; i < this.bolitasIzq.length; i++) {
      this.bolitasIzq[i].ejecutar(velocidad);
    }
    for (let i = 0; i < this.bolitasDer.length; i++) {
      this.bolitasDer[i].ejecutar(velocidad * 1.25);
    }

    if (!pantallaCambiando) {
      this.sonidoBolitas.correr();
    }
    if (this.sonidoBolitas.delayed(this.sonidoBolitasDelay)) {
      this.bolitas_fx.replay();
      this.bolitas_fx.play(false);
      this.sonidoBolitas.reset();

      this.sonidoBolitasDelay = constrain(
        velocidad * random(0.2, 0.3),
        0,
        this.nuevas.length
      );
    }

    image(adap_bolitas_img[0], this.col2, 590);
    image(adap_bolitas_img[1], this.col3, 590);

    // ----------------------------------------------Torres
    let disX = 0.275;
    let disY = 410;
    image(adap_torreIzq_img, width * disX, disY);
    image(adap_torreDer_img, width - width * disX, disY - 10);

    if (this.embudoRoto.empty) {
      image(adap_embudoRoto_img, this.embudoRoto.x, this.embudoRoto.y);
    }

    for (let i = 0; i < this.tubosRotos.length; i++) {
      if (this.tubosRotos[i].empty) {
        image(
          adap_tubosRotos_img[i],
          this.tubosRotos[i].x,
          this.tubosRotos[i].y
        );
      }
    }

    if (this.rampaRotaIzq.empty) {
      image(adap_rampaRotaIzq_img, this.rampaRotaIzq.x, this.rampaRotaIzq.y);
    }
    for (let i = 0; i < this.rampasRotasDer.length; i++) {
      if (this.rampasRotasDer[i].empty) {
        image(
          adap_rampaRotaDer_img[i],
          this.rampasRotasDer[i].x,
          this.rampasRotasDer[i].y
        );
      }
    }

    // ----------------------------------------------Partes nuevas
    let puestas = 0;
    for (let i = 0; i < this.nuevas.length; i++) {
      this.nuevas[i].ejecutar();
      if (!this.nuevas[i].canDrag) {
        puestas++;
      }

      if (this.nuevas[i].isDragging) {
        this.nuevas1_fx.play(false);
      }
    }

    if (puestas != this.colocadas) {
      this.nuevas2_fx.play(false);
    }
    if (dragging == undefined) {
      this.nuevas1_fx.replay();
      this.nuevas2_fx.replay();
    }

    this.colocadas = puestas;

    pop();
  }
}

// -------------------------------------------------------------------------------CLASE BOLITAS
class Bolita extends Desplazable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(img_, a_, p1_) {
    super(img_, a_, p1_);
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar(d_) {
    super.ejecutar(d_);

    if (this.terminado) {
      this.terminado = false;
      this.pos = 0;
      this.img = adap_bolitas_img[int(random(adap_bolitas_img.length - 1))];
    }
  }
}
