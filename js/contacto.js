//VARIABLES

//Variables cookies------------------------------------------------------------------
const aviso = document.querySelector('#aviso');
const aceptar = document.querySelector('#aceptar');
let miLocal = window.localStorage;

//Variables validacion formulario-----------------------------------------------------
const formulario = document.querySelector('#formulario')
const nombre = document.querySelector('#nombre');
const direccion = document.querySelector('#direccion');
const mensaje = document.querySelector('#mensaje');
const check = document.querySelector('#check');
const errorNombre = document.querySelector('#errorNombre');
const errorMail = document.querySelector('#errorMail');
const errorMensaje = document.querySelector('#errorMensaje');
const errorCheck = document.querySelector('#errorCheck');
const botonEnviar = document.querySelector('#botonEnviar');
let mensajesErroresNombre = [];
let mensajesErroresMail = [];
let mensajesErroresMensaje = [];
let mensajesErroresCheck = [];
let isChecked = false;


//FUNCIONES

//Funciones coookies-----------------------------------------------------------------

//Borra el aviso de cookies al aceptar
function ocultarAviso() {
    aviso.classList.add('ocultar');
  }

//Marca las cookies como aceptadas
function aceptarCookies () {
    // Oculta el HTML de cookies
    ocultarAviso();
    // Guarda que ha aceptado
    miLocal.setItem('cookie', true);

}

//Funcion que inicia la logica
function iniciar () {
        if(miLocal.getItem('cookie') === 'true') {
            ocultarAviso();
        }
    }

//Funciones validar formulario----------------------------------------------------

function validar(evento) {
    //Evitar que se envie formulario
    evento.preventDefault();
    //Vacia los mensajes de errores antes de rellenarlo nuevamente
    mensajesErroresNombre = [];
    mensajesErroresMail = [];
    mensajesErroresMensaje = [];
    mensajesErroresCheck = [];

    //Validacion nombre es un campo obligatorio
    if (nombre.value.trim().length === 0) {
        mensajesErroresNombre = mensajesErroresNombre.concat('NOMBRE NO PUEDE ESTAR VACIO');
    }
    //Validacion nombre con caracteres validos
    if(!/^[a-zA-Z0-9]*$/.exec(nombre.value.trim())) {
        mensajesErroresNombre = mensajesErroresNombre.concat('NOMBRE NO TIENE CARACTERES VALIDOS');
    }
    //Validacion mail es un campo obligatorio
    if (direccion.value.trim().length === 0) {
        mensajesErroresMail = mensajesErroresMail.concat('MAIL NO PUEDE ESTAR VACIO');
    }
    //Validacion mail con caracteres validos
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(direccion.value.trim())) {
        mensajesErroresMail = mensajesErroresMail.concat('MAIL NO TIENE CARACTERES VALIDOS');
    }
    //Validacion mensaje es un campo obligatorio
    if (mensaje.value.trim().length === 0) {
       mensajesErroresMensaje = mensajesErroresMensaje.concat('MENSAJE NO PUEDE ESTAR VACIO');
    }
    //Validacion que el mensaje tiene un minimo de 10 caracteres
        if (mensaje.value.trim().length < 10) {
            mensajesErroresMensaje = mensajesErroresMensaje.concat('EL MENSAJE ES DEMASIADO CORTO');
    }
    //Validar si el checkbox ha sido seleccionado
    if (!document.getElementById('check').checked) {
            mensajesErroresCheck = mensajesErroresCheck.concat('OLVIDASTE MARCAR EL CHECKBOX')
    }
    //Enviar Formulario o Mostrar Errores
    if (mensajesErroresNombre.length === 0 && mensajesErroresMail.length === 0 && mensajesErroresMensaje.length === 0){
        //Se envia formulario si no hay errores
        formulario.submit();
    }
    else {
        //Muestro errores
        errorNombre.textContent = '';
        errorMail.textContent = '';
        errorMensaje.textContent = '';
        mensajesErroresNombre.forEach(function(mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errorNombre.appendChild(miLi);
        });
        mensajesErroresMail.forEach(function(mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errorMail.appendChild(miLi);
        });
        mensajesErroresMensaje.forEach(function(mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errorMensaje.appendChild(miLi);
        });
        mensajesErroresCheck.forEach(function(mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errorCheck.appendChild(miLi);
        });
        }
    }
    






//EVENTOS


//Eventos cookies------------------------------------------------------------------
aceptar.addEventListener('click', aceptarCookies);

//Eventos validar formulario------------------------------------------------------
botonEnviar.addEventListener('click', validar);

//INICIO

//Inicio cookies-------------------------------------------------------------------
iniciar();