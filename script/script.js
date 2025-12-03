// URL base de tu API
const API_URL = 'http://localhost:3000/api';

// Datos obtenidos de la API
let productos = [];
let sucursales = [];
let clientes = [];
let pedidos = [];
let categorias = [];
let personal = [];
let ordenes = [];
let metodosPago = [];
let ordenPagos = [];

// Función para mostrar mensajes del sistema
function mostrarMensajeSistema(tipo, mensaje, duracion = 5000, detalles = null) {
    const mensajeElement = document.getElementById('mensajeSistema');
    if (!mensajeElement) return;
    
    // Eliminar todas las clases
    mensajeElement.classList.remove('success', 'error', 'info');
    
    // Añadir la clase según el tipo
    mensajeElement.classList.add(tipo);
    
    // Preparar el contenido HTML del mensaje
    let contenidoHTML = mensaje;
    
    // Si es un error y hay detalles, añadirlos
    if (tipo === 'error' && detalles) {
        contenidoHTML += `<div class="mensaje-detalles">${detalles}</div>`;
    }
    
    // Si es un error, añadir un botón para ver más detalles en la consola
    if (tipo === 'error') {
        mensajeElement.innerHTML = `
            <div>${mensaje}</div>
            ${detalles ? `<div class="mensaje-detalles">${detalles}</div>` : ''}
            <div class="mensaje-footer">
                <button onclick="console.log('Detalles del error:', ${JSON.stringify(mensaje)})" class="btn-detalles">
                    Ver detalles técnicos en la consola
                </button>
            </div>
        `;
    } else {
        // Para mensajes normales, simplemente establecer el texto
        mensajeElement.textContent = mensaje;
    }
    
    // Mostrar el elemento
    mensajeElement.style.display = 'block';
    
    // Hacer scroll al principio para que sea visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Para errores, mantener el mensaje visible por más tiempo
    const tiempoMostrado = tipo === 'error' ? 10000 : duracion;
    
    // Ocultar el mensaje después de la duración especificada
    setTimeout(() => {
        mensajeElement.style.opacity = '0';
        setTimeout(() => {
            mensajeElement.style.display = 'none';
            mensajeElement.style.opacity = '1';
        }, 500);
    }, tiempoMostrado);
}

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
            console.log(`Productos cargados: ${productos.length}`);
        }
        
        // Cargamos categorías 
        const respuestaCategorias = await fetch(`${API_URL}/categorias`);
        const resultadoCategorias = await respuestaCategorias.json();
        if (Array.isArray(resultadoCategorias)) {
            categorias = resultadoCategorias;
            cargarTablaCategorias(categorias);
            console.log(`Categorías cargadas: ${categorias.length}`);
        }
        
        // Cargamos sucursales
        const respuestaSucursales = await fetch(`${API_URL}/sucursales`);
        const resultadoSucursales = await respuestaSucursales.json();
        if (Array.isArray(resultadoSucursales)) {
            sucursales = resultadoSucursales;
            cargarTablaSucursales(sucursales);
            console.log(`Sucursales cargadas: ${sucursales.length}`);
        }
        
        // Cargamos pedidos con cliente y sucursal
        const respuestaPedidos = await fetch(`${API_URL}/pedidos`);
        const resultadoPedidos = await respuestaPedidos.json();
        if (Array.isArray(resultadoPedidos)) {
            pedidos = resultadoPedidos;
            cargarTablaPedidos(pedidos);
            console.log(`Pedidos cargados: ${pedidos.length}`);
        }

        // Cargamos órdenes de compra
        const respuestaOrdenes = await fetch(`${API_URL}/ordenesCompra`);
        const resultadoOrdenes = await respuestaOrdenes.json();
        if (Array.isArray(resultadoOrdenes)) {
            ordenes = resultadoOrdenes;
            cargarTablaOrdenes(ordenes);
            console.log(`Órdenes cargadas: ${ordenes.length}`);
        } else {
            console.error('Error: ordenesCompra no es un array', resultadoOrdenes);
        }
        
        // Cargamos clientes
        const respuestaClientes = await fetch(`${API_URL}/clientes`);
        const resultadoClientes = await respuestaClientes.json();
        if (Array.isArray(resultadoClientes)) {
            clientes = resultadoClientes;
            cargarTablaClientes(clientes);
            console.log(`Clientes cargados: ${clientes.length}`);
        }

        // Cargamos personal
        const respuestaPersonal = await fetch(`${API_URL}/personal`);
        const resultadoPersonal = await respuestaPersonal.json();
        if (Array.isArray(resultadoPersonal)) {
            personal = resultadoPersonal;
            cargarTablaPersonal(personal);
            console.log(`Personal cargado: ${personal.length}`);
        } else {
            console.error('Error: personal no es un array', resultadoPersonal);
        }

        // Cargamos métodos de pago para uso interno
        const respuestaMetodos = await fetch(`${API_URL}/metodosPago`);
        const resultadoMetodos = await respuestaMetodos.json();
        if (Array.isArray(resultadoMetodos)) {
            metodosPago = resultadoMetodos;
        }
        
        // Actualizamos los contadores del dashboard
        document.querySelector('.dashboard-card:nth-child(1) .dashboard-value').textContent = productos.length;
        document.querySelector('.dashboard-card:nth-child(2) .dashboard-value').textContent = categorias.length;
        document.querySelector('.dashboard-card:nth-child(3) .dashboard-value').textContent = sucursales.length;
        document.querySelector('.dashboard-card:nth-child(4) .dashboard-value').textContent = pedidos.length;
        document.querySelector('.dashboard-card:nth-child(5) .dashboard-value').textContent = clientes.length;
        document.querySelector('.dashboard-card:nth-child(6) .dashboard-value').textContent = personal.length;
        
        // Inicializamos los formularios
        inicializarFormularios();
        
        // Configuramos el manejo de pestañas
        configurarPestanas();
        
    } catch (error) {
        console.error("Error al cargar datos:", error);
        
        // Extraer información más específica del error
        let mensajeError = "Hubo un error al cargar los datos.";
        
        // Extraer mensaje específico si existe
        if (error.message) {
            mensajeError += " Causa: " + error.message;
        }
        
        // Si es un error de red, indicarlo
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            mensajeError = "Error de conexión: No se pudo conectar al servidor. Verifique que el servidor esté en ejecución.";
        }
        
        // Si es un error CORS
        if (error.message && error.message.includes('CORS')) {
            mensajeError = "Error de permisos CORS: No se puede acceder al servidor desde este origen.";
        }
        
        // Mostrar el mensaje con detalles
        mostrarMensajeSistema('error', mensajeError);
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
    if (!tabla) {
        console.error('No se encontró la tabla de sucursales');
        return;
    }
    
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

function cargarTablaCategorias(datos) {
    const tabla = document.getElementById('tablaCategorias').getElementsByTagName('tbody')[0];
    if (!tabla) {
        console.error('No se encontró la tabla de categorías');
        return;
    }
    
    tabla.innerHTML = '';
    
    datos.forEach(categoria => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = categoria.id;
        fila.insertCell(1).textContent = categoria.nombre;
        fila.insertCell(2).textContent = categoria.descripcion || '-';
    });
}

function cargarTablaPedidos(datos) {
    const tabla = document.getElementById('tablaPedidos').getElementsByTagName('tbody')[0];
    if (!tabla) {
        console.error('No se encontró la tabla de pedidos');
        return;
    }
    
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

function cargarTablaPersonal(datos) {
    const tabla = document.getElementById('tablaPersonal').getElementsByTagName('tbody')[0];
    if (!tabla) {
        console.error('No se encontró la tabla de personal');
        return;
    }
    
    tabla.innerHTML = '';
    
    datos.forEach(empleado => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = empleado.id;
        fila.insertCell(1).textContent = empleado.nombre;
        fila.insertCell(2).textContent = empleado.apellido;
        fila.insertCell(3).textContent = empleado.email;
        fila.insertCell(4).textContent = empleado.rol;
    });
}

function cargarTablaOrdenes(datos) {
    const tabla = document.getElementById('tablaOrdenes').getElementsByTagName('tbody')[0];
    if (!tabla) {
        console.error('No se encontró la tabla de órdenes de compra');
        return;
    }
    
    tabla.innerHTML = '';
    
    datos.forEach(orden => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = orden.id;
        fila.insertCell(1).textContent = orden.cliente;
        fila.insertCell(2).textContent = orden.sucursal;
        fila.insertCell(3).textContent = orden.fecha;
        fila.insertCell(4).textContent = '$' + orden.total;
        
        const celdaEstado = fila.insertCell(5);
        celdaEstado.textContent = orden.estado;
        if (orden.estado === 'Entregado') {
            celdaEstado.style.color = '#4CAF50';
        } else if (orden.estado === 'Enviado') {
            celdaEstado.style.color = '#2196F3';
        } else if (orden.estado === 'En proceso') {
            celdaEstado.style.color = '#FF9800';
        } else if (orden.estado === 'Cancelado') {
            celdaEstado.style.color = '#F44336';
        } else {
            celdaEstado.style.color = '#9E9E9E';
        }
        
        const celdaAcciones = fila.insertCell(6);
        const btnVerDetalle = document.createElement('button');
        btnVerDetalle.textContent = 'Ver';
        btnVerDetalle.className = 'btn-ver-detalle';
        btnVerDetalle.addEventListener('click', () => verDetalleOrden(orden.id));
        celdaAcciones.appendChild(btnVerDetalle);
    });
    
    // Configurar el evento para cerrar los detalles
    const btnCerrar = document.getElementById('cerrarDetalle');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            document.getElementById('detalleOrden').style.display = 'none';
        });
    }
}

function cargarTablaCategorias(datos) {
    const tabla = document.getElementById('tablaCategorias').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    datos.forEach(categoria => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = categoria.id;
        fila.insertCell(1).textContent = categoria.nombre;
        fila.insertCell(2).textContent = categoria.descripcion || '-';
    });
}

function cargarTablaClientes(datos) {
    const tabla = document.getElementById('tablaClientes').getElementsByTagName('tbody')[0];
    if (!tabla) {
        console.error('No se encontró la tabla de clientes');
        return;
    }
    
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

function cargarTablaPersonal(datos) {
    const tabla = document.getElementById('tablaPersonal').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    datos.forEach(empleado => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = empleado.id;
        fila.insertCell(1).textContent = empleado.nombre;
        fila.insertCell(2).textContent = empleado.apellido;
        fila.insertCell(3).textContent = empleado.email;
        fila.insertCell(4).textContent = empleado.rol;
        // Mostrar la sucursal o "Global" si no tiene sucursal asignada
        fila.insertCell(5).textContent = empleado.sucursalNombre || "Global";
    });
}

function cargarTablaOrdenes(datos) {
    const tabla = document.getElementById('tablaOrdenes').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    
    datos.forEach(orden => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = orden.id;
        fila.insertCell(1).textContent = orden.cliente;
        fila.insertCell(2).textContent = orden.sucursal;
        fila.insertCell(3).textContent = orden.fecha;
        fila.insertCell(4).textContent = '$' + orden.total;
        
        const celdaEstado = fila.insertCell(5);
        celdaEstado.textContent = orden.estado;
        if (orden.estado === 'Entregado') {
            celdaEstado.style.color = '#4CAF50';
        } else if (orden.estado === 'Enviado') {
            celdaEstado.style.color = '#2196F3';
        } else if (orden.estado === 'En proceso') {
            celdaEstado.style.color = '#FF9800';
        } else if (orden.estado === 'Cancelado') {
            celdaEstado.style.color = '#F44336';
        } else {
            celdaEstado.style.color = '#9E9E9E';
        }
        
        const celdaAcciones = fila.insertCell(6);
        const btnVerDetalle = document.createElement('button');
        btnVerDetalle.textContent = 'Ver';
        btnVerDetalle.className = 'btn-ver-detalle';
        btnVerDetalle.addEventListener('click', () => verDetalleOrden(orden.id));
        celdaAcciones.appendChild(btnVerDetalle);
    });
    
    // Configurar el evento para cerrar los detalles
    document.getElementById('cerrarDetalle').addEventListener('click', () => {
        document.getElementById('detalleOrden').style.display = 'none';
    });
}

async function verDetalleOrden(ordenId) {
    try {
        // Obtener detalles de la orden
        const respuesta = await fetch(`${API_URL}/ordenesCompra/${ordenId}`);
        const detalleOrden = await respuesta.json();
        
        if (detalleOrden) {
            // Cargar información básica de la orden
            document.getElementById('orden-id').textContent = detalleOrden.id;
            document.getElementById('orden-cliente').textContent = detalleOrden.cliente;
            document.getElementById('orden-sucursal').textContent = detalleOrden.sucursal;
            document.getElementById('orden-fecha').textContent = detalleOrden.fecha;
            document.getElementById('orden-estado').textContent = detalleOrden.estado;
            document.getElementById('orden-total').textContent = '$' + detalleOrden.total;
            
            // Cargar información del pago
            if (detalleOrden.pago) {
                document.getElementById('orden-metodo-pago').textContent = detalleOrden.pago.metodo;
                document.getElementById('orden-total-pagado').textContent = '$' + detalleOrden.pago.total_pagado;
                document.getElementById('orden-moneda').textContent = detalleOrden.pago.moneda;
                
                // Si hay información de criptomoneda, mostrarla
                if (detalleOrden.pago.cripto) {
                    document.getElementById('seccion-cripto').style.display = 'block';
                    document.getElementById('cripto-moneda').textContent = detalleOrden.pago.cripto.moneda;
                    document.getElementById('cripto-hash').textContent = detalleOrden.pago.cripto.hash;
                    document.getElementById('cripto-wallet').textContent = detalleOrden.pago.cripto.wallet_cliente;
                } else {
                    document.getElementById('seccion-cripto').style.display = 'none';
                }
            } else {
                document.getElementById('orden-metodo-pago').textContent = 'No disponible';
                document.getElementById('orden-total-pagado').textContent = 'No disponible';
                document.getElementById('orden-moneda').textContent = 'No disponible';
                document.getElementById('seccion-cripto').style.display = 'none';
            }
            
            // Cargar productos de la orden
            const tablaDetalleBody = document.getElementById('tablaDetalleOrden').getElementsByTagName('tbody')[0];
            tablaDetalleBody.innerHTML = '';
            
            if (detalleOrden.productos && detalleOrden.productos.length > 0) {
                detalleOrden.productos.forEach(prod => {
                    const fila = tablaDetalleBody.insertRow();
                    fila.insertCell(0).textContent = prod.nombre;
                    fila.insertCell(1).textContent = prod.cantidad;
                    fila.insertCell(2).textContent = '$' + prod.precio_unitario;
                    fila.insertCell(3).textContent = '$' + (prod.cantidad * prod.precio_unitario).toFixed(2);
                });
            } else {
                const fila = tablaDetalleBody.insertRow();
                const celdaVacia = fila.insertCell(0);
                celdaVacia.textContent = 'No hay productos asociados a esta orden';
                celdaVacia.colSpan = 4;
                celdaVacia.style.textAlign = 'center';
            }
            
            // Mostrar el panel de detalles
            document.getElementById('detalleOrden').style.display = 'block';
            
        } else {
            mostrarMensajeSistema('error', 'No se encontraron detalles para esta orden');
        }
        
    } catch (error) {
        console.error('Error al obtener detalles de la orden:', error);
        
        let mensajeError = 'Error al cargar los detalles de la orden.';
        let detallesError = '';
        
        if (error.message) {
            detallesError = `Detalles técnicos: ${error.message}`;
        }
        
        if (error.response && error.response.status) {
            detallesError += ` (Código de estado: ${error.response.status})`;
        }
        
        mostrarMensajeSistema('error', mensajeError, 7000, detallesError);
    }
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

function buscarCategoria() {
    const terminoBusqueda = document.getElementById('buscarCategoria').value.toLowerCase();
    
    // Filtramos las categorías cargadas desde la API
    const categoriasFiltradas = categorias.filter(categoria => 
        categoria.nombre.toLowerCase().includes(terminoBusqueda) || 
        (categoria.descripcion && categoria.descripcion.toLowerCase().includes(terminoBusqueda))
    );
    
    cargarTablaCategorias(categoriasFiltradas);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT id_Categoria as id, Nombre as nombre, Descripcion as descripcion
                 FROM categoria 
                 WHERE Nombre LIKE '%${terminoBusqueda}%' OR Descripcion LIKE '%${terminoBusqueda}%'`);
}

function buscarPersonal() {
    const terminoBusqueda = document.getElementById('buscarPersonal').value.toLowerCase();
    
    // Filtramos el personal cargado desde la API
    const personalFiltrado = personal.filter(empleado => 
        empleado.nombre.toLowerCase().includes(terminoBusqueda) || 
        empleado.apellido.toLowerCase().includes(terminoBusqueda) || 
        empleado.email.toLowerCase().includes(terminoBusqueda) || 
        empleado.rol.toLowerCase().includes(terminoBusqueda)
    );
    
    cargarTablaPersonal(personalFiltrado);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT p.id_Personal as id, p.nombre, p.apellido, p.email, r.nombre as rol
                 FROM personal p
                 JOIN rol_personal r ON p.rol_id = r.id_Rol
                 WHERE p.nombre LIKE '%${terminoBusqueda}%' OR p.apellido LIKE '%${terminoBusqueda}%' 
                 OR p.email LIKE '%${terminoBusqueda}%' OR r.nombre LIKE '%${terminoBusqueda}%'`);
}

function buscarOrden() {
    const terminoBusqueda = document.getElementById('buscarOrden').value.toLowerCase();
    
    // Filtramos las órdenes cargadas desde la API
    const ordenesFiltradas = ordenes.filter(orden => 
        orden.cliente.toLowerCase().includes(terminoBusqueda) || 
        orden.sucursal.toLowerCase().includes(terminoBusqueda) || 
        orden.estado.toLowerCase().includes(terminoBusqueda) ||
        orden.id.toString().includes(terminoBusqueda)
    );
    
    cargarTablaOrdenes(ordenesFiltradas);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT o.id_Orden AS id, 
                 CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                 s.nombre AS sucursal, o.fecha, o.total, o.canal, o.estado
                 FROM orden_de_compra o
                 JOIN cliente c ON o.cliente_id = c.id_Cliente
                 JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal
                 WHERE CONCAT(c.nombre, ' ', c.apellido) LIKE '%${terminoBusqueda}%' 
                 OR s.nombre LIKE '%${terminoBusqueda}%' OR o.estado LIKE '%${terminoBusqueda}%'
                 OR o.id_Orden LIKE '%${terminoBusqueda}%'`);
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

function buscarCategoria() {
    const terminoBusqueda = document.getElementById('buscarCategoria').value.toLowerCase();
    
    // Filtramos las categorías cargadas desde la API
    const categoriasFiltradas = categorias.filter(categoria => 
        categoria.nombre.toLowerCase().includes(terminoBusqueda) || 
        (categoria.descripcion && categoria.descripcion.toLowerCase().includes(terminoBusqueda))
    );
    
    cargarTablaCategorias(categoriasFiltradas);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT id_Categoria as id, Nombre as nombre, Descripcion as descripcion
                 FROM categoria 
                 WHERE Nombre LIKE '%${terminoBusqueda}%' OR Descripcion LIKE '%${terminoBusqueda}%'`);
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

function buscarPersonal() {
    const terminoBusqueda = document.getElementById('buscarPersonal').value.toLowerCase();
    
    // Filtramos el personal cargado desde la API
    const personalFiltrado = personal.filter(empleado => 
        empleado.nombre.toLowerCase().includes(terminoBusqueda) || 
        empleado.apellido.toLowerCase().includes(terminoBusqueda) || 
        empleado.email.toLowerCase().includes(terminoBusqueda) || 
        empleado.rol.toLowerCase().includes(terminoBusqueda)
    );
    
    cargarTablaPersonal(personalFiltrado);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT p.id_Personal as id, p.nombre, p.apellido, p.email, r.nombre as rol
                 FROM personal p
                 JOIN rol_personal r ON p.rol_id = r.id_Rol
                 WHERE p.nombre LIKE '%${terminoBusqueda}%' OR p.apellido LIKE '%${terminoBusqueda}%' 
                 OR p.email LIKE '%${terminoBusqueda}%' OR r.nombre LIKE '%${terminoBusqueda}%'`);
}

function buscarOrden() {
    const terminoBusqueda = document.getElementById('buscarOrden').value.toLowerCase();
    
    // Filtramos las órdenes cargadas desde la API
    const ordenesFiltradas = ordenes.filter(orden => 
        orden.cliente.toLowerCase().includes(terminoBusqueda) || 
        orden.sucursal.toLowerCase().includes(terminoBusqueda) || 
        orden.estado.toLowerCase().includes(terminoBusqueda) ||
        orden.id.toString().includes(terminoBusqueda)
    );
    
    cargarTablaOrdenes(ordenesFiltradas);
    
    // Mostramos la consulta SQL que se ejecutaría en un entorno real
    console.log(`SQL ejecutado en el servidor: SELECT o.id_Orden AS id, 
                 CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                 s.nombre AS sucursal, o.fecha, o.total, o.canal, o.estado
                 FROM orden_de_compra o
                 JOIN cliente c ON o.cliente_id = c.id_Cliente
                 JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal
                 WHERE CONCAT(c.nombre, ' ', c.apellido) LIKE '%${terminoBusqueda}%' 
                 OR s.nombre LIKE '%${terminoBusqueda}%' OR o.estado LIKE '%${terminoBusqueda}%'
                 OR o.id_Orden LIKE '%${terminoBusqueda}%'`);
}

// Función para manejar pestañas
function configurarPestanas() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            // Desactivamos todas las pestañas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activamos la pestaña seleccionada
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Si estamos activando la pestaña de nuevo pedido, recargamos los datos de los selectores
            if (tabId === 'nuevoPedido') {
                console.log("Recargando datos para el formulario de pedidos");
                
                // Actualizar los selectores de productos
                document.querySelectorAll('.producto-select').forEach(select => {
                    cargarProductosEnSelect(select);
                });
                
                // Actualizar el selector de clientes
                const selectCliente = document.getElementById('pedidoCliente');
                selectCliente.innerHTML = '<option value="">Seleccione un cliente</option>';
                clientes.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.id;
                    option.textContent = `${cliente.nombre} ${cliente.apellido}`;
                    selectCliente.appendChild(option);
                });
                
                // Actualizar el selector de sucursales
                const selectSucursal = document.getElementById('pedidoSucursal');
                selectSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';
                sucursales.forEach(sucursal => {
                    const option = document.createElement('option');
                    option.value = sucursal.id;
                    option.textContent = sucursal.nombre;
                    selectSucursal.appendChild(option);
                });
            }
        });
    });
}

// Función para inicializar los formularios
function inicializarFormularios() {
    // Inicializar el formulario de nuevo pedido
    inicializarFormularioPedido();
    
    // Inicializar el formulario de nuevo producto
    inicializarFormularioProducto();
    
    // Inicializar el formulario de nueva categoría
    inicializarFormularioCategoria();
    
    // Inicializar el formulario de nueva sucursal
    inicializarFormularioSucursal();
    
    // Inicializar el formulario de nuevo cliente
    inicializarFormularioCliente();
    
    // Inicializar el formulario de nuevo empleado
    inicializarFormularioEmpleado();
}

function inicializarFormularioPedido() {
    // Cargar la lista de clientes en el select
    const selectCliente = document.getElementById('pedidoCliente');
    selectCliente.innerHTML = '<option value="">Seleccione un cliente</option>';
    
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nombre} ${cliente.apellido}`;
        selectCliente.appendChild(option);
    });
    
    // Cargar la lista de sucursales en el select
    const selectSucursal = document.getElementById('pedidoSucursal');
    selectSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';
    
    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        selectSucursal.appendChild(option);
    });
    
    // Cargar la lista de productos en el select
    cargarProductosEnSelect(document.querySelector('.producto-select'));
    
    // Configurar botón para agregar más productos
    document.getElementById('agregarProducto').addEventListener('click', () => {
        const productosContainer = document.getElementById('productosContainer');
        const nuevoProducto = document.createElement('div');
        nuevoProducto.className = 'producto-item';
        
        nuevoProducto.innerHTML = `
            <select class="producto-select" required>
                <option value="">Seleccione un producto</option>
            </select>
            <input type="number" class="producto-cantidad" placeholder="Cantidad" min="1" value="1" required>
            <button type="button" class="remove-producto">Eliminar</button>
        `;
        
        // Cargar productos en el nuevo select
        cargarProductosEnSelect(nuevoProducto.querySelector('.producto-select'));
        
        // Configurar botón de eliminar
        const btnEliminar = nuevoProducto.querySelector('.remove-producto');
        btnEliminar.addEventListener('click', () => {
            productosContainer.removeChild(nuevoProducto);
            calcularTotalPedido();
        });
        
        // Configurar cambios en cantidad para actualizar total
        nuevoProducto.querySelector('.producto-cantidad').addEventListener('change', calcularTotalPedido);
        nuevoProducto.querySelector('.producto-select').addEventListener('change', calcularTotalPedido);
        
        productosContainer.appendChild(nuevoProducto);
        
        // Mostrar todos los botones de eliminar si hay más de un producto
        if (productosContainer.querySelectorAll('.producto-item').length > 1) {
            productosContainer.querySelectorAll('.remove-producto').forEach(btn => {
                btn.style.display = 'block';
            });
        }
    });
    
    // Configurar eventos para calcular el total
    document.querySelectorAll('.producto-cantidad, .producto-select').forEach(el => {
        el.addEventListener('change', calcularTotalPedido);
    });
    
    // Configurar envío del formulario
    document.getElementById('formPedido').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const clienteId = document.getElementById('pedidoCliente').value;
            const sucursalId = document.getElementById('pedidoSucursal').value;
            
            // Obtener todos los productos seleccionados
            const productosItems = document.querySelectorAll('.producto-item');
            const productos = [];
            
            productosItems.forEach(item => {
                const productoId = item.querySelector('.producto-select').value;
                const cantidad = item.querySelector('.producto-cantidad').value;
                
                if (productoId && cantidad) {
                    productos.push({
                        producto_id: productoId,
                        cantidad: parseInt(cantidad)
                    });
                }
            });
            
            // Validar que hay al menos un producto
            if (productos.length === 0) {
                mostrarMensajeSistema('error', 'Por favor, seleccione al menos un producto para el pedido.');
                return;
            }
            
            // Preparar datos para enviar
            const pedido = {
                cliente_id: clienteId,
                sucursal_id: sucursalId,
                productos: productos,
                fecha: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
                estado: 'Pendiente'
            };
            
            // Enviar al servidor
            const respuesta = await fetch(`${API_URL}/pedidos/nuevo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedido)
            });
            
            const resultado = await respuesta.json();
            
            if (resultado.success) {
                mostrarMensajeSistema('success', 'Pedido creado correctamente');
                
                // Limpiar formulario
                document.getElementById('formPedido').reset();
                
                // Actualizar la lista de pedidos
                const respuestaPedidos = await fetch(`${API_URL}/pedidos`);
                const resultadoPedidos = await respuestaPedidos.json();
                if (Array.isArray(resultadoPedidos)) {
                    pedidos = resultadoPedidos;
                    cargarTablaPedidos(pedidos);
                    document.querySelector('.dashboard-card:nth-child(3) .dashboard-value').textContent = pedidos.length;
                }
                
                // Mantener sólo un producto en la lista
                const productosContainer = document.getElementById('productosContainer');
                while (productosContainer.children.length > 1) {
                    productosContainer.removeChild(productosContainer.lastChild);
                }
                
                // Resetear el primer producto
                const primerProducto = productosContainer.querySelector('.producto-item');
                primerProducto.querySelector('.producto-select').value = '';
                primerProducto.querySelector('.producto-cantidad').value = '1';
                
                // Resetear el total
                document.getElementById('pedidoTotal').value = '';
            } else {
                mostrarMensajeSistema('error', 'Error al crear pedido: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar pedido:', error);
            let detalleError = error.message || 'Error en la conexión con el servidor';
            mostrarMensajeSistema('error', 'Error al crear pedido.', 5000, detalleError);
        }
    });
}

function cargarProductosEnSelect(select) {
    select.innerHTML = '<option value="">Seleccione un producto</option>';
    
    console.log("Cargando productos en selector:", productos);
    
    if (productos.length === 0) {
        console.warn("No hay productos disponibles para cargar en el selector");
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "No hay productos disponibles";
        option.disabled = true;
        select.appendChild(option);
        return;
    }
    
    productos.forEach(producto => {
        // Mostramos todos los productos, incluso los agotados
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = `${producto.nombre} - $${producto.precio}`;
        
        // Si está agotado, lo indicamos en el texto y lo deshabilitamos
        if (producto.estado !== 'Disponible') {
            option.textContent += ' (Agotado)';
            option.disabled = true; // Deshabilitar productos agotados
        }
        
        option.dataset.precio = producto.precio;
        select.appendChild(option);
    });
}

function calcularTotalPedido() {
    let total = 0;
    
    document.querySelectorAll('.producto-item').forEach(item => {
        const select = item.querySelector('.producto-select');
        const cantidad = item.querySelector('.producto-cantidad').value;
        
        if (select.value) {
            const option = select.options[select.selectedIndex];
            const precio = parseFloat(option.dataset.precio);
            total += precio * parseInt(cantidad);
        }
    });
    
    document.getElementById('pedidoTotal').value = '$' + total.toFixed(2);
}

function inicializarFormularioProducto() {
    // Cargar categorías
    const selectCategoria = document.getElementById('productoCategoria');
    selectCategoria.innerHTML = '<option value="">Seleccione una categoría</option>';
    
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        selectCategoria.appendChild(option);
    });
    
    // Configurar envío del formulario
    document.getElementById('formProducto').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const nombre = document.getElementById('productoNombre').value;
            const categoriaId = document.getElementById('productoCategoria').value;
            const sku = document.getElementById('productoSKU').value;
            const precio = document.getElementById('productoPrecio').value;
            const estado = document.getElementById('productoEstado').value;
            
            // Preparar datos para enviar
            const producto = {
                nombre: nombre,
                categoria_id: categoriaId,
                sku: sku,
                precio: precio,
                estado: estado
            };
            
            // Enviar al servidor
            const respuesta = await fetch(`${API_URL}/productos/nuevo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto)
            });
            
            const resultado = await respuesta.json();
            
            if (resultado.success) {
                mostrarMensajeSistema('success', 'Producto agregado correctamente');
                
                // Limpiar formulario
                document.getElementById('formProducto').reset();
                
                // Actualizar la lista de productos
                const respuestaProductos = await fetch(`${API_URL}/productos`);
                const resultadoProductos = await respuestaProductos.json();
                if (Array.isArray(resultadoProductos)) {
                    productos = resultadoProductos;
                    cargarTablaProductos(productos);
                    document.querySelector('.dashboard-card:nth-child(1) .dashboard-value').textContent = productos.length;
                    
                    // Actualizar los selectores de productos en el formulario de pedidos
                    console.log("Actualizando selectores de productos después de agregar uno nuevo");
                    document.querySelectorAll('.producto-select').forEach(select => {
                        cargarProductosEnSelect(select);
                    });
                }
            } else {
                mostrarMensajeSistema('error', 'Error al agregar producto: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar producto:', error);
            let detalleError = error.message || 'Error en la conexión con el servidor';
            mostrarMensajeSistema('error', 'Error al agregar producto.', 5000, detalleError);
        }
    });
}

function inicializarFormularioSucursal() {
    // Configurar envío del formulario
    document.getElementById('formSucursal').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const nombre = document.getElementById('sucursalNombre').value;
            const direccion = document.getElementById('sucursalDireccion').value;
            const provincia = document.getElementById('sucursalProvincia').value;
            const telefono = document.getElementById('sucursalTelefono').value;
            
            // Preparar datos para enviar
            const sucursal = {
                nombre: nombre,
                direccion: direccion,
                provincia: provincia,
                telefono: telefono
            };
            
            // Enviar al servidor
            const respuesta = await fetch(`${API_URL}/sucursales/nueva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sucursal)
            });
            
            const resultado = await respuesta.json();
            
            if (resultado.success) {
                mostrarMensajeSistema('success', 'Sucursal agregada correctamente');
                
                // Limpiar formulario
                document.getElementById('formSucursal').reset();
                
                // Actualizar la lista de sucursales
                const respuestaSucursales = await fetch(`${API_URL}/sucursales`);
                const resultadoSucursales = await respuestaSucursales.json();
                if (Array.isArray(resultadoSucursales)) {
                    sucursales = resultadoSucursales;
                    cargarTablaSucursales(sucursales);
                    document.querySelector('.dashboard-card:nth-child(2) .dashboard-value').textContent = sucursales.length;
                    
                    // Actualizar los selectores de sucursales en otros formularios
                    const selectPedidoSucursal = document.getElementById('pedidoSucursal');
                    const selectEmpleadoSucursal = document.getElementById('empleadoSucursal');
                    
                    // Actualizar selector en formulario de pedidos
                    selectPedidoSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';
                    sucursales.forEach(sucursal => {
                        const option = document.createElement('option');
                        option.value = sucursal.id;
                        option.textContent = sucursal.nombre;
                        selectPedidoSucursal.appendChild(option);
                    });
                    
                    // Actualizar selector en formulario de empleados
                    selectEmpleadoSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';
                    sucursales.forEach(sucursal => {
                        const option = document.createElement('option');
                        option.value = sucursal.id;
                        option.textContent = sucursal.nombre;
                        selectEmpleadoSucursal.appendChild(option);
                    });
                }
            } else {
                mostrarMensajeSistema('error', 'Error al agregar sucursal: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar sucursal:', error);
            let detalleError = error.message || 'Error en la conexión con el servidor';
            mostrarMensajeSistema('error', 'Error al agregar sucursal.', 5000, detalleError);
        }
    });
}

function inicializarFormularioCliente() {
    // Configurar envío del formulario
    document.getElementById('formCliente').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const nombre = document.getElementById('clienteNombre').value;
            const apellido = document.getElementById('clienteApellido').value;
            const email = document.getElementById('clienteEmail').value;
            const telefono = document.getElementById('clienteTelefono').value;
            
            // Preparar datos para enviar
            const cliente = {
                nombre: nombre,
                apellido: apellido,
                email: email,
                telefono: telefono
            };
            
            // Enviar al servidor
            const respuesta = await fetch(`${API_URL}/clientes/nuevo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente)
            });
            
            const resultado = await respuesta.json();
            
            if (resultado.success) {
                mostrarMensajeSistema('success', 'Cliente agregado correctamente');
                
                // Limpiar formulario
                document.getElementById('formCliente').reset();
                
                // Actualizar la lista de clientes
                const respuestaClientes = await fetch(`${API_URL}/clientes`);
                const resultadoClientes = await respuestaClientes.json();
                if (Array.isArray(resultadoClientes)) {
                    clientes = resultadoClientes;
                    cargarTablaClientes(clientes);
                    document.querySelector('.dashboard-card:nth-child(4) .dashboard-value').textContent = clientes.length;
                    
                    // Actualizar el selector de clientes en el formulario de pedidos
                    const selectCliente = document.getElementById('pedidoCliente');
                    selectCliente.innerHTML = '<option value="">Seleccione un cliente</option>';
                    
                    clientes.forEach(cliente => {
                        const option = document.createElement('option');
                        option.value = cliente.id;
                        option.textContent = `${cliente.nombre} ${cliente.apellido}`;
                        selectCliente.appendChild(option);
                    });
                }
            } else {
                mostrarMensajeSistema('error', 'Error al agregar cliente: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar cliente:', error);
            let detalleError = error.message || 'Error en la conexión con el servidor';
            mostrarMensajeSistema('error', 'Error al agregar cliente.', 5000, detalleError);
        }
    });
}

function inicializarFormularioCategoria() {
    // Configurar envío del formulario de categoría
    document.getElementById('formCategoria').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const nombre = document.getElementById('categoriaNombre').value;
            const descripcion = document.getElementById('categoriaDescripcion').value || '';
            
            // Preparar datos para enviar
            const categoria = {
                nombre: nombre,
                descripcion: descripcion
            };
            
            // Enviar al servidor
            const respuesta = await fetch(`${API_URL}/categorias/nueva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoria)
            });
            
            const resultado = await respuesta.json();
            
            if (resultado.success) {
                mostrarMensajeSistema('success', 'Categoría agregada correctamente');
                
                // Limpiar formulario
                document.getElementById('formCategoria').reset();
                
                // Actualizar la lista de categorías
                const respuestaCategorias = await fetch(`${API_URL}/categorias`);
                const resultadoCategorias = await respuestaCategorias.json();
                if (Array.isArray(resultadoCategorias)) {
                    categorias = resultadoCategorias;
                    
                    // Actualizar el selector de categorías en el formulario de productos
                    const selectCategoria = document.getElementById('productoCategoria');
                    selectCategoria.innerHTML = '<option value="">Seleccione una categoría</option>';
                    
                    categorias.forEach(categoria => {
                        const option = document.createElement('option');
                        option.value = categoria.id;
                        option.textContent = categoria.nombre;
                        selectCategoria.appendChild(option);
                    });
                }
            } else {
                mostrarMensajeSistema('error', 'Error al agregar categoría: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar categoría:', error);
            let detalleError = error.message || 'Error en la conexión con el servidor';
            mostrarMensajeSistema('error', 'Error al agregar categoría.', 5000, detalleError);
        }
    });
}

function inicializarFormularioEmpleado() {
    // Cargar la lista de sucursales en el select
    const selectSucursal = document.getElementById('empleadoSucursal');
    selectSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';
    
    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        selectSucursal.appendChild(option);
    });
    
    // Configurar envío del formulario
    document.getElementById('formEmpleado').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const nombre = document.getElementById('empleadoNombre').value;
            const apellido = document.getElementById('empleadoApellido').value;
            const cargo = document.getElementById('empleadoCargo').value;
            const sucursalId = document.getElementById('empleadoSucursal').value;
            
            // Preparar datos para enviar
            const empleado = {
                nombre: nombre,
                apellido: apellido,
                cargo: cargo,
                sucursal_id: sucursalId
            };
            
            // Enviar al servidor
            const respuesta = await fetch(`${API_URL}/empleados/nuevo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empleado)
            });
            
            const resultado = await respuesta.json();
            
            if (resultado.success) {
                mostrarMensajeSistema('success', 'Empleado agregado correctamente');
                
                // Limpiar formulario
                document.getElementById('formEmpleado').reset();
                
            } else {
                mostrarMensajeSistema('error', 'Error al agregar empleado: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar empleado:', error);
            let detalleError = error.message || 'Error en la conexión con el servidor';
            mostrarMensajeSistema('error', 'Error al agregar empleado.', 5000, detalleError);
        }
    });
}

// Función auxiliar para abrir pestañas desde navegación
function openTab(tabId) {
    // Esta función será llamada desde onclick en los botones de las pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
}