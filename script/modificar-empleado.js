// Variables para el módulo de empleados
let empleadoSeleccionado = null;

// Función para inicializar el formulario de modificar empleado
function inicializarModificarEmpleado() {
    // Cargar empleados en el select
    cargarEmpleadosEnSelect();
    
    // Cargar sucursales en el select
    cargarSucursalesEnSelectEmpleado();
    
    // Configurar eventos
    configurarEventosEmpleado();
    
    console.log('Formulario de modificar empleado inicializado');
}

// Función para cargar empleados en el select
function cargarEmpleadosEnSelect() {
    const select = document.getElementById('empleadoSeleccionado');
    select.innerHTML = '<option value="">Seleccione un empleado</option>';
    
    empleados.forEach(empleado => {
        const option = document.createElement('option');
        option.value = empleado.id;
        option.textContent = `${empleado.nombre} ${empleado.apellido} - ${empleado.cargo}`;
        select.appendChild(option);
    });
}

// Función para cargar sucursales en el select de empleados
function cargarSucursalesEnSelectEmpleado() {
    const select = document.getElementById('empleadoSucursal');
    select.innerHTML = '<option value="">Seleccione una sucursal</option>';
    
    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        select.appendChild(option);
    });
}

// Función para configurar eventos del módulo de empleados
function configurarEventosEmpleado() {
    // Evento para buscar empleado
    document.getElementById('btnBuscarEmpleado').addEventListener('click', buscarEmpleados);
    
    // Evento para cargar datos del empleado seleccionado
    document.getElementById('empleadoSeleccionado').addEventListener('change', cargarDatosEmpleado);
    
    // Evento para guardar cambios
    document.getElementById('formModificarEmpleado').addEventListener('submit', guardarCambiosEmpleado);
    
    // Evento para eliminar empleado
    document.getElementById('btnEliminarEmpleado').addEventListener('click', confirmarEliminarEmpleado);
}

// Función para buscar empleados
async function buscarEmpleados() {
    const terminoBusqueda = document.getElementById('empleadoBuscar').value.toLowerCase();
    
    if (!terminoBusqueda) {
        alert('Por favor, ingrese un término de búsqueda');
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/empleados/buscar?termino=${encodeURIComponent(terminoBusqueda)}`);
        const resultado = await respuesta.json();
        
        if (Array.isArray(resultado) && resultado.length > 0) {
            // Actualizar solo los empleados filtrados en el selector, mantener la lista completa en memoria
            const selectEmpleados = document.getElementById('empleadoSeleccionado');
            selectEmpleados.innerHTML = '<option value="">Seleccione un empleado</option>';
            
            resultado.forEach(empleado => {
                const option = document.createElement('option');
                option.value = empleado.id;
                option.textContent = `${empleado.nombre} ${empleado.apellido} - ${empleado.cargo}`;
                selectEmpleados.appendChild(option);
            });
            
            alert(`Se encontraron ${resultado.length} empleados que coinciden con la búsqueda`);
        } else {
            alert('No se encontraron empleados que coincidan con la búsqueda');
        }
        
    } catch (error) {
        console.error('Error al buscar empleados:', error);
        alert('Error al buscar empleados. Por favor, intente nuevamente.');
    }
}

// Función para cargar datos del empleado seleccionado
function cargarDatosEmpleado() {
    const empleadoId = document.getElementById('empleadoSeleccionado').value;
    
    if (!empleadoId) {
        limpiarFormularioEmpleado();
        return;
    }
    
    empleadoSeleccionado = empleados.find(e => e.id == empleadoId);
    
    if (empleadoSeleccionado) {
        document.getElementById('empleadoNombre').value = empleadoSeleccionado.nombre;
        document.getElementById('empleadoApellido').value = empleadoSeleccionado.apellido;
        document.getElementById('empleadoCargo').value = empleadoSeleccionado.cargo;
        
        // Buscar la sucursal correspondiente
        const sucursalId = sucursales.find(s => s.nombre === empleadoSeleccionado.sucursal)?.id;
        if (sucursalId) {
            document.getElementById('empleadoSucursal').value = sucursalId;
        }
    }
}

// Función para guardar cambios en el empleado
async function guardarCambiosEmpleado(e) {
    e.preventDefault();
    
    if (!empleadoSeleccionado) {
        alert('Por favor, seleccione un empleado para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('empleadoNombre').value;
        const apellido = document.getElementById('empleadoApellido').value;
        const cargo = document.getElementById('empleadoCargo').value;
        const sucursalId = document.getElementById('empleadoSucursal').value;
        
        // Preparar datos para enviar
        const empleado = {
            id: empleadoSeleccionado.id,
            nombre: nombre,
            apellido: apellido,
            cargo: cargo,
            sucursal_id: sucursalId
        };
        
        // Enviar al servidor
        const respuesta = await fetch(`${API_URL}/empleados/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleado)
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            alert('Empleado actualizado correctamente');
            
            // Actualizar la lista de empleados
            await cargarEmpleados();
            cargarEmpleadosEnSelect();
            
            // Limpiar formulario
            limpiarFormularioEmpleado();
        } else {
            alert('Error al actualizar empleado: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al enviar empleado:', error);
        alert('Error al actualizar empleado. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de un empleado
function confirmarEliminarEmpleado() {
    if (!empleadoSeleccionado) {
        alert('Por favor, seleccione un empleado para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar al empleado "${empleadoSeleccionado.nombre} ${empleadoSeleccionado.apellido}"?`);
    
    if (confirmar) {
        eliminarEmpleado();
    }
}

// Función para eliminar un empleado
async function eliminarEmpleado() {
    try {
        const respuesta = await fetch(`${API_URL}/empleados/eliminar/${empleadoSeleccionado.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            alert('Empleado eliminado correctamente');
            
            // Actualizar la lista de empleados
            await cargarEmpleados();
            cargarEmpleadosEnSelect();
            
            // Limpiar formulario
            limpiarFormularioEmpleado();
        } else {
            alert('Error al eliminar empleado: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        alert('Error al eliminar empleado. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario
function limpiarFormularioEmpleado() {
    document.getElementById('empleadoNombre').value = '';
    document.getElementById('empleadoApellido').value = '';
    document.getElementById('empleadoCargo').value = '';
    document.getElementById('empleadoSucursal').value = '';
    empleadoSeleccionado = null;
}
