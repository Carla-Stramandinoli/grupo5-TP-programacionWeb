let expContrasenia = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
let expEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.(com|org|net)$/;
let expNumero = /^\d+$/;
let expTelefonoArg = /^(:\+54\s?9\s?|0?9?)\d{2,4}\s?\d{5}\s?\d{4}$/;

let formEmailPpal = document.querySelector("#form-email-ppal");
let formPass = document.querySelector("#form-pass");
let formDatosPersonales = document.querySelector("#form-datos-personales");


formEmailPpal.addEventListener("submit", (e) => {
    e.preventDefault();
    validarFormulario();
})

function validarFormulario() {
    let contrasenia = document.getElementById("input-pass");
    let email = document.getElementById("input-email-ppal");
    let mensaje = document.getElementById("mensajeErrorEmailPpal");

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
        formEmailPpal.submit();
    }
}

formPass.addEventListener("submit", (e) => {
    e.preventDefault();
    validarFormularioPass();
})

function validarFormularioPass() {
    let contrasenia = document.getElementById("input-pass");
    let mensaje = document.getElementById("mensajeErrorPass");

    let error = false;
    let mensajeDelError = "";

    if (!expContrasenia.test(contrasenia.value)) {
        error = true;
        mensajeDelError += "<p>La contraseña debe contener entre 8 y 12 caracteres, incluyendo mayusculas, minusculas, numeros y al menos un caracter especial(#?!%$)</p>";
    }

    if (error) {
        mensaje.innerHTML = mensajeDelError;
        mensaje.style.color = "red";
    } else {
        formPass.submit();
    }
}

formDatosPersonales.addEventListener("submit", (e) => {
    e.preventDefault();
    validarFormularioDatosPersonales();
})

function validarFormularioDatosPersonales() {
    let nombre = document.getElementById("input-nombre");
    let apellido = document.getElementById("input-apellido");
    let numDoc = document.querySelector(".input-numDoc");
    let fNacimiento = document.querySelector(".input-date").value;
    let numCelular = document.getElementById("numCelular");
    let emailSecundario = document.getElementById("emailSecundario");
    let mensaje = document.getElementById("mensajeErrorDatosPersonales");

    function esMayorDe16(fechaNacimiento) {
        let hoy = new Date();
        
        let fechaLimite = new Date(hoy.getFullYear() - 16, hoy.getMonth(), hoy.getDate());

        let fechaNac = new Date(fechaNacimiento);
    
        return !isNaN(fechaNac) && fechaNac <= fechaLimite;
    }

    let error = false;
    let mensajeDelError = "";

    if (nombre.value.trim() == "") {
        error = true;
        mensajeDelError += "<p>El campo nombre no puede estar vacio</p>";
    }

    if (apellido.value.trim() == "") {
        error = true;
        mensajeDelError += "<p>El campo apellido no puede estar vacio</p>";
    }

    if (!expNumero.test(numDoc.value)) {
        error = true;
        mensajeDelError += "<p>El numero documento solo admite numeros</p>";
    }

    if (!esMayorDe16(fNacimiento)) {
        error = true;
        mensajeDelError += "<p>No puede ser menor a 16 años</p>";
    }

    if (!expTelefonoArg.test(numCelular.value)) {
        error = true;
        mensajeDelError += "<p>El numero ingresado no es valido o no pertenece a Argentina</p>";
    }

    if (!expEmail.test(emailSecundario.value)) {
        error = true;
        mensajeDelError += "<p>El email ingresado no es valido</p>";
    }

    if(error){
        mensaje.innerHTML = mensajeDelError;
        mensaje.style.color = "red";
    } else {
        formDatosPersonales.submit();
    }
    console.log(esMayorDe16());

}


function validarFormularioDatosPersonales() {
    let nombre = document.getElementById("input-nombre");
    let apellido = document.getElementById("input-apellido");
    let numDoc = document.querySelector(".input-numDoc");
    let fNacimiento = document.querySelector(".input-date").value;
    let numCelular = document.getElementById("numCelular");
    let emailSecundario = document.getElementById("emailSecundario");
    let mensaje = document.getElementById("mensajeErrorDatosPersonales");

    function esMayorDe16(fechaNacimiento) {
        let hoy = new Date();
        
        let fechaLimite = new Date(hoy.getFullYear() - 16, hoy.getMonth(), hoy.getDate());

        let fechaNac = new Date(fechaNacimiento);
    
        return !isNaN(fechaNac) && fechaNac <= fechaLimite;
    }

    let error = false;
    let mensajeDelError = "";

    if (nombre.value.trim() == "") {
        error = true;
        mensajeDelError += "<p>El campo nombre no puede estar vacio</p>";
    }

    if (apellido.value.trim() == "") {
        error = true;
        mensajeDelError += "<p>El campo apellido no puede estar vacio</p>";
    }

    if (!expNumero.test(numDoc.value)) {
        error = true;
        mensajeDelError += "<p>El numero documento solo admite numeros</p>";
    }

    if (!esMayorDe16(fNacimiento)) {
        error = true;
        mensajeDelError += "<p>No puede ser menor a 16 años</p>";
    }

    if (!expTelefonoArg.test(numCelular.value)) {
        error = true;
        mensajeDelError += "<p>El numero ingresado no es valido o no pertenece a Argentina</p>";
    }

    if (!expEmail.test(emailSecundario.value)) {
        error = true;
        mensajeDelError += "<p>El email ingresado no es valido</p>";
    }

    if(error){
        mensaje.innerHTML = mensajeDelError;
        mensaje.style.color = "red";
    } else {
        formDatosPersonales.submit();
    }
    console.log(esMayorDe16());

}



// function validarFormPpal() {
//     let email = document.getElementById("input-email-ppal");
//     let mensaje = document.getElementById("mensajeErrorEmailPpal");

//     let error = false;
//     let mensajeDelError = "";

//     if (!expEmail.test(email.value)) {
//         error = true;
//         mensajeDelError += "<p>El email ingresado no es valido.</p>";
//     }

//     if (error) {
//         mensaje.innerHTML = mensajeDelError;
//         mensaje.style.color = "red";
//     } else {
//         formEmailPpal.submit();
//     }
// }



// function validarFormPass() {
//     let contrasenia = document.getElementById("input-pass");
//     let mensaje = document.getElementById("mensajeErrorPass");

//     let error = false;
//     let mensajeDelError = "";

//     if (!expContrasenia.test(contrasenia.value)) {
//         error = true;
//         mensajeDelError += "<p>La contraseña debe contener entre 8 y 12 caracteres, incluyendo mayusculas, minusculas, numeros y al menos un caracter especial(#?!%$)</p>";
//     }
//     if (error) {
//         mensaje.innerHTML = mensajeDelError;
//         mensaje.style.color = "red";
//         mensaje.style.margin = "2px";
//     } else {
//         formEmailPpal.submit();
//     }
// }


//separar cada mensaje por las dif acciones de cada form
//es decir tres eventos diferentes, porq son tres forms diferentes.