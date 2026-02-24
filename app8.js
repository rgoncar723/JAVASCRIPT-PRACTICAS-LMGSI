// 1. REFERENCIAS AL DOM
const formulario = document.querySelector("#formContacto");
const inpNombre = document.querySelector("#inpNombre");
const inpApellidos = document.querySelector("#inpApellidos");
const inpTelNumero = document.querySelector("#inpTelNumero");
const btnAddTel = document.querySelector("#btnAddTel");
const ulTelefonos = document.querySelector("#ulTelefonos");
const secContactos = document.querySelector("#secContactos");
const btnBorrarTodo = document.querySelector("#btnBorrarTodo");
const msg = document.querySelector("#msg");

// 2. CONSTANTES
const CLAVE_STORAGE = "agenda_contactos";

// 3. ESTADO DE LA APLICACIÓN
let agenda = cargarAgenda(); // Carga inicial
let telefonosTemp = [];      // Teléfonos que se van añadiendo antes de guardar el contacto



// 4. FUNCIONES DE PERSISTENCIA (localStorage + JSON + try-catch)
function cargarAgenda() {
    const raw = localStorage.getItem(CLAVE_STORAGE);
    if(raw === null) return []; // Si no hay nada, devolvemos un array vacío

    try {
        const datos = JSON.parse(raw);
        return Array.isArray(datos) ? datos : [];
    } catch (e) {
        console.error("Error al parsear la agenda:", e);
        return [];
    }
}

function guardarAgenda() {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(agenda));
    renderizarContactos();
}

// 5. FUNCIONES DE LÓGICA Y RENDER
function agregarTelefono() {
    const numero = inpTelNumero.value.trim();


    if (!inpTelNumero.checkValidity() || numero === "") {
        inpTelNumero.reportValidity();
        return;
    }

    telefonosTemp.push(numero);
    inpTelNumero.value = ""; // Limpia campo
    renderizarTelefonosTemp();
}

function renderizarTelefonosTemp() {
    ulTelefonos.innerHTML = "";
    telefonosTemp.forEach((tel, index) => {
        const li = document.createElement("li");
        li.textContent = tel;
        ulTelefonos.appendChild(li);
    });
}

function guardarContacto(e) {
    e.preventDefault();

    // Validación campo a campo 
    if (!inpNombre.checkValidity()) {
        inpNombre.reportValidity();
        return;
    }
    if (!inpApellidos.checkValidity()) {
        inpApellidos.reportValidity();
        return;
    }
    if (telefonosTemp.length === 0) {
        alert("Debes añadir al menos un teléfono antes de guardar.");
        return;
    }

    // Crea el nuevo objeto contacto
    const nuevoContacto = {
        id: "c_" + Date.now(), // ID único basado en tiempo
        nombre: inpNombre.value.trim(),
        apellidos: inpApellidos.value.trim(),
        telefonos: [...telefonosTemp]
    };

    agenda.push(nuevoContacto);
    guardarAgenda();
    
    // Resetea formulario y estado temporal
    formulario.reset();
    telefonosTemp = [];
    ulTelefonos.innerHTML = "";
    msg.textContent = "¡Contacto guardado con éxito!";
    setTimeout(() => msg.textContent = "", 3000);
}

function borrarContacto(id) {
    if (confirm("¿Seguro que quieres borrar este contacto?")) {
        agenda = agenda.filter(c => c.id !== id);
        guardarAgenda();
    }
}

function borrarTodaLaAgenda() {
    if (confirm("¿BORRAR TODO? Esta acción no se puede deshacer.")) {
        agenda = [];
        guardarAgenda();
    }
}

function renderizarContactos() {
    secContactos.innerHTML = "";

    if (agenda.length === 0) {
        secContactos.innerHTML = "<p>No hay contactos en la agenda.</p>";
        return;
    }

    agenda.forEach(contacto => {
        const div = document.createElement("div");
        div.className = "card-contacto"; 
        div.style.borderBottom = "1px dashed #ccc";
        div.style.padding = "10px 0";

        div.innerHTML = `
            <strong>${contacto.nombre} ${contacto.apellidos}</strong>
            <ul>
                ${contacto.telefonos.map(t => `<li>${t}</li>`).join('')}
            </ul>
            <button onclick="borrarContacto('${contacto.id}')">Eliminar</button>
        `;
        secContactos.appendChild(div);
    });
}

// 6. EVENTOS
btnAddTel.addEventListener("click", agregarTelefono);
formulario.addEventListener("submit", guardarContacto);
btnBorrarTodo.addEventListener("click", borrarTodaLaAgenda);

// 7. INICIALIZACIÓN
renderizarContactos();
