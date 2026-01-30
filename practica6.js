const input = document.querySelector("#tareaInput");
const btnAgregar = document.querySelector("#btnAgregar");
const listaTareas = document.querySelector("#listaTareas");

btnAgregar.addEventListener("click", () => {
  const texto = input.value.trim();
  if (texto === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span"); //Contiene solo el texto
  span.textContent = texto;

  const btnCompletar = document.createElement("button");
  btnCompletar.textContent = "Completada";

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  btnCompletar.addEventListener("click", (e) => {
    e.stopPropagation();
    li.classList.toggle("completada");
  });

  btnEliminar.addEventListener("click", (e) => {
    e.stopPropagation(); //evita que el click afecte al Li
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(btnCompletar);
  li.appendChild(btnEliminar);

  listaTareas.appendChild(li);
  input.value = "";
});
