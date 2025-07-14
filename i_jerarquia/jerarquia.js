class Jerarquia extends Infog {
  constructor() {
    super();

    this.dominio = -1;
    this.debeDominar = -1;

    let orden = [0, 1, 2, 3];
    this.ordenDominio = shuffle(orden);

    this.podio = new DragTo(width / 2, height / 2, 150, 190);

    this.caer_fx = new Sonido(jerar_caida_fx);

    let poses = [
      {
        x: 119,
        y: 560,
      },
      {
        x: 350,
        y: 560,
      },
      {
        x: 659,
        y: 560,
      },
      {
        x: 880,
        y: 560,
      },
    ];

    this.personajes = [];
    for (let i = 0; i < jerar_lideres_img.length; i++) {
      this.personajes[i] = new Producto(
        [jerar_personajesSin_img[i], jerar_personajesCon_img[i]],
        jerar_lideres_img[i],
        poses[i].x,
        poses[i].y,
        this.podio
      );
    }

    this.poner_fx = new Sonido(jerar_sube_fx);

    this.tiempoAlPoder = new Timer();

    this.torres = [];
  }

  ejecutar() {
    super.ejecutar();

    for (let i = 0; i < this.torres.length; i++) {
      this.torres[i].ejecutar();
    }

    image(jerar_podio_img, this.podio.x, this.podio.y + 190);

    this.podio.empty = true;
    for (let i = 0; i < jerar_lideres_img.length; i++) {
      this.personajes[i].ejecutar();

      if (!this.personajes[i].canDrag) {
        if (this.dominio != i) {
          if (
            this.ordenDominio[this.debeDominar] == i ||
            this.debeDominar < 0
          ) {
            this.dominio = i;

            this.poner_fx.play(false);
          } else {
            this.personajes[i] = new Producto(
              this.personajes[i].start.i1,
              this.personajes[i].start.i2,
              this.personajes[i].start.x,
              this.personajes[i].start.y,
              this.personajes[i].start.d
            );
          }
        }
      }
      if (this.dominio == i) {
        this.personajes[i].img = this.personajes[i].start.i2;
      }
    }

    if (this.dominio >= 0 && this.debeDominar < this.personajes.length - 1) {
      this.tiempoAlPoder.correr();

      if (this.tiempoAlPoder.delayed(1)) {
        this.dominio = -1;
        this.debeDominar++;

        this.torres.push(
          new JugueteNuevo(
            jerar_torres_img[this.ordenDominio[this.debeDominar]],
            random([random(100, 340), random(800, 1030)]),
            random(475, 500) -
              jerar_torres_img[this.ordenDominio[this.debeDominar]].height / 2
          )
        );

        this.caer_fx.play(true);
        this.poner_fx.replay();

        this.tiempoAlPoder.reset();
      }
    }
  }
}

class Jerarquia2 extends Infog {
  constructor() {
    super();
    this.objetos = [];
    this.torres = [];

    this.coloresUsados = [false, false, false, false];
    this.coloresTotalesUsados = 0;
    this.colorEsperado = -1;
    this.juegoTerminado = false;

    // Configurar podio
    this.podioW = 150;
    this.podioH = 190;
    this.podioX = width / 2;
    this.podioY = height / 2 + 160;

    // Crear objetos interactivos
    this.objetos = [];
    this.objetos[0] = new ObjetoInteractivo(
      jerar_personajesSin_img[0],
      350,
      480,
      0.5,
      0
    );
    this.objetos[1] = new ObjetoInteractivo(
      jerar_personajesSin_img[1],
      659,
      495,
      0.5,
      1
    );
    this.objetos[2] = new ObjetoInteractivo(
      jerar_personajesSin_img[2],
      880,
      482,
      0.5,
      2
    );
    this.objetos[3] = new ObjetoInteractivo(
      jerar_personajesSin_img[3],
      119,
      480,
      0.5,
      3
    );

    this.torres = [];
  }

  ejecutar() {
    super.ejecutar();

    if (_touchStarted) {
      this.mousePressedInfografia2();
    }
    if (isMoving) {
      this.mouseDraggedInfografia2();
    }
    if (_touchEnded) {
      this.mouseReleasedInfografia2();
    }

    imageMode(CENTER);
    image(jerar_podio_img, this.podioX, this.podioY, this.podioW, this.podioH);

    // Mostrar torres
    for (let t of this.torres) {
      t.display();
    }

    // Verificar tiempo de subida
    let ahora = millis();
    for (let o of this.objetos) {
      if (o.sobrePodio && ahora - o.tiempoSubida > 2000) {
        o.caer();
        jerar_caida_fx.play();
      }
    }

    // Mostrar objetos
    for (let o of this.objetos) {
      o.display();
    }

    pop();
  }

  mousePressedInfografia2() {
    for (let o of this.objetos) {
      o.mousePressed();
    }
  }

  mouseDraggedInfografia2() {
    for (let o of this.objetos) {
      o.mouseDragged();
    }
  }

  mouseReleasedInfografia2() {
    for (let o of this.objetos) {
      o.mouseReleased();
      let margenSuperior = 40;
      if (
        o.estaSobre(
          this.podioX - this.podioW / 2,
          this.podioY - this.podioH / 2 - margenSuperior,
          this.podioW,
          this.podioH + margenSuperior
        ) &&
        !o.sobrePodio
      ) {
        let id = o.colorID;

        // Verificar si es el color correcto esperado o si es el primer personaje
        if (
          !this.coloresUsados[id] &&
          !this.juegoTerminado &&
          (this.colorEsperado == -1 || this.colorEsperado == id)
        ) {
          o.sobrePodio = true;
          o.coronada = true;
          o.img = jerar_lideres_img[id];
          jerar_sube_fx.play();
          o.tiempoSubida = millis();

          this.coloresUsados[id] = true;
          this.coloresTotalesUsados++;

          let pos1 = generarPosicionTorre();
          this.torres.push(
            new Torre(getTorreImgPorColor(id), pos1.x, pos1.y, random(0.3, 0.5))
          );

          let nuevoColor;
          do {
            nuevoColor = floor(random(4));
          } while (nuevoColor == id || this.coloresUsados[nuevoColor]);
          this.colorEsperado = nuevoColor;

          for (let i = 0; i < 2; i++) {
            let pos = generarPosicionTorre();
            this.torres.push(
              new Torre(
                getTorreImgPorColor(nuevoColor),
                pos.x,
                pos.y,
                random(0.3, 0.5)
              )
            );
            jerar_torre_fx.play();
          }

          if (this.coloresTotalesUsados >= 4) {
            juegoTerminado = true;
          }
        } else {
          o.caer();
        }
      }
    }
  }

  getTorreImgPorColor(id) {
    switch (id) {
      case 0:
        return jerar_imgTorreAmarilla;
      case 1:
        return jerar_imgTorreAzul;
      case 2:
        return jerar_imgTorreVerde;
      case 3:
        return jerar_torres_img;
      default:
        return null;
    }
  }

  generarPosicionTorre() {
    let x, y;
    do {
      x = random(50, width - 50);
    } while (x > 488 && x < 670);
    do {
      y = random(467, height - 50);
    } while (y > 549 && y < 744);
    return createVector(x, y);
  }
}

// Clase ObjetoInteractivo
class ObjetoInteractivo {
  constructor(img, x, y, escala, colorID) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.escala = escala;
    this.arrastrando = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.sobrePodio = false;
    this.coronada = false;
    this.colorID = colorID;
    this.tiempoSubida = 0;
  }

  display() {
    imageMode(CORNER);
    image(
      this.img,
      this.x,
      this.y,
      this.img.width * this.escala,
      this.img.height * this.escala
    );
  }

  mousePressed() {
    let w = this.img.width * this.escala;
    let h = this.img.height * this.escala;
    if (
      mouseX > this.x &&
      mouseX < this.x + w &&
      mouseY > this.y &&
      mouseY < this.y + h
    ) {
      this.arrastrando = true;
      this.offsetX = mouseX - this.x;
      this.offsetY = mouseY - this.y;
    }
  }

  mouseDragged() {
    if (this.arrastrando) {
      this.x = mouseX - this.offsetX;
      this.y = mouseY - this.offsetY;
    }
  }

  mouseReleased() {
    this.arrastrando = false;
  }

  estaSobre(px, py, pw, ph) {
    let cx = this.x + (this.img.width * this.escala) / 2;
    let cy = this.y + (this.img.height * this.escala) / 2;
    return cx > px && cx < px + pw && cy > py && cy < py + ph;
  }

  caer() {
    this.sobrePodio = false;
    this.coronada = false; // Cambiar a false para que pueda volver a subir
    this.img = jerar_personajesCon_img[this.colorID];
    this.escala = 0.5;
    this.x = this.originalX;
    this.y = this.originalY;
  }
}

// Clase Torre
class Torre {
  constructor(img, x, y, escalaObjetivo) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.escalaActual = 0.1;
    this.escalaObjetivo = escalaObjetivo;
    this.velocidadCrecimiento = 0.01;
  }

  display() {
    if (this.escalaActual < this.escalaObjetivo) {
      this.escalaActual += this.velocidadCrecimiento;
      this.escalaActual = min(this.escalaActual, this.escalaObjetivo);
    }
    let w = this.img.width * this.escalaActual;
    let h = this.img.height * this.escalaActual;
    imageMode(CENTER);
    image(this.img, this.x, this.y - h / 2, w, h);
  }
}
