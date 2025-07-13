// -------------------------------------------------------------------------------ADAPTACIÓN
class Adaptacion extends Infog {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    super();

    let col1 = 195;
    let col2 = 512;
    let col3 = 675;
    let col4 = 935;

    // ----------------------------------------------Torre de la izquierda
    let puntosIzq = [];
    puntosIzq[0] = { x: col2, y: -100 };
    puntosIzq[1] = { x: col2, y: 190 };
    puntosIzq[2] = { x: col1, y: 250 };
    puntosIzq[3] = { x: col1, y: 450 };
    puntosIzq[4] = { x: col2, y: 490 };
    puntosIzq[5] = { x: col2, y: 590 };

    this.bolitasIzq = [];
    for (let i = 0; i < puntosIzq.length - 1; i++) {
      this.bolitasIzq[i] = new Bolita(
        adap_bolitas_img[int(random(adap_bolitas_img.length - 1))],
        puntosIzq,
        i
      );
    }

    // ----------------------------------------------Torre de la derecha
    let puntosDer = [];
    puntosDer[0] = { x: col3, y: -100 };
    puntosDer[1] = { x: col3, y: 140 };
    puntosDer[2] = { x: col4, y: 200 };
    puntosDer[3] = { x: col4, y: 255 };
    puntosDer[4] = { x: col3, y: 290 };
    puntosDer[5] = { x: col3, y: 350 };
    puntosDer[6] = { x: col4, y: 400 };
    puntosDer[7] = { x: col4, y: 465 };
    puntosDer[8] = { x: col3, y: 495 };
    puntosDer[9] = { x: col3, y: 590 };

    this.bolitasDer = [];
    for (let i = 0; i < puntosDer.length - 1; i++) {
      this.bolitasDer[i] = new Bolita(
        adap_bolitas_img[int(random(adap_bolitas_img.length - 1))],
        puntosDer,
        i
      );
    }

    // ----------------------------------------------Piezas rotas
    this.embudoRoto = new DragTo(col1, 300, 140);

    this.tubosRotos = [];
    this.tubosRotos[0] = new DragTo(col2, 125, 90);
    this.tubosRotos[1] = new DragTo(col3, 125, 90);
    this.tubosRotos[2] = new DragTo(col3, 350, 90);

    this.rampaRotaIzq = new DragTo(
      360,
      500,
      adap_rampaRotaIzq_img.width,
      adap_rampaRotaIzq_img.height
    );

    this.rampasRotasDer = [];
    this.rampasRotasDer[0] = new DragTo(
      800,
      285,
      adap_rampaRotaDer1_img.width,
      adap_rampaRotaDer1_img.height
    );
    this.rampasRotasDer[1] = new DragTo(
      800,
      505,
      adap_rampaRotaDer2_img.width,
      adap_rampaRotaDer2_img.height
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
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    super.ejecutar();

    // ----------------------------------------------Imagen de refe
    if (debug) {
      this.fondo = adap_refe_img;
    } else {
      this.fondo = info_fondo_img;
    }

    let velocidad = map(this.colocadas, 0, this.nuevas.length, 2, 0.25);

    // ----------------------------------------------Bases
    image(adap_baseIzq_img, 460, 610);
    image(adap_baseDer_img, 665, 610);

    // ----------------------------------------------Bolitas
    for (let i = 0; i < this.bolitasIzq.length; i++) {
      this.bolitasIzq[i].ejecutar(velocidad);
    }
    for (let i = 0; i < this.bolitasDer.length; i++) {
      this.bolitasDer[i].ejecutar(velocidad * 1.25);
    }

    // ----------------------------------------------Torres
    // image(adap_torreIzq_img, 335, 350);
    // image(adap_torreDer_img, 790, 350);

    // ----------------------------------------------Partes nuevas
    let puestas = 0;
    for (let i = 0; i < this.nuevas.length; i++) {
      this.nuevas[i].ejecutar();
      if (!this.nuevas[i].canDrag) {
        puestas++;
      }
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
