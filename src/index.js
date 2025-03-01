const input = document.getElementById("tareaInput");
const btnAgregar = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");

// Cargar tareas desde el Local Storage al iniciar la página
document.addEventListener("DOMContentLoaded", cargarTareas);

btnAgregar.addEventListener("click", agregarTarea);
lista.addEventListener("click", gestionarTarea);

function agregarTarea() {
  const texto = input.value.trim();
  if (texto === "") return alert("Write a task");

  const tarea = { texto, completada: false };
  agregarTareaDOM(tarea);
  guardarTareaLocalStorage(tarea);

  input.value = "";
}

function agregarTareaDOM(tarea) {
    const li = document.createElement("li");
  
    
    const span = document.createElement("span");
    span.textContent = tarea.texto;
  
    if (tarea.completada) li.classList.add("completada");
  
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Delete";
    btnEliminar.classList.add("eliminar");
  
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Edit";
    btnEditar.classList.add("editar");
  
    li.appendChild(span);
    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  }

  function gestionarTarea(e) {
    const tareas = obtenerTareasLocalStorage();
    const li = e.target.parentElement;
    const span = li.querySelector("span");
    const texto = span.textContent;
  
    if (e.target.classList.contains("eliminar")) {
      li.remove();
      const nuevasTareas = tareas.filter(t => t.texto !== texto);
      localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    } 
    else if (e.target.classList.contains("editar")) {
      const nuevoTexto = prompt("Editar tarea:", texto);
      if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        span.textContent = nuevoTexto.trim();
        const index = tareas.findIndex(t => t.texto === texto);
        if (index !== -1) {
          tareas[index].texto = nuevoTexto.trim();
          localStorage.setItem("tareas", JSON.stringify(tareas));
        }
      }
    } 
    else if (e.target.tagName === "SPAN") { 
      li.classList.toggle("completada");
      const index = tareas.findIndex(t => t.texto === texto);
      if (index !== -1) {
        tareas[index].completada = !tareas[index].completada;
        localStorage.setItem("tareas", JSON.stringify(tareas));
      }
    }
  }

function guardarTareaLocalStorage(tarea) {
  const tareas = obtenerTareasLocalStorage();
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function obtenerTareasLocalStorage() {
  return JSON.parse(localStorage.getItem("tareas")) || [];
}

function cargarTareas() {
  const tareas = obtenerTareasLocalStorage();
  tareas.forEach(agregarTareaDOM);
}
