const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let tareas = [];
let contadorId = 1;
let contadorSubId = 1;

// tareas
app.get('/api/tareas', (req, res) => {
    res.json(tareas);
});

app.post('/api/tareas', (req, res) => {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = {
        id: contadorId++,
        titulo,
        descripcion,
        completada: false,
        subtareas: []
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

// subtareas
app.post('/api/tareas/:id/subtareas', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    const nuevaSub = {
        id: contadorSubId++,
        titulo: req.body.titulo,
        completada: false
    };
    tarea.subtareas.push(nuevaSub);
    res.status(201).json(nuevaSub);
});

app.put('/api/tareas/:id/subtareas/:subId', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    const sub = tarea.subtareas.find(s => s.id === parseInt(req.params.subId));
    if (!sub) return res.status(404).json({ error: 'Subtarea no encontrada' });

    sub.completada = req.body.completada;
    res.json(sub);
});

app.delete('/api/tareas/:id/subtareas/:subId', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    tarea.subtareas = tarea.subtareas.filter(s => s.id !== parseInt(req.params.subId));
    res.json({ mensaje: 'Subtarea eliminada' });
});

//ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});