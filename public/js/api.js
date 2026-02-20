const STORAGE_KEY = "gestor_tareas";

function cargarStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { tareas: [], contadorId: 1, contadorSubId: 1 };
    return JSON.parse(raw);
}

function guardarStorage(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function okResponse(data) {
    return { ok: true, status: 200, json: async () => data };
}

export async function getTareas() {
    return cargarStorage().tareas;
}

export async function postTarea(titulo, descripcion) {
    const state = cargarStorage();
    const nuevaTarea = {
        id: state.contadorId++,
        titulo,
        descripcion,
        completada: false,
        subtareas: []
    };
    state.tareas.push(nuevaTarea);
    guardarStorage(state);
    return okResponse(nuevaTarea);
}

export async function putTarea(id, datos) {
    const state = cargarStorage();
    const tarea = state.tareas.find(t => t.id === id);
    if (!tarea) return { ok: false, status: 404 };
    Object.assign(tarea, datos);
    guardarStorage(state);
    return okResponse(tarea);
}

export async function deleteTarea(id) {
    const state = cargarStorage();
    state.tareas = state.tareas.filter(t => t.id !== id);
    guardarStorage(state);
    return okResponse({ mensaje: "Tarea eliminada" });
}

export async function postSubtarea(tareaId, titulo) {
    const state = cargarStorage();
    const tarea = state.tareas.find(t => t.id === tareaId);
    if (!tarea) return { ok: false, status: 404 };
    const nuevaSub = {
        id: state.contadorSubId++,
        titulo,
        completada: false
    };
    tarea.subtareas.push(nuevaSub);
    guardarStorage(state);
    return okResponse(nuevaSub);
}

export async function putSubtarea(tareaId, subId, datos) {
    const state = cargarStorage();
    const tarea = state.tareas.find(t => t.id === tareaId);
    if (!tarea) return { ok: false, status: 404 };
    const sub = tarea.subtareas.find(s => s.id === subId);
    if (!sub) return { ok: false, status: 404 };
    Object.assign(sub, datos);
    guardarStorage(state);
    return okResponse(sub);
}

export async function deleteSubtarea(tareaId, subId) {
    const state = cargarStorage();
    const tarea = state.tareas.find(t => t.id === tareaId);
    if (!tarea) return { ok: false, status: 404 };
    tarea.subtareas = tarea.subtareas.filter(s => s.id !== subId);
    guardarStorage(state);
    return okResponse({ mensaje: "Subtarea eliminada" });
}
