const Aumentar = document.querySelector("#Aumentar");
const Disminuir = document.querySelector("#Disminuir");
const Reiniciar = document.querySelector("#Reiniciar");
const contador = document.querySelector("#contador");//Elemento donde mostraremos el valor del contador en HTML
const error = document.querySelector("#error");

let count = 0; //Inicializamos el contador a 0


Aumentar.addEventListener("click", function(){
    count++; //Incrementamos el contador en 1 cada vez que lo pulsemos
    contador.innerHTML=count; //Actualizamos el valor en el HTML
    if(count >10){
        alert("¡Has superado el valor de 10!");
    }
});
Disminuir.addEventListener("click", function(){
    //Decrementamos el contador en 1 cada vez que lo pulsemos
    //Actualizamos el valor en el HTML
    if (count == 0) {
         count = 0;
       error.innerHTML = "No puedes disminuir el contador más de 0";
       error.classList.add("show");

       setTimeout(()=>{
        error.innerHTML = "";
       }, 1000);
       
    } else {
        count--;
        contador.innerHTML = count;
        error.innerHTML = "";
    }
});
Reiniciar.addEventListener("click", function(){
    count=0; //Reiniciamos el contador a 0 cada vez que lo pulsemos
    contador.innerHTML=count; //Actualizamos el valor en el HTML
});
