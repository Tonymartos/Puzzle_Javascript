//Variables globales
let npiezas = 16;
var debug = true;
//Array con el nombre de las imagenes para el puzzle
let piezas = [];

function pinicio() {
    generapuzzle();
}
let generaimg = () => {
    //Numero total de piezas
    //Ruta donde se encuentran las imagenes
    let ruta = "/fotos";
    let nimg = "auto";
    //Almacenamos las imagenes en el array piezas
    for (i = 1; i < npiezas; i++) {
        piezas[i] = nimg + i + ".jpg";
    }
    return piezas;
}

//npiezas array del total de las piezas disponibles
let aleatorio = () => {
    let numeroa;
    //Array para almacenar los numeros aleatorios repetidos
    let anumeros = [];
    //Bucle para coger cada posicion del array de las imagenes donde generamos un numero aleatorio 
    for (i = 0; i < npiezas; i++) {
        do {
            numeroa = Math.floor(Math.random() * npiezas);
            if (debug) {
                console.log(numeroa);
            }
        }
        //Mientras que realiza la funcion repetido con el numero aleatorio si es igual a un numero almacenado en el array de los numeros aleatorios que hemos sacado del random verificando si el numero aleatorio se repite.
        while (repetido(numeroa, anumeros));
        //Agregamos el numero aleatorio que hemos generado en el array.
        anumeros.push(numeroa);
    }
    return anumeros;
}

//Funcion si se repite el numero random
let repetido = (n, numerosaleatorios) => {
    let encontrado = false;
    if (debug) {
        console.log("Numeros aleatorios", numerosaleatorios);
    }
    for (i = 0; i < numerosaleatorios.length; i++) {
        if (n === numerosaleatorios[i]) {
            if (debug) {
                console.log("encontrado", encontrado);
            }
            encontrado = true;
        }
    }
    if (debug) {
        console.log("Repetido", n);
    }
    return encontrado;
};

let generapuzzle = () => {
    generaimg();
    let aleatorios = aleatorio(npiezas);
    for (j = 1; j < npiezas; j++) {
        //Generamos la imagen
        let gbody = document.getElementsByTagName("body")[0];
        let addimg = document.createElement("img");
        //Agregamos el atributo de la colocamos la dirección donde se encuentra la imagen.
        addimg.setAttribute("src", "fotos/" + piezas[aleatorios[j]]);
        addimg.setAttribute("id",)
        if (debug) {
            console.log(piezas[aleatorios[j]]);
        }
        gbody.appendChild(addimg);
    }
};

let cogerpieza = ()  => {
    
}
//Cuando cargue la pagina iniciamos la funcion iniciar
window.addEventListener("DOMContentLoaded", pinicio);