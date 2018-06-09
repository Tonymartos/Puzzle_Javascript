//Cuando cargue la pagina iniciamos la funcion iniciar
//Variables Debug
let debug = false;
let debug2 = false;

//Variables globales
let npiezas = 16;
//Array con el nombre de las imagenes para el puzzle
let piezas = [];
// Rutas con las imagenes
var r = "";
var r2 = "";
var imgf = "";
var imgs = "";
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var cronometroInterval;

//Boton para comenzar el puzzle
//****Fin variables globales ****

function pinicio() {
    crearcronometro();
    let comenzar = document.getElementById('btncronometro');
    comenzar.addEventListener('click', LlamarCronometro);
    generapuzzle();
    }

let generaimg = () => {
    //Numero total de piezas
    //Ruta donde se encuentran las imagenes
    let nimg = "auto";
    //Almacenamos las imagenes en el array piezas
    for (i = 0; i < npiezas; i++) {
        piezas[i] = nimg + i + ".jpg";
        if (debug) {
            console.log(piezas[i]);
        }

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
    for (x = 0; x < anumeros.length; x++) {
        if (debug) {
            console.log("Numero aleatorio: " + anumeros[x]);
        }

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
    if (debug) {
        console.log(aleatorios);
    }
    let cdiv = document.createElement("div");
    cdiv.setAttribute("id", "cpuzzle");
    let gbody = document.getElementsByTagName("body")[0];
    gbody.appendChild(cdiv);
    for (j = 0; j < npiezas; j++) {
        if (debug) {
            console.log("Pieza aleatorio: " + piezas[aleatorios[j]]);
        }
        //Cogemos el body, creamos un div y generamos la imagen
        let addimg = document.createElement("img");
        //Agregamos el atributo de la colocamos la dirección donde se encuentra la imagen.
        addimg.setAttribute("src", "fotos/" + piezas[aleatorios[j]]);
        addimg.setAttribute("data-position-type", "auto" + j + ".jpg");
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

//Funcion para coger las rutas a la hora de seleccionar 2 imagenes,
//una vez cogidos se procede a la funcion intercambiar.
let getrutas = (e) => {
    let qimg = e.target.src;
    let gruta = qimg.indexOf("fotos");
    let rutac = qimg.slice(gruta);
    if (r.length > 0) {
        r2 = rutac;
        imgs = e.target
        intercambiar(r, r2);
    } else {
        r = rutac;
        imgf = e.target;
        if (debug) {
            console.log(r);
        }
    }
}
//Funcion para intercambiar las posiciones de las imagenes seleccionadas.
let intercambiar = (rp, rs) => {
    if (rp != rs) {
        if (debug) {
            console.log(imgf);
            console.log(imgs);
        }
        imgf.src = rs;
        imgs.src = rp;
        checkpuzzle();
    }
    limpiar();
}

//Funcion para limpiar las rutas de las imagenes seleccionadas.
let limpiar = () => {
    imgf = "";
    imgs = "";
    r = "";
    r2 = "";
}

//Funcion para revisar todas las imagenes. Devuelve true o false si se encuentra
//en una posicion incorrecta o correcta y lo añade en un array, esta funcion complementa con vcomplete

let checkpuzzle = () => {
    let bverifica = new Array();
    let cimagenes = document.getElementsByTagName("img");
    for (i = 0; i < cimagenes.length; i++) {
        let gimg = cimagenes[i].src;
        let vimg = cimagenes[i].getAttribute("data-position-type");
        let nimg = gimg.indexOf("auto");
        let cimg = gimg.slice(nimg);
        if (cimg == vimg) {
            bverifica.push(true);
            if (debug) {
                console.log("Correcto: " + "|" + gimg + "|" + vimg);
            }
        } else {
            bverifica.push(false);
        }
    }
    //if(debug2){
    console.log(bverifica);
    //}
    vcomplete(bverifica);
}

//Funcion para verificar si en el array todas las posiciones se encuentran en true
//y se procede a la finalizacion del puzzle

let vcomplete = (verificador) => {
    if (verificador.includes(false) != true) {
        clearInterval(cronometroInterval);
        crearranking();
        let gimg = document.getElementsByTagName("img");
        let gdiv = document.getElementById("cpuzzle");
        for (x = 0; x < gimg.length; x++) {
            gimg[x].setAttribute("class", "ocultar");
        }
        let rimg = document.createElement("img");
        let rh = document.createElement("h1");
        rh.setAttribute("class", "final");
        rimg.setAttribute("src", "fotos/auto.jpg");
        rh.innerHTML = "Has completado el puzzle";
        gdiv.appendChild(rimg);
        gdiv.appendChild(rh);
    } else {
        console.log("Hay uno falso");
    }
}

let crearcronometro = () => {
    let gcbody = document.getElementsByTagName('body')[0];
    let gcdiv = document.createElement('div');
    gcdiv.setAttribute("id", "contrareloj");
    gcbody.appendChild(gcdiv);
    let hdiv = document.createElement('div');
    hdiv.setAttribute("id", "horas");
    gcdiv.appendChild(hdiv);
    let mindiv = document.createElement('div');
    mindiv.setAttribute("id", "minutos");
    gcdiv.appendChild(mindiv);
    let segdiv = document.createElement('div');
    segdiv.setAttribute("id", "segundos");
    gcdiv.appendChild(segdiv);
    let cntdiv = document.createElement('div');
    cntdiv.setAttribute("id", "centesimas");
    gcdiv.appendChild(cntdiv);
    hdiv.innerHTML = "00";
    mindiv.innerHTML = ":" + "00";
    segdiv.innerHTML = ":" + "00";
    cntdiv.innerHTML = ":" + "00";
    var divBtnCronometro = document.createElement('div');
    divBtnCronometro.setAttribute("id", "divbtncronometro");
    gcbody.appendChild(divBtnCronometro);
    var btncron = document.createElement('button');
    btncron.setAttribute('id', 'btncronometro');
    btncron.innerHTML = 'Comenzar';
    divBtnCronometro.appendChild(btncron);
}

let LlamarCronometro = () => {
    habimgclick();
    cronometroInterval = setInterval(cronometro, 10);
    let comenzar = document.getElementById('btncronometro');
    comenzar.style.display='none';
}

let cronometro = () => {
    let centesimasdiv = document.getElementById('centesimas');
    let segundosdiv = document.getElementById('segundos');
    let minutosdiv = document.getElementById('minutos');
    let horasdiv = document.getElementById('horas');

    if (centesimas < 99) {
        centesimas++;
        if (centesimas < 10) {
            centesimas = "0" + centesimas;
        }
        centesimasdiv.innerHTML = ":" + centesimas;
    } else {
        centesimas = 0;
    }
    console.log("segundos(", segundos);
    if (centesimas == 0) {
        console.log('segundos2', segundos);
        if (segundos < 59) {
            segundos++;
            if (segundos < 10) {
                segundos = "0" + segundos;
            }
            segundosdiv.innerHTML = ":" + segundos;
        } else {
            segundos = 0;
        }
    }

    if ((centesimas == 0) && (segundos == 0)) {
        if (minutos < 59) {
            minutos++;
            if (minutos < 10) {
                minutos = "0" + minutos;
            }
            minutosdiv.innerHTML = ":" + minutos;
        } else {
            minutos = 0;
        }
    }

    if ((centesimas == 0) && (segundos == 0) && (minutos == 0)) {
        horas++;
        if (horas < 10) {
            horas = "0" + horas;
        }
        horasdiv.innerHTML = horas;
    }
}
let crearranking = () => {
  let gbody = document.getElementsByTagName("body")[0];
  //crear una nuevo div para el cuerpo del puzzle
  let adiv = document.createElement('div');
  adiv.setAttribute('puzzleranking');
  gbody.appendChild(adiv);
  let gdivpuzzle = document.getElementById('cpuzzle');
  gbody.appendChild(adiv);
  let gdivranking = document.createElement('div');
  gdivranking.setAttribute('ranking');
  gbody.appendChild(gdivranking);
}

//Cuando cargue la pagina iniciamos la funcion iniciar
window.addEventListener("DOMContentLoaded", pinicio);
