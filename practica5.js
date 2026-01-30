const mensajes = document.querySelector("#mensajes");
document.querySelector("#analizar").addEventListener("click", function () {
    const resultado = document.querySelector("#resultado");
    const text = document.querySelector("#numeros");
   const numeros = text.value.split(",").map(num => Number(num.trim())); // Convertir a un array de números
   let error = []; 
    resultado.innerHTML = ``;
    mensajes.innerHTML = "";
    mensajes.className = "";
    validarNumeros(numeros,error);
    if (error.length > 0) {
    mensajes.innerHTML = error.join("<br>");
    mensajes.className = "mensajes err";
     setTimeout(() => {
                mensajes.innerHTML = "";
                mensajes.className = "";
                }, 2000);
    return;
  }
    const total = numerosTotales(numeros);
    const signos = numerosPositivosYNegativos(numeros);
    const extremos = numeroMayorYMenor(numeros);
    mensajes.textContent = `    Total de números: ${total}
     Positivos: ${signos.positivos}
     Negativos: ${signos.negativos}
     Ceros: ${signos.ceros}
     Mayor: ${extremos.mayor}
     Menor: ${extremos.menor}`;
});
function validarNumeros(numeros,error) {
     
    for(let i = 0; i < numeros.length; i++) {
        if(numeros.length === 0) {
             error.push("No has introducido ningún número."); 
            return
        } else if(Number.isNaN(numeros[i])) {
           
            error.push("El valor  es, " + numeros[i] + ", no es un número válido.");
            break
            //Se utiliza break para detener la validación en cuanto se detecta el primer error
            // , ya que no tiene sentido seguir comprobando el resto de valores 
            // si los datos ya no son númericos.
            
        }   
    }
}
function numerosTotales(numeros){
    return numeros.length;
}
function numerosPositivosYNegativos(numeros){
    let contadorPositivos = 0;
    let contadorNegativos = 0;
    let contadorCeros=0;
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] > 0) {
            contadorPositivos++;
        } else if (numeros[i] < 0) {
            contadorNegativos++;
        } else if (numeros[i] === 0){
            contadorCeros++;
        }
    }
    return {positivos: contadorPositivos, negativos: contadorNegativos, ceros: contadorCeros};
}
function numeroMayorYMenor(numeros){
     if (numeros.length === 0) return null;
    let mayor = numeros[0];
    let menor = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > mayor) {
            mayor = numeros[i];
        }
        if (numeros[i] < menor) {
            menor = numeros[i];
        }
    }
    return {mayor: mayor, menor: menor};
}