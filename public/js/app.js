import { cargarTareas, toggleCompletada, toggleSubtarea, agregarSubtarea, eliminarSubtarea } from './tareas.js';
import { toggleExpand, mostrarFormSubtarea, abrirHowTo, cerrarHowTo } from './ui.js';
import * as api from './api.js';
import { mostrarAlert } from './ui.js';
import { abrirPomodoro, cerrarPomodoro, aplicarTiempo, toggleTimer, resetTimer, toggleSilencio } from './pomodoro.js';
import { iniciarMusica, toggleMusica, anteriorCancion, siguienteCancion, cambiarVolumen, buscarEnCancion } from './musica.js';

window.abrirPomodoro = abrirPomodoro;
window.cerrarPomodoro = cerrarPomodoro;
window.aplicarTiempo = aplicarTiempo;
window.toggleTimer = toggleTimer;
window.resetTimer = resetTimer;

window.toggleCompletada = toggleCompletada;
window.toggleSubtarea = toggleSubtarea;
window.agregarSubtarea = agregarSubtarea;
window.eliminarSubtarea = eliminarSubtarea;
window.toggleExpand = toggleExpand;
window.mostrarFormSubtarea = mostrarFormSubtarea;

window.toggleMusica = toggleMusica;
window.anteriorCancion = anteriorCancion;
window.siguienteCancion = siguienteCancion;
window.cambiarVolumen = cambiarVolumen;
window.buscarEnCancion = buscarEnCancion;

window.toggleSilencio = toggleSilencio;

window.abrirHowTo = abrirHowTo;
window.cerrarHowTo = cerrarHowTo;

function aplicarTema(dark) {
    document.documentElement.classList.toggle("dark", dark);
    const icono = document.getElementById("icono-dark-mode");
    if (icono) icono.textContent = dark ? "light_mode" : "dark_mode";
}

function toggleDarkMode() {
    const esDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", esDark ? "1" : "0");
    const icono = document.getElementById("icono-dark-mode");
    if (icono) icono.textContent = esDark ? "light_mode" : "dark_mode";
}

window.toggleDarkMode = toggleDarkMode;


let tareaAEliminar = null;

window.eliminarTarea = function(id) {
    tareaAEliminar = id;
    document.getElementById("modal-confirmacion").classList.add("show");
}

window.cerrarModal = function() {
    document.getElementById("modal-confirmacion").classList.remove("show");
    tareaAEliminar = null;
}

document.addEventListener("DOMContentLoaded", () => {

    const darkGuardado = localStorage.getItem("darkMode") === "1";
    aplicarTema(darkGuardado);

    document.getElementById("fecha-actual").textContent =
        new Date().toLocaleDateString("es-ES", {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
        });

    function actualizarHora() {
        const ahora = new Date();
        const h = ahora.getHours();
        document.getElementById("hora-actual").textContent =
            ahora.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
        document.getElementById("saludo-actual").textContent =
            h >= 6 && h < 12 ? "¡Buenos días!"
            : h >= 12 && h < 20 ? "¡Buenas tardes!"
            : "¡Buenas noches!";
    }
    function sincronizarHora() {
    actualizarHora();
    const segundosRestantes = 60 - new Date().getSeconds();
    setTimeout(() => {
        actualizarHora();
        setInterval(actualizarHora, 60000);
    }, segundosRestantes * 1000);
    }
    sincronizarHora();

    cargarTareas();
    iniciarMusica();

    document.getElementById("confirmar-eliminar").addEventListener("click", async () => {
        if (!tareaAEliminar) return;
        await api.deleteTarea(tareaAEliminar);
        cerrarModal();
        cargarTareas();
        mostrarAlert("Tarea eliminada", "warning");
    });

    document.getElementById("formulario-tarea").addEventListener("submit", async (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();

        if (!titulo) { mostrarAlert("Escribí un título!", "warning"); return; }

        const res = await api.postTarea(titulo, descripcion);
        if (res.ok) {
            document.getElementById("titulo").value = "";
            document.getElementById("descripcion").value = "";
            mostrarAlert("Tarea añadida con éxito :)", "success");
            cargarTareas();
        }
    });

    document.getElementById("modal-pomodoro").addEventListener("click", (e) => {
        if (e.target === document.getElementById("modal-pomodoro")) {
            cerrarPomodoro();
        }
    });

    document.getElementById("modal-howto").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal-howto")) {
        cerrarHowTo();
    }
});

    const volumenInicial = document.getElementById('control-volumen').value;
    document.getElementById('control-volumen').style.background =
        `linear-gradient(to right, #F4A96A ${volumenInicial}%, #e0e0e0 ${volumenInicial}%)`;
});