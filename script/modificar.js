// URL base de tu API
const API_URL = 'http://localhost:3000/api';

// Datos compartidos entre módulos
let productos = [];
let categorias = [];
let sucursales = [];
let clientes = [];
let empleados = [];
let pedidos = [];

// Cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Cargamos todos los datos necesarios
        await Promise.all([
            cargarProductos(),
            cargarCategorias(),
            cargarSucursales(),
            cargarClientes(),
            cargarEmpleados(),
            cargarPedidos()
        ]);
        
        // Configuramos las pestañas
        configurarPestanas();
        
        console.log('Todos los datos cargados correctamente');
    } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        alert("Hubo un error al cargar los datos. Por favor, intenta nuevamente.");
    }
});

// Función para cargar productos
async function cargarProductos() {
    const respuesta = await fetch(`${API_URL}/productos`);
    const resultado = await respuesta.json();
    if (Array.isArray(resultado)) {
        productos = resultado;
        console.log(`${productos.length} productos cargados`);
    }
}

// Función para cargar categorías
async function cargarCategorias() {
    const respuesta = await fetch(`${API_URL}/categorias`);
    const resultado = await respuesta.json();
    if (Array.isArray(resultado)) {
        categorias = resultado;
        console.log(`${categorias.length} categorías cargadas`);
    }
}

// Función para cargar sucursales
async function cargarSucursales() {
    const respuesta = await fetch(`${API_URL}/sucursales`);
    const resultado = await respuesta.json();
    if (Array.isArray(resultado)) {
        sucursales = resultado;
        console.log(`${sucursales.length} sucursales cargadas`);
    }
}

// Función para cargar clientes
async function cargarClientes() {
    const respuesta = await fetch(`${API_URL}/clientes`);
    const resultado = await respuesta.json();
    if (Array.isArray(resultado)) {
        clientes = resultado;
        console.log(`${clientes.length} clientes cargados`);
    }
}

// Función para cargar empleados
async function cargarEmpleados() {
    const respuesta = await fetch(`${API_URL}/empleados`);
    const resultado = await respuesta.json();
    if (Array.isArray(resultado)) {
        empleados = resultado;
        console.log(`${empleados.length} empleados cargados`);
    }
}

// Función para cargar pedidos
async function cargarPedidos() {
    const respuesta = await fetch(`${API_URL}/pedidos`);
    const resultado = await respuesta.json();
    if (Array.isArray(resultado)) {
        pedidos = resultado;
        console.log(`${pedidos.length} pedidos cargados`);
    }
}

// Función para abrir pestañas
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
    
    // Cargar datos específicos según la pestaña activa
    switch(tabId) {
        case 'modificarProducto':
            inicializarModificarProducto();
            break;
        case 'modificarCategoria':
            inicializarModificarCategoria();
            break;
        case 'modificarSucursal':
            inicializarModificarSucursal();
            break;
        case 'modificarCliente':
            inicializarModificarCliente();
            break;
        case 'modificarEmpleado':
            inicializarModificarEmpleado();
            break;
        case 'modificarPedido':
            inicializarModificarPedido();
            break;
    }
}

// Función para configurar las pestañas
function configurarPestanas() {
    // Configurar eventos para los botones de pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
            openTab(tabId);
        });
    });
    
    // Inicializar la primera pestaña (productos)
    inicializarModificarProducto();
}

// Cargamos los módulos específicos para cada entidad
document.write('<script src="../script/modificar-producto.js"></script>');
document.write('<script src="../script/modificar-categoria.js"></script>');
document.write('<script src="../script/modificar-sucursal.js"></script>');
document.write('<script src="../script/modificar-cliente.js"></script>');
document.write('<script src="../script/modificar-empleado.js"></script>');
document.write('<script src="../script/modificar-pedido.js"></script>');
