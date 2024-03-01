let intentos = 6;
let opciones = ["ANGEL", "PERRO", "TRAPO", "CINCO", ""];
let winnerWord = opciones[Math.floor(Math.random() * opciones.length)];
const GRID = document.getElementById("grid");

document.getElementById("guess-button").addEventListener("click", () => {
    const INTENTO = leerIntento();
    const ROW = document.createElement('div');
    ROW.className = 'row';

    if (INTENTO===winnerWord){
        terminar ("GANASTE");
        return;
    }
    for (let i = 0; i < winnerWord.length; i++) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === winnerWord[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (winnerWord.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    
    intentos--;
    if (intentos === 0) {
        terminar("PERDISTE");
    } 
    
});

function leerIntento() {
    const INPUT = document.getElementById("guess-input");
    const VALOR = INPUT.value.toUpperCase();
    return VALOR;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    const BOTON= document.getElementById("guess-button");
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.style.display = 'block';
    contenedor.innerHTML = mensaje;
}
