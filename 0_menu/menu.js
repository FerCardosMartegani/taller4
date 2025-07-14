// -------------------------------------------------------------------------------CLASE MENÚ
class Menu extends Infog {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    super();
    this.fondo = menu_fondo_img;

    this.estanteCornerX = 184;
    this.estanteCornerY = 212;
    this.estanteTam = 440 - this.estanteCornerX;
    this.estantePosX = this.estanteCornerX + this.estanteTam / 2;
    this.estantePosY = this.estanteCornerY + this.estanteTam / 2;

    this.poses = [
      { x: 0, y: -manos_img.height },
      { x: 0, y: height / 2 },
      { x: 0, y: -manos_img.height },
    ];
    this.manos = new Desplazable(manos_img, this.poses, 0);
    this.manos.terminado = true;

    this.distMano = 0;
    this.elegida = MENU;
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    push();
    super.ejecutar();

    if (this.elegida != MENU) {
      this.manos.ejecutar(1);
    }

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i <= 2; i++) {
        let index = i + (j > 0 ? 4 : 1);

        // ----------------------------------------------SELECTOR DE INFOGRAFÍA
        let px = this.estantePosX + (13 + this.estanteTam) * i;
        let py = this.estantePosY + this.estanteTam * j;

        if (this.elegida == index) {
          if (this.distMano == 0) {
            this.distMano = dist(0, py, 0, this.manos.posY);
          }
          if (this.manos.pos == 1) {
            py = this.manos.posY;
          } else if (this.manos.pos >= 2) {
            nextPantalla = index;
          }
        }

        if (
          isInside(mouseX, mouseY, px, py, this.estanteTam, this.estanteTam)
        ) {
          if (_touchStarted && this.elegida == 0) {
            this.elegida = index;

            for (let p of this.poses) {
              p.x = px;
            }
            this.poses[1].y = py;

            this.manos = new Desplazable(manos_img, this.poses, 0);
            // nextPantalla = index;
          }
        }

        // rect(
        //   this.estantePosX + (13 + this.estanteTam) * i,
        //   this.estantePosY + this.estanteTam * j,
        //   this.estanteTam,
        //   this.estanteTam
        // );
        image(
          logos_img[index - 1],
          px,
          py + this.estanteTam / 2 - logos_img[index - 1].height * 0.6
        );
      }
    }

    pop();
  }
}
