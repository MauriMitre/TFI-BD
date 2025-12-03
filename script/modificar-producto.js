// Variables para el módulo de productos
let productoSeleccionado = null;

// Función para inicializar el formulario de modificar producto
function inicializarModificarProducto() {
    // Cargar productos en el select
    cargarProductosEnSelect();
    
    // Cargar categorías en el select
    cargarCategoriasEnSelect();
    
    // Configurar eventos
    configurarEventosProducto();
    
    console.log('Formulario de modificar producto inicializado');
}

// Función para cargar productos en el select
function cargarProductosEnSelect() {
    const select = document.getElementById('productoSeleccionado');
    select.innerHTML = '<option value="">Seleccione un producto</option>';
    
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = `${producto.nombre} - ${producto.sku}`;
        select.appendChild(option);
    });
}

// Función para cargar categorías en el select
function cargarCategoriasEnSelect() {
    const select = document.getElementById('productoCategoria');
    select.innerHTML = '<option value="">Seleccione una categoría</option>';
    
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        select.appendChild(option);
    });
}

// Función para configurar eventos del módulo de productos
function configurarEventosProducto() {
    // Evento para buscar producto
    document.getElementById('btnBuscarProducto').addEventListener('click', buscarProductos);
    
    // Evento para cargar datos del producto seleccionado
    document.getElementById('productoSeleccionado').addEventListener('change', cargarDatosProducto);
    
    // Evento para guardar cambios
    document.getElementById('formModificarProducto').addEventListener('submit', guardarCambiosProducto);
    
    // Evento para eliminar producto
    document.getElementById('btnEliminarProducto').addEventListener('click', confirmarEliminarProducto);
}

// Función para buscar productos
async function buscarProductos() {
    const terminoBusqueda = document.getElementById('productoBuscar').value.toLowerCase();
    
    if (!terminoBusqueda) {
        alert('Por favor, ingrese un término de búsqueda');
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/productos/buscar?termino=${encodeURIComponent(terminoBusqueda)}`);
        const resultado = await respuesta.json();
        
        if (Array.isArray(resultado) && resultado.length > 0) {
            // Actualizar solo los productos filtrados en el selector, mantener la lista completa en memoria
            const selectProductos = document.getElementById('productoSeleccionado');
            selectProductos.innerHTML = '<option value="">Seleccione un producto</option>';
            
            resultado.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = `${producto.nombre} - ${producto.sku}`;
                selectProductos.appendChild(option);
            });
            
            alert(`Se encontraron ${resultado.length} productos que coinciden con la búsqueda`);
        } else {
            alert('No se encontraron productos que coincidan con la búsqueda');
        }
        
    } catch (error) {
        console.error('Error al buscar productos:', error);
        alert('Error al buscar productos. Por favor, intente nuevamente.');
    }
}

// Función para cargar datos del producto seleccionado
function cargarDatosProducto() {
    const productoId = document.getElementById('productoSeleccionado').value;
    
    if (!productoId) {
        limpiarFormularioProducto();
        return;
    }
    
    productoSeleccionado = productos.find(p => p.id == productoId);
    
    if (productoSeleccionado) {
        document.getElementById('productoNombre').value = productoSeleccionado.nombre;
        document.getElementById('productoSKU').value = productoSeleccionado.sku;
        document.getElementById('productoPrecio').value = productoSeleccionado.precio;
        document.getElementById('productoEstado').value = productoSeleccionado.estado;
        
        // Buscar la categoría correspondiente
        const categoriaId = categorias.find(c => c.nombre === productoSeleccionado.categoria)?.id;
        if (categoriaId) {
            document.getElementById('productoCategoria').value = categoriaId;
        }
    }
}

// Función para guardar cambios en el producto
async function guardarCambiosProducto(e) {
    e.preventDefault();
    
    if (!productoSeleccionado) {
        alert('Por favor, seleccione un producto para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('productoNombre').value;
        const categoriaId = document.getElementById('productoCategoria').value;
        const sku = document.getElementById('productoSKU').value;
        const precio = document.getElementById('productoPrecio').value;
        const estado = document.getElementById('productoEstado').value;
        
        // Preparar datos para enviar
        const producto = {
            id: productoSeleccionado.id,
            nombre: nombre,
            categoria_id: categoriaId,
            sku: sku,
            precio: precio,
            estado: estado
        };
        
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
            alert('Producto actualizado correctamente');
            
            // Actualizar la lista de productos
            await cargarProductos();
            cargarProductosEnSelect();
            
            // Limpiar formulario
            limpiarFormularioProducto();
        } else {
            alert('Error al actualizar producto: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al enviar producto:', error);
        alert('Error al actualizar producto. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de un producto
function confirmarEliminarProducto() {
    if (!productoSeleccionado) {
        alert('Por favor, seleccione un producto para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar el producto "${productoSeleccionado.nombre}"?`);
    
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

// Función para limpiar el formulario
function limpiarFormularioProducto() {
    document.getElementById('productoNombre').value = '';
    document.getElementById('productoCategoria').value = '';
    document.getElementById('productoSKU').value = '';
    document.getElementById('productoPrecio').value = '';
    document.getElementById('productoEstado').value = 'Disponible';
    productoSeleccionado = null;
}
