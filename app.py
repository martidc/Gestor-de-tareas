from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Base de datos en memoria 
tareas = []
contador_id = 1

# html
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# css
@app.route('/styles.css')
def styles():
    return send_from_directory('.', 'styles.css')

# js
@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

# Obtiene todas las tareas
@app.route('/api/tareas', methods=['GET'])
def obtener_tareas():
    return jsonify(tareas), 200

# Obtiene una tarea específica
@app.route('/api/tareas/<int:id>', methods=['GET'])
def obtener_tarea(id):
    tarea = next((t for t in tareas if t['id'] == id), None)
    if tarea:
        return jsonify(tarea), 200
    return jsonify({'error': 'Tarea no encontrada'}), 404

# Crear nueva tarea
@app.route('/api/tareas', methods=['POST'])
def crear_tarea():
    global contador_id
    datos = request.get_json()
    
    if not datos or 'titulo' not in datos:
        return jsonify({'error': 'El título es obligatorio'}), 400
    
    nueva_tarea = {
        'id': contador_id,
        'titulo': datos['titulo'],
        'descripcion': datos.get('descripcion', ''),
        'completada': False,
    }
    
    tareas.append(nueva_tarea)
    contador_id += 1
    
    return jsonify(nueva_tarea), 201

# Actualizar tarea
@app.route('/api/tareas/<int:id>', methods=['PUT'])
def actualizar_tarea(id):
    tarea = next((t for t in tareas if t['id'] == id), None)
    
    if not tarea:
        return jsonify({'error': 'Tarea no encontrada'}), 404
    
    datos = request.get_json()
    
    tarea['titulo'] = datos.get('titulo', tarea['titulo'])
    tarea['descripcion'] = datos.get('descripcion', tarea['descripcion'])
    tarea['completada'] = datos.get('completada', tarea['completada'])
    
    return jsonify(tarea), 200

# Eliminar tarea
@app.route('/api/tareas/<int:id>', methods=['DELETE'])
def eliminar_tarea(id):
    global tareas
    tarea = next((t for t in tareas if t['id'] == id), None)
    
    if not tarea:
        return jsonify({'error': 'Tarea no encontrada'}), 404
    
    tareas = [t for t in tareas if t['id'] != id]
    
    return jsonify({'mensaje': 'Tarea eliminada correctamente'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)