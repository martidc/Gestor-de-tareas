const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000/api/tareas"
        : `${window.location.origin}/api/tareas`;

export async function getTareas() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function postTarea(titulo, descripcion) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion }),
    });
}

export async function putTarea(id, datos) {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
}

export async function deleteTarea(id) {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function postSubtarea(tareaId, titulo) {
    return fetch(`${API_URL}/${tareaId}/subtareas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo }),
    });
}

export async function putSubtarea(tareaId, subId, datos) {
    return fetch(`${API_URL}/${tareaId}/subtareas/${subId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
}

export async function deleteSubtarea(tareaId, subId) {
    return fetch(`${API_URL}/${tareaId}/subtareas/${subId}`, { method: "DELETE" });
}