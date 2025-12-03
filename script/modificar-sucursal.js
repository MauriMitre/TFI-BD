// Variables para el módulo de sucursales
let sucursalSeleccionada = null;

// Función para inicializar el formulario de modificar sucursal
function inicializarModificarSucursal() {
    // Cargar sucursales en el select
    cargarSucursalesEnSelect();
    
    // Configurar eventos
    configurarEventosSucursal();
    
    console.log('Formulario de modificar sucursal inicializado');
}

// Función para cargar sucursales en el select
function cargarSucursalesEnSelect() {
    const select = document.getElementById('sucursalSeleccionada');
    select.innerHTML = '<option value="">Seleccione una sucursal</option>';
    
    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = `${sucursal.nombre} - ${sucursal.direccion}`;
        select.appendChild(option);
    });
}

// Función para configurar eventos del módulo de sucursales
function configurarEventosSucursal() {
    // Evento para buscar sucursal
    document.getElementById('btnBuscarSucursal').addEventListener('click', buscarSucursales);
    
    // Evento para cargar datos de la sucursal seleccionada
    document.getElementById('sucursalSeleccionada').addEventListener('change', cargarDatosSucursal);
    
    // Evento para guardar cambios
    document.getElementById('formModificarSucursal').addEventListener('submit', guardarCambiosSucursal);
    
    // Evento para eliminar sucursal
    document.getElementById('btnEliminarSucursal').addEventListener('click', confirmarEliminarSucursal);
}

// Función para buscar sucursales
async function buscarSucursales() {
    const terminoBusqueda = document.getElementById('sucursalBuscar').value.toLowerCase();
    
    if (!terminoBusqueda) {
        alert('Por favor, ingrese un término de búsqueda');
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/sucursales/buscar?termino=${encodeURIComponent(terminoBusqueda)}`);
        const resultado = await respuesta.json();
        
        if (Array.isArray(resultado) && resultado.length > 0) {
            // Actualizar solo las sucursales filtradas en el selector, mantener la lista completa en memoria
            const selectSucursales = document.getElementById('sucursalSeleccionada');
            selectSucursales.innerHTML = '<option value="">Seleccione una sucursal</option>';
            
            resultado.forEach(sucursal => {
                const option = document.createElement('option');
                option.value = sucursal.id;
                option.textContent = `${sucursal.nombre} - ${sucursal.direccion}`;
                selectSucursales.appendChild(option);
            });
            
            alert(`Se encontraron ${resultado.length} sucursales que coinciden con la búsqueda`);
        } else {
            alert('No se encontraron sucursales que coincidan con la búsqueda');
        }
        
    } catch (error) {
        console.error('Error al buscar sucursales:', error);
        alert('Error al buscar sucursales. Por favor, intente nuevamente.');
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
        document.getElementById('sucursalTelefono').value = sucursalSeleccionada.telefono;
    }
}

// Función para guardar cambios en la sucursal
async function guardarCambiosSucursal(e) {
    e.preventDefault();
    
    if (!sucursalSeleccionada) {
        alert('Por favor, seleccione una sucursal para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('sucursalNombre').value;
        const direccion = document.getElementById('sucursalDireccion').value;
        const provincia = document.getElementById('sucursalProvincia').value;
        const telefono = document.getElementById('sucursalTelefono').value;
        
        // Preparar datos para enviar
        const sucursal = {
            id: sucursalSeleccionada.id,
            nombre: nombre,
            direccion: direccion,
            provincia: provincia,
            telefono: telefono
        };
        
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
            alert('Sucursal actualizada correctamente');
            
            // Actualizar la lista de sucursales
            await cargarSucursales();
            cargarSucursalesEnSelect();
            
            // Limpiar formulario
            limpiarFormularioSucursal();
        } else {
            alert('Error al actualizar sucursal: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al enviar sucursal:', error);
        alert('Error al actualizar sucursal. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de una sucursal
function confirmarEliminarSucursal() {
    if (!sucursalSeleccionada) {
        alert('Por favor, seleccione una sucursal para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar la sucursal "${sucursalSeleccionada.nombre}"?
ADVERTENCIA: Esto también eliminará todos los pedidos y empleados asociados a esta sucursal.`);
    
    if (confirmar) {
        eliminarSucursal();
    }
}

// Función para eliminar una sucursal
async function eliminarSucursal() {
    try {
        const respuesta = await fetch(`${API_URL}/sucursales/eliminar/${sucursalSeleccionada.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            alert('Sucursal eliminada correctamente');
            
            // Actualizar la lista de sucursales
            await cargarSucursales();
            cargarSucursalesEnSelect();
            
            // Actualizar también los pedidos y empleados porque pueden haberse eliminado algunos
            await cargarPedidos();
            await cargarEmpleados();
            
            // Limpiar formulario
            limpiarFormularioSucursal();
        } else {
            alert('Error al eliminar sucursal: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar sucursal:', error);
        alert('Error al eliminar sucursal. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario
function limpiarFormularioSucursal() {
    document.getElementById('sucursalNombre').value = '';
    document.getElementById('sucursalDireccion').value = '';
    document.getElementById('sucursalProvincia').value = '';
    document.getElementById('sucursalTelefono').value = '';
    sucursalSeleccionada = null;
}
