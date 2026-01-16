const form = document.querySelector("#formulario");
const mensajes = document.querySelector("#mensajes");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let errores = [];

  const nombre = document.querySelector("#nombre").value.trim();
  const apellidos = document.querySelector("#apellidos").value.trim();
  const email = document.querySelector("#email").value.trim();
  const pass1 = document.querySelector("#password").value;
  const pass2 = document.querySelector("#password2").value;
  const edad = Number(document.querySelector("#edad").value);
  const condiciones = document.querySelector("#condiciones").checked;

  if (nombre.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
  }

  if (apellidos.length < 3) {
    errores.push("Los apellidos deben tener al menos 3 caracteres.");
  }

  const posicionArroba = email.indexOf("@");
  const posicionPunto = email.lastIndexOf(".");

  if (
    posicionArroba === -1 ||
    posicionPunto === -1 ||
    posicionPunto < posicionArroba
  ) {
    errores.push("El email no es válido.");
  }

  if (pass1.length < 6) {
    errores.push("La contraseña debe tener al menos 6 caracteres.");
  }

  if (pass1 !== pass2) {
    errores.push("Las contraseñas no coinciden.");
  }

  if (edad < 0 || edad > 120 || isNaN(edad)) {
    errores.push("La edad debe estar entre 0 y 120.");
  }

  if (!condiciones) {
    errores.push("Debes aceptar las condiciones.");
  }

  if (errores.length > 0) {
    mensajes.innerHTML = errores.join("<br>");
    mensajes.className = "mensajes err";
    return;
  }

  mensajes.textContent = "Formulario enviado correctamente.";
  mensajes.className = "mensajes ok";
  form.submit();
});
