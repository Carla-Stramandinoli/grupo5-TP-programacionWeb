let expEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.(com|org|net)$/;

let form = document.querySelector("form");

console.log(form);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validarFormulario();
})

function validarFormulario() {
    let email = document.getElementById("input-email-recPas");
    let mensaje = document.getElementById("mensajeError");

    let error = false;
    let mensajeDelError = "";

    if (!expEmail.test(email.value)) {
        error = true;
        mensajeDelError += "<p>El email ingresado no es valido.</p>";
    }
    if (error) {
        mensaje.innerHTML = mensajeDelError;
        mensaje.style.color = "red";
    } else {
        form.submit();
    }
console.log(mensaje.style.color);
}