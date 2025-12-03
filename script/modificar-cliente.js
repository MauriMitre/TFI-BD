// Variables para el módulo de clientes
let clienteSeleccionado = null;

// Función para inicializar el formulario de modificar cliente
function inicializarModificarCliente() {
    // Cargar clientes en el select
    cargarClientesEnSelect();
    
    // Configurar eventos
    configurarEventosCliente();
    
    console.log('Formulario de modificar cliente inicializado');
}

// Función para cargar clientes en el select
function cargarClientesEnSelect() {
    const select = document.getElementById('clienteSeleccionado');
    select.innerHTML = '<option value="">Seleccione un cliente</option>';
    
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nombre} ${cliente.apellido} - ${cliente.email}`;
        select.appendChild(option);
    });
}

// Función para configurar eventos del módulo de clientes
function configurarEventosCliente() {
    // Evento para buscar cliente
    document.getElementById('btnBuscarCliente').addEventListener('click', buscarClientes);
    
    // Evento para cargar datos del cliente seleccionado
    document.getElementById('clienteSeleccionado').addEventListener('change', cargarDatosCliente);
    
    // Evento para guardar cambios
    document.getElementById('formModificarCliente').addEventListener('submit', guardarCambiosCliente);
    
    // Evento para eliminar cliente
    document.getElementById('btnEliminarCliente').addEventListener('click', confirmarEliminarCliente);
}

// Función para buscar clientes
async function buscarClientes() {
    const terminoBusqueda = document.getElementById('clienteBuscar').value.toLowerCase();
    
    if (!terminoBusqueda) {
        alert('Por favor, ingrese un término de búsqueda');
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/clientes/buscar?termino=${encodeURIComponent(terminoBusqueda)}`);
        const resultado = await respuesta.json();
        
        if (Array.isArray(resultado) && resultado.length > 0) {
            // Actualizar solo los clientes filtrados en el selector, mantener la lista completa en memoria
            const selectClientes = document.getElementById('clienteSeleccionado');
            selectClientes.innerHTML = '<option value="">Seleccione un cliente</option>';
            
            resultado.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = `${cliente.nombre} ${cliente.apellido} - ${cliente.email}`;
                selectClientes.appendChild(option);
            });
            
            alert(`Se encontraron ${resultado.length} clientes que coinciden con la búsqueda`);
        } else {
            alert('No se encontraron clientes que coincidan con la búsqueda');
        }
        
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        alert('Error al buscar clientes. Por favor, intente nuevamente.');
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
        document.getElementById('clienteTelefono').value = clienteSeleccionado.telefono;
    }
}

// Función para guardar cambios en el cliente
async function guardarCambiosCliente(e) {
    e.preventDefault();
    
    if (!clienteSeleccionado) {
        alert('Por favor, seleccione un cliente para modificar');
        return;
    }
    
    try {
        const nombre = document.getElementById('clienteNombre').value;
        const apellido = document.getElementById('clienteApellido').value;
        const email = document.getElementById('clienteEmail').value;
        const telefono = document.getElementById('clienteTelefono').value;
        
        // Preparar datos para enviar
        const cliente = {
            id: clienteSeleccionado.id,
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono
        };
        
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
            alert('Cliente actualizado correctamente');
            
            // Actualizar la lista de clientes
            await cargarClientes();
            cargarClientesEnSelect();
            
            // Limpiar formulario
            limpiarFormularioCliente();
        } else {
            alert('Error al actualizar cliente: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al enviar cliente:', error);
        alert('Error al actualizar cliente. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de un cliente
function confirmarEliminarCliente() {
    if (!clienteSeleccionado) {
        alert('Por favor, seleccione un cliente para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar al cliente "${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}"?
ADVERTENCIA: Esto también eliminará todos los pedidos asociados a este cliente.`);
    
    if (confirmar) {
        eliminarCliente();
    }
}

// Función para eliminar un cliente
async function eliminarCliente() {
    try {
        const respuesta = await fetch(`${API_URL}/clientes/eliminar/${clienteSeleccionado.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            alert('Cliente eliminado correctamente');
            
            // Actualizar la lista de clientes
            await cargarClientes();
            cargarClientesEnSelect();
            
            // Actualizar también los pedidos porque pueden haberse eliminado algunos
            await cargarPedidos();
            
            // Limpiar formulario
            limpiarFormularioCliente();
        } else {
            alert('Error al eliminar cliente: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        alert('Error al eliminar cliente. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario
function limpiarFormularioCliente() {
    document.getElementById('clienteNombre').value = '';
    document.getElementById('clienteApellido').value = '';
    document.getElementById('clienteEmail').value = '';
    document.getElementById('clienteTelefono').value = '';
    clienteSeleccionado = null;
}
