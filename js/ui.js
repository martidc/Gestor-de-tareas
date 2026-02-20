export function renderTarea(tarea) {
    const subtareas = tarea.subtareas || [];
    const totalSub = subtareas.length;
    const completadasSub = subtareas.filter(s => s.completada).length;

    return `
    <div class="tarea-card ${tarea.completada ? "completada" : ""}" id="tarea-${tarea.id}">
        <div class="tarea-row">
            <button class="toggle-btn" onclick="toggleExpand(${tarea.id}, this)">
                <span class="material-symbols-outlined">keyboard_arrow_down</span>
            </button>
            <input type="checkbox"
                   ${tarea.completada ? "checked" : ""}
                   onchange="toggleCompletada(${tarea.id}, this.checked)">
            <div class="tarea-info">
                <span class="tarea-titulo">${tarea.titulo}</span>
                ${tarea.descripcion ? `<span class="tarea-descripcion">${tarea.descripcion}</span>` : ""}
            </div>
            ${totalSub > 0 ? `
                <span class="subtarea-count">
                    ${completadasSub}/${totalSub} ${totalSub === 1 ? "subtarea" : "subtareas"}
                </span>` : ""}
            <button class="btn-delete-tarea" onclick="eliminarTarea(${tarea.id})" title="Eliminar tarea">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
        <div class="subtareas-container" id="subtareas-${tarea.id}">
            ${subtareas.map(s => renderSubtarea(tarea.id, s)).join("")}
            <div id="form-subtarea-${tarea.id}" class="add-subtarea-form hidden">
                <input type="text"
                       placeholder="Nueva subtarea"
                       id="input-subtarea-${tarea.id}"
                       onkeydown="if(event.key==='Enter'){event.preventDefault();agregarSubtarea(${tarea.id})}">
                    <button class="btn-agregar-sub" onclick="agregarSubtarea(${tarea.id})">Agregar</button>
            </div>
        </div>
    </div>`;
}

export function renderSubtarea(tareaId, sub) {
    return `
    <div class="subtarea-row ${sub.completada ? "completada" : ""}" id="subtarea-${sub.id}">
        <input type="checkbox"
               ${sub.completada ? "checked" : ""}
               onchange="toggleSubtarea(${tareaId}, ${sub.id}, this.checked)">
        <span class="subtarea-titulo">${sub.titulo}</span>
        <button class="btn-delete-sub" onclick="eliminarSubtarea(${tareaId}, ${sub.id})" title="Eliminar subtarea">
            <span class="material-symbols-outlined">delete</span>
        </button>
    </div>`;
}

export function mostrarAlert(mensaje, tipo = "warning") {
    const alertBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = mensaje;
    alertBox.className = `alert alert-${tipo} show`;
    setTimeout(() => alertBox.classList.remove("show"), 3000);
}

export function toggleExpand(id, btn) {
    document.getElementById(`subtareas-${id}`).classList.toggle("hidden");
    btn.classList.toggle("collapsed");
}

export function mostrarFormSubtarea(tareaId) {
    const form = document.getElementById(`form-subtarea-${tareaId}`);
    const container = document.getElementById(`subtareas-${tareaId}`);
    container.classList.remove("hidden");
    form.classList.toggle("hidden");
    if (!form.classList.contains("hidden")) {
        document.getElementById(`input-subtarea-${tareaId}`).focus();
    }
}

export function abrirHowTo() {
    document.getElementById("modal-howto").classList.add("show");
}

export function cerrarHowTo() {
    document.getElementById("modal-howto").classList.remove("show");
}