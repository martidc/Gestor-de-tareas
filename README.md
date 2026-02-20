# Gestor de Tareas + Pomodoro

Una aplicación web para organizar tus tareas con temporizador pomodoro y reproductor de música integrado. 
Disponible para móvil en claro y oscuro.

## Demo
https://gestor-de-tareas-6ayu.onrender.com/

<img width="1359" height="629" alt="Screenshot 2026-02-19 222308" src="https://github.com/user-attachments/assets/a25e861c-167e-43a4-8cd8-85ef0a45f002" />
<img width="1359" height="626" alt="Screenshot 2026-02-19 221707" src="https://github.com/user-attachments/assets/141f442e-11ad-4e6b-bb3d-7b13b15412a8" />

## Funcionalidades

### Tareas
- Crea tareas con nombre y descripción opcional.
- Expande cada tarea para agregar subtareas.
- Marca subtareas como completadas o eliminalas con un clic.

### Pomodoro
- Temporizador configurable de trabajo y descanso.
- Controlable desde un modal o desde la barra inferior.
- Alertas de sonido al terminar cada sesión.
  

### Música
- Reproductor integrado en la barra inferior.
- Reproducir, pausar, cambiar canción y ajustar volumen.
- Muestra el nombre de la canción en curso.

### Tema
- Alternancia entre modo claro y oscuro.

<img width="275" height="494" alt="Screenshot 2026-02-19 222428" src="https://github.com/user-attachments/assets/1b73872e-6724-49be-8c79-e018e1757dae" />

## Estructura del Proyecto
```
GESTOR-DE-TAREAS/
├── index.html
├── server.js               # Servidor Node.js
├── package.json
├── README.md
└── public/
    ├── js/
    │   ├── api.js          # Comunicación con el backend
    │   ├── app.js          # Punto de entrada principal de JS
    │   ├── musica.js       # Lógica del reproductor de música
    │   ├── pomodoro.js     # Lógica del temporizador Pomodoro
    │   ├── tareas.js       # Gestión de tareas
    │   └── ui.js           # Manipulación de la interfaz
    ├── media/
    │   ├── music/          # Canciones del reproductor
    │   ├── cafecito-logo.svg
    │   ├── github-logo.svg
    │   ├── vacio.gif
    │   ├── fin-descanso.mp3
    │   └── fin-trabajo.mp3
    └── styles/
        ├── base.css        # Estilos globales
        ├── layout.css      # Estructura y disposición
        ├── components.css  # Componentes reutilizables
        ├── musica.css      # Estilos del reproductor
        ├── pomodoro.css    # Estilos del Pomodoro
        ├── tareas.css      # Estilos de las tareas
        └── ui.css          # Estilos generales de UI
```

---
<img width="1359" height="629" alt="Screenshot 2026-02-19 221758" src="https://github.com/user-attachments/assets/ab66c664-da63-438c-ac85-ef45026cd47e" />


## ¿Cómo usar?

1. Clona el repositorio:
```bash
   git clone https://github.com/martidc/gestor-de-tareas.git
```
2. Instala las dependencias:
```bash
   npm install
```
3. Inicia el servidor:
```bash
   node server.js
```
4. Abri el navegador en `http://localhost:3000` (o el puerto que uses).


## Tecnologías

- HTML5
- CSS3 (modular)
- JavaScript Vanilla
- Node.js

##
Desarrollado por martidc 
