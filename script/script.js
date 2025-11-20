// URL base de tu API
const API_URL = 'http://localhost:3000/api';

// Datos obtenidos de la API
let productos = [];
let sucursales = [];
let clientes = [];
let pedidos = [];

// Función para cargar los datos en las tablas
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Cargamos datos desde la API (backend Node.js)
        
        // Cargamos productos con sus categorías
        const respuestaProductos = await fetch(`${API_URL}/productos`);
        const resultadoProductos = await respuestaProductos.json();
        if (Array.isArray(resultadoProductos)) {
            productos = resultadoProductos;
            cargarTablaProductos(productos);
        }
        
        // Cargamos sucursales
        const respuestaSucursales = await fetch(`${API_URL}/sucursales`);
        const resultadoSucursales = await respuestaSucursales.json();
        if (Array.isArray(resultadoSucursales)) {
            sucursales = resultadoSucursales;
            cargarTablaSucursales(sucursales);
        }
        
        // Cargamos pedidos con cliente y sucursal
        const respuestaPedidos = await fetch(`${API_URL}/pedidos`);
        const resultadoPedidos = await respuestaPedidos.json();
        if (Array.isArray(resultadoPedidos)) {
            pedidos = resultadoPedidos;
            cargarTablaPedidos(pedidos);
        }
        
        // Cargamos clientes
        const respuestaClientes = await fetch(`${API_URL}/clientes`);
        const resultadoClientes = await respuestaClientes.json();
        if (Array.isArray(resultadoClientes)) {
            clientes = resultadoClientes;
            cargarTablaClientes(clientes);
        }
        
        // Actualizamos los contadores del dashboard
        document.querySelector('.dashboard-card:nth-child(1) .dashboard-value').textContent = productos.length;
        document.querySelector('.dashboard-card:nth-child(2) .dashboard-value').textContent = sucursales.length;
        document.querySelector('.dashboard-card:nth-child(3) .dashboard-value').textContent = pedidos.length;
        document.querySelector('.dashboard-card:nth-child(4) .dashboard-value').textContent = clientes.length;
        
    } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Hubo un error al cargar los datos. Por favor, intenta nuevamente.");
    }
});

// Funciones para cargar tablas
function cargarTablaProductos(datos) {
    const tabla = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    datos.forEach(producto => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = producto.id;
        fila.insertCell(1).textContent = producto.nombre;
        fila.insertCell(2).textContent = producto.categoria;
        fila.insertCell(3).textContent = producto.sku;
        fila.insertCell(4).textContent = '$' + producto.precio;
        
        const celdaEstado = fila.insertCell(5);
        celdaEstado.textContent = producto.estado;
        if (producto.estado === 'Disponible') {
            celdaEstado.style.color = '#4CAF50';
        } else if (producto.estado === 'Agotado') {
            celdaEstado.style.color = '#F44336';
        }
    });
}

function cargarTablaSucursales(datos) {
    const tabla = document.getElementById('tablaSucursales').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    datos.forEach(sucursal => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = sucursal.id;
        fila.insertCell(1).textContent = sucursal.nombre;
        fila.insertCell(2).textContent = sucursal.direccion;
        fila.insertCell(3).textContent = sucursal.provincia;
        fila.insertCell(4).textContent = sucursal.telefono;
    });
}

function cargarTablaPedidos(datos) {
    const tabla = document.getElementById('tablaPedidos').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    datos.forEach(pedido => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = pedido.id;
        fila.insertCell(1).textContent = pedido.cliente;
        fila.insertCell(2).textContent = pedido.sucursal;
        fila.insertCell(3).textContent = pedido.fecha;
        fila.insertCell(4).textContent = '$' + pedido.total;
        
        const celdaEstado = fila.insertCell(5);
        celdaEstado.textContent = pedido.estado;
        if (pedido.estado === 'Entregado') {
            celdaEstado.style.color = '#4CAF50';
        } else if (pedido.estado === 'Enviado') {
            celdaEstado.style.color = '#2196F3';
        } else if (pedido.estado === 'En proceso') {
            celdaEstado.style.color = '#FF9800';
        } else {
            celdaEstado.style.color = '#F44336';
        }
    });
}

function cargarTablaClientes(datos) {
    const tabla = document.getElementById('tablaClientes').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    datos.forEach(cliente => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = cliente.id;
        fila.insertCell(1).textContent = cliente.nombre;
        fila.insertCell(2).textContent = cliente.apellido;
        fila.insertCell(3).textContent = cliente.email;
        fila.insertCell(4).textContent = cliente.telefono;
    });
}

// Funciones de búsqueda
function buscarProducto() {
    const terminoBusqueda = document.getElementById('buscarProducto').value.toLowerCase();
    
    // Filtramos los productos cargados desde la API
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(terminoBusqueda) || 
        producto.categoria.toLowerCase().includes(terminoBusqueda) || 
        producto.sku.toLowerCase().includes(terminoBusqueda)
    );
    
    cargarTablaProductos(productosFiltrados);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT p.id_Producto as id, p.Nombre as nombre, 
                 c.Nombre as categoria, p.SKU as sku, p.Precio_Lista as precio, p.Estado as estado 
                 FROM producto p JOIN categoria c ON p.categoria_id = c.id_Categoria 
                 WHERE p.Nombre LIKE '%${terminoBusqueda}%' OR c.Nombre LIKE '%${terminoBusqueda}%' 
                 OR p.SKU LIKE '%${terminoBusqueda}%'`);
}

function buscarSucursal() {
    const terminoBusqueda = document.getElementById('buscarSucursal').value.toLowerCase();
    
    // Filtramos las sucursales cargadas desde la API
    const sucursalesFiltradas = sucursales.filter(sucursal => 
        sucursal.nombre.toLowerCase().includes(terminoBusqueda) || 
        sucursal.direccion.toLowerCase().includes(terminoBusqueda) || 
        sucursal.provincia.toLowerCase().includes(terminoBusqueda)
    );
    
    cargarTablaSucursales(sucursalesFiltradas);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT id_Sucursal as id, nombre, direccion, provincia, telefono 
                 FROM sucursal 
                 WHERE nombre LIKE '%${terminoBusqueda}%' OR direccion LIKE '%${terminoBusqueda}%' 
                 OR provincia LIKE '%${terminoBusqueda}%'`);
}

function buscarPedido() {
    const terminoBusqueda = document.getElementById('buscarPedido').value.toLowerCase();
    
    // Filtramos los pedidos cargados desde la API
    const pedidosFiltrados = pedidos.filter(pedido => 
        pedido.cliente.toLowerCase().includes(terminoBusqueda) || 
        pedido.sucursal.toLowerCase().includes(terminoBusqueda) || 
        pedido.estado.toLowerCase().includes(terminoBusqueda)
    );
    
    cargarTablaPedidos(pedidosFiltrados);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT o.id_Orden as id, 
                 CONCAT(c.nombre, ' ', c.apellido) as cliente,
                 s.nombre as sucursal, o.fecha, o.total, o.estado
                 FROM orden_de_compra o
                 JOIN cliente c ON o.cliente_id = c.id_Cliente
                 JOIN sucursal s ON o.sucursal_id = s.id_Sucursal
                 WHERE CONCAT(c.nombre, ' ', c.apellido) LIKE '%${terminoBusqueda}%' 
                 OR s.nombre LIKE '%${terminoBusqueda}%' OR o.estado LIKE '%${terminoBusqueda}%'`);
}

function buscarCliente() {
    const terminoBusqueda = document.getElementById('buscarCliente').value.toLowerCase();
    
    // Filtramos los clientes cargados desde la API
    const clientesFiltrados = clientes.filter(cliente => 
        cliente.nombre.toLowerCase().includes(terminoBusqueda) || 
        cliente.apellido.toLowerCase().includes(terminoBusqueda) || 
        cliente.email.toLowerCase().includes(terminoBusqueda)
    );
    
    cargarTablaClientes(clientesFiltrados);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT id_Cliente as id, nombre, apellido, email, telefono
                 FROM cliente 
                 WHERE nombre LIKE '%${terminoBusqueda}%' OR apellido LIKE '%${terminoBusqueda}%' 
                 OR email LIKE '%${terminoBusqueda}%'`);
}