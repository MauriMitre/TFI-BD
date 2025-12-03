// URL base de tu API
const API_URL = 'http://localhost:3000/api';

// Variables globales para almacenar datos
let productos = [];
let categorias = [];
let sucursales = [];
let clientes = [];
let personal = [];
let pedidos = [];
let rolesPersonal = [];

// Variables para elementos seleccionados
let productoSeleccionado = null;
let categoriaSeleccionada = null;
let sucursalSeleccionada = null;
let clienteSeleccionado = null;
let empleadoSeleccionado = null;
let pedidoSeleccionado = null;

// Cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM cargado, iniciando aplicación...');
    console.log('API_URL configurada como:', API_URL);
    
    try {
        // Cargamos datos desde la API (backend Node.js) directamente
        
        // Cargamos productos con sus categorías
        const respuestaProductos = await fetch(`${API_URL}/productos`);
        const resultadoProductos = await respuestaProductos.json();
        if (Array.isArray(resultadoProductos)) {
            productos = resultadoProductos;
            console.log(`Productos cargados: ${productos.length}`);
        }
        
        // Cargamos categorías
        const respuestaCategorias = await fetch(`${API_URL}/categorias`);
        const resultadoCategorias = await respuestaCategorias.json();
        if (Array.isArray(resultadoCategorias)) {
            categorias = resultadoCategorias;
            console.log(`Categorías cargadas: ${categorias.length}`);
        }

        // Cargamos sucursales
        const respuestaSucursales = await fetch(`${API_URL}/sucursales`);
        const resultadoSucursales = await respuestaSucursales.json();
        if (Array.isArray(resultadoSucursales)) {
            sucursales = resultadoSucursales;
            console.log(`Sucursales cargadas: ${sucursales.length}`);
        }
        
        // Cargamos clientes
        const respuestaClientes = await fetch(`${API_URL}/clientes`);
        const resultadoClientes = await respuestaClientes.json();
        if (Array.isArray(resultadoClientes)) {
            clientes = resultadoClientes;
            console.log(`Clientes cargados: ${clientes.length}`);
        }

        // Cargamos personal
        const respuestaPersonal = await fetch(`${API_URL}/personal`);
        const resultadoPersonal = await respuestaPersonal.json();
        if (Array.isArray(resultadoPersonal)) {
            personal = resultadoPersonal;
            console.log(`Personal cargado: ${personal.length}`);
        }
        
        // Cargamos pedidos
        const respuestaPedidos = await fetch(`${API_URL}/ordenesCompra`);
        const resultadoPedidos = await respuestaPedidos.json();
        if (Array.isArray(resultadoPedidos)) {
            pedidos = resultadoPedidos;
            console.log(`Pedidos cargados: ${pedidos.length}`);
        }
        
        // Cargamos roles de personal
        const respuestaRoles = await fetch(`${API_URL}/roles-personal`);
        const resultadoRoles = await respuestaRoles.json();
        if (Array.isArray(resultadoRoles)) {
            rolesPersonal = resultadoRoles;
            console.log(`Roles de personal cargados: ${rolesPersonal.length}`);
        }
        
        // Inicializar los formularios de modificación
        await inicializarFormularios();
        
        // Configurar el manejo de pestañas
        configurarPestanas();
        
    } catch (error) {
        console.error("Error general al inicializar la aplicación:", error);
        
        // Crear un mensaje de error en la parte superior de la página
        const mainElement = document.querySelector('main');
        if (mainElement) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'estado-mensaje error';
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Error al cargar los datos de la aplicación. Por favor, recargue la página o contacte al administrador.';
            
            mainElement.insertBefore(errorDiv, mainElement.firstChild);
        } else {
            alert("Hubo un error al cargar los datos. Por favor, intenta nuevamente.");
        }
    }
});

// Función para inicializar todos los formularios
async function inicializarFormularios() {
    console.log('Iniciando inicialización de formularios...');
    
    try {
        // Inicializamos los formularios secuencialmente para evitar problemas
        await inicializarModificarProducto();
        inicializarModificarCategoria();
        inicializarModificarSucursal();
        inicializarModificarCliente();
        inicializarModificarEmpleado();
        inicializarModificarPedido();
        
        console.log('Todos los formularios inicializados correctamente');
        return true;
    } catch (error) {
        console.error('Error al inicializar formularios:', error);
        return false;
    }
}

//
// ===== MÓDULO DE CATEGORÍAS =====
//

// Función para inicializar el formulario de modificar categoría
function inicializarModificarCategoria() {
    console.log('Iniciando inicialización del formulario de categorías');
    
    // Mostrar un mensaje de carga
    const mensajeElement = document.getElementById('categoriaEstadoMensaje');
    if (mensajeElement) {
        mensajeElement.textContent = "Cargando categorías...";
        mensajeElement.classList.remove('success', 'error');
        mensajeElement.classList.add('info');
        mensajeElement.style.display = 'block';
    }
    
    try {
        // Verificar si tenemos categorías cargadas
        if (!categorias || categorias.length === 0) {
            console.log('No hay categorías cargadas');
            mostrarMensajeCategoria('error', 'No se han cargado categorías. Intente recargar la página.');
            return;
        }
        
        // Cargar categorías en el select
        cargarCategoriasEnSelect('categoriaSeleccionada');
        
        // Configurar eventos
        document.getElementById('btnBuscarCategoria').addEventListener('click', buscarCategorias);
        document.getElementById('categoriaSeleccionada').addEventListener('change', cargarDatosCategoria);
        document.getElementById('formModificarCategoria').addEventListener('submit', guardarCambiosCategoria);
        document.getElementById('btnEliminarCategoria').addEventListener('click', confirmarEliminarCategoria);
        
        // Configurar botón de mostrar todas
        const btnMostrarTodas = document.getElementById('btnMostrarTodasCategorias');
        if (btnMostrarTodas) {
            btnMostrarTodas.addEventListener('click', function() {
                cargarCategoriasEnSelect('categoriaSeleccionada');
                mostrarMensajeCategoria('info', 'Se han cargado todas las categorías');
            });
        }
        
        console.log('Formulario de modificar categoría inicializado correctamente');
        if (mensajeElement) {
            mensajeElement.textContent = `${categorias.length} categorías cargadas correctamente`;
            mensajeElement.classList.remove('error');
            mensajeElement.classList.add('success');
            setTimeout(() => {
                mensajeElement.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error al inicializar el formulario de categorías:', error);
        mostrarMensajeCategoria('error', 'Error al inicializar el formulario de categorías');
    }
}

// Función para cargar categorías en un select
function cargarCategoriasEnSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione una categoría</option>';
    
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        select.appendChild(option);
    });
}

// Función para mostrar mensajes de estado en la sección de categorías
function mostrarMensajeCategoria(tipo, mensaje) {
    const mensajeElement = document.getElementById('categoriaEstadoMensaje');
    if (!mensajeElement) return;
    
    // Eliminar todas las clases
    mensajeElement.classList.remove('success', 'error', 'info');
    
    // Añadir la clase según el tipo
    mensajeElement.classList.add(tipo);
    
    // Establecer el mensaje
    mensajeElement.textContent = mensaje;
    
    // Mostrar el elemento
    mensajeElement.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeElement.style.display = 'none';
    }, 5000);
}

// Función para buscar categorías
async function buscarCategorias() {
    const terminoBusqueda = document.getElementById('categoriaBuscar').value.toLowerCase().trim();
    
    if (!terminoBusqueda) {
        mostrarMensajeCategoria('info', 'Por favor, ingrese un término de búsqueda');
        return;
    }
    
    try {
        // Filtrar localmente en lugar de hacer una llamada al servidor
        const resultadosFiltrados = categorias.filter(categoria => 
            categoria.nombre.toLowerCase().includes(terminoBusqueda) || 
            (categoria.descripcion && categoria.descripcion.toLowerCase().includes(terminoBusqueda))
        );
        
        if (resultadosFiltrados.length > 0) {
            // Actualizar solo las categorías filtradas en el selector
            const selectCategorias = document.getElementById('categoriaSeleccionada');
            selectCategorias.innerHTML = '<option value="">Seleccione una categoría</option>';
            
            resultadosFiltrados.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                selectCategorias.appendChild(option);
            });
            
            // Mostrar mensaje con resultados
            const mensaje = `Se encontraron ${resultadosFiltrados.length} categorías que coinciden con "${terminoBusqueda}"`;
            mostrarMensajeCategoria('success', mensaje);
            
            // Si hay categorías, seleccionar automáticamente la primera
            if (selectCategorias.options.length > 1) {
                selectCategorias.selectedIndex = 1;
                // Disparar evento change para cargar los datos
                const event = new Event('change');
                selectCategorias.dispatchEvent(event);
            }
        } else {
            mostrarMensajeCategoria('error', `No se encontraron categorías que coincidan con "${terminoBusqueda}"`);
        }
        
    } catch (error) {
        console.error('Error al buscar categorías:', error);
        mostrarMensajeCategoria('error', 'Error al buscar categorías. Por favor, intente nuevamente.');
    }
}

// Función para cargar datos de la categoría seleccionada
function cargarDatosCategoria() {
    const categoriaId = document.getElementById('categoriaSeleccionada').value;
    
    if (!categoriaId) {
        limpiarFormularioCategoria();
        return;
    }
    
    categoriaSeleccionada = categorias.find(c => c.id == categoriaId);
    
    if (categoriaSeleccionada) {
        document.getElementById('categoriaNombre').value = categoriaSeleccionada.nombre;
        document.getElementById('categoriaDescripcion').value = categoriaSeleccionada.descripcion || '';
    }
}

// Función para guardar cambios en la categoría
async function guardarCambiosCategoria(e) {
    e.preventDefault();
    
    if (!categoriaSeleccionada) {
        mostrarMensajeCategoria('error', 'Por favor, seleccione una categoría para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('categoriaNombre').value;
        const descripcion = document.getElementById('categoriaDescripcion').value || '';
        
        // Validación básica
        if (!nombre || nombre.trim() === '') {
            mostrarMensajeCategoria('error', 'Por favor, ingrese un nombre para la categoría');
            return;
        }
        
        // Mostrar mensaje de procesamiento
        mostrarMensajeCategoria('info', 'Guardando cambios...');
        
        // Preparar datos para enviar
        const categoria = {
            id: categoriaSeleccionada.id,
            nombre: nombre,
            descripcion: descripcion
        };
        
        // Enviar al servidor
        const respuesta = await fetch(`${API_URL}/categorias/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria)
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeCategoria('success', 'Categoría actualizada correctamente');
            
            // Actualizar la lista de categorías con una llamada directa
            const respuestaCategorias = await fetch(`${API_URL}/categorias`);
            const resultadoCategorias = await respuestaCategorias.json();
            if (Array.isArray(resultadoCategorias)) {
                categorias = resultadoCategorias;
                console.log(`Categorías recargadas: ${categorias.length}`);
                
                // Actualizar los selectores de categorías
                cargarCategoriasEnSelect('categoriaSeleccionada');
                cargarCategoriasEnSelect('productoCategoria'); // Actualizar también el selector de categorías en productos
            }
            
            // Limpiar formulario
            limpiarFormularioCategoria();
        } else {
            mostrarMensajeCategoria('error', 'Error al actualizar categoría: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        mostrarMensajeCategoria('error', 'Error al actualizar categoría. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de una categoría
function confirmarEliminarCategoria() {
    if (!categoriaSeleccionada) {
        mostrarMensajeCategoria('error', 'Por favor, seleccione una categoría para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar la categoría "${categoriaSeleccionada.nombre}"?
ADVERTENCIA: Esto también eliminará todos los productos asociados a esta categoría.`);
    
    if (confirmar) {
        eliminarCategoria();
    }
}

// Función para eliminar una categoría
async function eliminarCategoria() {
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensajeCategoria('info', 'Eliminando categoría...');
        
        const respuesta = await fetch(`${API_URL}/categorias/eliminar/${categoriaSeleccionada.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeCategoria('success', 'Categoría eliminada correctamente');
            
            // Actualizar la lista de categorías con llamada directa
            const respuestaCategorias = await fetch(`${API_URL}/categorias`);
            const resultadoCategorias = await respuestaCategorias.json();
            if (Array.isArray(resultadoCategorias)) {
                categorias = resultadoCategorias;
                console.log(`Categorías recargadas: ${categorias.length}`);
                
                // Actualizar los selectores de categorías
                cargarCategoriasEnSelect('categoriaSeleccionada');
                cargarCategoriasEnSelect('productoCategoria');
            }
            
            // Actualizar también los productos porque pueden haberse eliminado algunos
            const respuestaProductos = await fetch(`${API_URL}/productos`);
            const resultadoProductos = await respuestaProductos.json();
            if (Array.isArray(resultadoProductos)) {
                productos = resultadoProductos;
                console.log(`Productos recargados: ${productos.length}`);
            }
            
            // Limpiar formulario
            limpiarFormularioCategoria();
        } else {
            mostrarMensajeCategoria('error', 'Error al eliminar categoría: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        mostrarMensajeCategoria('error', 'Error al eliminar categoría. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario de categoría
function limpiarFormularioCategoria() {
    document.getElementById('formModificarCategoria').reset();
    document.getElementById('categoriaNombre').value = '';
    document.getElementById('categoriaDescripcion').value = '';
    categoriaSeleccionada = null;
}

//
// ===== MÓDULO DE PRODUCTOS =====
//

// Función para inicializar el formulario de modificar producto
async function inicializarModificarProducto() {
    console.log('Iniciando inicialización del formulario de productos');
    
    // Mostrar un mensaje de carga
    const mensajeElement = document.getElementById('productoEstadoMensaje');
    if (mensajeElement) {
        mensajeElement.textContent = "Cargando productos...";
        mensajeElement.classList.remove('success', 'error');
        mensajeElement.classList.add('info');
        mensajeElement.style.display = 'block';
    }
    
    try {
        // Verificar si tenemos productos cargados
        if (!productos || productos.length === 0) {
            console.log('No hay productos cargados');
            mostrarMensajeProducto('error', 'No se han cargado productos. Intente recargar la página.');
            return;
        }
        
        // Cargar productos en el select
        cargarProductosEnSelect();
        
        // Cargar categorías en el select
        cargarCategoriasEnSelect('productoCategoria');
        
        // Configurar eventos - con verificación de elementos
        const btnBuscarProducto = document.getElementById('btnBuscarProducto');
        if (btnBuscarProducto) {
            btnBuscarProducto.addEventListener('click', buscarProductos);
        } else {
            console.error("No se encontró el elemento btnBuscarProducto");
        }
        
        const selectProducto = document.getElementById('productoSeleccionado');
        if (selectProducto) {
            selectProducto.addEventListener('change', cargarDatosProducto);
        } else {
            console.error("No se encontró el elemento productoSeleccionado");
        }
        
        const formProducto = document.getElementById('formModificarProducto');
        if (formProducto) {
            formProducto.addEventListener('submit', guardarCambiosProducto);
        } else {
            console.error("No se encontró el elemento formModificarProducto");
        }
        
        const btnEliminar = document.getElementById('btnEliminarProducto');
        if (btnEliminar) {
            btnEliminar.addEventListener('click', confirmarEliminarProducto);
        } else {
            console.error("No se encontró el elemento btnEliminarProducto");
        }
        
        // Configurar nuevos eventos
        const btnMostrarTodos = document.getElementById('btnMostrarTodosProductos');
        if (btnMostrarTodos) {
            btnMostrarTodos.addEventListener('click', function() {
                cargarProductosEnSelect(); // Volver a cargar todos los productos
                mostrarMensajeProducto('info', 'Se han cargado todos los productos');
            });
        }
        
        const btnLimpiar = document.getElementById('btnLimpiarProducto');
        if (btnLimpiar) {
            btnLimpiar.addEventListener('click', function() {
                limpiarFormularioProducto();
                mostrarMensajeProducto('info', 'Formulario limpiado');
            });
        }
        
        console.log('Formulario de modificar producto inicializado correctamente');
        if (mensajeElement) {
            mensajeElement.textContent = `${productos.length} productos cargados correctamente`;
            mensajeElement.classList.remove('error');
            mensajeElement.classList.add('success');
            setTimeout(() => {
                mensajeElement.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error al inicializar el formulario de productos:', error);
        mostrarMensajeProducto('error', 'Error al inicializar el formulario de productos');
    }
}

// Función para mostrar mensajes de estado
function mostrarMensajeProducto(tipo, mensaje) {
    const mensajeElement = document.getElementById('productoEstadoMensaje');
    if (!mensajeElement) return;
    
    // Eliminar todas las clases
    mensajeElement.classList.remove('success', 'error', 'info');
    
    // Añadir la clase según el tipo
    mensajeElement.classList.add(tipo);
    
    // Establecer el mensaje
    mensajeElement.textContent = mensaje;
    
    // Mostrar el elemento
    mensajeElement.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeElement.style.display = 'none';
    }, 5000);
}

// Función para cargar productos en el select
function cargarProductosEnSelect() {
    const select = document.getElementById('productoSeleccionado');
    if (!select) {
        console.error('No se encontró el elemento select con id "productoSeleccionado"');
        return;
    }
    
    select.innerHTML = '';
    
    if (productos.length === 0) {
        console.warn('No hay productos para cargar en el selector');
        select.innerHTML = '<option value="">No hay productos disponibles</option>';
        mostrarMensajeProducto('error', 'No hay productos disponibles. Intente recargar la página.');
        return;
    }
    
    console.log(`Cargando ${productos.length} productos en el selector`);
    mostrarMensajeProducto('info', `Cargando ${productos.length} productos...`);
    
    // Ordenar productos por nombre para facilitar la búsqueda
    const productosOrdenados = [...productos].sort((a, b) => 
        a.nombre.localeCompare(b.nombre)
    );
    
    productosOrdenados.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = `${producto.nombre} (${producto.sku})`;
        
        // Almacenar datos adicionales en el option para un acceso más rápido
        option.dataset.categoria = producto.categoria_id || '';
        option.dataset.categoriaTexto = producto.categoria || '';
        option.dataset.precio = producto.precio || 0;
        option.dataset.estado = producto.estado || '';
        
        select.appendChild(option);
    });
    
    console.log('Productos cargados en el selector');
    
    // Si hay productos, seleccionar automáticamente el primero
    if (select.options.length > 0) {
        select.selectedIndex = 0;
    }
}

// Función para buscar productos
function buscarProductos() {
    const terminoBusqueda = document.getElementById('productoBuscar').value.toLowerCase().trim();
    
    if (!terminoBusqueda) {
        mostrarMensajeProducto('info', 'Por favor, ingrese un término de búsqueda');
        return;
    }
    
    // Filtrar productos localmente
    const resultadosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(terminoBusqueda) || 
        producto.sku.toLowerCase().includes(terminoBusqueda) ||
        (producto.categoria && producto.categoria.toLowerCase().includes(terminoBusqueda))
    );
    
    // Ordenar resultados filtrados por nombre
    resultadosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    if (resultadosFiltrados.length > 0) {
        // Actualizar solo los productos filtrados en el selector
        const selectProductos = document.getElementById('productoSeleccionado');
        selectProductos.innerHTML = '';
        
        resultadosFiltrados.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.id;
            option.textContent = `${producto.nombre} (${producto.sku})`;
            
            // Almacenar datos adicionales en el option
            option.dataset.categoria = producto.categoria_id || '';
            option.dataset.categoriaTexto = producto.categoria || '';
            option.dataset.precio = producto.precio || 0;
            option.dataset.estado = producto.estado || '';
            
            selectProductos.appendChild(option);
        });
        
        // Mostrar mensaje con resultados
        const mensaje = `Se encontraron ${resultadosFiltrados.length} productos que coinciden con "${terminoBusqueda}"`;
        mostrarMensajeProducto('success', mensaje);
        
        // Si hay productos, seleccionar automáticamente el primero
        if (selectProductos.options.length > 0) {
            selectProductos.selectedIndex = 0;
            // Disparar evento change para cargar los datos
            const event = new Event('change');
            selectProductos.dispatchEvent(event);
        }
    } else {
        mostrarMensajeProducto('error', `No se encontraron productos que coincidan con "${terminoBusqueda}"`);
    }
}

// Función para cargar datos del producto seleccionado
function cargarDatosProducto() {
    const productoSelect = document.getElementById('productoSeleccionado');
    const productoId = productoSelect.value;
    
    if (!productoId) {
        limpiarFormularioProducto();
        return;
    }
    
    console.log(`Cargando datos del producto ID: ${productoId}`);
    
    // Buscar el producto en el array
    productoSeleccionado = productos.find(p => p.id == productoId);
    
    if (productoSeleccionado) {
        console.log('Producto encontrado:', productoSeleccionado);
        
        // Llenar los campos del formulario con los datos del producto
        document.getElementById('productoNombre').value = productoSeleccionado.nombre;
        document.getElementById('productoSKU').value = productoSeleccionado.sku;
        document.getElementById('productoPrecio').value = productoSeleccionado.precio;
        document.getElementById('productoEstado').value = productoSeleccionado.estado;
        
        // Seleccionar la categoría correcta
        const selectCategoria = document.getElementById('productoCategoria');
        
        // Primero intentamos por ID (más preciso)
        if (productoSeleccionado.categoria_id) {
            selectCategoria.value = productoSeleccionado.categoria_id;
        } 
        // Si no hay ID o no se encuentra, intentamos por nombre
        else {
            for(let i = 0; i < selectCategoria.options.length; i++) {
                if(selectCategoria.options[i].textContent === productoSeleccionado.categoria) {
                    selectCategoria.selectedIndex = i;
                    break;
                }
            }
        }
        
        console.log('Datos del producto cargados en el formulario');
        mostrarMensajeProducto('success', `Producto "${productoSeleccionado.nombre}" cargado correctamente`);
    } else {
        console.error(`No se encontró el producto con ID: ${productoId}`);
        mostrarMensajeProducto('error', 'Error: No se pudieron cargar los datos del producto seleccionado.');
        limpiarFormularioProducto();
    }
}

// Función para guardar cambios en el producto
async function guardarCambiosProducto(e) {
    e.preventDefault();
    
    if (!productoSeleccionado) {
        mostrarMensajeProducto('error', 'Por favor, seleccione un producto para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('productoNombre').value;
        const categoriaId = document.getElementById('productoCategoria').value;
        const sku = document.getElementById('productoSKU').value;
        const precio = document.getElementById('productoPrecio').value;
        const estado = document.getElementById('productoEstado').value;
        
        // Validación básica
        if (!nombre || !categoriaId || !sku || !precio) {
            mostrarMensajeProducto('error', 'Por favor, complete todos los campos obligatorios');
            return;
        }
        
        // Validar SKU (solo letras, números y guiones)
        const skuRegex = /^[A-Za-z0-9\-]+$/;
        if (!skuRegex.test(sku)) {
            mostrarMensajeProducto('error', 'El SKU solo puede contener letras, números y guiones');
            return;
        }
        
        // Validar precio
        if (isNaN(precio) || parseFloat(precio) < 0) {
            mostrarMensajeProducto('error', 'Por favor, ingrese un precio válido');
            return;
        }
        
        // Mostrar mensaje de procesamiento
        mostrarMensajeProducto('info', 'Guardando cambios...');
        
        // Preparar datos para enviar - exactamente como los requiere el sp_actualizar_producto
        const producto = {
            id: productoSeleccionado.id,
            nombre: nombre,
            categoria_id: categoriaId,
            sku: sku,
            precio: precio,
            estado: estado
        };
        
        console.log('Enviando datos de producto a actualizar:', producto);
        
        // Enviar al servidor
        const respuesta = await fetch(`${API_URL}/productos/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeProducto('success', 'Producto actualizado correctamente');
            
            // Actualizar la lista de productos
            // Usamos una llamada directa como en DOMContentLoaded para mantener consistencia
            const respuestaProductos = await fetch(`${API_URL}/productos`);
            const resultadoProductos = await respuestaProductos.json();
            if (Array.isArray(resultadoProductos)) {
                productos = resultadoProductos;
                console.log(`Productos recargados: ${productos.length}`);
            }
            
            cargarProductosEnSelect();
            
            // Limpiar formulario
            limpiarFormularioProducto();
        } else {
            if (resultado.error && resultado.error.includes('SKU')) {
                mostrarMensajeProducto('error', 'Error: Ya existe un producto con ese SKU');
            } else if (resultado.error && resultado.error.includes('nombre')) {
                mostrarMensajeProducto('error', 'Error: Ya existe un producto con ese nombre');
            } else {
                mostrarMensajeProducto('error', 'Error al actualizar producto: ' + (resultado.error || 'Error desconocido'));
            }
        }
        
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        mostrarMensajeProducto('error', 'Error al actualizar producto. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de un producto
function confirmarEliminarProducto() {
    if (!productoSeleccionado) {
        alert('Por favor, seleccione un producto para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar el producto "${productoSeleccionado.nombre}"?
Esta acción no se puede deshacer.`);
    
    if (confirmar) {
        eliminarProducto();
    }
}

// Función para eliminar un producto
async function eliminarProducto() {
    try {
        const respuesta = await fetch(`${API_URL}/productos/eliminar/${productoSeleccionado.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            alert('Producto eliminado correctamente');
            
            // Actualizar la lista de productos
            await cargarProductos();
            cargarProductosEnSelect();
            
            // Limpiar formulario
            limpiarFormularioProducto();
        } else {
            alert('Error al eliminar producto: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario de producto
function limpiarFormularioProducto() {
    document.getElementById('formModificarProducto').reset();
    productoSeleccionado = null;
}

//
// ===== MÓDULO DE SUCURSALES =====
//

// Función para mostrar mensajes de estado en la sección de sucursales
function mostrarMensajeSucursal(tipo, mensaje) {
    const mensajeElement = document.getElementById('sucursalEstadoMensaje');
    if (!mensajeElement) return;
    
    // Eliminar todas las clases
    mensajeElement.classList.remove('success', 'error', 'info');
    
    // Añadir la clase según el tipo
    mensajeElement.classList.add(tipo);
    
    // Establecer el mensaje
    mensajeElement.textContent = mensaje;
    
    // Mostrar el elemento
    mensajeElement.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeElement.style.display = 'none';
    }, 5000);
}

// Función para inicializar el formulario de modificar sucursal
function inicializarModificarSucursal() {
    console.log('Iniciando inicialización del formulario de sucursales');
    
    // Mostrar un mensaje de carga
    const mensajeElement = document.getElementById('sucursalEstadoMensaje');
    if (mensajeElement) {
        mensajeElement.textContent = "Cargando sucursales...";
        mensajeElement.classList.remove('success', 'error');
        mensajeElement.classList.add('info');
        mensajeElement.style.display = 'block';
    }
    
    try {
        // Verificar si tenemos sucursales cargadas
        if (!sucursales || sucursales.length === 0) {
            console.log('No hay sucursales cargadas');
            mostrarMensajeSucursal('error', 'No se han cargado sucursales. Intente recargar la página.');
            return;
        }
        
        // Cargar sucursales en el select
        cargarSucursalesEnSelect('sucursalSeleccionada');
        
        // Configurar eventos
        document.getElementById('btnBuscarSucursal').addEventListener('click', buscarSucursales);
        document.getElementById('sucursalSeleccionada').addEventListener('change', cargarDatosSucursal);
        document.getElementById('formModificarSucursal').addEventListener('submit', guardarCambiosSucursal);
        document.getElementById('btnEliminarSucursal').addEventListener('click', confirmarEliminarSucursal);
        
        // Configurar botón de mostrar todas
        const btnMostrarTodas = document.getElementById('btnMostrarTodasSucursales');
        if (btnMostrarTodas) {
            btnMostrarTodas.addEventListener('click', function() {
                cargarSucursalesEnSelect('sucursalSeleccionada');
                mostrarMensajeSucursal('info', 'Se han cargado todas las sucursales');
            });
        }
        
        console.log('Formulario de modificar sucursal inicializado correctamente');
        if (mensajeElement) {
            mensajeElement.textContent = `${sucursales.length} sucursales cargadas correctamente`;
            mensajeElement.classList.remove('error');
            mensajeElement.classList.add('success');
            setTimeout(() => {
                mensajeElement.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error al inicializar el formulario de sucursales:', error);
        mostrarMensajeSucursal('error', 'Error al inicializar el formulario de sucursales');
    }
}

// Función para cargar sucursales en un select
function cargarSucursalesEnSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione una sucursal</option>';
    
    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        select.appendChild(option);
    });
}

// Función para buscar sucursales
function buscarSucursales() {
    const terminoBusqueda = document.getElementById('sucursalBuscar').value.toLowerCase().trim();
    
    if (!terminoBusqueda) {
        mostrarMensajeSucursal('info', 'Por favor, ingrese un término de búsqueda');
        return;
    }
    
    // Filtrar sucursales localmente
    const resultadosFiltrados = sucursales.filter(sucursal => 
        sucursal.nombre.toLowerCase().includes(terminoBusqueda) || 
        sucursal.direccion.toLowerCase().includes(terminoBusqueda) ||
        sucursal.provincia.toLowerCase().includes(terminoBusqueda)
    );
    
    if (resultadosFiltrados.length > 0) {
        // Actualizar solo las sucursales filtradas en el selector
        const selectSucursales = document.getElementById('sucursalSeleccionada');
        selectSucursales.innerHTML = '<option value="">Seleccione una sucursal</option>';
        
        resultadosFiltrados.forEach(sucursal => {
            const option = document.createElement('option');
            option.value = sucursal.id;
            option.textContent = sucursal.nombre;
            selectSucursales.appendChild(option);
        });
        
        // Mostrar mensaje con resultados
        const mensaje = `Se encontraron ${resultadosFiltrados.length} sucursales que coinciden con "${terminoBusqueda}"`;
        mostrarMensajeSucursal('success', mensaje);
        
        // Si hay sucursales, seleccionar automáticamente la primera
        if (selectSucursales.options.length > 1) {
            selectSucursales.selectedIndex = 1;
            // Disparar evento change para cargar los datos
            const event = new Event('change');
            selectSucursales.dispatchEvent(event);
        }
    } else {
        mostrarMensajeSucursal('error', `No se encontraron sucursales que coincidan con "${terminoBusqueda}"`);
    }
}

// Función para cargar datos de la sucursal seleccionada
function cargarDatosSucursal() {
    const sucursalId = document.getElementById('sucursalSeleccionada').value;
    
    if (!sucursalId) {
        limpiarFormularioSucursal();
        return;
    }
    
    sucursalSeleccionada = sucursales.find(s => s.id == sucursalId);
    
    if (sucursalSeleccionada) {
        document.getElementById('sucursalNombre').value = sucursalSeleccionada.nombre;
        document.getElementById('sucursalDireccion').value = sucursalSeleccionada.direccion;
        document.getElementById('sucursalProvincia').value = sucursalSeleccionada.provincia;
        document.getElementById('sucursalTelefono').value = sucursalSeleccionada.telefono || '';
    }
}

// Función para guardar cambios en la sucursal
async function guardarCambiosSucursal(e) {
    e.preventDefault();
    
    if (!sucursalSeleccionada) {
        mostrarMensajeSucursal('error', 'Por favor, seleccione una sucursal para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('sucursalNombre').value;
        const direccion = document.getElementById('sucursalDireccion').value;
        const provincia = document.getElementById('sucursalProvincia').value;
        const telefono = document.getElementById('sucursalTelefono').value;
        
        // Validación básica
        if (!nombre || !direccion || !provincia) {
            mostrarMensajeSucursal('error', 'Por favor, complete todos los campos obligatorios');
            return;
        }
        
        // Mostrar mensaje de procesamiento
        mostrarMensajeSucursal('info', 'Guardando cambios...');
        
        // Preparar datos para enviar - exactamente como los requiere el sp_actualizar_sucursal
        const sucursal = {
            id: sucursalSeleccionada.id,
            nombre: nombre,
            direccion: direccion,
            provincia: provincia,
            telefono: telefono
        };
        
        console.log('Enviando datos de sucursal a actualizar:', sucursal);
        
        // Enviar al servidor
        const respuesta = await fetch(`${API_URL}/sucursales/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sucursal)
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeSucursal('success', 'Sucursal actualizada correctamente');
            
            // Actualizar la lista de sucursales con llamada directa
            const respuestaSucursales = await fetch(`${API_URL}/sucursales`);
            const resultadoSucursales = await respuestaSucursales.json();
            if (Array.isArray(resultadoSucursales)) {
                sucursales = resultadoSucursales;
                console.log(`Sucursales recargadas: ${sucursales.length}`);
                
                // Actualizar todos los selectores que muestran sucursales
                actualizarSelectoresSucursales();
            }
            
            // Limpiar formulario
            limpiarFormularioSucursal();
        } else {
            mostrarMensajeSucursal('error', 'Error al actualizar sucursal: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al actualizar sucursal:', error);
        mostrarMensajeSucursal('error', 'Error al actualizar sucursal. Por favor, intente nuevamente.');
    }
}

// Función para actualizar todos los selectores que muestran sucursales
function actualizarSelectoresSucursales() {
    // Lista de IDs de selectores que muestran sucursales
    const selectoresSucursales = [
        'sucursalSeleccionada',
        'pedidoSucursal',
        'empleadoSucursal',
        'productoSucursal'
    ];
    
    // Actualizar cada selector
    selectoresSucursales.forEach(selectorId => {
        cargarSucursalesEnSelect(selectorId);
    });
}

// Función para confirmar eliminación de una sucursal
function confirmarEliminarSucursal() {
    if (!sucursalSeleccionada) {
        mostrarMensajeSucursal('error', 'Por favor, seleccione una sucursal para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar la sucursal "${sucursalSeleccionada.nombre}"?
ADVERTENCIA: Esta acción eliminará todos los datos relacionados con esta sucursal, incluyendo órdenes, stocks y empleados asignados.`);
    
    if (confirmar) {
        eliminarSucursal();
    }
}

// Función para eliminar una sucursal
async function eliminarSucursal() {
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensajeSucursal('info', 'Eliminando sucursal...');
        
        const respuesta = await fetch(`${API_URL}/sucursales/eliminar/${sucursalSeleccionada.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeSucursal('success', 'Sucursal eliminada correctamente');
            
            // Actualizar datos que pueden haberse visto afectados con llamadas directas
            // Actualizar sucursales
            const respuestaSucursales = await fetch(`${API_URL}/sucursales`);
            const resultadoSucursales = await respuestaSucursales.json();
            if (Array.isArray(resultadoSucursales)) {
                sucursales = resultadoSucursales;
                console.log(`Sucursales recargadas: ${sucursales.length}`);
            }
            
            // Actualizar productos
            const respuestaProductos = await fetch(`${API_URL}/productos`);
            const resultadoProductos = await respuestaProductos.json();
            if (Array.isArray(resultadoProductos)) {
                productos = resultadoProductos;
                console.log(`Productos recargados: ${productos.length}`);
            }
            
            // Actualizar personal
            const respuestaPersonal = await fetch(`${API_URL}/personal`);
            const resultadoPersonal = await respuestaPersonal.json();
            if (Array.isArray(resultadoPersonal)) {
                personal = resultadoPersonal;
                console.log(`Personal recargado: ${personal.length}`);
            }
            
            // Actualizar pedidos
            const respuestaPedidos = await fetch(`${API_URL}/ordenesCompra`);
            const resultadoPedidos = await respuestaPedidos.json();
            if (Array.isArray(resultadoPedidos)) {
                pedidos = resultadoPedidos;
                console.log(`Pedidos recargados: ${pedidos.length}`);
            }
            
            // Actualizar selectores
            actualizarSelectoresSucursales();
            
            // Limpiar formulario
            limpiarFormularioSucursal();
        } else {
            mostrarMensajeSucursal('error', 'Error al eliminar sucursal: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar sucursal:', error);
        mostrarMensajeSucursal('error', 'Error al eliminar sucursal. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario de sucursal
function limpiarFormularioSucursal() {
    document.getElementById('formModificarSucursal').reset();
    sucursalSeleccionada = null;
}

//
// ===== MÓDULO DE CLIENTES =====
//

// Función para mostrar mensajes de estado en la sección de clientes
function mostrarMensajeCliente(tipo, mensaje) {
    const mensajeElement = document.getElementById('clienteEstadoMensaje');
    if (!mensajeElement) return;
    
    // Eliminar todas las clases
    mensajeElement.classList.remove('success', 'error', 'info');
    
    // Añadir la clase según el tipo
    mensajeElement.classList.add(tipo);
    
    // Establecer el mensaje
    mensajeElement.textContent = mensaje;
    
    // Mostrar el elemento
    mensajeElement.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeElement.style.display = 'none';
    }, 5000);
}

// Función para inicializar el formulario de modificar cliente
function inicializarModificarCliente() {
    console.log('Iniciando inicialización del formulario de clientes');
    
    // Mostrar un mensaje de carga
    const mensajeElement = document.getElementById('clienteEstadoMensaje');
    if (mensajeElement) {
        mensajeElement.textContent = "Cargando clientes...";
        mensajeElement.classList.remove('success', 'error');
        mensajeElement.classList.add('info');
        mensajeElement.style.display = 'block';
    }
    
    try {
        // Verificar si tenemos clientes cargados
        if (!clientes || clientes.length === 0) {
            console.log('No hay clientes cargados');
            mostrarMensajeCliente('error', 'No se han cargado clientes. Intente recargar la página.');
            return;
        }
        
        // Cargar clientes en el select
        cargarClientesEnSelect('clienteSeleccionado');
        
        // Configurar eventos
        document.getElementById('btnBuscarCliente').addEventListener('click', buscarClientes);
        document.getElementById('clienteSeleccionado').addEventListener('change', cargarDatosCliente);
        document.getElementById('formModificarCliente').addEventListener('submit', guardarCambiosCliente);
        document.getElementById('btnEliminarCliente').addEventListener('click', confirmarEliminarCliente);
        
        // Configurar botón de mostrar todos
        const btnMostrarTodos = document.getElementById('btnMostrarTodosClientes');
        if (btnMostrarTodos) {
            btnMostrarTodos.addEventListener('click', function() {
                cargarClientesEnSelect('clienteSeleccionado');
                mostrarMensajeCliente('info', 'Se han cargado todos los clientes');
            });
        }
        
        console.log('Formulario de modificar cliente inicializado correctamente');
        if (mensajeElement) {
            mensajeElement.textContent = `${clientes.length} clientes cargados correctamente`;
            mensajeElement.classList.remove('error');
            mensajeElement.classList.add('success');
            setTimeout(() => {
                mensajeElement.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error al inicializar el formulario de clientes:', error);
        mostrarMensajeCliente('error', 'Error al inicializar el formulario de clientes');
    }
}

// Función para cargar clientes en un select
function cargarClientesEnSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione un cliente</option>';
    
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nombre} ${cliente.apellido} (${cliente.email})`;
        select.appendChild(option);
    });
}

// Función para buscar clientes
function buscarClientes() {
    const terminoBusqueda = document.getElementById('clienteBuscar').value.toLowerCase().trim();
    
    if (!terminoBusqueda) {
        mostrarMensajeCliente('info', 'Por favor, ingrese un término de búsqueda');
        return;
    }
    
    // Filtrar clientes localmente
    const resultadosFiltrados = clientes.filter(cliente => 
        cliente.nombre.toLowerCase().includes(terminoBusqueda) || 
        cliente.apellido.toLowerCase().includes(terminoBusqueda) ||
        cliente.email.toLowerCase().includes(terminoBusqueda)
    );
    
    if (resultadosFiltrados.length > 0) {
        // Actualizar solo los clientes filtrados en el selector
        const selectClientes = document.getElementById('clienteSeleccionado');
        selectClientes.innerHTML = '<option value="">Seleccione un cliente</option>';
        
        resultadosFiltrados.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} ${cliente.apellido} (${cliente.email})`;
            selectClientes.appendChild(option);
        });
        
        // Mostrar mensaje con resultados
        const mensaje = `Se encontraron ${resultadosFiltrados.length} clientes que coinciden con "${terminoBusqueda}"`;
        mostrarMensajeCliente('success', mensaje);
        
        // Si hay clientes, seleccionar automáticamente el primero
        if (selectClientes.options.length > 1) {
            selectClientes.selectedIndex = 1;
            // Disparar evento change para cargar los datos
            const event = new Event('change');
            selectClientes.dispatchEvent(event);
        }
    } else {
        mostrarMensajeCliente('error', `No se encontraron clientes que coincidan con "${terminoBusqueda}"`);
    }
}

// Función para cargar datos del cliente seleccionado
function cargarDatosCliente() {
    const clienteId = document.getElementById('clienteSeleccionado').value;
    
    if (!clienteId) {
        limpiarFormularioCliente();
        return;
    }
    
    clienteSeleccionado = clientes.find(c => c.id == clienteId);
    
    if (clienteSeleccionado) {
        document.getElementById('clienteNombre').value = clienteSeleccionado.nombre;
        document.getElementById('clienteApellido').value = clienteSeleccionado.apellido;
        document.getElementById('clienteEmail').value = clienteSeleccionado.email;
        document.getElementById('clienteTelefono').value = clienteSeleccionado.telefono || '';
    }
}

// Función para guardar cambios en el cliente
async function guardarCambiosCliente(e) {
    e.preventDefault();
    
    if (!clienteSeleccionado) {
        mostrarMensajeCliente('error', 'Por favor, seleccione un cliente para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('clienteNombre').value;
        const apellido = document.getElementById('clienteApellido').value;
        const email = document.getElementById('clienteEmail').value;
        const telefono = document.getElementById('clienteTelefono').value;
        
        // Validación básica
        if (!nombre || !apellido || !email) {
            mostrarMensajeCliente('error', 'Por favor, complete todos los campos obligatorios');
            return;
        }
        
        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarMensajeCliente('error', 'Por favor, ingrese un correo electrónico válido.');
            return;
        }
        
        // Mostrar mensaje de procesamiento
        mostrarMensajeCliente('info', 'Guardando cambios...');
        
        // Preparar datos para enviar - exactamente como los requiere el sp_actualizar_cliente
        const cliente = {
            id: clienteSeleccionado.id,
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono
        };
        
        console.log('Enviando datos de cliente a actualizar:', cliente);
        
        // Enviar al servidor
        const respuesta = await fetch(`${API_URL}/clientes/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente)
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeCliente('success', 'Cliente actualizado correctamente');
            
            // Actualizar la lista de clientes con llamada directa
            const respuestaClientes = await fetch(`${API_URL}/clientes`);
            const resultadoClientes = await respuestaClientes.json();
            if (Array.isArray(resultadoClientes)) {
                clientes = resultadoClientes;
                console.log(`Clientes recargados: ${clientes.length}`);
                
                // Actualizar todos los selectores que muestran clientes
                actualizarSelectoresClientes();
            }
            
            // Limpiar formulario
            limpiarFormularioCliente();
        } else {
            mostrarMensajeCliente('error', 'Error al actualizar cliente: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        mostrarMensajeCliente('error', 'Error al actualizar cliente. Por favor, intente nuevamente.');
    }
}

// Función para actualizar todos los selectores que muestran clientes
function actualizarSelectoresClientes() {
    // Lista de IDs de selectores que muestran clientes
    const selectoresClientes = [
        'clienteSeleccionado',
        'pedidoCliente'
    ];
    
    // Actualizar cada selector
    selectoresClientes.forEach(selectorId => {
        cargarClientesEnSelect(selectorId);
    });
}

// Función para confirmar eliminación de un cliente
function confirmarEliminarCliente() {
    if (!clienteSeleccionado) {
        mostrarMensajeCliente('error', 'Por favor, seleccione un cliente para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar el cliente "${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}"?
ADVERTENCIA: Esta acción eliminará todos los datos relacionados con este cliente, incluyendo direcciones, órdenes, carritos, etc.`);
    
    if (confirmar) {
        eliminarCliente();
    }
}

// Función para eliminar un cliente
async function eliminarCliente() {
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensajeCliente('info', 'Eliminando cliente...');
        
        const respuesta = await fetch(`${API_URL}/clientes/eliminar/${clienteSeleccionado.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeCliente('success', 'Cliente eliminado correctamente');
            
            // Actualizar datos que pueden haberse visto afectados con llamadas directas
            // Actualizar clientes
            const respuestaClientes = await fetch(`${API_URL}/clientes`);
            const resultadoClientes = await respuestaClientes.json();
            if (Array.isArray(resultadoClientes)) {
                clientes = resultadoClientes;
                console.log(`Clientes recargados: ${clientes.length}`);
                
                // Actualizar selectores
                actualizarSelectoresClientes();
            }
            
            // Actualizar pedidos
            const respuestaPedidos = await fetch(`${API_URL}/ordenesCompra`);
            const resultadoPedidos = await respuestaPedidos.json();
            if (Array.isArray(resultadoPedidos)) {
                pedidos = resultadoPedidos;
                console.log(`Pedidos recargados: ${pedidos.length}`);
            }
            
            // Limpiar formulario
            limpiarFormularioCliente();
        } else {
            mostrarMensajeCliente('error', 'Error al eliminar cliente: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        mostrarMensajeCliente('error', 'Error al eliminar cliente. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario de cliente
function limpiarFormularioCliente() {
    document.getElementById('formModificarCliente').reset();
    clienteSeleccionado = null;
}

//
// ===== MÓDULO DE EMPLEADOS =====
//

// Función para mostrar mensajes de estado en la sección de empleados
function mostrarMensajeEmpleado(tipo, mensaje) {
    const mensajeElement = document.getElementById('empleadoEstadoMensaje');
    if (!mensajeElement) return;
    
    // Eliminar todas las clases
    mensajeElement.classList.remove('success', 'error', 'info');
    
    // Añadir la clase según el tipo
    mensajeElement.classList.add(tipo);
    
    // Establecer el mensaje
    mensajeElement.textContent = mensaje;
    
    // Mostrar el elemento
    mensajeElement.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeElement.style.display = 'none';
    }, 5000);
}

// Función para cargar roles de personal en un select
function cargarRolesEnSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione un cargo</option>';
    
    if (!rolesPersonal || rolesPersonal.length === 0) {
        console.error('No se han cargado los roles de personal');
        mostrarMensajeEmpleado('error', 'No se han cargado los roles de personal. Intente recargar la página.');
        return;
    }
    
    rolesPersonal.forEach(rol => {
        const option = document.createElement('option');
        option.value = rol.id;
        option.textContent = rol.nombre;
        select.appendChild(option);
    });
}

// Función para inicializar el formulario de modificar empleado
function inicializarModificarEmpleado() {
    console.log('Iniciando inicialización del formulario de empleados');
    
    // Mostrar un mensaje de carga
    const mensajeElement = document.getElementById('empleadoEstadoMensaje');
    if (mensajeElement) {
        mensajeElement.textContent = "Cargando empleados...";
        mensajeElement.classList.remove('success', 'error');
        mensajeElement.classList.add('info');
        mensajeElement.style.display = 'block';
    }
    
    try {
        // Verificar si tenemos empleados cargados
        if (!personal || personal.length === 0) {
            console.log('No hay empleados cargados');
            mostrarMensajeEmpleado('error', 'No se han cargado empleados. Intente recargar la página.');
            return;
        }
        
        // Verificar si tenemos roles cargados
        if (!rolesPersonal || rolesPersonal.length === 0) {
            console.log('No hay roles de personal cargados');
            mostrarMensajeEmpleado('error', 'No se han cargado los roles de personal. Intente recargar la página.');
            return;
        }
        
        // Cargar empleados en el select
        cargarEmpleadosEnSelect();
        
        // Cargar sucursales en el select
        cargarSucursalesEnSelect('empleadoSucursal');
        
        // Cargar roles en el select de cargo
        cargarRolesEnSelect('empleadoCargo');
        
        // Configurar eventos
        document.getElementById('btnBuscarEmpleado').addEventListener('click', buscarEmpleados);
        document.getElementById('empleadoSeleccionado').addEventListener('change', cargarDatosEmpleado);
        document.getElementById('formModificarEmpleado').addEventListener('submit', guardarCambiosEmpleado);
        document.getElementById('btnEliminarEmpleado').addEventListener('click', confirmarEliminarEmpleado);
        
        // Configurar botón de mostrar todos
        const btnMostrarTodos = document.getElementById('btnMostrarTodosEmpleados');
        if (btnMostrarTodos) {
            btnMostrarTodos.addEventListener('click', function() {
                cargarEmpleadosEnSelect();
                mostrarMensajeEmpleado('info', 'Se han cargado todos los empleados');
            });
        }
        
        console.log('Formulario de modificar empleado inicializado correctamente');
        if (mensajeElement) {
            mensajeElement.textContent = `${personal.length} empleados cargados correctamente`;
            mensajeElement.classList.remove('error');
            mensajeElement.classList.add('success');
            setTimeout(() => {
                mensajeElement.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error al inicializar el formulario de empleados:', error);
        mostrarMensajeEmpleado('error', 'Error al inicializar el formulario de empleados');
    }
}

// Función para cargar empleados en el select
function cargarEmpleadosEnSelect() {
    const select = document.getElementById('empleadoSeleccionado');
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione un empleado</option>';
    
    personal.forEach(empleado => {
        const option = document.createElement('option');
        option.value = empleado.id;
        option.textContent = `${empleado.nombre} ${empleado.apellido} (${empleado.rol})`;
        select.appendChild(option);
    });
}

// Función para buscar empleados
function buscarEmpleados() {
    const terminoBusqueda = document.getElementById('empleadoBuscar').value.toLowerCase().trim();
    
    if (!terminoBusqueda) {
        mostrarMensajeEmpleado('info', 'Por favor, ingrese un término de búsqueda');
        return;
    }
    
    // Filtrar empleados localmente
    const resultadosFiltrados = personal.filter(empleado => 
        empleado.nombre.toLowerCase().includes(terminoBusqueda) || 
        empleado.apellido.toLowerCase().includes(terminoBusqueda) ||
        empleado.email.toLowerCase().includes(terminoBusqueda)
    );
    
    if (resultadosFiltrados.length > 0) {
        // Actualizar solo los empleados filtrados en el selector
        const selectEmpleados = document.getElementById('empleadoSeleccionado');
        selectEmpleados.innerHTML = '<option value="">Seleccione un empleado</option>';
        
        resultadosFiltrados.forEach(empleado => {
            const option = document.createElement('option');
            option.value = empleado.id;
            option.textContent = `${empleado.nombre} ${empleado.apellido} (${empleado.rol})`;
            selectEmpleados.appendChild(option);
        });
        
        // Mostrar mensaje con resultados
        const mensaje = `Se encontraron ${resultadosFiltrados.length} empleados que coinciden con "${terminoBusqueda}"`;
        mostrarMensajeEmpleado('success', mensaje);
        
        // Si hay empleados, seleccionar automáticamente el primero
        if (selectEmpleados.options.length > 1) {
            selectEmpleados.selectedIndex = 1;
            // Disparar evento change para cargar los datos
            const event = new Event('change');
            selectEmpleados.dispatchEvent(event);
        }
    } else {
        mostrarMensajeEmpleado('error', `No se encontraron empleados que coincidan con "${terminoBusqueda}"`);
    }
}

// Función para cargar datos del empleado seleccionado
function cargarDatosEmpleado() {
    const empleadoId = document.getElementById('empleadoSeleccionado').value;
    
    if (!empleadoId) {
        limpiarFormularioEmpleado();
        return;
    }
    
    empleadoSeleccionado = personal.find(e => e.id == empleadoId);
    
    if (empleadoSeleccionado) {
        document.getElementById('empleadoNombre').value = empleadoSeleccionado.nombre;
        document.getElementById('empleadoApellido').value = empleadoSeleccionado.apellido;
        
        // Seleccionar el cargo/rol correcto en el combobox
        const selectCargo = document.getElementById('empleadoCargo');
        if (empleadoSeleccionado.rol_id) {
            selectCargo.value = empleadoSeleccionado.rol_id;
        } else {
            selectCargo.value = '';
        }
        
        // Seleccionar la sucursal correcta si tiene una asignada
        const selectSucursal = document.getElementById('empleadoSucursal');
        if (empleadoSeleccionado.sucursal_id) {
            selectSucursal.value = empleadoSeleccionado.sucursal_id;
        } else {
            selectSucursal.value = '';
        }
    }
}

// Función para guardar cambios en el empleado
async function guardarCambiosEmpleado(e) {
    e.preventDefault();
    
    if (!empleadoSeleccionado) {
        mostrarMensajeEmpleado('error', 'Por favor, seleccione un empleado para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('empleadoNombre').value;
        const apellido = document.getElementById('empleadoApellido').value;
        const cargo = document.getElementById('empleadoCargo').value;
        const sucursalId = document.getElementById('empleadoSucursal').value || null;
        
        // Validación básica
        if (!nombre || !apellido) {
            mostrarMensajeEmpleado('error', 'Por favor, complete los campos obligatorios');
            return;
        }
        
        // Mostrar mensaje de procesamiento
        mostrarMensajeEmpleado('info', 'Guardando cambios...');
        
        // Preparar datos para enviar - exactamente como los requiere el sp_actualizar_personal
        const empleado = {
            id: empleadoSeleccionado.id,
            nombre: nombre,
            apellido: apellido,
            email: empleadoSeleccionado.email, // Mantener el email original
            rol_id: cargo,
            sucursal_id: sucursalId
        };
        
        console.log('Enviando datos de empleado a actualizar:', empleado);
        
        // Enviar al servidor
        const respuesta = await fetch(`${API_URL}/personal/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleado)
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeEmpleado('success', 'Empleado actualizado correctamente');
            
            // Actualizar la lista de empleados con llamada directa
            const respuestaPersonal = await fetch(`${API_URL}/personal`);
            const resultadoPersonal = await respuestaPersonal.json();
            if (Array.isArray(resultadoPersonal)) {
                personal = resultadoPersonal;
                console.log(`Empleados recargados: ${personal.length}`);
                
                // Actualizar el selector
                cargarEmpleadosEnSelect();
            }
            
            // Limpiar formulario
            limpiarFormularioEmpleado();
        } else {
            mostrarMensajeEmpleado('error', 'Error al actualizar empleado: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al actualizar empleado:', error);
        mostrarMensajeEmpleado('error', 'Error al actualizar empleado. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de un empleado
function confirmarEliminarEmpleado() {
    if (!empleadoSeleccionado) {
        mostrarMensajeEmpleado('error', 'Por favor, seleccione un empleado para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar el empleado "${empleadoSeleccionado.nombre} ${empleadoSeleccionado.apellido}"?
Esta acción no se puede deshacer.`);
    
    if (confirmar) {
        eliminarEmpleado();
    }
}

// Función para eliminar un empleado
async function eliminarEmpleado() {
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensajeEmpleado('info', 'Eliminando empleado...');
        
        const respuesta = await fetch(`${API_URL}/personal/eliminar/${empleadoSeleccionado.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajeEmpleado('success', 'Empleado eliminado correctamente');
            
            // Actualizar la lista de empleados con llamada directa
            const respuestaPersonal = await fetch(`${API_URL}/personal`);
            const resultadoPersonal = await respuestaPersonal.json();
            if (Array.isArray(resultadoPersonal)) {
                personal = resultadoPersonal;
                console.log(`Empleados recargados: ${personal.length}`);
                
                // Actualizar el selector
                cargarEmpleadosEnSelect();
            }
            
            // Limpiar formulario
            limpiarFormularioEmpleado();
        } else {
            mostrarMensajeEmpleado('error', 'Error al eliminar empleado: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        mostrarMensajeEmpleado('error', 'Error al eliminar empleado. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario de empleado
function limpiarFormularioEmpleado() {
    document.getElementById('formModificarEmpleado').reset();
    empleadoSeleccionado = null;
}

//
// ===== MÓDULO DE PEDIDOS =====
//

// Función para inicializar el formulario de modificar pedido
async function inicializarModificarPedido() {
    try {
        // Cargar datos frescos desde el servidor
        const respuestaPedidos = await fetch(`${API_URL}/ordenesCompra`);
        const resultadoPedidos = await respuestaPedidos.json();
        
        if (Array.isArray(resultadoPedidos)) {
            pedidos = resultadoPedidos;
            console.log(`Pedidos cargados: ${pedidos.length}`);
        } else {
            console.error("Error al cargar pedidos:", resultadoPedidos);
            mostrarMensajePedido('error', 'No se pudieron cargar los pedidos correctamente');
        }
        
        // Cargar pedidos en el select
        cargarPedidosEnSelect();
        mostrarMensajePedido('info', `Se han cargado ${pedidos.length} pedidos`);
        
        // Cargar clientes y sucursales en los selects
        cargarClientesEnSelect('pedidoCliente');
        cargarSucursalesEnSelect('pedidoSucursal');
        
        // Configurar eventos
        document.getElementById('btnBuscarPedido').addEventListener('click', buscarPedidos);
        document.getElementById('btnMostrarTodosPedidos').addEventListener('click', () => {
            cargarPedidosEnSelect();
            mostrarMensajePedido('info', `Se muestran todos los pedidos (${pedidos.length})`);
        });
        document.getElementById('pedidoSeleccionado').addEventListener('change', cargarDatosPedido);
        document.getElementById('formModificarPedido').addEventListener('submit', guardarCambiosPedido);
        document.getElementById('btnEliminarPedido').addEventListener('click', confirmarEliminarPedido);
        
        console.log('Formulario de modificar pedido inicializado');
    } catch (error) {
        console.error("Error al inicializar el formulario de pedidos:", error);
        mostrarMensajePedido('error', 'Error al cargar datos de pedidos. Intente recargar la página.');
    }
}

// Función para cargar pedidos en el select
function cargarPedidosEnSelect() {
    const select = document.getElementById('pedidoSeleccionado');
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione un pedido</option>';
    
    pedidos.forEach(pedido => {
        const option = document.createElement('option');
        option.value = pedido.id;
        // Formatear fecha para que sea más legible
        const fecha = new Date(pedido.fecha);
        const fechaFormateada = `${fecha.toLocaleDateString()}`;
        option.textContent = `Pedido #${pedido.id} - ${pedido.cliente} - ${fechaFormateada} - ${pedido.estado}`;
        select.appendChild(option);
    });
}

// Función para mostrar mensajes en la pestaña de pedidos
function mostrarMensajePedido(tipo, mensaje) {
    const mensajeElement = document.getElementById('pedidoEstadoMensaje');
    if (!mensajeElement) return;
    
    // Eliminar todas las clases
    mensajeElement.classList.remove('success', 'error', 'info');
    
    // Añadir la clase según el tipo
    mensajeElement.classList.add(tipo);
    
    // Establecer el mensaje
    mensajeElement.textContent = mensaje;
    
    // Mostrar el elemento
    mensajeElement.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeElement.style.opacity = '0';
        setTimeout(() => {
            mensajeElement.style.display = 'none';
            mensajeElement.style.opacity = '1';
        }, 500);
    }, 5000);
}

// Función para buscar pedidos
function buscarPedidos() {
    const terminoBusqueda = document.getElementById('pedidoBuscar').value.toLowerCase();
    
    if (!terminoBusqueda) {
        mostrarMensajePedido('error', 'Por favor, ingrese un término de búsqueda');
        return;
    }
    
    // Filtrar pedidos localmente
    const resultadosFiltrados = pedidos.filter(pedido => 
        pedido.cliente.toLowerCase().includes(terminoBusqueda) || 
        pedido.id.toString().includes(terminoBusqueda) ||
        pedido.estado.toLowerCase().includes(terminoBusqueda)
    );
    
    if (resultadosFiltrados.length > 0) {
        // Actualizar solo los pedidos filtrados en el selector
        const selectPedidos = document.getElementById('pedidoSeleccionado');
        selectPedidos.innerHTML = '<option value="">Seleccione un pedido</option>';
        
        resultadosFiltrados.forEach(pedido => {
            const option = document.createElement('option');
            option.value = pedido.id;
            const fecha = new Date(pedido.fecha);
            const fechaFormateada = `${fecha.toLocaleDateString()}`;
            option.textContent = `Pedido #${pedido.id} - ${pedido.cliente} - ${fechaFormateada} - ${pedido.estado}`;
            selectPedidos.appendChild(option);
        });
        
        mostrarMensajePedido('success', `Se encontraron ${resultadosFiltrados.length} pedidos que coinciden con la búsqueda`);
    } else {
        mostrarMensajePedido('error', 'No se encontraron pedidos que coincidan con la búsqueda');
    }
}

// Función para cargar datos del pedido seleccionado
async function cargarDatosPedido() {
    const pedidoId = document.getElementById('pedidoSeleccionado').value;
    
    if (!pedidoId) {
        limpiarFormularioPedido();
        return;
    }
    
    pedidoSeleccionado = pedidos.find(p => p.id == pedidoId);
    
    if (pedidoSeleccionado) {
        // Cargar los detalles completos del pedido desde el servidor
        try {
            const respuesta = await fetch(`${API_URL}/ordenesCompra/${pedidoId}`);
            const detallePedido = await respuesta.json();
            
            if (detallePedido) {
                // Seleccionar el cliente correcto
                const selectCliente = document.getElementById('pedidoCliente');
                for (let i = 0; i < selectCliente.options.length; i++) {
                    if (selectCliente.options[i].textContent.includes(pedidoSeleccionado.cliente)) {
                        selectCliente.selectedIndex = i;
                        break;
                    }
                }
                
                // Seleccionar la sucursal correcta
                const selectSucursal = document.getElementById('pedidoSucursal');
                for (let i = 0; i < selectSucursal.options.length; i++) {
                    if (selectSucursal.options[i].textContent === pedidoSeleccionado.sucursal) {
                        selectSucursal.selectedIndex = i;
                        break;
                    }
                }
                
                // Establecer la fecha (formato YYYY-MM-DD)
                const fecha = new Date(pedidoSeleccionado.fecha);
                const fechaFormateada = fecha.toISOString().split('T')[0];
                document.getElementById('pedidoFecha').value = fechaFormateada;
                
                // Establecer el estado
                document.getElementById('pedidoEstado').value = pedidoSeleccionado.estado;
                
                // Establecer el canal
                document.getElementById('pedidoCanal').value = detallePedido.canal || 'Web'; // Valor por defecto si no está definido
                
                // Establecer el total
                document.getElementById('pedidoTotal').value = pedidoSeleccionado.total;
                
                // Cargar productos del pedido (detallePedido.productos debería venir del servidor)
                const productosContainer = document.getElementById('productosContainer');
                productosContainer.innerHTML = '';
                
                if (detallePedido.productos && detallePedido.productos.length > 0) {
                    detallePedido.productos.forEach(producto => {
                        const productoDiv = document.createElement('div');
                        productoDiv.className = 'producto-item';
                        
                        // Calcular subtotal
                        const subtotal = parseFloat(producto.precio_unitario) * parseInt(producto.cantidad);
                        
                        productoDiv.innerHTML = `
                            <p><strong>${producto.nombre}</strong> - Cantidad: ${producto.cantidad} - 
                               Precio unitario: $${parseFloat(producto.precio_unitario).toFixed(2)} - 
                               Subtotal: $${subtotal.toFixed(2)}
                            </p>
                        `;
                        
                        productosContainer.appendChild(productoDiv);
                    });
                } else {
                    productosContainer.innerHTML = '<p>No hay productos en este pedido.</p>';
                }
            }
            
        } catch (error) {
            console.error('Error al cargar detalles del pedido:', error);
            mostrarMensajePedido('error', 'Error al cargar detalles del pedido. Por favor, intente nuevamente.');
        }
    }
}

// Función para guardar cambios en el pedido
async function guardarCambiosPedido(e) {
    e.preventDefault();
    
    if (!pedidoSeleccionado) {
        mostrarMensajePedido('error', 'Por favor, seleccione un pedido para modificar');
        return;
    }
    
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensajePedido('info', 'Guardando cambios...');
        
        const clienteId = document.getElementById('pedidoCliente').value;
        const sucursalId = document.getElementById('pedidoSucursal').value;
        const fechaStr = document.getElementById('pedidoFecha').value;
        const estado = document.getElementById('pedidoEstado').value;
        const canal = document.getElementById('pedidoCanal').value;
        
        // Validación básica
        if (!clienteId || !sucursalId || !fechaStr || !estado || !canal) {
            mostrarMensajePedido('error', 'Por favor, complete todos los campos obligatorios');
            return;
        }
        
        // Convertir fecha a formato YYYY-MM-DD HH:MM:SS
        const fecha = new Date(fechaStr);
        const fechaFormateada = fecha.toISOString().replace('T', ' ').split('.')[0];
        
        // Preparar datos para enviar - exactamente como los requiere el sp_actualizar_pedido
        const pedido = {
            id: pedidoSeleccionado.id,
            cliente_id: clienteId,
            sucursalOrigen_id: sucursalId,
            fecha: fechaFormateada,
            total: pedidoSeleccionado.total, // Mantener el total original
            canal: canal,
            estado: estado,
            usuario_creacion_id: 1 // ID por defecto del usuario del sistema
        };
        
        console.log('Enviando datos para actualizar pedido:', pedido);
        
        // Enviar al servidor
        const respuesta = await fetch(`${API_URL}/pedidos/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido)
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajePedido('success', 'Pedido actualizado correctamente');
            
            // Actualizar la lista de pedidos con una llamada directa
            const respuestaPedidos = await fetch(`${API_URL}/ordenesCompra`);
            const resultadoPedidos = await respuestaPedidos.json();
            if (Array.isArray(resultadoPedidos)) {
                pedidos = resultadoPedidos;
                console.log(`Pedidos recargados: ${pedidos.length}`);
                
                // Actualizar el selector
                cargarPedidosEnSelect();
            }
            
            // Limpiar formulario
            limpiarFormularioPedido();
        } else {
            mostrarMensajePedido('error', 'Error al actualizar pedido: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al actualizar pedido:', error);
        mostrarMensajePedido('error', 'Error al actualizar pedido. Por favor, intente nuevamente. Detalles: ' + error.message);
    }
}

// Función para confirmar eliminación de un pedido
function confirmarEliminarPedido() {
    if (!pedidoSeleccionado) {
        mostrarMensajePedido('error', 'Por favor, seleccione un pedido para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar el pedido #${pedidoSeleccionado.id}?
ADVERTENCIA: Esta acción eliminará todos los datos relacionados con este pedido, incluyendo detalles de productos, pagos, envíos, etc.`);
    
    if (confirmar) {
        eliminarPedido();
    }
}

// Función para eliminar un pedido
async function eliminarPedido() {
    try {
        // Mostrar mensaje de procesamiento
        mostrarMensajePedido('info', 'Eliminando pedido...');
        
        const respuesta = await fetch(`${API_URL}/pedidos/eliminar/${pedidoSeleccionado.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            mostrarMensajePedido('success', 'Pedido eliminado correctamente');
            
            // Actualizar la lista de pedidos con una llamada directa
            const respuestaPedidos = await fetch(`${API_URL}/ordenesCompra`);
            const resultadoPedidos = await respuestaPedidos.json();
            if (Array.isArray(resultadoPedidos)) {
                pedidos = resultadoPedidos;
                console.log(`Pedidos recargados: ${pedidos.length}`);
                
                // Actualizar el selector
                cargarPedidosEnSelect();
            }
            
            // Limpiar formulario
            limpiarFormularioPedido();
        } else {
            mostrarMensajePedido('error', 'Error al eliminar pedido: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        mostrarMensajePedido('error', 'Error al eliminar pedido. Por favor, intente nuevamente. Detalles: ' + error.message);
    }
}

// Función para limpiar el formulario de pedido
function limpiarFormularioPedido() {
    document.getElementById('formModificarPedido').reset();
    document.getElementById('productosContainer').innerHTML = '';
    pedidoSeleccionado = null;
}

// Función para abrir pestañas
function openTab(tabId) {
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
    
    // Reinicializar formulario según la pestaña activa
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
}