//Variables Debug
var debug = false;

//Variables globales
let npiezas = 16;
//Array con el nombre de las imagenes para el puzzle
let piezas = [];
//****Fin variables globales ****

function pinicio() {
    generapuzzle();
    habimgclick();
    verificarpuzzle();
}

let generaimg = () => {
    //Numero total de piezas
    //Ruta donde se encuentran las imagenes
    let ruta = "/fotos";
    let nimg = "auto";
    //Almacenamos las imagenes en el array piezas
    for (i = 1; i <= npiezas; i++) {
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
            numeroa = Math.floor(Math.random() * npiezas + 1);
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
    let cdiv = document.createElement("div");
    cdiv.setAttribute("id", "cpuzzle");
    let gbody = document.getElementsByTagName("body")[0];
    gbody.appendChild(cdiv);
    for (j = 0; j < npiezas; j++) {
        //Cogemos el body, creamos un div y generamos la imagen
        let addimg = document.createElement("img");
        //Agregamos el atributo de la colocamos la dirección donde se encuentra la imagen.
        addimg.setAttribute("src", "fotos/" + piezas[aleatorios[j]]);
        addimg.setAttribute("value", aleatorios[j]);
        if (debug) {
            console.log(piezas[aleatorios[j]]);
        }
        cdiv.appendChild(addimg);
    }
};

let habimgclick = () => {
    let imgget = document.getElementsByTagName("img");
    for(i=0;i<imgget.length;i++){
        imgget[i].addEventListener("click", intercambiar);
    }
}

let intercambiar = (e) => {
    let qimg = e.target.src;
    let gruta = qimg.indexOf("/fotos");
    let ruta = qimg.slice(gruta);
    if(debug){
        console.log(ruta);
    }
}

let verificarpuzzle = () => {
    let cimagenes = document.getElementsByTagName("img");
    for(i=0;i<cimagenes.length;i++){
        let imagen = document.querySelector("img")[i];
        console.log(imagen);
    }
    
    
    
} 

//Cuando cargue la pagina iniciamos la funcion iniciar
window.addEventListener("DOMContentLoaded", pinicio);