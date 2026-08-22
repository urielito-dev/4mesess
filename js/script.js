// Código de la página
const boton = document.getElementById("boton");

const titulo = document.getElementById("titulo");

const cargaContenedor =
    document.getElementById("carga-contenedor");

const barra =
    document.getElementById("barra");

const porcentaje =
    document.getElementById("porcentaje");

const corazon =
    document.getElementById("corazon");

const relleno =
    document.getElementById("rellenoCorazon");

const final =
    document.getElementById("final");


boton.addEventListener("click", () => {

    /* Cambiar título */

    titulo.textContent = "Espera";


    /* Ocultar botón */

    boton.style.display = "none";


    /* Mostrar barra */

    cargaContenedor.style.display = "block";


    /* Activar modo de carga del corazón */

    corazon.classList.add("corazon-cargando");


    /* Progreso */

    let progreso = 0;


    const intervalo = setInterval(() => {

        progreso++;


        /* Barra */

        barra.style.width =
            progreso + "%";


        /* Porcentaje */

        porcentaje.textContent =
            progreso + "%";


        /* Corazón */

        const altura = progreso;

        relleno.setAttribute(
            "y",
            100 - altura
        );

        relleno.setAttribute(
            "height",
            altura
        );


        /* Cuando termina */

        if (progreso >= 100) {

            clearInterval(intervalo);

            final.style.display = "block";

        }

    }, 50);

});

// ================================
// CIELO ESTRELLADO
// ================================

const canvas = document.getElementById("estrellas");
const ctx = canvas.getContext("2d");

let ancho;
let alto;

const estrellas = [];
const estrellasFugaces = [];


// ================================
// AJUSTAR CANVAS
// ================================

function ajustarCanvas() {

    ancho = window.innerWidth;
    alto = window.innerHeight;

    canvas.width = ancho;
    canvas.height = alto;
}

ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);


// ================================
// CREAR ESTRELLAS
// ================================

const cantidadEstrellas = 180;

for (let i = 0; i < cantidadEstrellas; i++) {

    estrellas.push({
        x: Math.random() * ancho,
        y: Math.random() * alto,

        radio: Math.random() * 1.4 + 0.3,

        brillo: Math.random(),

        velocidadBrillo:
            Math.random() * 0.025 + 0.005,

        direccion:
            Math.random() < 0.5 ? 1 : -1,

        movimientoX:
            (Math.random() - 0.5) * 0.03,

        movimientoY:
            (Math.random() - 0.5) * 0.03
    });
}


// ================================
// DIBUJAR ESTRELLAS
// ================================

function dibujarEstrellas() {

    for (const estrella of estrellas) {

        // Titileo
        estrella.brillo +=
            estrella.velocidadBrillo *
            estrella.direccion;

        if (estrella.brillo >= 1) {

            estrella.brillo = 1;

            estrella.direccion = -1;
        }

        if (estrella.brillo <= 0.15) {

            estrella.brillo = 0.15;

            estrella.direccion = 1;
        }


        // Movimiento extremadamente lento
        estrella.x += estrella.movimientoX;
        estrella.y += estrella.movimientoY;


        // Si sale de la pantalla vuelve a aparecer
        if (estrella.x < 0)
            estrella.x = ancho;

        if (estrella.x > ancho)
            estrella.x = 0;

        if (estrella.y < 0)
            estrella.y = alto;

        if (estrella.y > alto)
            estrella.y = 0;


        // Dibujar
        ctx.beginPath();

        ctx.arc(
            estrella.x,
            estrella.y,
            estrella.radio,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255, 255, 255, ${estrella.brillo})`;

        ctx.fill();
    }
}


// ================================
// ESTRELLAS FUGACES
// ================================

function crearEstrellaFugaz() {

    // Aparecerá desde una zona aleatoria
    const inicioX =
        Math.random() * ancho;

    const inicioY =
        Math.random() * alto * 0.5;

    estrellasFugaces.push({

        x: inicioX,
        y: inicioY,

        velocidad: Math.random() * 8 + 6,

        longitud: Math.random() * 60 + 40,

        vida: 1
    });
}


function dibujarEstrellasFugaces() {

    for (let i = estrellasFugaces.length - 1; i >= 0; i--) {

        const estrella =
            estrellasFugaces[i];


        // Movimiento diagonal
        estrella.x += estrella.velocidad;

        estrella.y += estrella.velocidad * 0.45;


        // Desaparecer poco a poco
        estrella.vida -= 0.018;


        // Dibujar cola
        const gradiente =
            ctx.createLinearGradient(
                estrella.x,
                estrella.y,
                estrella.x - estrella.longitud,
                estrella.y - estrella.longitud * 0.45
            );

        gradiente.addColorStop(
            0,
            `rgba(255,255,255,${estrella.vida})`
        );

        gradiente.addColorStop(
            1,
            "rgba(255,255,255,0)"
        );


        ctx.beginPath();

        ctx.moveTo(
            estrella.x,
            estrella.y
        );

        ctx.lineTo(
            estrella.x - estrella.longitud,
            estrella.y - estrella.longitud * 0.45
        );

        ctx.strokeStyle = gradiente;

        ctx.lineWidth = 1.5;

        ctx.stroke();


        // Eliminar
        if (
            estrella.vida <= 0 ||
            estrella.x > ancho + 100 ||
            estrella.y > alto + 100
        ) {

            estrellasFugaces.splice(i, 1);
        }
    }
}


// ================================
// CREAR ESTRELLA FUGAZ CADA TANTO
// ================================

setInterval(() => {

    if (Math.random() < 0.7) {

        crearEstrellaFugaz();
    }

}, 3500);


// ================================
// ANIMACIÓN PRINCIPAL
// ================================

function animarCielo() {

    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );


    dibujarEstrellas();

    dibujarConstelaciones();

    dibujarEstrellasFugaces();


    requestAnimationFrame(
        animarCielo
    );
}


// ================================
// CONSTELACIONES
// ================================

const constelaciones = {

    // ================================
    // CÁNCER ♋
    // Basado en la distribución real
    // de sus estrellas principales
    // ================================

    cancer: {

        estrellas: [

            // Tarf / Beta Cancri
            { x: 0.08, y: 0.48, brillo: 1.0 },

            // Acubens / Alpha Cancri
            { x: 0.25, y: 0.60, brillo: 0.85 },

            // Asellus Borealis / Gamma Cancri
            { x: 0.47, y: 0.28, brillo: 0.75 },

            // Asellus Australis / Delta Cancri
            { x: 0.48, y: 0.55, brillo: 0.95 },

            // Tegmine / Zeta Cancri
            { x: 0.32, y: 0.82, brillo: 0.75 },

            // Iota Cancri
            { x: 0.68, y: 0.72, brillo: 0.70 },

            // estrella secundaria
            { x: 0.76, y: 0.55, brillo: 0.45 }
        ],

        lineas: [

            [0, 1],

            [1, 3],

            [3, 2],

            [3, 4],

            [4, 5],

            [5, 6]
        ]
    },


    // ================================
    // CAPRICORNIO ♑
    // Basado en la distribución real
    // de sus estrellas principales
    // ================================

    capricornio: {

        estrellas: [

            // Algedi / Alpha Capricorni
            { x: 0.20, y: 0.32, brillo: 0.90 },

            // Dabih / Beta Capricorni
            { x: 0.30, y: 0.39, brillo: 1.0 },

            // Zeta Capricorni
            { x: 0.50, y: 0.63, brillo: 0.75 },

            // Theta Capricorni
            { x: 0.61, y: 0.70, brillo: 0.60 },

            // Omega Capricorni
            { x: 0.72, y: 0.78, brillo: 0.65 },

            // Nashira / Gamma Capricorni
            { x: 0.76, y: 0.52, brillo: 0.90 },

            // Deneb Algedi / Delta Capricorni
            { x: 0.88, y: 0.45, brillo: 1.0 },

            // Iota Capricorni
            { x: 0.67, y: 0.37, brillo: 0.60 }
        ],

        lineas: [

            [0, 1],

            [1, 7],

            [7, 5],

            [5, 6],

            [6, 4],

            [4, 3],

            [3, 2],

            [2, 1]
        ]
    }
};

// ================================
// DIBUJAR CONSTELACIÓN
// ================================

function dibujarConstelacion(constelacion) {

    const estrellasConst =
        constelacion.estrellas;


    // ----------------------------
    // Líneas
    // ----------------------------

    ctx.beginPath();

    for (const linea of constelacion.lineas) {

        const estrella1 =
            estrellasConst[linea[0]];

        const estrella2 =
            estrellasConst[linea[1]];


        const x1 =
            estrella1.x * ancho;

        const y1 =
            estrella1.y * alto;

        const x2 =
            estrella2.x * ancho;

        const y2 =
            estrella2.y * alto;


        ctx.moveTo(x1, y1);

        ctx.lineTo(x2, y2);
    }

    ctx.strokeStyle =
        "rgba(255, 0, 255, 1)";

    ctx.lineWidth = 4;

    ctx.stroke();


    // ----------------------------
    // Estrellas
    // ----------------------------

    for (const estrella of estrellasConst) {

        const x =
            estrella.x * ancho;

        const y =
            estrella.y * alto;


        // Brillo exterior
        ctx.beginPath();

        ctx.arc(
            x,
            y,
            5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255, 120, 190, 0.12)";

        ctx.fill();


        // Estrella principal
        ctx.beginPath();

        ctx.arc(
            x,
            y,
            6,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255, 235, 250, 0.95)";

        ctx.fill();
    }
}


// ================================
// DIBUJAR AMBAS CONSTELACIONES
// ================================

function dibujarConstelaciones() {

    dibujarConstelacion(
        constelaciones.cancer
    );

    dibujarConstelacion(
        constelaciones.capricornio
    );
}

animarCielo();
