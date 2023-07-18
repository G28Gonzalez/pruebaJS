const productos = [
    {
        id: "Pack 1",
        titulo: "Pack 1",
        imagen: "/img/pack1.jpg",
        precio: 250,
        descripcion: "1 Par de medias",
    },
    {
        id: "Pack 2",
        titulo: "Pack 2",
        imagen: "/img/pack2.webp",
        precio: 600,
        descripcion: "3 Pares de medias",
    }
]

const contenedorProductos = document.querySelector("#contenedorProductos")
let botonesAgregar = document.querySelectorAll(".btnAgregar");
const numerito = document.querySelector("#numerito");

function cargarProductos () {
    productos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML= `
        <img class="imagenProducto" src="${producto.imagen}" alt="${producto.titulo}"></img>
        <div class="detallesProducto">
            <h3 class="tituloProducto">${producto.titulo}</h3>
            <p class="descripcionProducto">${producto.descripcion}</p>
            <p class="precioProducto">$${producto.precio}</p>
            <button class="btnAgregar" id="${producto.id}">Agregar</button>
        </div>
        `
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos()

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".btnAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = []
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productosAgregado = productos.find(producto => producto.id === idBoton)
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productosAgregado.cantidad = 1;
        productosEnCarrito.push(productosAgregado)
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito () {
    let nuevonNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevonNumerito;
}