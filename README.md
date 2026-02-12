# Gestor de tareas
Aplicación web full stack para la gestión de tareas, desarrollada con Flask en el backend y JavaScript en el frontend.

Permite crear, visualizar, completar y eliminar tareas meidante una interfaz sencilla conectada a una API REST

<img width="1326" height="615" alt="Screenshot 2026-02-12 000641" src="https://github.com/user-attachments/assets/b67c9403-4e52-4ee2-9216-a8258b23ac17" />

# Funcionalidades
- Crear tareas con título y descripción opcional.
- Marcar tareas como completadas
- Eliminación con modal de confirmación
- Interfaz sencilla y dinámica
<img width="598" height="345" alt="Screenshot 2026-02-11 232154" src="https://github.com/user-attachments/assets/6fa910cb-91f5-472b-9ba7-22698067aa2f" />

# Tecnologías utilizadas
Frontend
- HTML5
- CSS3
- JavaScript (DOM + Fetch API)
Backend
- Python 3
- Flask
- Flask-CORS
  
# Estructura del proyecto

```bash
gestor-tareas/
│
├── index.html        # Interfaz principal
├── styles.css        # Estilos y diseño responsive
├── script.js         # Lógica frontend + consumo de API
└── app.py            # Servidor Flask + API REST
```

# Ejecución local

Para correr este proyecto en tu computadora, seguí estos pasos:

1. Cloná el repositorio

```bash
git clone https://github.com/tu-usuario/gestor-tareas.git
cd gestor-tareas
```
2. Instalá las dependencias:
```bash
pip install -r requirements.txt
```

3. Corré la app:
```bash
python app.py
```

4. Abrí tu navegador en: `http://localhost:5000`
   
# Notas
- Las tareas se almacenan en la memoria, por lo que se reinician al cerrar el servidor.

# Posibles mejoras a futuro
- Guardar las tareas en una base de datos
- Agregar filtros de estado (pendiente/finalizado)
- Agregar filtros de urgencia (Urgente/para el día/para la semana)
- Mejoras de accesibilidad y diseño

# Autora
Martina de la Camara

Estudiante y desarrolladora full stack en formación
