const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#result");

formulario.addEventListener("submit", function (event){
    event.preventDefault();//Evita que se recargue la página al enviar el formulario
    //Recogemos los datos del formulario
    const name = document.querySelector("#name").value;
    const age = Number (document.querySelector("#age").value);
    //Construimos el mensaje de saludo inicial 
    let message  = `¡Hola ${name}!<br> Brindemos con `;

    let emoji = age < 18 ? "🥛" : "🍺";
    // Repetimos el emoji segun la edad 
    for( let i = 0; i <age; i++){
        message += emoji;
    }
    //Mostramos el mensaje en el div de resultado
    result.innerHTML = message;
});

