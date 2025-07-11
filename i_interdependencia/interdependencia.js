// -------------------------------------------------------------------------------INTERDEPENDENCIA
class Interdependencia {
  constructor(){

  }
  ejecutar(){
    
  }
}

// -------------------------------------------------------------------------------CLASE TREN
class Tren {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor() {
    this.posX = 0;
    this.posY = 0;

    this.ruta = [];
    this.ruta[0] = height * (8 / 10);

    this.carga = [];
  }
}

// -------------------------------------------------------------------------------ESPACIO PARA CARGA EN EL TREN
class Tren_Espacio {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(x_, y_) {
    this.posX = x_;
    this.posY = y_;

    this.carga;
  }
}

// -------------------------------------------------------------------------------PRODUCTO PARA CARGAR EN EL TREN
class Tren_Producto extends Draggeable {
  // -----------------------------------------------------------------CONSTRUCTOR
  constructor(x_, y_, d_) {
    super(x_, y_, d_);
  }

  // -----------------------------------------------------------------EJECUTAR
  ejecutar() {
    super.ejecutar();
  }
}
