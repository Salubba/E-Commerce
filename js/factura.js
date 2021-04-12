//Variables mostrar pedido-----------------------------------------------------------------------
const listaArticulosFactura = document.querySelector('#listaArticulosFactura');
const totalFactura = document.querySelector('#totalFactura');
let articulos = [];
let miCesta = window.localStorage;
let total = 0;

//Variables validar formulario factura------------------------------------------------------------
const nombreFactura = document.querySelector('#nombreFactura');
const cifFactura = document.querySelector('#cifFactura');
const direccionFactura = document.querySelector('#direccionFactura');
const emailFactura = document.querySelector('#emailFactura');
const errorNombreFactura = document.querySelector('#errorNombreFactura');
const errorDireccionFactura = document.querySelector('#errorDireccionFactura');
const errorCifFactura = document.querySelector('#errorCifFactura');
const errorEmailFactura = document.querySelector('#errorEmailFactura');
const enviarFactura = document.querySelector('#enviarFactura');
let erroresNombreFactura = [];
let erroresCifFactura = [];
let erroresDireccionFactura = [];
let erroresMailFactura = [];




//Funcion mostrar pedido-------------------------------------------------------------------------

function mostrarCestaFactura () {
    articulos = JSON.parse(miCesta.getItem('articulo'));
    articulos.forEach((elemento) => {
        //creo un nuevo li
        const nuevoLi = document.createElement('Li');
        nuevoLi.classList.add('cesta__factura')
        //relleno el <li>
        nuevoLi.textContent = elemento.nombre;
        //lo introduzco en el <ul>
        listaArticulosFactura.appendChild(nuevoLi);
        //Sumo los precios de cada elemento
        total = total + parseInt(elemento.precio);
    });
    //creo un nuevo div
    const otroLi = document.createElement('div');
    otroLi.classList.add('total__factura');
    //relleno el <div> con el total de la suma
    otroLi.textContent = total + ' €'
    //lo introduzco en el div
    //totalFactura.innerHTML = '';
    totalFactura.appendChild(otroLi);
}

//Funcion validar formulario factura-----------------------------------------------
function validar(evento) {
    //Evitar que se envie formulario
    evento.preventDefault();
    //Vacia los mensajes de errores antes de rellenarlo nuevamente
    erroresNombreFactura = [];
    erroresCifFactura = [];
    erroresDireccionFactura = [];
    erroresMailFactura = [];

    //Validacion nombre es un campo obligatorio
    if (nombreFactura.value.trim().length === 0) {
        erroresNombreFactura = erroresNombreFactura.concat('NOMBRE NO PUEDE ESTAR VACIO');
    }
    //Validacion nombre con caracteres validos
    if (!/^[a-zA-Z0-9]*$/.exec(nombreFactura.value.trim())) {
        erroresNombreFactura = erroresNombreFactura.concat('NOMBRE NO TIENE CARACTERES VALIDOS');
    }
    //Validacion Cif es un campo obligatorio
    if (cifFactura.value.trim().length === 0) {
        erroresCifFactura = erroresCifFactura.concat('CIF NO PUEDE ESTAR VACIO');
    }
    //Validacion Direccion es un campo obligatorio
    if (direccionFactura.value.trim().length === 0) {
        erroresDireccionFactura = erroresDireccionFactura.concat('DIRECCION NO PUEDE ESTAR VACIO');
    }
    //Validacion mail es un campo obligatorio
    if (emailFactura.value.trim().length === 0) {
        erroresMailFactura = erroresMailFactura.concat('MAIL NO PUEDE ESTAR VACIO');
    }
    //Validacion mail con caracteres validos
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailFactura.value.trim())) {
        erroresMailFactura = erroresMailFactura.concat('MAIL NO TIENE CARACTERES VALIDOS');
    }
    //Enviar Formulario o Mostrar Errores
    if (erroresNombreFactura.length === 0 && erroresCifFactura.length === 0 && erroresDireccionFactura.length === 0 && erroresMailFactura.length === 0) {
        //Se envia formulario si no hay errores
        formulario.submit();
    } else {
        //Muestro errores
        errorNombreFactura.textContent = '';
        errorCifFactura.textContent = '';
        errorDireccionFactura.textContent = '';
        errorEmailFactura.textContent = '';

        erroresNombreFactura.forEach(function (mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errorNombreFactura.appendChild(miLi);
        });
        erroresCifFactura.forEach(function (mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errorCifFactura.appendChild(miLi);
        });
        erroresDireccionFactura.forEach(function (mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errorDireccionFactura.appendChild(miLi);
        });
        erroresMailFactura.forEach(function (mensaje) {
            const miLi = document.createElement('li');
            miLi.textContent = mensaje;
            errorEmailFactura.appendChild(miLi);
        });
    }
}

//Evento validar formulario factura----------------------------------------------------------
enviarFactura.addEventListener('click', validar);

//Inicio-----------------------------------------------------------------------------------
mostrarCestaFactura();

