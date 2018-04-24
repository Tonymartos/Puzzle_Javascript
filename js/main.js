//Variables Debug
let debug = true;
let debug2 = false;

//Variables globales
let npiezas = 16;
//Array con el nombre de las imagenes para el puzzle
let piezas = [];
// Rutas con las imagenes
var ruta = "";
var ruta2 = "";
var imgf = "";
var imgs = "";
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
    for (i = 0; i < npiezas; i++) {
        piezas[i] = nimg + i + ".jpg";
        console.log(piezas[i]);
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
        }
        //Mientras que realiza la funcion repetido con el numero aleatorio si es igual a un numero almacenado en el array de los numeros aleatorios que hemos sacado del random verificando si el numero aleatorio se repite.
        while (repetido(numeroa, anumeros));
        //Agregamos el numero aleatorio que hemos generado en el array.
        anumeros.push(numeroa);
    }
    for(x=0;x<anumeros.length;x++){
        console.log("Numero aleatorio: " + anumeros[x]);
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
    let aleatorios = aleatorio();
    if(debug){
        console.log(aleatorios);
    }
    let cdiv = document.createElement("div");
    cdiv.setAttribute("id", "cpuzzle");
    let gbody = document.getElementsByTagName("body")[0];
    gbody.appendChild(cdiv);
    for (j = 0; j < npiezas; j++) {
        if(debug){
            console.log("Pieza aleatorio: " + piezas[aleatorios[j]]);
        }
        //Cogemos el body, creamos un div y generamos la imagen
        let addimg = document.createElement("img");
        //Agregamos el atributo de la colocamos la dirección donde se encuentra la imagen.
        addimg.setAttribute("src", "fotos/" + piezas[aleatorios[j]]);
        addimg.setAttribute("data-position-type", "auto" + j);
        if (debug) {
            console.log(piezas);
        }
        cdiv.appendChild(addimg);
    }
    
};

let habimgclick = () => {
    let imgget = document.getElementsByTagName("img");
    for (i = 0; i < imgget.length; i++) {
        imgget[i].addEventListener("click", getrutas);
    }
}

let getrutas = (e) => {
    let qimg = e.target.src;
    let gruta = qimg.indexOf("/fotos");
    let rutac = qimg.slice(gruta);
    if (ruta.length > 0) {
        ruta2 = rutac;
        imgs = e.target
        intercambiar(ruta, ruta2);
    } else {
        ruta = rutac;
        imgf = e.target;
        if(debug){
            console.log(ruta);
        }
    }
}

let intercambiar = (rp, rs) => {
    if (rp != rs) {
        if(debug){
            console.log(imgf);
            console.log(imgs);
        }
        imgf.src = rs;
        imgs.src = rp;
        verificarpuzzle();
    }
    limpiar();
}

let limpiar = () => {
    imgf = "";
    imgs = "";
    ruta = "";
    ruta2 = "";
}

let verificarpuzzle = () => {
    let cimagenes = document.getElementsByTagName("img");
    for (i = 0; i < cimagenes.length; i++){
        let gimg = cimagenes[i].src;
        let vimg = cimagenes[i].getAttribute("data-position-type");
        let nimg = gimg.indexOf("auto");
        let cimg = gimg.slice(nimg);
        if(cimg == piezas[i]){
            if(debug){
                console.log("Correcto: "+"|"+gimg+"|"+piezas[i]);
            }
        }
    }
}

//Cuando cargue la pagina iniciamos la funcion iniciar
window.addEventListener("DOMContentLoaded", pinicio);