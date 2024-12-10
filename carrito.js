let productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

document.querySelectorAll(".agregar-carrito").forEach(boton => {
    boton.addEventListener("click", () => {
        const producto = {
            id: boton.dataset.id,
            nombre: boton.dataset.nombre,
            precio: parseFloat(boton.dataset.precio),
            imagen: boton.dataset.imagen,
            cantidad: 1
        };


        const existe = productosEnCarrito.find(item => item.id === producto.id);
        if (existe) {
            existe.cantidad++;
        } else {
            productosEnCarrito.push(producto);
        }

        localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));

        const notificacion = document.createElement("div");
        notificacion.textContent = `"${producto.nombre}" añadido al carrito.`;
        notificacion.style.position = "fixed";
        notificacion.style.bottom = "20px";
        notificacion.style.right = "20px";
        notificacion.style.backgroundColor = "#28a745";
        notificacion.style.color = "white";
        notificacion.style.padding = "10px";
        notificacion.style.borderRadius = "5px";
        document.body.appendChild(notificacion);

        setTimeout(() => notificacion.remove(), 2000);
    });
});

if (window.location.pathname.endsWith("carrito.html")) {
    const carritoVacio = document.getElementById("carrito-vacio");
    const carritoProductos = document.getElementById("carrito-productos");
    const totalCarrito = document.getElementById("total-carrito");
    const botonVaciar = document.getElementById("vaciar-carrito");
    const botonComprar = document.getElementById("comprar-carrito");

    function cargarCarrito() {
        if (productosEnCarrito.length > 0) {
            carritoVacio.style.display = "none";
            carritoProductos.innerHTML = productosEnCarrito.map(producto => `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px;">
                    <span>${producto.nombre} - ${producto.cantidad} x ${producto.precio} BS</span>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                </div>
            `).join("");
            totalCarrito.textContent = productosEnCarrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0) ;
        } else {
            carritoVacio.style.display = "block";
            carritoProductos.innerHTML = "";
            totalCarrito.textContent = "0 ";
        }
    }

    function eliminarProducto(id) {
        productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id);
        localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
        cargarCarrito();
    }

    botonVaciar.addEventListener("click", () => {
        productosEnCarrito = [];
        localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
        cargarCarrito();
    });

    botonComprar.addEventListener("click", () => {
        if (productosEnCarrito.length > 0) {
            alert("¡Gracias por su compra!");
            productosEnCarrito = [];
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
            cargarCarrito();
        } else {
            alert("El carrito está vacío. ¡Agrega productos antes de comprar!");
        }
    });

    cargarCarrito();
}
