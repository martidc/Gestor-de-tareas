const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/tareas'
    : `${window.location.origin}/api/tareas`;
let tareaAEliminar = null;

document.addEventListener('DOMContentLoaded', () => {
    const fecha = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('fecha-actual').textContent = fecha.toLocaleDateString('es-ES', opciones);
    cargarTareas();
});

async function cargarTareas() {
    try {
        const response = await fetch(API_URL);
        const tareas = await response.json();
        const listaTareas = document.getElementById('lista-tareas');
        
        if (tareas.length === 0) {
            listaTareas.innerHTML = `
                <div class="empty-state">
                    <img src="https://media.tenor.com/2X6auNAZN8oAAAAj/psyduckpc2.gif" alt="Sin tareas" class="empty-gif">
                    <p>Todavía no hay tareas. Agregá una!</p>
                </div>`;
            return;
        }

        listaTareas.innerHTML = tareas.map(tarea => `
            <div class="tarea-item ${tarea.completada ? 'completada' : ''}">
                <div class="tarea-content">
                    <input type="checkbox" ${tarea.completada ? 'checked' : ''} 
                           onchange="toggleCompletada(${tarea.id}, this.checked)">
                    <div class="tarea-info">
                        <h3>${tarea.titulo}</h3>
                        ${tarea.descripcion ? `<p>${tarea.descripcion}</p>` : ''}
                    </div>
                </div>
                <button class="btn btn-danger" onclick="eliminarTarea(${tarea.id})">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `).join('');
    } catch (error) {
        mostrarAlert('Error al conectar con el servidor', 'danger');
    }
}

document.getElementById('formulario-tarea').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();

    if (!titulo) {
        mostrarAlert('Escribí un título!', 'warning');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, descripcion })
        });

        if (response.ok) {
            document.getElementById('titulo').value = '';
            document.getElementById('descripcion').value = '';
            mostrarAlert('Tarea añadida con éxito :)', 'success');
            cargarTareas();
        }
    } catch (error) {
        mostrarAlert('No se pudo guardar la tarea :(', 'danger');
    }
});

function mostrarAlert(mensaje, tipo = 'warning') {
    const alertBox = document.getElementById('alert-box');
    const alertMessage = document.getElementById('alert-message');
    
    alertMessage.textContent = mensaje;
    alertBox.className = `alert alert-${tipo} show`;
    
    setTimeout(() => alertBox.classList.remove('show'), 3000);
}

async function toggleCompletada(id, completada) {
    const tareaElement = event.target.closest('.tarea-item');
    if (completada) {
        tareaElement.classList.add('completada');
    } else {
        tareaElement.classList.remove('completada');
    }
    
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completada })
    });
}

function eliminarTarea(id) {
    tareaAEliminar = id;
    document.getElementById('modal-confirmacion').classList.add('show');
}

function cerrarModal() {
    document.getElementById('modal-confirmacion').classList.remove('show');
    tareaAEliminar = null;
}

document.getElementById('confirmar-eliminar').addEventListener('click', async () => {
    if (!tareaAEliminar) return;
    
    await fetch(`${API_URL}/${tareaAEliminar}`, { method: 'DELETE' });
    cerrarModal();
    cargarTareas();
    mostrarAlert('Tarea eliminada', 'warning');
});

document.getElementById('modal-confirmacion').addEventListener('click', (e) => {
    if (e.target.id === 'modal-confirmacion') cerrarModal();
});
