// blackjack.js

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
function mostrarMano(mano, jugador) {
    console.log(`${jugador}: ${mano.join(', ')} (Puntuación: ${calcularPuntuacion(mano)})`);
}

// Función principal del juego
function jugarBlackjack() {
    console.log('¡Bienvenido al Blackjack de dos jugadores!');
    
    // Inicializar las manos de los jugadores
    let manoJugador1 = [obtenerCarta(), obtenerCarta()];
    let manoJugador2 = [obtenerCarta(), obtenerCarta()];
    
    // Mostrar las manos iniciales
    console.log('\nManos iniciales:');
    mostrarMano(manoJugador1, 'Jugador 1');
    mostrarMano(manoJugador2, 'Jugador 2');
    
    // Ronda del Jugador 1: recibe una carta adicional automáticamente
    console.log('\nJugador 1 recibe una carta adicional...');
    manoJugador1.push(obtenerCarta());
    mostrarMano(manoJugador1, 'Jugador 1');
    
    // Ronda del Jugador 2: recibe una carta adicional automáticamente
    console.log('\nJugador 2 recibe una carta adicional...');
    manoJugador2.push(obtenerCarta());
    mostrarMano(manoJugador2, 'Jugador 2');
    
    // Determinar el resultado
    const puntuacionJugador1 = calcularPuntuacion(manoJugador1);
    const puntuacionJugador2 = calcularPuntuacion(manoJugador2);
    
    console.log('\nResultado:');
    switch (true) {
        case (puntuacionJugador1 > 21 && puntuacionJugador2 > 21):
            console.log('Ambos jugadores se han pasado de 21. ¡Empate!');
            break;
        case (puntuacionJugador1 > 21):
            console.log('Jugador 1 se ha pasado de 21. ¡Jugador 2 gana!');
            break;
        case (puntuacionJugador2 > 21):
            console.log('Jugador 2 se ha pasado de 21. ¡Jugador 1 gana!');
            break;
        case (puntuacionJugador1 > puntuacionJugador2):
            console.log('¡Jugador 1 gana!');
            break;
        case (puntuacionJugador1 === puntuacionJugador2):
            console.log('¡Empate!');
            break;
        case (puntuacionJugador1 < puntuacionJugador2):
            console.log('¡Jugador 2 gana!');
            break;
        default:
            console.log('Error en el cálculo del resultado');
            break;
    }
}

// Iniciar el juego
jugarBlackjack();
