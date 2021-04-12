//Variables-----------------------------------------------------------------------
const listaArticulos = document.querySelector('.cesta__articulos');
const totalPrecio = document.querySelector('#totalPrecio');
let articulos = [];
let miCesta = window.localStorage;
let total = 0;


//Funciones-------------------------------------------------------------------------


function borrarArticulo(elemento) {
    articulos = articulos.filter(function (item) {
        return item != elemento;
    });
    miCesta.setItem('articulo',JSON.stringify(articulos));
    mostrarCesta();
}



function mostrarCesta () {
    listaArticulos.textContent = '';
     articulos = JSON.parse(miCesta.getItem('articulo'));
     total = 0
     articulos.forEach((elemento) => {
          // Creo un <button>
          const nuevoBoton = document.createElement('button');
          nuevoBoton.textContent = 'X';
          nuevoBoton.classList.add('cesta__eliminar')
          nuevoBoton.addEventListener('click', function() {
               //Borrar articulo;
               borrarArticulo(elemento);
          });
          //creo un nuevo li
          const nuevoLi = document.createElement('Li');
          nuevoLi.classList.add('cesta__li')
          //relleno el <li>
          nuevoLi.textContent = elemento.nombre
          // Introduzco <button> dentro de <li>
          nuevoLi.appendChild(nuevoBoton);
          //lo introduzco en el <ul>
          listaArticulos.appendChild(nuevoLi);
          //Sumo los precios de cada elemento
          total = total + parseInt(elemento.precio);
     });
          //creo un nuevo div
          let otroLi = document.createElement('div');
          //relleno el <div> con el total de la suma
          otroLi.textContent = total;
          //lo introduzco en el div
          totalPrecio.innerHTML = '';
          totalPrecio.appendChild(otroLi);
}

//Eventos--------------------------------------------------------------------------
mostrarCesta();
