document.querySelector("#btnA1").addEventListener("click", function (event) {
    const a1 = document.querySelector("#a1");
    a1.innerHTML = ``;
    const precio = 23;
    let cantidad = 5;
    let total = precio * cantidad;
    a1.innerHTML += `<h3> Precio :${precio}€ <br> Cantidad: ${cantidad} <br> Total: ${total}€</h3>`;
    
});
document.querySelector("#btnA2").addEventListener("click", function(event){
    const a2 = document.querySelector("#a2");
    a2.innerHTML =``;
    let edad = 17;
    let carnet = false;
    function verificarEdad(edad){
    if(edad >= 18){
            carnet = true;
            a2.innerHTML += `<h3> Eres mayor de edad. Tienes carnet de conducir: ${carnet} </h3>`;
        } else {
            
            carnet = false;
            a2.innerHTML += `<h3> Eres menor de edad. Tienes carnet de conducir: ${carnet} </h3>`;
        }
    }
    a2.innerHTML+=` <h3>Edad inicial: ${edad} </h3>`;
    verificarEdad(edad);
    edad = 18;
    a2.innerHTML+=` <h3>Cambiando la edad a ${edad} </h3>`;
    verificarEdad(edad);
});
document.querySelector("#btnA3").addEventListener("click", function(event){
    const a3 = document.querySelector("#a3");
    a3.innerHTML =``;
    let x = 5;
    let y = x++;
    a3.innerHTML += `<h3> Valor de x: ${x}. Valor de y: ${y}. </h3>`;
    x = 5;
    y = ++x;
    a3.innerHTML += `<h3> Valor de x: ${x}. Valor de y: ${y}. </h3>`;
    let resultado = x+y*y+x;
    a3.innerHTML += `<h3> Resultado de la operación x + y * y + x: ${resultado}. </h3>`;
    resultado = (x * y) * (y + x);
    a3.innerHTML += `<h3> Resultado de la operación (x * y) * (y + x): ${resultado}. </h3>`;
});
document.querySelector("#btnA4").addEventListener("click", function(event){
    const a4 = document.querySelector("#a4");
    a4.innerHTML =``;
    let cadena = "Adios ";
    let numero = 2025;
    let resultado = cadena + numero;
    a4.innerHTML += (typeof resultado);
    a4.innerHTML += `<h3> Resultado de la concatenación: ${resultado}. </h3>`;

});