const input = document.getElementById("tareaInput");
const btnAgregar = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");

btnAgregar.addEventListener("click", agregarTarea);
lista.addEventListener("click", gestionarTarea);

function agregarTarea() {
  const texto = input.value.trim();
  if (texto === "") return alert("Write a task");

  const tarea = { texto, completada: false };
  agregarTareaDOM(tarea);

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
  const li = e.target.parentElement;
  const span = li.querySelector("span");
  const texto = span.textContent;

  if (e.target.classList.contains("eliminar")) {
    li.remove();
  } else if (e.target.classList.contains("editar")) {
    const nuevoTexto = prompt("Editar tarea:", texto);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
      span.textContent = nuevoTexto.trim();
    }
  } else if (e.target.tagName === "SPAN") {
    li.classList.toggle("completada");
  }
}
