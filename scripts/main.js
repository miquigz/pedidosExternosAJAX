const arti = document.querySelector('article');
const header = document.querySelector('header');
const body = document.querySelector('body');
let colores = ['crimson', 'violet', 'black', 'grey', 'blue', 'crimson', 'violet', 'black', 'grey', 'blue', 'crimson', 'violet', 'black', 'grey', 'blue']
let posActual = 0;

function ajax(url, metodo = 'get'){
    let xhr = new XMLHttpRequest();
    xhr.open(metodo, url);
    xhr.send();
    return xhr;
}

let urlAux = 'https://jsonplaceholder.typicode.com/photos';
let objPhotos = [];

let xhrAct = ajax(urlAux);
xhrAct.addEventListener('load', ()=>{
    if (xhrAct.status === 200){
        // console.log(xhrAct.response);
        objPhotos = JSON.parse(xhrAct.response);
        objPhotos.length = 150;
        cargar12(objPhotos, 0, colores);
    }
})

const h2 = document.querySelector('#h2');

const cargarIMG = (arrayFotos, posicionActual)=>{
    let p = document.createElement('p');
    let img = document.createElement('img');
    let div = document.createElement('div');
    img.src = arrayFotos[posicionActual].url;
    p.textContent = arrayFotos[posicionActual].title;
    div.appendChild(img)
    div.appendChild(p)
    return div;
}

function cargar12(arrayFotos, pos = 0, colores){
    let frag = new DocumentFragment();
    let section = document.createElement('section');
    body.style.backgroundColor = colores[pos/12];
    h2.textContent = `Imagenes: ${pos} - ${pos+12}`;
    if (posActual !== 144){
        for (let i = 0; i < 12; i++) {
            frag.appendChild(cargarIMG(arrayFotos, i + pos));
        }
        section.appendChild(frag);
    }else{//Ultimas imgs 144-150
        h2.textContent = `Imagenes: ${pos} - ${pos+6}`;
        for (let i = 0; i < 6; i++) {
            frag.appendChild(cargarIMG(arrayFotos, i + pos));
        }
        section.appendChild(frag);
    }
    section.appendChild(frag);

    if (arti.firstElementChild) {
        arti.firstElementChild.remove()    
    }
    arti.appendChild(section)
}

//BOTONES
const btn1 = document.querySelector('#btn1'); //anterior
const btn2 = document.querySelector('#btn2'); //siguiente

const prendido = (BOTON, callback)=>{
    BOTON.setAttribute('href', '#');
    BOTON.addEventListener('click', callback);
    BOTON.className = '';
}

const apagado = (BOTON, callback)=>{
    BOTON.removeEventListener('click', callback);
    BOTON.removeAttribute('href');
    BOTON.className = 'apagado';
}

function botonesOnOff(boton1, boton2, cb1, cb2){
    if(posActual >= 144){
        apagado(boton2, cb2);
    }else if(posActual < 144){
        prendido(boton2, cb2);
    } if(posActual === 0){
        apagado(boton1, cb1);
    }else if(posActual >= 12){
        prendido(boton1, cb1);
    }
}

const btn2CB = (e)=>{
    e.preventDefault();
    posActual = posActual + 12;
    console.log(posActual);
    if (posActual < 150) {
        cargar12(objPhotos, posActual, colores);
        botonesOnOff(btn1, btn2, btn1CB, btn2CB);
    }
}
const btn1CB = (e)=>{
    e.preventDefault();
    posActual = posActual - 12;
    console.log(posActual);
    if (posActual >= 0) {
        cargar12(objPhotos, posActual, colores);
        botonesOnOff(btn1, btn2, btn1CB, btn2CB);
    }
}

btn2.addEventListener('click', btn2CB)
