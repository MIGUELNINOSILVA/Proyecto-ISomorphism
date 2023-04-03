document.addEventListener("DOMContentLoaded", () => {
    showSongs(songs);
    likes = JSON.parse(localStorage.getItem('likes')) || [];
    mostrarlikes();
    
})

//crearCarrito

let likes = [];
//variables
const carritoContenedor = document.querySelector('#carritoContenedor');
const vaciarCarrito = document.querySelector('#vaciarCarrito');

//Evento
vaciarCarrito.addEventListener('click', () => {
    likes.length = [];
    mostrarlikes();
})


function showSongs(songs) {
    songs.forEach(song => {
        const {
            artist,
            songName,
            date,
            gender,
            file,
            img
        } = song
        const target = document.createElement('p');
        target.classList.add('target');
        target.innerHTML =
            `
        <div class="img">
            <img src="./songs/img/${img}" alt="" id="img-song">
        </div>
        <div class="contenido">
            <h2 class="parrafo-genero">${songName}</h2>
            <h3>${artist}</h3>
            <h4 class="parrafo-genero">${gender}</h4>
        </div>
        <div class="boton">
        <button class="btn p-2" onclick="agregarCancion(this, '${songName}')" id="botonReproducir"><i class="bi bi-heart fs-3 cambio" id="botonReproducir"></i></button>
            
        </div>
        <div class="audio-controles">
        <audio controls >
            <source src="./songs/song/${file}" type="audio/mpeg">
        </audio>
        </div>
        `

        document.querySelector('.content').appendChild(target)
    });
}

//Funciones

function agregarCancion(boton, songName) {
    const item = songs.find((song) => song.songName === songName);
    likes.push(item);
    const cambio = boton.querySelector('.bi-heart');
    boton.querySelector('.bi-heart').classList.toggle('bi-heart-fill');
    boton.querySelector('.bi-heart-fill').classList.toggle('bi-heart');

    mostrarlikes();
}
  

const mostrarlikes = () => {
    const modalBody = document.querySelector('.modal .modal-body');
    modalBody.innerHTML = '';
    likes.forEach((song) => {
        const {
            artist,
            songName,
            date,
            gender,
            file,
            img
        } = song;
        modalBody.innerHTML +=
            `
        <div class="contenedor">
        <div class="my-3">
            <img class="img-fluid img-like" src="./songs/img/${img}" width="300px">
            
        <audio controls>
            <source src="./songs/song/${file}" type="audio/mpeg">
        </audio>
        
        </div>
        
        <div class="d-flex justify-content-center gap-3">
            <p>Artista: ${artist}</p>
            <p>Nombre canción: ${songName}</p>
            <p>Género: ${gender}</p>
            <button class="btn btn-danger" onclick="eliminarProducto('${songName}')">Eliminar Canción</button>
        </div>
        
        </div>

        `
    });
    if (likes.length === 0) {
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo">No hay canciones que te gusten :(</p>
        <p class="text-center text-primary parrafo">¿Qué estás esperando pa agregar? >:(</p>
        `
        document.getElementById('vaciarCarrito').classList.add('none')
    } else {
        document.getElementById('vaciarCarrito').classList.remove('none')
    }

    carritoContenedor.textContent = likes.length;
    guardarStorage();
}

function eliminarProducto(songName) {
    const songId = songName;
    likes = likes.filter((song) => song.songName !== songId);
    mostrarlikes();
}

function guardarStorage() {
    localStorage.setItem('likes', JSON.stringify(likes));
}

/* Buscador  Diego Aceros*/

const buscador = document.querySelector(`#inputBuscar`)

buscador.addEventListener('input', (e)=>{
    parametros.buscar = e.target.value
    limpiar()
    filtrarCamper()
        
}) 

buscador.addEventListener('input', (e)=>{
    parametros.buscarGender = e.target.value
    limpiar()
    filtrarCamper()
        
})  

buscador.addEventListener('input', (e)=>{
    parametros.buscarArtista = e.target.value
    limpiar()
    filtrarCamper()
        
})  


const parametros = {
    artist: '',
    songName: '',
    date: '',
    gender: '',
    file: '',
    img: '',
    buscar : ``,
    buscarGender: ``,
    buscarArtista:``
} 

function filtrarCamper(){
    const resultado = songs
    .filter(filtrarSongName)
    /* .filter(filtrarSongGender) */
    showSongs(resultado);
    console.log(resultado);
}

function filtrarSongName(songs){
    if(parametros.buscar){
        return songs.songName.toLowerCase().includes(parametros.buscar.toLowerCase())  || songs.gender.toLowerCase().includes(parametros.buscarGender.toLowerCase())  || songs.artist.toLowerCase().includes(parametros.buscarArtista.toLowerCase());
    }
    return songs;
}

function limpiar(){
    let m = document.querySelectorAll('p');
    for (let n = 0 ; n < m.length ; n++){
        m[n].remove();
    }
}




