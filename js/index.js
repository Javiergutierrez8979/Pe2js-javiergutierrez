// Crear objetos para destinos turísticos
const destinos = [
    {
        nombre: "Córdoba",
        descripcion: "Córdoba es una ciudad situada en el centro de Argentina, famosa por su arquitectura colonial y sus numerosas iglesias.",
        imagen: "../PE2/img/large_cathedral-cordoba-argentina-shutterstock_1140671330_a570eb940e.jpeg",
        precio: "usd80"
    },
    {
        nombre: "Bariloche",
        descripcion: "Bariloche, en la Patagonia argentina, es conocida por sus impresionantes paisajes de montaña, sus lagos cristalinos y sus chocolates artesanales.",
        imagen: "../PE2/img/two-tourist-standing-road-near-snowy-mountain.jpg",
        precio: "u$d100"
    }
];

// Función para generar tarjetas HTML para cada destino
function generarTarjetas() {
    const destinosContainer = document.getElementById("destinosContainer");

    destinos.forEach(function(destino) {
        const card = document.createElement("div");
        card.classList.add("card");

        const imagen = document.createElement("img");
        imagen.src = destino.imagen;
        imagen.alt = destino.nombre;
        imagen.style.width = "50%";

        const nombre = document.createElement("h2");
        nombre.textContent = destino.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = destino.descripcion;

        const precio = document.createElement("p");
        precio.textContent = "Precio: " + destino.precio;

        card.appendChild(imagen);
        card.appendChild(nombre);
        card.appendChild(descripcion);
        card.appendChild(precio);

        destinosContainer.appendChild(card);
    });
}

// Función para obtener el producto seleccionado del menú desplegable

function obtenerProductoSeleccionado() {
    const select = document.getElementById('deseo');
    const index = select.selectedIndex;
    return destinos[index]; 
}



// Función para agregar un producto al carrito


function agregarAlCarrito() {
    const productoSeleccionado = obtenerProductoSeleccionado();
    if (productoSeleccionado) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(productoSeleccionado);
        console.log("Producto agregado al carrito:", productoSeleccionado);
        console.log("Carrito actual:", carrito);

        // Guardar el carrito en el almacenamiento local

        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Mostrar mensaje en el HTML

        mostrarMensajeCarrito(productoSeleccionado.nombre);
    } else {
        alert("No se ha seleccionado ningún producto para agregar al carrito.");
    }
}

// Función para mostrar un mensaje en el HTML cuando se agrega un elemento al carrito

function mostrarMensajeCarrito(nombreProducto) {
    const mensajeCarrito = document.getElementById("mensajeCarrito");
    mensajeCarrito.textContent = `Se agregó "${nombreProducto}" al carrito.`;
}

// Función para borrar el mensaje del carrito

function borrarMensajeCarrito() {
    const mensajeCarrito = document.getElementById("mensajeCarrito");
    mensajeCarrito.textContent = "";
}

// Función para borrar el carrito y eliminar los elementos del ticket

function borrarCarrito() {
    localStorage.removeItem("carrito");
    const ticket = document.getElementById("ticket");
    ticket.innerHTML = "";
    borrarMensajeCarrito();
    console.log('Carrito borrado');
}

// Función para imprimir el producto en el ticket
function imprimirProductoEnTicket() {
    const ticket = document.getElementById("ticket");

    ticket.innerHTML = ""; 
    
    // Obtener el carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Verificar si hay productos en el carrito

    if (carrito.length > 0) {
        carrito.forEach(function(producto) {

            // Crear elementos HTML el carrito

            const ticketItem = document.createElement("div");
            ticketItem.classList.add("ticket-item");
            ticketItem.innerHTML = `
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p>Precio: ${producto.precio}</p>
            `;
            ticket.appendChild(ticketItem);
        });
    } else {
    }
}


// sacar evento a botones

const btn = document.getElementById('btn');
btn.addEventListener("click", agregarAlCarrito);

// Borrar carrito
const btnBorrar = document.getElementById('btnBorrar');
btnBorrar.addEventListener("click", borrarCarrito);

const btnConfirmar = document.getElementById('btnConfirmar');
btnConfirmar.addEventListener("click",imprimirProductoEnTicket );


// Llamar a la función para generar las tarjetas al cargar la página

window.addEventListener("load", generarTarjetas);

