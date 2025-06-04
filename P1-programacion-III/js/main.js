//////////////////////// Declaración de variables //////////////////////////

// Lista de objetos con id, nombre, precio e imagen con la cual recorreré los productos.
let listaProductos = [
    {id:1, nombre:"anana", precio: 3000, img:"./img/anana.jpg"},
    {id:2, nombre:"arandano", precio: 12000, img: './img/arandano.jpg'},
    {id:3, nombre:"banana", precio: 1000, img: './img/banana.jpg'},
    {id:4, nombre:"frambuesa", precio: 4000, img: './img/frambuesa.png'},
    {id:5, nombre:"frutilla", precio:3000, img: './img/frutilla.jpg'},
    {id:6, nombre:"kiwi", precio: 2000, img: './img/kiwi.jpg'},
    {id:7, nombre:"mandarina", precio: 800, img: './img/mandarina.jpg'},
    {id:8, nombre:"manzana", precio: 1500, img: './img/manzana.jpg'},
    {id:9, nombre:"naranja", precio: 9000, img: './img/naranja.jpg'},
    {id:10, nombre:"pera", precio:2500, img: './img/pera.jpg'},
    {id:11, nombre:"pomelo-amarillo", precio: 2000, img: './img/pomelo-amarillo.jpg'},
    {id:12, nombre:"pomelo-rojo", precio: 2000, img: './pomelo-rojo.jpg'},
    {id:13, nombre:"sandia", precio: 2500, img: './img/sandia.jpg'}
];

// Objeto con datos del alumno 
const alumno = {dni:"32997370", nombre: "Adrian", apellido: "Falasca"};

// obtengo mi nombre y lo insert en la barra de navegación del DOM
let nav = document.getElementsByClassName("nombreAlumno")[0];
nav.textContent = `${alumno.nombre} ${alumno.apellido}`;

// es el contenedor donde se van a renderizar los productos
let contenedorProductos = document.getElementById("contenedor-productos");

// input de búsqueda. Cuando escribo llama a la función que filtra productos
let inputBuscar = document.getElementById("barra-busqueda")
inputBuscar.addEventListener("keyup", filtrarProductos);

// Botones para ordenar y sus eventos asignados
let ordenarPorNombre = document.getElementById("ordenar-por-nombre");
let ordenarPorPrecio = document.getElementById("ordenar-por-precio");
ordenarPorNombre.addEventListener("click", ordenarNombre);
ordenarPorPrecio.addEventListener("click", ordenarPrecio);

// Variables para manejar el carrito
let totalCarritoProductos = 0;
let carritoProductos = [];

// elementos del DOM para mostrar el carrito
let totalCarrito = document.getElementById("precio-total");
let itemsCarrito = document.getElementById("items-carrito");
let contadorCarrito = document.getElementById("contador-carrito");


//////////////////////// Funciones ////////////////////////

// Muestro mis datos en la consola
function imprimirDatosAlumno(){
    console.log(`Soy ${alumno.nombre} ${alumno.apellido} y mi DNI es ${alumno.dni}`);
};

// Muestro los productos en el contenedor
function mostrarProductos(array){
    let htmlProductos = "";

    array.forEach(producto => {
        htmlProductos += `
            <div class="card-producto">
                <img src=${producto.img} alt="imagen-${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button onclick="agregarCarrito(${producto.id})">Agregar a carrito</button>
            </div>`
    });

    contenedorProductos.innerHTML = htmlProductos;
}

// Filtro los productos según el texto ingresado en el input de búsqueda
function filtrarProductos(){
    let valorInput = inputBuscar.value;
    let productosFiltrados = listaProductos.filter(producto => 
        producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
    );
    mostrarProductos(productosFiltrados);
}

// Muestro los productos del carrito
function mostrarCarrito() {
    // Recupera carrito y total desde localStorage
    carritoProductos = localStorage.getItem("Carrito");
    totalCarritoProductos = localStorage.getItem("Total");

    // Convierto JSON a objeto/array y string a número
    carritoProductos = JSON.parse(carritoProductos);
    totalCarritoProductos = parseFloat(totalCarritoProductos);

    let htmlProductos = "";
    let contador = 0;

    // Si hay productos en el carrito, los muestro
    if (carritoProductos.length >= 1){
        for (let i = 0; i < carritoProductos.length; i++) {
            contador++;
            htmlProductos += `
                <li class="bloque-item">
                    <p class="nombre-item">${carritoProductos[i].nombre} - ${carritoProductos[i].precio}</p>
                    <button class="boton-eliminar" onclick="eliminarCarrito(${carritoProductos[i].id})">Eliminar</button>
                </li>`;
        }
    } else {
        // Si no hay productos, muestro mensaje de que está vacio
        htmlProductos = "<p>No hay elementos en el carrito.</p>";
    }

    console.log(carritoProductos);

    // Visualizo  los datos actualizados
    itemsCarrito.innerHTML = htmlProductos;
    totalCarrito.innerHTML = `$${totalCarritoProductos}`;
    contadorCarrito.textContent = contador;
}

// Agrego un producto al carrito utilizando el id
function agregarCarrito(id) {
    let producto = listaProductos.find(p => p.id === id);    
    carritoProductos.push(producto);
    totalCarritoProductos += producto.precio;

    // Guardo el carrito y total en localStorage
    localStorage.setItem("Carrito", JSON.stringify(carritoProductos));
    localStorage.setItem("Total", totalCarritoProductos.toString());

    mostrarCarrito();
}

// Elimino un producto del carrito utilizando el id
function eliminarCarrito(id) {
    const index = carritoProductos.findIndex(p => p.id === id);
    totalCarritoProductos -= carritoProductos[index].precio;
    carritoProductos.splice(index, 1);

    // Actualizo el localStorage
    localStorage.setItem("Carrito", JSON.stringify(carritoProductos));
    localStorage.setItem("Total", totalCarritoProductos.toString());

    mostrarCarrito();
}

// Vacío todo el carrito y reinicio el total
function limpiarCarrito(){
    let totalCarritoProductos = 0;
    let carritoProductos = [];

    localStorage.setItem("Carrito", JSON.stringify(carritoProductos));
    localStorage.setItem("Total", totalCarritoProductos.toString());

    mostrarCarrito();
}

// Ordeno los productos por nombre 
function ordenarNombre() {
    listaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarProductos(listaProductos);
}

// Ordeno los productos por precio (de menor a mayor)
function ordenarPrecio() {
    listaProductos.sort((a, b) => a.precio - b.precio);
    mostrarProductos(listaProductos);
}


function init(){
    mostrarProductos(listaProductos);  
    mostrarCarrito();                  
    imprimirDatosAlumno();            
}

// Inicializo la pagina
init();
