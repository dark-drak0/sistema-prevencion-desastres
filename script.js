// ========================================
// ENTRAR AL SISTEMA
// ========================================

function entrarAlSistema() {

    const portada =
        document.getElementById("portada");

    const sistema =
        document.getElementById("sistema");

    portada.style.animation =
        "desaparecer 0.7s ease forwards";

    setTimeout(() => {

        portada.style.display = "none";

        sistema.style.display = "block";

        window.scrollTo(0, 0);

        obtenerClima();

    }, 700);
}



// ========================================
// ANIMACIÓN
// ========================================

const estiloAnimacion =
    document.createElement("style");

estiloAnimacion.innerHTML = `

@keyframes desaparecer {

    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }

}
`;

document.head.appendChild(estiloAnimacion);



// ========================================
// FECHA Y HORA
// ========================================

function actualizarHora() {

    const ahora = new Date();

    const horas =
        String(ahora.getHours()).padStart(2, "0");

    const minutos =
        String(ahora.getMinutes()).padStart(2, "0");

    const segundos =
        String(ahora.getSeconds()).padStart(2, "0");

    const dia =
        String(ahora.getDate()).padStart(2, "0");

    const mes =
        String(ahora.getMonth() + 1).padStart(2, "0");

    const año =
        ahora.getFullYear();

    document.getElementById("hora").textContent =
        `${horas}:${minutos}:${segundos}`;

    document.getElementById("fecha").textContent =
        `${dia}/${mes}/${año}`;
}

actualizarHora();

setInterval(actualizarHora, 1000);



// ========================================
// CLIMA
// ========================================

async function obtenerClima() {

    const temperatura =
        document.getElementById("temperatura");

    const clima =
        document.getElementById("clima");

    try {

        const latitud = -36.6066;
        const longitud = -72.1034;

        const respuesta = await fetch(

            `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,weather_code&timezone=America%2FSantiago`

        );

        const datos =
            await respuesta.json();

        const temp =
            datos.current.temperature_2m;

        const codigo =
            datos.current.weather_code;

        temperatura.textContent =
            `${temp} °C`;

        clima.textContent =
            interpretarClima(codigo);

    }

    catch (error) {

        temperatura.textContent =
            "No disponible";

        clima.textContent =
            "No se pudo obtener el clima";

    }
}



// ========================================
// INTERPRETAR CLIMA
// ========================================

function interpretarClima(codigo) {

    if (codigo === 0) {
        return "☀️ Cielo despejado";
    }

    if (codigo >= 1 && codigo <= 3) {
        return "⛅ Parcialmente nublado";
    }

    if (codigo >= 45 && codigo <= 48) {
        return "🌫️ Neblina";
    }

    if (codigo >= 51 && codigo <= 67) {
        return "🌧️ Lluvia";
    }

    if (codigo >= 71 && codigo <= 77) {
        return "❄️ Nieve";
    }

    if (codigo >= 80 && codigo <= 82) {
        return "🌧️ Chubascos";
    }

    if (codigo >= 95) {
        return "⛈️ Tormenta";
    }

    return "🌤️ Condiciones variables";
}



// ========================================
// ANALIZAR RIESGO
// ========================================

function analizarRiesgo() {

    const riesgos = [

        {
            id: "terremoto",
            nombre: "🌎 Terremoto"
        },

        {
            id: "tsunami",
            nombre: "🌊 Tsunami"
        },

        {
            id: "incendio",
            nombre: "🔥 Incendio forestal"
        },

        {
            id: "inundacion",
            nombre: "🌧️ Inundación"
        },

        {
            id: "volcan",
            nombre: "🌋 Actividad volcánica"
        },

        {
            id: "derrumbe",
            nombre: "🪨 Derrumbe"
        },

        {
            id: "viento",
            nombre: "🌪️ Vientos fuertes"
        },

        {
            id: "tormenta",
            nombre: "⛈️ Tormenta eléctrica"
        },

        {
            id: "temperaturaRiesgo",
            nombre: "🌡️ Temperaturas extremas"
        }

    ];


    let puntaje = 0;

    let factoresDetectados = [];


    riesgos.forEach(riesgo => {

        const elemento =
            document.getElementById(riesgo.id);

        const valor =
            Number(elemento.value);


        puntaje += valor;


        if (valor > 0) {

            factoresDetectados.push(
                riesgo.nombre
            );

        }

    });



    const resultado =
        document.getElementById("resultado");

    const factores =
        document.getElementById("factores");



    // ====================================
    // ANÁLISIS
    // ====================================

    resultado.innerHTML = `

        <div class="icono-riesgo">
            🔎
        </div>

        <strong>
            ANALIZANDO...
        </strong>

        <p>
            Evaluando los factores de riesgo.
        </p>

        <div class="barra">

            <div class="progreso"></div>

        </div>

    `;


    resultado.style.background =
        "#e5e7eb";

    resultado.style.color =
        "#111111";



    // Apagar semáforo

    apagarSemaforo();


    document.getElementById(
        "textoSemaforo"
    ).textContent =
        "Analizando nivel de riesgo...";



    // ====================================
    // ESPERAR
    // ====================================

    setTimeout(() => {


        // ====================================
        // 🟢 MUY BAJO
        // ====================================

        if (puntaje === 0) {

            mostrarResultado(
                "🟢",
                "RIESGO MUY BAJO",
                "No se detectan factores de riesgo importantes.",
                "#bbf7d0",
                "#14532d"
            );

            activarSemaforo("verde");

        }


        // ====================================
        // 🟡 BAJO
        // ====================================

        else if (puntaje <= 3) {

            mostrarResultado(
                "🟡",
                "RIESGO BAJO",
                "Existe una pequeña posibilidad de peligro. Mantente atento.",
                "#fef08a",
                "#713f12"
            );

            activarSemaforo("amarillo");

        }


        // ====================================
        // 🟠 MEDIO
        // ====================================

        else if (puntaje <= 6) {

            mostrarResultado(
                "🟠",
                "RIESGO MEDIO",
                "Mantente atento a la situación y prepara medidas de seguridad.",
                "#fed7aa",
                "#7c2d12"
            );

            activarSemaforo("naranja");

        }


        // ====================================
        // 🔴 ALTO
        // ====================================

        else if (puntaje <= 12) {

            mostrarResultado(
                "🔴",
                "RIESGO ALTO",
                "Busca un lugar seguro y sigue las instrucciones de las autoridades.",
                "#ef4444",
                "#ffffff"
            );

            activarSemaforo("rojo");

        }


        // ====================================
        // ⚫ CRÍTICO
        // ====================================

        else {

            mostrarResultado(
                "⚫",
                "RIESGO CRÍTICO",
                "PELIGRO EXTREMO. Aléjate de la zona de riesgo y sigue inmediatamente las instrucciones de las autoridades.",
                "#111111",
                "#ffffff"
            );

            activarSemaforo("negro");

        }



        // ====================================
        // MOSTRAR PUNTAJE
        // ====================================

        resultado.innerHTML += `

            <div class="puntaje">

                Puntaje de riesgo:

                <strong>
                    ${puntaje}/25
                </strong>

            </div>

        `;



        // ====================================
        // FACTORES DETECTADOS
        // ====================================

        if (
            factoresDetectados.length > 0
        ) {

            factores.innerHTML = `

                <h3>
                    ⚠️ Factores detectados
                </h3>

                <ul>

                    ${factoresDetectados
                        .map(
                            factor =>
                            `<li>${factor}</li>`
                        )
                        .join("")}

                </ul>

            `;

        }

        else {

            factores.innerHTML = `

                <h3>
                    ✅ Sin factores detectados
                </h3>

                <p>
                    No se seleccionaron situaciones
                    de riesgo.
                </p>

            `;

        }


    }, 2000);

}



// ========================================
// MOSTRAR RESULTADO
// ========================================

function mostrarResultado(
    icono,
    titulo,
    mensaje,
    fondo,
    texto
) {

    const resultado =
        document.getElementById(
            "resultado"
        );


    resultado.innerHTML = `

        <div class="icono-riesgo">

            ${icono}

        </div>


        <strong>

            ${titulo}

        </strong>


        <p>

            ${mensaje}

        </p>

    `;


    resultado.style.background =
        fondo;

    resultado.style.color =
        texto;

}



// ========================================
// SEMÁFORO
// ========================================

function apagarSemaforo() {

    document
        .querySelectorAll(".luz")
        .forEach(luz => {

            luz.classList.remove(
                "activa"
            );

        });

}



function activarSemaforo(nivel) {

    apagarSemaforo();


    const luz =
        document.getElementById(
            "luz" +
            nivel.charAt(0).toUpperCase() +
            nivel.slice(1)
        );


    if (luz) {

        luz.classList.add(
            "activa"
        );

    }


    const texto =
        document.getElementById(
            "textoSemaforo"
        );


    const mensajes = {

        verde:
            "🟢 Nivel de riesgo muy bajo",

        amarillo:
            "🟡 Nivel de riesgo bajo",

        naranja:
            "🟠 Nivel de riesgo medio",

        rojo:
            "🔴 Nivel de riesgo alto",

        negro:
            "⚫ Nivel de riesgo crítico"

    };


    texto.textContent =
        mensajes[nivel];

}



// ========================================
// COPIAR NÚMERO
// ========================================

function copiarNumero(
    numero,
    institucion
) {

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard.writeText(numero)

            .then(() => {

                alert(

                    "🚨 " +
                    institucion +

                    "\n\n" +

                    "Número de emergencia: " +
                    numero +

                    "\n\n" +

                    "✅ Número copiado."

                );

            })

            .catch(() => {

                alert(
                    "Número de " +
                    institucion +
                    ": " +
                    numero
                );

            });

    }

    else {

        const texto =
            document.createElement(
                "textarea"
            );

        texto.value =
            numero;

        texto.style.position =
            "fixed";

        texto.style.opacity =
            "0";

        document.body.appendChild(
            texto
        );

        texto.select();

        try {

            document.execCommand(
                "copy"
            );

        }

        catch (error) {

            console.log(
                "No se pudo copiar."
            );

        }

        document.body.removeChild(
            texto
        );

        alert(

            "🚨 " +
            institucion +

            "\n\n" +

            "Número de emergencia: " +
            numero +

            "\n\n" +

            "✅ Número copiado."

        );

    }

}