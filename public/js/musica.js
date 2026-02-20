const canciones = [
    { titulo: "Minecraft", artista: "saddyowner, TanookiAlex", src: "media/music/Minecraft - saddyowner, TanookiAlex.mp3" },
    { titulo: "Living Mice", artista: "saddyowner, TanookiAlex", src: "media/music/Living Mice - saddyowner, TanookiAlex.mp3" },
    { titulo: "Wet Hands", artista: "saddyowner, TanookiAlex", src: "media/music/Wet Hands - saddyowner, TanookiAlex.mp3" },
    { titulo: "Cat", artista: "saddyowner, TanookiAlex", src: "media/music/Cat - saddyowner, TanookiAlex.mp3" },
    { titulo: "Clark", artista: "saddyowner, TanookiAlex", src: "media/music/Clark - saddyowner, TanookiAlex.mp3" },
    { titulo: "Dry Hands", artista: "saddyowner, TanookiAlex", src: "media/music/Dry Hands - saddyowner, TanookiAlex.mp3" },
    { titulo: "Mice On Venus", artista: "saddyowner, TanookiAlex", src: "media/music/Mice On Venus - saddyowner, TanookiAlex.mp3" },
    { titulo: "Haggstrom", artista: "saddyowner, TanookiAlex", src: "media/music/Haggstrom - saddyowner, TanookiAlex.mp3" },
    { titulo: "Subwoofer Lullaby", artista: "saddyowner, TanookiAlex", src: "media/music/Subwoofer Lullaby - saddyowner, TanookiAlex.mp3" },
    { titulo: "Door", artista: "saddyowner, TanookiAlex", src: "media/music/Door - saddyowner, TanookiAlex.mp3" },
    { titulo: "Sweden", artista: "saddyowner, TanookiAlex", src: "media/music/Sweden - saddyowner, TanookiAlex.mp3" },
];

let indiceActual = 0;
let audio = new Audio();
audio.volume = 0.5;

function cargarCancion(reproducir = false) {
    audio.src = canciones[indiceActual].src;
    audio.load();
    if (reproducir) audio.play();
    actualizarInfo();
    const icono = document.getElementById("btn-play-musica");
    if (icono) {
        icono.className = "material-symbols-outlined";
        icono.textContent = reproducir ? "pause" : "play_arrow";
    }
}

export function iniciarMusica() {
    audio.addEventListener("timeupdate", actualizarProgreso);
    audio.addEventListener("ended", () => {
        indiceActual = (indiceActual + 1) % canciones.length;
        cargarCancion(true);
    });
    cargarCancion(false);
}

export function toggleMusica() {
    const icono = document.getElementById("btn-play-musica");
    if (audio.paused) {
        audio.play();
        if (icono) icono.textContent = "pause";
    } else {
        audio.pause();
        if (icono) icono.textContent = "play_arrow";
    }
}

export function anteriorCancion() {
    const reproducir = !audio.paused;
    indiceActual = (indiceActual - 1 + canciones.length) % canciones.length;
    cargarCancion(reproducir);
}

export function siguienteCancion() {
    const reproducir = !audio.paused;
    indiceActual = (indiceActual + 1) % canciones.length;
    cargarCancion(reproducir);
}

export function cambiarVolumen(valor) {
    audio.volume = valor / 100;
    const slider = document.getElementById('control-volumen');
    slider.style.background = `linear-gradient(to right, #f07b6b ${valor}%, #e0e0e0 ${valor}%)`;
}

export function buscarEnCancion(valor) {
    if (audio.duration) {
        audio.currentTime = (valor / 100) * audio.duration;
    }
}

function actualizarInfo() {
    const cancion = canciones[indiceActual];
    const titulo = document.getElementById("musica-titulo");
    if (titulo) titulo.textContent = `${cancion.titulo} — ${cancion.artista}`;
}

function actualizarProgreso() {
    const barra = document.getElementById("barra-progreso-musica");
    const tiempoEl = document.getElementById("musica-tiempo");
    if (!barra || !tiempoEl || !audio.duration) return;

    const porcentaje = (audio.currentTime / audio.duration) * 100;
    barra.value = porcentaje;

    barra.style.background = `linear-gradient(to right, #F4829A ${porcentaje}%, #F5E8D8 ${porcentaje}%)`;

    const fmt = t => `${String(Math.floor(t/60)).padStart(2,"0")}:${String(Math.floor(t%60)).padStart(2,"0")}`;
    tiempoEl.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
}