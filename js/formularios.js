let expContrasenia = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
let expEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.(com|org|net)$/;

let form = document.querySelector("form");

console.log(form);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validarFormulario();
})

function validarFormulario() {
    let contrasenia = document.getElementById("input-pass");
    let email = document.getElementById("input-email");
    let mensaje = document.getElementById("mensajeError");

    let error = false;
    let mensajeDelError = "";

    if (!expEmail.test(email.value)) {
        error = true;
        mensajeDelError += "<p>El email ingresado no es valido.</p>";
    }
    if (!expContrasenia.test(contrasenia.value)) {
        error = true;
        mensajeDelError += "<p>La contraseña debe contener entre 8 y 12 caracteres, incluyendo mayusculas, minusculas, numeros y al menos un caracter especial(#?!%$)</p>";
    }

    if (error) {
        mensaje.innerHTML = mensajeDelError;
        mensaje.style.color = "red";
    } else {
        form.submit();
    }
console.log(mensaje.style.color);
}

// document.getElementById("mySubmit").disabled = true;

// contrasenia.addEventListener("input", function () {
//     if (contrasenia.value == "" || !expContrasenia.test(contrasenia.value)) {
//         document.getElementById("mySubmit").disabled = true; // Deshabilita el botón si no cumple
//     } else {
//         document.getElementById("mySubmit").disabled = false; // Habilita el botón si cumple
//     }

//     if (email.value == "" || !expEmail.test(email.value)) {
//         document.getElementById("mySubmit").disabled = true; // Deshabilita el botón si no cumple
//         email.focus();
//     } else {
//         document.getElementById("mySubmit").disabled = false; // Habilita el botón si cumple
//     }
// });