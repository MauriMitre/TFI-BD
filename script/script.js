// URL base de tu API
const API_URL = 'http://localhost:3000/api';

// Datos obtenidos de la API
let productos = [];
let sucursales = [];
let clientes = [];
let pedidos = [];
let categorias = [];
let empleados = [];

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
        
        // Cargamos categorías para los formularios
        const respuestaCategorias = await fetch(`${API_URL}/categorias`);
        const resultadoCategorias = await respuestaCategorias.json();
        if (Array.isArray(resultadoCategorias)) {
            categorias = resultadoCategorias;
        }
        
        // Actualizamos los contadores del dashboard
        document.querySelector('.dashboard-card:nth-child(1) .dashboard-value').textContent = productos.length;
        document.querySelector('.dashboard-card:nth-child(2) .dashboard-value').textContent = sucursales.length;
        document.querySelector('.dashboard-card:nth-child(3) .dashboard-value').textContent = pedidos.length;
        document.querySelector('.dashboard-card:nth-child(4) .dashboard-value').textContent = clientes.length;
        
        // Inicializamos los formularios
        inicializarFormularios();
        
        // Configuramos el manejo de pestañas
        configurarPestanas();
        
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
        });
    });
}

// Función para inicializar los formularios
function inicializarFormularios() {
    // Inicializar el formulario de nuevo pedido
    inicializarFormularioPedido();
    
    // Inicializar el formulario de nuevo producto
    inicializarFormularioProducto();
    
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
                alert('Por favor, seleccione al menos un producto para el pedido.');
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
                alert('Pedido creado correctamente');
                
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
                alert('Error al crear pedido: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar pedido:', error);
            alert('Error al crear pedido. Por favor, intente nuevamente.');
        }
    });
}

function cargarProductosEnSelect(select) {
    select.innerHTML = '<option value="">Seleccione un producto</option>';
    
    productos.forEach(producto => {
        if (producto.estado === 'Disponible') {
            const option = document.createElement('option');
            option.value = producto.id;
            option.textContent = `${producto.nombre} - $${producto.precio}`;
            option.dataset.precio = producto.precio;
            select.appendChild(option);
        }
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
                alert('Producto agregado correctamente');
                
                // Limpiar formulario
                document.getElementById('formProducto').reset();
                
                // Actualizar la lista de productos
                const respuestaProductos = await fetch(`${API_URL}/productos`);
                const resultadoProductos = await respuestaProductos.json();
                if (Array.isArray(resultadoProductos)) {
                    productos = resultadoProductos;
                    cargarTablaProductos(productos);
                    document.querySelector('.dashboard-card:nth-child(1) .dashboard-value').textContent = productos.length;
                }
            } else {
                alert('Error al agregar producto: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar producto:', error);
            alert('Error al agregar producto. Por favor, intente nuevamente.');
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
                alert('Sucursal agregada correctamente');
                
                // Limpiar formulario
                document.getElementById('formSucursal').reset();
                
                // Actualizar la lista de sucursales
                const respuestaSucursales = await fetch(`${API_URL}/sucursales`);
                const resultadoSucursales = await respuestaSucursales.json();
                if (Array.isArray(resultadoSucursales)) {
                    sucursales = resultadoSucursales;
                    cargarTablaSucursales(sucursales);
                    document.querySelector('.dashboard-card:nth-child(2) .dashboard-value').textContent = sucursales.length;
                }
            } else {
                alert('Error al agregar sucursal: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar sucursal:', error);
            alert('Error al agregar sucursal. Por favor, intente nuevamente.');
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
                alert('Cliente agregado correctamente');
                
                // Limpiar formulario
                document.getElementById('formCliente').reset();
                
                // Actualizar la lista de clientes
                const respuestaClientes = await fetch(`${API_URL}/clientes`);
                const resultadoClientes = await respuestaClientes.json();
                if (Array.isArray(resultadoClientes)) {
                    clientes = resultadoClientes;
                    cargarTablaClientes(clientes);
                    document.querySelector('.dashboard-card:nth-child(4) .dashboard-value').textContent = clientes.length;
                }
            } else {
                alert('Error al agregar cliente: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar cliente:', error);
            alert('Error al agregar cliente. Por favor, intente nuevamente.');
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
                alert('Empleado agregado correctamente');
                
                // Limpiar formulario
                document.getElementById('formEmpleado').reset();
                
            } else {
                alert('Error al agregar empleado: ' + (resultado.error || 'Error desconocido'));
            }
            
        } catch (error) {
            console.error('Error al enviar empleado:', error);
            alert('Error al agregar empleado. Por favor, intente nuevamente.');
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