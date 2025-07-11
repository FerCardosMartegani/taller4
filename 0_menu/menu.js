// -------------------------------------------------------------------------------CLASE MENÚ
class Menu extends Infog {
  constructor() {
    super();
    this.fondo = menu_fondo_img;

    this.estanteCornerX = 184;
    this.estanteCornerY = 212;
    this.estanteTam = 440 - this.estanteCornerX;
    this.estantePosX = this.estanteCornerX + this.estanteTam / 2;
    this.estantePosY = this.estanteCornerY + this.estanteTam / 2;
  }

  ejecutar() {
    push();
    super.ejecutar();

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i <= 2; i++) {
        rect(
          this.estantePosX + (13 + this.estanteTam) * i,
          this.estantePosY + this.estanteTam * j,
          this.estanteTam,
          this.estanteTam
        );

        if (
          isInside(
            mouseX,
            mouseY,
            this.estantePosX + (13 + this.estanteTam) * i,
            this.estantePosY + this.estanteTam * j,
            this.estanteTam,
            this.estanteTam
          )
        ) {
          let index = i + (j > 0 ? 4 : 1);
          console.log("Dentro" + index);

          if (_touchStarted) {
            nextPantalla = index;
          }
        }
      }
    }

    pop();
  }
}
