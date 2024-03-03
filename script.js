let intentos = 6;
let opciones = ["ANGEL", "PERRO", "TRAPO", "CINCO", "SIETE"];
let winnerWord= generateWord();

const GRID = document.getElementById("grid");

async function api_call() {
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1000&lang=es');

    if (!response.ok) {
        return opciones[Math.floor(Math.random() * opciones.length)];
    } else {
        const result = await response.json();
        const five_letters_words = result.filter(word => word.length === 5 && word[0] === word[0].toLowerCase());
        const words_without_accents = five_letters_words.map(word => word.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        if (words_without_accents.length === 0) {
            return opciones[Math.floor(Math.random() * opciones.length)];
        } else {
            const random_index = Math.floor(Math.random() * words_without_accents.length);
            return words_without_accents[random_index];
        }
    }  	
}

document.getElementById("guess-button").addEventListener("click", () => {
    const INTENTO = leerIntento();
    const ROW = document.createElement('div');
    ROW.className = 'row';

    if (INTENTO === winnerWord) {
        terminar("GANASTE!");
        return;
    }
    for (let i in winnerWord) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
    
        if (INTENTO[i] === winnerWord[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green'; // Verde si la letra está en la posición correcta
        } else if (winnerWord.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow'; // Amarillo si la letra está en la palabra pero en la posición incorrecta
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey'; // Gris si la letra no está en la palabra
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);    
    
    intentos--;
    if (intentos === 0) {
        terminar("PERDISTE");
    } 
    
});

async function generateWord (){
    winnerWord = await api_call();
    console.log(winnerWord);
}

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

