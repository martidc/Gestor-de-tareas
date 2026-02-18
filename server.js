const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Base de datos en memoria
let tareas = [];
let contadorId = 1;

// Rutas API
app.get('/api/tareas', (req, res) => {
    res.json(tareas);
});

app.post('/api/tareas', (req, res) => {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = {
        id: contadorId++,
        titulo,
        descripcion,
        completada: false
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

app.put('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    
    if (tarea) {
        tarea.completada = req.body.completada;
        res.json(tarea);
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});

app.delete('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tareas = tareas.filter(t => t.id !== id);
    res.json({ mensaje: 'Tarea eliminada' });
});
 
// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});