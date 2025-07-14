/* let atra_fondo1_img; /*mascara;
let imagenes = [];
let objetos = [];

let sonidoFondo, sonidoArrastre;
let sonidosTipo = {};

function preload() {
  // Cargar imágenes
  atra_fondo_img = loadImage("fondo.png");
  mascara = loadImage("mascara.png");

  for (let i = 0; i < 8; i++) {
    imagenes[i] = loadImage("obj" + i + ".png");
  }

  // Cargar sonidos
  sonidoFondo = loadSound("musica_fondo.mp3");
  sonidoArrastre = loadSound("arrastre.wav");

  sonidosTipo["sol"] = loadSound("sol.mp3");
  sonidosTipo["nube"] = loadSound("nube.mp3");
  sonidosTipo["trueno"] = loadSound("trueno.mp3");
  sonidosTipo["agua"] = loadSound("agua.mp3");
}

function atra_setup() {
  // createCanvas(1133, 744);

  // // Configurar sonido de fondo
  // sonidoFondo.setLoop(true);
  // sonidoFondo.setVolume(0.3);
  // sonidoFondo.play();

  setupInfografia1();
}

function atra_draw() {
  imageMode(CORNER);
  image(atra_fondo_img, 0, 0);

  let arrastrado = obtenerObjetoArrastrado();

  if (arrastrado != null) {
    if (!sonidoArrastre.isPlaying()) {
      sonidoArrastre.setLoop(true);
      sonidoArrastre.play();
    }
  } else if (sonidoArrastre.isPlaying()) {
    sonidoArrastre.stop();
  }

  for (let obj of objetos) {
    if (obj.seleccionado) {
      obj.arrastrar(mouseX, mouseY);
    } else if (arrastrado != null) {
      obj.mover(mascara);
    }

    if (
      arrastrado != null &&
      obj != arrastrado &&
      obj.estaCercaDe(arrastrado, 100)
    ) {
      let d = dist(obj.x, obj.y, arrastrado.x, arrastrado.y);
      let vol = map(d, 0, 100, 1.0, 0.1);
      obj.setVolumen(vol);
      obj.temblar(mascara);
    } else {
      obj.setVolumen(0.1);
    }

    obj.mostrar();
  }

  if (arrastrado == null) detenerSonidosObjetos();
}

function mousePressed() {
  console.log(mouseX + "," + mouseY);
  for (let i = objetos.length - 1; i >= 0; i--) {
    if (objetos[i].verificarSeleccion(mouseX, mouseY)) {
      // Deseleccionar otros objetos
      for (let j = 0; j < objetos.length; j++) {
        if (i !== j) objetos[j].seleccionado = false;
      }
      break;
    }
  }
}

function mouseReleased() {
  for (let obj of objetos) {
    obj.soltar();
  }
  detenerSonidosObjetos();
  if (!sonidoFondo.isPlaying()) {
    sonidoFondo.play();
  }
}

function obtenerObjetoArrastrado() {
  for (let obj of objetos) {
    if (obj.seleccionado) return obj;
  }
  return null;
}

function detenerSonidosObjetos() {
  for (let tipo in sonidosTipo) {
    if (sonidosTipo[tipo].isPlaying()) {
      sonidosTipo[tipo].stop();
    }
  }
  if (sonidoArrastre.isPlaying()) {
    sonidoArrastre.stop();
  }
}

function esZonaValida(x, y) {
  if (!mascara.pixels || mascara.pixels.length === 0) {
    mascara.loadPixels();
  }
  let px = constrain(floor(x), 0, width - 1);
  let py = constrain(floor(y), 0, height - 1);
  let index = (py * width + px) * 4;
  let r = mascara.pixels[index];
  let g = mascara.pixels[index + 1];
  let b = mascara.pixels[index + 2];
  let brightness = (r + g + b) / 3;
  return brightness > 200;
}

// Clase ObjetoMovil
class ObjetoMovil {
  constructor(img, x, y, tipo, indice, escala) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.seleccionado = false;
    this.tipo = tipo;
    this.indice = indice;
    this.volumenActual = 0.1;
    this.escala = escala;
  }

  mostrar() {
    push();
    translate(
      this.x - (this.img.width * this.escala) / 2,
      this.y - (this.img.height * this.escala) / 2
    );
    scale(this.escala);
    image(this.img, 0, 0);
    pop();
  }

  verificarSeleccion(mx, my) {
    let distancia = dist(mx, my, this.x, this.y);
    let radioDeteccion = (this.img.width * this.escala) / 2;
    if (distancia < radioDeteccion) {
      this.seleccionado = true;
      return true;
    }
    return false;
  }

  soltar() {
    this.seleccionado = false;
  }

  arrastrar(mx, my) {
    if (esZonaValida(mx, my)) {
      this.x = mx;
      this.y = my;
    }
  }

  mover(mascara) {
    let nx = this.x,
      ny = this.y;

    switch (this.tipo) {
      case "sol":
        nx += sin(frameCount * 0.05 + this.indice) * 0.7;
        ny += cos(frameCount * 0.04 + this.indice) * 0.7;
        break;
      case "nube":
        nx += noise(frameCount * 0.01 + this.indice * 10) * 1.5 - 0.75;
        break;
      case "trueno":
        nx += random(-0.5, 0.5);
        ny += random(-0.5, 0.5);
        break;
      case "agua":
        ny += sin(frameCount * 0.03 + this.indice * 2) * 0.9;
        break;
    }

    if (esZonaValida(nx, ny)) {
      this.x = nx;
      this.y = ny;
    }

    this.reproducirSonidoMovimiento();
  }

  temblar(mascara) {
    let tremor = 2.5;
    let nx = this.x + random(-tremor, tremor);
    let ny = this.y + random(-tremor, tremor);
    if (esZonaValida(nx, ny)) {
      this.x = nx;
      this.y = ny;
    }
  }

  reproducirSonidoMovimiento() {
    let sonido = sonidosTipo[this.tipo];
    if (sonido != null && !sonido.isPlaying()) {
      sonido.setLoop(true);
      sonido.play();
    }
  }

  setVolumen(vol) {
    this.volumenActual = constrain(vol, 0.0, 1.0);
    let sonido = sonidosTipo[this.tipo];
    if (sonido != null) {
      sonido.setVolume(this.volumenActual);
    }
  }

  estaCercaDe(otro, d) {
    return dist(this.x, this.y, otro.x, otro.y) < d;
  }
}

// Configuración de la infografía
function setupInfografia1() {
  objetos = [];

  let tipos = [
    "sol",
    "sol",
    "nube",
    "nube",
    "trueno",
    "trueno",
    "agua",
    "agua",
  ];

  let escalas = [0.1, 0.1, 0.09, 0.09, 0.1, 0.1, 0.1, 0.1];
  let posicionesX = [364, 629, 734, 775, 456, 360, 585, 457];
  let posicionesY = [455, 261, 331, 537, 545, 325, 399, 375];

  // Cargar píxeles de la máscara una sola vez
  mascara.loadPixels();

  for (let i = 0; i < 8; i++) {
    let x = posicionesX[i];
    let y = posicionesY[i];

    // Crear objeto directamente con las posiciones especificadas
    // Si no es zona válida, ajustar ligeramente
    let intentos = 0;
    while (!esZonaValida(x, y) && intentos < 50) {
      y -= 2;
      intentos++;
    }

    objetos.push(new ObjetoMovil(imagenes[i], x, y, tipos[i], i, escalas[i]));
  }
}
*/
