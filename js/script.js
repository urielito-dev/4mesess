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
