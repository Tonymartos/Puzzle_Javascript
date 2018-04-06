var debug = true;

function iniciar() {
    generapuzzle();
}


let generapuzzle = () => {
    let npiezas = 17;
    let piezas = [];
    let anumeros = [];
    for(i=0;i<npiezas;i++){
        piezas[i] = "auto"+i+".jpg";
    }
    for (i = 0; i < piezas.length; i++) {
        let numero = Math.floor(Math.random() * piezas);
        console.log(numero);
        while (repetido(numero, anumeros)==false) {
            anumero.push(numero);
            let addimg = document.createElement("img");
            addimg.setAttribute(src,"fotos/"+piezas[anumeros[i]]);
            while(debug){
                console.log("Repetido: "+numero);
            }
        }
    }
};

let repetido = (n, array) => {
    let encontrado = false;
    for(i=0;i<array.length;i++){
        if(n===array[i]){
            encontrado = true;
        }
    }
    return encontrado;
};




/* function generapuzzle() {
    //dfotos ruta donde se encuentra las fotos
    var dfotos = "fotos/";
    //Array con los nombres de las imagenes
    //Array donde se alojaran todos los numeros que se vayan a repetir
    var imgrandom = [];

    var piezas[] = "auto"+i
    //Recorre el array total de imagenes
        for(i=0;i<arrayimg.length;i++){
            //Generando numero aleatorio
            var naleatorio = Math.floor(Math.random() * arrayimg.length);
            // if(debug){
            //     console.log(naleatorio);
            // }
            //Recorre el array de numeros repetidos y verificar si ese numero aleatorio se ha repetido o no.
            console.log(imgrandom);
            for(x=0; x<imgrandom.length; x++){
                if(naleatorio == imgrandom[x]){
                    if(debug){
                        console.log("Repeat number: "+imgrandom);
                    }
                }else{
                    imgrandom.push(naleatorio);
                    if(debug){
                        console.log("Adding number: "+imgrandom);
                    }
                    //Si el numero no es repetido ingresa ese numero en el array de aleatorios se genera la imagen aleatoria
                    var crearimg = document.createElement('img');
                    var crearsc = document.createAttribute('src');
                    crearsc.value=dfotos+arrayimg[imgrandom];
                }
            }
        }
    } */




//Cuando cargue la pagina iniciamos la funcion iniciar
window.addEventListener("DOMContentLoaded", iniciar);
