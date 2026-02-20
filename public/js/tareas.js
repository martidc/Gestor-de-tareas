import * as api from './api.js';
import { mostrarAlert, renderTarea } from './ui.js';

export async function cargarTareas() {
    try {
        const tareas = await api.getTareas();
        const listaTareas = document.getElementById("lista-tareas");

        if (tareas.length === 0) {
            listaTareas.innerHTML = `
                <div class="vacio">
                    <img src="media/vacio.gif" alt="Sin tareas" class="gif-vacio">
                    <p>Todavía no hay tareas. Agregá una!</p>
                </div>`;
            return;
        }
        listaTareas.innerHTML = tareas.map(renderTarea).join("");
    } catch (error) {
        mostrarAlert("Error al conectar con el servidor", "danger");
    }
}

export async function toggleCompletada(id, completada) {
    await api.putTarea(id, { completada });

    const checkboxes = document.querySelectorAll(`#subtareas-${id} .subtarea-row input[type='checkbox']`);
    const rows = document.querySelectorAll(`#subtareas-${id} .subtarea-row`);

    await Promise.all([...rows].map((row) => {
        const subId = row.id.replace("subtarea-", "");
        return api.putSubtarea(id, subId, { completada });
    }));

    cargarTareas();
}

export async function toggleSubtarea(tareaId, subId, completada) {
    await api.putSubtarea(tareaId, subId, { completada });
    await verificarCompletadoAutomatico(tareaId);
    cargarTareas();
}

async function verificarCompletadoAutomatico(tareaId) {
    const checkboxes = document.querySelectorAll(`#subtareas-${tareaId} .subtarea-row input[type='checkbox']`);
    if (checkboxes.length === 0) return;

    const todasCompletadas = [...checkboxes].every(cb => cb.checked);
    const yaCompletada = document.getElementById(`tarea-${tareaId}`).classList.contains("completada");

    if (todasCompletadas !== yaCompletada) {
        await api.putTarea(tareaId, { completada: todasCompletadas });
    }
}

export async function agregarSubtarea(tareaId) {
    const input = document.getElementById(`input-subtarea-${tareaId}`);
    const titulo = input.value.trim();
    if (!titulo) return;

    const res = await api.postSubtarea(tareaId, titulo);
    if (res.ok) {
        input.value = "";
        mostrarAlert("Subtarea añadida", "success");
        cargarTareas();
    }
}

export async function eliminarSubtarea(tareaId, subId) {
    await api.deleteSubtarea(tareaId, subId);
    mostrarAlert("Subtarea eliminada", "warning");
    cargarTareas();
}