let intervalo = null;
let segundosRestantes = 25 * 60;
let corriendo = false;
let totalSegundos = 25 * 60;
let modoActual = 'pomodoro';
let silenciado = false;

const sonidoTrabajo = new Audio('media/fin-trabajo.mp3');
const sonidoDescanso = new Audio('media/fin-descanso.mp3');

const modos = {
    pomodoro: 25 * 60,
    descanso: 5 * 60,
};

export function abrirPomodoro() {
    document.getElementById("modal-pomodoro").classList.add("show");
    actualizarDisplay();
}

export function cerrarPomodoro() {
    document.getElementById("modal-pomodoro").classList.remove("show");
}

export function toggleTimer() {
    corriendo ? pausarTimer() : iniciarTimer();
}

export function toggleSilencio() {
    silenciado = !silenciado;
    const icono = document.getElementById("icono-silencio");
    if (icono) icono.textContent = silenciado ? 'no_sound' : 'volume_up';
}

function iniciarTimer() {
    corriendo = true;
    const btn = document.getElementById("btn-iniciar");
    if (btn) btn.textContent = "Pausar";
    const barraIcono = document.getElementById("barra-icono-timer");
    if (barraIcono) barraIcono.textContent = 'pause';

    intervalo = setInterval(() => {
        if (segundosRestantes <= 0) {
            pausarTimer();
            cambiarModoAutomatico();
            return;
        }
        segundosRestantes--;
        actualizarDisplay();
    }, 1000);
}

function pausarTimer() {
    corriendo = false;
    clearInterval(intervalo);
    const btn = document.getElementById("btn-iniciar");
    if (btn) btn.textContent = "Iniciar";
    const barraIcono = document.getElementById("barra-icono-timer");
    if (barraIcono) barraIcono.textContent = 'play_arrow';
}

function cambiarModoAutomatico() {
    if (!silenciado) {
        if (modoActual === 'pomodoro') {
            sonidoTrabajo.play();
        } else {
            sonidoDescanso.play();
        }
    }

    modoActual = modoActual === 'pomodoro' ? 'descanso' : 'pomodoro';
    segundosRestantes = modos[modoActual];
    totalSegundos = segundosRestantes;
    const label = document.getElementById("modo-label");
    if (label) label.textContent = modoActual === 'pomodoro' ? 'Tiempo de trabajo' : 'Tiempo de descanso';
    actualizarDisplay();
}

export function aplicarTiempo() {
    const minTrabajo = parseInt(document.getElementById("input-minutos").value) || 25;
    const minDescanso = parseInt(document.getElementById("input-minutos-descanso").value) || 5;

    modos.pomodoro = minTrabajo * 60;
    modos.descanso = minDescanso * 60;

    segundosRestantes = modos[modoActual];
    totalSegundos = segundosRestantes;
    pausarTimer();
    actualizarDisplay();
}

export function resetTimer() {
    pausarTimer();
    modoActual = 'pomodoro';
    segundosRestantes = modos.pomodoro;
    totalSegundos = modos.pomodoro;
    const label = document.getElementById("modo-label");
    if (label) label.textContent = 'Tiempo de trabajo';
    actualizarDisplay();
}

function actualizarDisplay() {
    if (totalSegundos === 0) totalSegundos = segundosRestantes;
    const m = String(Math.floor(segundosRestantes / 60)).padStart(2, "0");
    const s = String(segundosRestantes % 60).padStart(2, "0");
    const tiempo = `${m}:${s}`;

    const barraTiempo = document.getElementById("barra-tiempo");
    const barraModo = document.getElementById("barra-modo");
    const barraIcono = document.getElementById("barra-icono-timer");
    if (barraTiempo) barraTiempo.textContent = tiempo;
    if (barraModo) barraModo.textContent = modoActual === 'pomodoro' ? 'Tiempo de trabajo' : 'Tiempo de descanso';
    if (barraIcono) barraIcono.textContent = corriendo ? 'pause' : 'play_arrow';
}