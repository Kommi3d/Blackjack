// blackjack.js
const readline = require('readline');

// Configuración de readline para la interacción con el usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Función para obtener una carta aleatoria
function obtenerCarta() {
    const cartas = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]; // 11 es el As
    const indice = Math.floor(Math.random() * cartas.length);
    return cartas[indice];
}

// Función para calcular la puntuación de la mano
function calcularPuntuacion(mano) {
    let puntuacion = mano.reduce((a, b) => a + b, 0);
    // Si hay un As y la puntuación es mayor a 21, el As vale 1 en lugar de 11
    if (mano.includes(11) && puntuacion > 21) {
        puntuacion -= 10;
    }
    return puntuacion;
}

// Función para mostrar la mano y la puntuación
function mostrarMano(mano, jugador = 'Jugador') {
    console.log(`${jugador}: ${mano.join(', ')} (Puntuación: ${calcularPuntuacion(mano)})`);
}d

// Función principal del juego
function jugarBlackjack() {
    console.log('¡Bienvenido al Blackjack!');

    let manoJugador = [obtenerCarta(), obtenerCarta()];
    let manoCasa = [obtenerCarta(), obtenerCarta()];
    let juegoTerminado = false;

    // Mostrar la mano inicial del jugador y una carta de la casa
    mostrarMano(manoJugador);
    console.log(`Casa: ${manoCasa[0]}, ?`);

    // Verificar si el jugador tiene Blackjack inicial
    if (calcularPuntuacion(manoJugador) === 21) {
        console.log('¡Blackjack! ¡Ganaste!');
        juegoTerminado = true;
        rl.close();
        return;
    }

    // Función para pedir carta
    function pedirCarta() {
        if (!juegoTerminado) {
            const carta = obtenerCarta();
            manoJugador.push(carta);
            mostrarMano(manoJugador);

            if (calcularPuntuacion(manoJugador) > 21) {
                console.log('¡Te has pasado de 21! Has perdido.');
                juegoTerminado = true;
                rl.close();
            } else {
                preguntarJugada();
            }
        }
    }

    // Función para plantarse
    function plantarse() {
        if (!juegoTerminado) {
            juegoTerminado = true;
            console.log('Te has plantado. La casa juega...');

            // La casa juega automáticamente
            while (calcularPuntuacion(manoCasa) < 17) {
                manoCasa.push(obtenerCarta());
            }

            mostrarMano(manoCasa, 'Casa');
            mostrarMano(manoJugador);

            const puntuacionCasa = calcularPuntuacion(manoCasa);
            const puntuacionJugador = calcularPuntuacion(manoJugador);

            if (puntuacionCasa > 21 || puntuacionJugador > puntuacionCasa) {
                console.log('¡Ganaste!');
            } else if (puntuacionJugador === puntuacionCasa) {
                console.log('¡Empate!');
            } else {
                console.log('¡Perdiste!');
            }

            rl.close();
        }
    }

    // Función para preguntar al jugador qué quiere hacer
    function preguntarJugada() {
        rl.question('¿Quieres pedir una carta (p) o plantarte (s)? ', (respuesta) => {
            if (respuesta.toLowerCase() === 'p') {
                pedirCarta();
            } else if (respuesta.toLowerCase() === 's') {
                plantarse();
            } else {
                console.log('Opción no válida. Por favor, elige "p" para pedir o "s" para plantarte.');
                preguntarJugada();
            }
        });
    }

    // Iniciar el juego preguntando al jugador
    preguntarJugada();
}

// Iniciar el juego
jugarBlackjack();