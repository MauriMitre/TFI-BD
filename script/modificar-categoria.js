// Variables para el módulo de categorías
let categoriaSeleccionada = null;

// Función para inicializar el formulario de modificar categoría
function inicializarModificarCategoria() {
    // Cargar categorías en el select
    cargarCategoriasEnSelectModificar();
    
    // Configurar eventos
    configurarEventosCategoria();
    
    console.log('Formulario de modificar categoría inicializado');
}

// Función para cargar categorías en el select de modificación
function cargarCategoriasEnSelectModificar() {
    const select = document.getElementById('categoriaSeleccionada');
    select.innerHTML = '<option value="">Seleccione una categoría</option>';
    
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        select.appendChild(option);
    });
}

// Función para configurar eventos del módulo de categorías
function configurarEventosCategoria() {
    // Evento para buscar categoría
    document.getElementById('btnBuscarCategoria').addEventListener('click', buscarCategorias);
    
    // Evento para cargar datos de la categoría seleccionada
    document.getElementById('categoriaSeleccionada').addEventListener('change', cargarDatosCategoria);
    
    // Evento para guardar cambios
    document.getElementById('formModificarCategoria').addEventListener('submit', guardarCambiosCategoria);
    
    // Evento para eliminar categoría
    document.getElementById('btnEliminarCategoria').addEventListener('click', confirmarEliminarCategoria);
}

// Función para buscar categorías
async function buscarCategorias() {
    const terminoBusqueda = document.getElementById('categoriaBuscar').value.toLowerCase();
    
    if (!terminoBusqueda) {
        alert('Por favor, ingrese un término de búsqueda');
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/categorias/buscar?termino=${encodeURIComponent(terminoBusqueda)}`);
        const resultado = await respuesta.json();
        
        if (Array.isArray(resultado) && resultado.length > 0) {
            // Actualizar solo las categorías filtradas en el selector, mantener la lista completa en memoria
            const selectCategorias = document.getElementById('categoriaSeleccionada');
            selectCategorias.innerHTML = '<option value="">Seleccione una categoría</option>';
            
            resultado.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                selectCategorias.appendChild(option);
            });
            
            alert(`Se encontraron ${resultado.length} categorías que coinciden con la búsqueda`);
        } else {
            alert('No se encontraron categorías que coincidan con la búsqueda');
        }
        
    } catch (error) {
        console.error('Error al buscar categorías:', error);
        alert('Error al buscar categorías. Por favor, intente nuevamente.');
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
        alert('Por favor, seleccione una categoría para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('categoriaNombre').value;
        const descripcion = document.getElementById('categoriaDescripcion').value || '';
        
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
            alert('Categoría actualizada correctamente');
            
            // Actualizar la lista de categorías
            await cargarCategorias();
            cargarCategoriasEnSelectModificar();
            
            // Limpiar formulario
            limpiarFormularioCategoria();
        } else {
            alert('Error al actualizar categoría: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al enviar categoría:', error);
        alert('Error al actualizar categoría. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de una categoría
function confirmarEliminarCategoria() {
    if (!categoriaSeleccionada) {
        alert('Por favor, seleccione una categoría para eliminar');
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
        const respuesta = await fetch(`${API_URL}/categorias/eliminar/${categoriaSeleccionada.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            alert('Categoría eliminada correctamente');
            
            // Actualizar la lista de categorías
            await cargarCategorias();
            cargarCategoriasEnSelectModificar();
            
            // Actualizar también los productos porque pueden haberse eliminado algunos
            await cargarProductos();
            
            // Limpiar formulario
            limpiarFormularioCategoria();
        } else {
            alert('Error al eliminar categoría: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        alert('Error al eliminar categoría. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario
function limpiarFormularioCategoria() {
    document.getElementById('categoriaNombre').value = '';
    document.getElementById('categoriaDescripcion').value = '';
    categoriaSeleccionada = null;
}
