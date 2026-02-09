"use strict";

/*
  ==========================================================
  Gestor de calificaciones - Arrays
  Archivo: app.js (A COMPLETAR)
  ==========================================================
*/

/* ==========================================================
   1) ESTADO (array principal)
   ========================================================== */

/**
 * Array principal donde se almacenan todas las notas introducidas.
 * @type {number[]}
 */
let notas = []; // TODO: este array será el que uses en toda la práctica


/* ==========================================================
   2) REFERENCIAS AL DOM
   ========================================================== */

/**
 * Referencia al input numérico donde se introduce la nota.
 * @type {HTMLInputElement}
 */
const inputNota = document.querySelector("#notaInput");
/**
 * Botón para añadir una nota.
 * @type {HTMLButtonElement}
 */
const btnAgregar = document.querySelector("#btnAgregar");
/**
 * Botón para ordenar de menor a mayor.
 * @type {HTMLButtonElement}
 */
const btnOrdenAsc = document.querySelector("#btnOrdenAsc");
/**
 * Botón para ordenar de mayor a menor.
 * @type {HTMLButtonElement}
 */
const btnOrdenDesc = document.querySelector("#btnOrdenDesc");
/**
 * Botón para limpiar todas las notas.
 * @type {HTMLButtonElement}
 */
const btnLimpiar = document.querySelector("#btnLimpiar");
/**
 * Lista (ul) donde se mostrarán las notas.
 * @type {HTMLUListElement}
 */
const listaNotas = document.querySelector("#listaNotas");
/**
 * Párrafo donde se mostrará el resumen.
 * @type {HTMLParagraphElement}
 */
const txtResumen = document.querySelector("#txtResumen");
/**
 * Párrafo donde se mostrarán mensajes de error.
 * @type {HTMLParagraphElement}
 */
const mensajeError = document.querySelector("#mensaje");



/* ==========================================================
   3) INICIALIZACIÓN (eventos)
   ========================================================== */

/**
 * Función principal de inicio: registra eventos y pinta el estado inicial.
 * @returns {void}
 */
function init() {
    // TODO: registrar los eventos de los botones (click)
    // TODO: registrar el evento "Enter" en el input para que sea equivalente a añadir
    // TODO: pintar el estado inicial (lista + resumen)
    btnAgregar.addEventListener("click", agregarNota);
    btnOrdenAsc.addEventListener("click", ordenarAsc);
    btnOrdenDesc.addEventListener("click", ordenarDesc);
    btnLimpiar.addEventListener("click", limpiarTodo);
    inputNota.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            agregarNota();
        }
    });
     render(); // Pintar el estado inicial (aunque este vacío).
 
}

init();


/* ==========================================================
   4) FUNCIONALIDADES PRINCIPALES
   ========================================================== */

/**
 * Lee el valor del input, lo valida y si es correcto lo añade al array.
 * Después debe actualizar la interfaz.
 * @returns {void}
 */
function agregarNota() {
    // TODO: leer el valor del input
    // TODO: convertirlo a número
    // TODO: validar que sea un número válido y esté entre 0 y 10
    // TODO: si hay error, mostrar mensaje y salir
    // TODO: si es correcto, hacer push al array "notas"
    // TODO: limpiar el input y devolver el foco al input
    // TODO: llamar a render()
    let valor = inputNota.value.trim(); // Leer y limpiar el valor del input
    let numero = Number(valor); //Convertir a número
    if(numero < 0 || numero > 10){ // Validar que es un número entre 0 y 10
        mostrarMensaje("Por favor, introduce un número válido entre 0 y 10.");
        return;
    }
    notas.push(numero); // Añadir al array
    inputNota.value = ""; // Limpiar el input
    inputNota.focus(); // Devolver el foco al input
    render(); // Actualizar la interfaz

  
}

/**
 * Ordena el array de notas de menor a mayor y actualiza la interfaz.
 * @returns {void}
 */
function ordenarAsc() {
  // TODO: ordenar el array de menor a mayor (recuerda que sort necesita comparador numérico)
  // TODO: llamar a render()
  notas.sort(function(a, b) {
    return a - b; // Ordenar de menor a mayor
  });
  render();
}

/**
 * Ordena el array de notas de mayor a menor y actualiza la interfaz.
 * @returns {void}
 */
function ordenarDesc() {
  // TODO: ordenar el array de mayor a menor
  // TODO: llamar a render()
  notas.sort(function(a, b) {
    return b - a; // Ordenar de mayor a menor
  });
  render();
}

/**
 * Elimina todas las notas, reinicia la interfaz y deja el estado vacío.
 * @returns {void}
 */
function limpiarTodo() {
  // TODO: vaciar el array de notas
  // TODO: llamar a render()
  notas = []; // Vaciar el array
  render(); 
}


/* ==========================================================
   5) PINTADO DE LA INTERFAZ (render)
   ========================================================== */

/**
 * Actualiza completamente la interfaz:
 * - lista de notas
 * - resumen
 * @returns {void}
 */
function render() {
    // TODO: llamar a pintarLista()
  // TODO: llamar a pintarResumen()
    pintarLista();
    pintarResumen();
  
}

/**
 * Pinta el contenido del array en la lista <ul>.
 * @returns {void}
 */
function pintarLista() {
    // TODO: vaciar listaNotas (innerHTML)
    // TODO: recorrer "notas" y crear un <li> por cada nota
    // TODO: añadir cada <li> al <ul>
    listaNotas.innerHTML = ""; // Vaciar la lista antes de pintar
    for(let i = 0; i < notas.length; i++) {
        let li = document.createElement("li"); 
        li.textContent = notas[i]; // Asignar el valor de la nota al <li>
        listaNotas.appendChild(li); // Añadir el <li> a la lista
    }
  
}

/**
 * Pinta el resumen en txtResumen:
 * - total
 * - media
 * - máximo
 * - mínimo
 * - aprobados
 * - suspensos
 * @returns {void}
 */
function pintarResumen() {
    // TODO: si no hay notas, mostrar "Aún no hay notas."
    // TODO: si hay notas, calcular todos los valores (media, max, min, etc.)
    // TODO: construir un texto resumen y asignarlo a txtResumen.textContent
    let total = notas.length;
    let media = calcularMedia(notas).toFixed(2); // Redondear a 2 decimales
    let maximo = calcularMax(notas);
    let minimo = calcularMin(notas);
    let aprobados = contarAprobados(notas);
    let suspensos = total - aprobados;
    if (notas.length === 0) {
        txtResumen.textContent = "Aún no hay notas.";
        return;
    }
    txtResumen.textContent = `Total: ${total} | Media: ${media} | Máximo: ${maximo} | Mínimo: ${minimo} | Aprobados: ${aprobados} | Suspensos: ${suspensos}`;
  
}


/* ==========================================================
   6) CÁLCULOS (funciones auxiliares con arrays)
   ========================================================== */

/**
 * Calcula la media de un array numérico.
 * @param {number[]} array Array de números.
 * @returns {number} Media de los valores.
 */
function calcularMedia(notas) {
    let suma = 0;
  // TODO: sumar todos los elementos y dividir entre array.length
  for(let i = 0; i < notas.length; i++) {
    suma += notas[i];
}
    return suma / notas.length;
}

/**
 * Devuelve el valor máximo del array.
 * @param {number[]} array Array de números.
 * @returns {number} Valor máximo.
 */
function calcularMax(notas) {
  // TODO: recorrer y guardar el máximo
  let maximo = notas[0];
  for(let i=0; i < notas.length; i++) {
    if(notas[i] > maximo){
        maximo = notas[i];
    }
}
    return maximo;
} 

/**
 * Devuelve el valor mínimo del array.
 * @param {number[]} array Array de números.
 * @returns {number} Valor mínimo.
 */
function calcularMin(notas) {
  // TODO: recorrer y guardar el mínimo
  let minimo =notas[0];
    for(let i=0; i < notas.length; i++) {
        if(notas[i] < minimo){
            minimo = notas[i];
        }   
}
    return minimo;
}

/**
 * Cuenta cuántas notas están aprobadas (>= 5).
 * @param {number[]} array Array de números.
 * @returns {number} Número de aprobados.
 */
function contarAprobados(notas) {
  // TODO: recorrer y contar >= 5
  let contador =0;
    for(let i=0; i < notas.length; i++) {
        if(notass[i] >= 5){
            contador++;
        }   
}
    return contador;
}


/* ==========================================================
   7) MENSAJES DE ERROR (sin alert)
   ========================================================== */

/**
 * Muestra un mensaje temporal en la web.
 * Debe desaparecer automáticamente después de unos segundos.
 * @param {string} texto Mensaje a mostrar.
 * @returns {void}
 */
function mostrarMensaje(texto) {
  // TODO: mostrar texto
  // TODO: programar que se borre después de X ms con setTimeout
  // TODO (opcional): si llega otro error antes de borrarse, evitar solapes
   let timeoutId;
  mensajeError.textContent = texto;

  clearTimeout(timeoutId);

  timeoutId = setTimeout(function() {
    limpiarMensaje();
  }, 3000);
}



/**
 * Borra el mensaje actual de error.
 * @returns {void}
 */
function limpiarMensaje() {
    mensajeError.textContent = ""; // Limpiar el mensaje de error
}