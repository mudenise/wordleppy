let intentos = 6;
const PALABRA = "APPLE";

document.getElementById("guess-button").addEventListener("click", ()=> {
    const INTENTO = leerIntento();
    if (INTENTO === PALABRA ) {
        console.log("GANASTE!")
        return
    }
    for (let i in PALABRA){
        if (INTENTO[i]===PALABRA[i]){
            console.log(INTENTO[i], "VERDE")
        } else if( PALABRA.includes(INTENTO[i]) ) {
            console.log(INTENTO[i], "AMARILLO")
        } else {
            console.log(INTENTO[i], "GRIS")
        }
    }
		intentos--
    if (intentos==0){
        console.log("PERDISTE!")
    }
})

function leerIntento(){
    const INPUT= document.getElementById("guess-input");
    const VALOR= INPUT.value.toUpperCase();
    return VALOR;
}



