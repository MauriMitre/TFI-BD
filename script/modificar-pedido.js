// Variables para el módulo de pedidos
let pedidoSeleccionado = null;
let detallesPedidoSeleccionado = [];

// Función para inicializar el formulario de modificar pedido
function inicializarModificarPedido() {
    // Cargar pedidos en el select
    cargarPedidosEnSelect();
    
    // Cargar clientes en el select
    cargarClientesEnSelectPedido();
    
    // Cargar sucursales en el select
    cargarSucursalesEnSelectPedido();
    
    // Configurar eventos
    configurarEventosPedido();
    
    console.log('Formulario de modificar pedido inicializado');
}

// Función para cargar pedidos en el select
function cargarPedidosEnSelect() {
    const select = document.getElementById('pedidoSeleccionado');
    select.innerHTML = '<option value="">Seleccione un pedido</option>';
    
    pedidos.forEach(pedido => {
        const option = document.createElement('option');
        option.value = pedido.id;
        option.textContent = `Pedido #${pedido.id} - ${pedido.cliente} - ${pedido.fecha} - ${pedido.estado}`;
        select.appendChild(option);
    });
}

// Función para cargar clientes en el select de pedidos
function cargarClientesEnSelectPedido() {
    const select = document.getElementById('pedidoCliente');
    select.innerHTML = '<option value="">Seleccione un cliente</option>';
    
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nombre} ${cliente.apellido}`;
        select.appendChild(option);
    });
}

// Función para cargar sucursales en el select de pedidos
function cargarSucursalesEnSelectPedido() {
    const select = document.getElementById('pedidoSucursal');
    select.innerHTML = '<option value="">Seleccione una sucursal</option>';
    
    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        select.appendChild(option);
    });
}

// Función para configurar eventos del módulo de pedidos
function configurarEventosPedido() {
    // Evento para buscar pedido
    document.getElementById('btnBuscarPedido').addEventListener('click', buscarPedidos);
    
    // Evento para cargar datos del pedido seleccionado
    document.getElementById('pedidoSeleccionado').addEventListener('change', cargarDatosPedido);
    
    // Evento para guardar cambios
    document.getElementById('formModificarPedido').addEventListener('submit', guardarCambiosPedido);
    
    // Evento para eliminar pedido
    document.getElementById('btnEliminarPedido').addEventListener('click', confirmarEliminarPedido);
}

// Función para buscar pedidos
async function buscarPedidos() {
    const terminoBusqueda = document.getElementById('pedidoBuscar').value.toLowerCase();
    
    if (!terminoBusqueda) {
        alert('Por favor, ingrese un término de búsqueda');
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/pedidos/buscar?termino=${encodeURIComponent(terminoBusqueda)}`);
        const resultado = await respuesta.json();
        
        if (Array.isArray(resultado) && resultado.length > 0) {
            // Actualizar solo los pedidos filtrados en el selector, mantener la lista completa en memoria
            const selectPedidos = document.getElementById('pedidoSeleccionado');
            selectPedidos.innerHTML = '<option value="">Seleccione un pedido</option>';
            
            resultado.forEach(pedido => {
                const option = document.createElement('option');
                option.value = pedido.id;
                option.textContent = `Pedido #${pedido.id} - ${pedido.cliente} - ${pedido.fecha} - ${pedido.estado}`;
                selectPedidos.appendChild(option);
            });
            
            alert(`Se encontraron ${resultado.length} pedidos que coinciden con la búsqueda`);
        } else {
            alert('No se encontraron pedidos que coincidan con la búsqueda');
        }
        
    } catch (error) {
        console.error('Error al buscar pedidos:', error);
        alert('Error al buscar pedidos. Por favor, intente nuevamente.');
    }
}

// Función para cargar datos del pedido seleccionado
async function cargarDatosPedido() {
    const pedidoId = document.getElementById('pedidoSeleccionado').value;
    
    if (!pedidoId) {
        limpiarFormularioPedido();
        return;
    }
    
    try {
        // Obtener los detalles del pedido
        const respuesta = await fetch(`${API_URL}/pedidos/detalle/${pedidoId}`);
        const resultado = await respuesta.json();
        
        if (resultado.pedido) {
            pedidoSeleccionado = resultado.pedido;
            detallesPedidoSeleccionado = resultado.detalles || [];
            
            // Buscar el cliente correspondiente
            const clienteId = clientes.find(c => `${c.nombre} ${c.apellido}` === pedidoSeleccionado.cliente)?.id;
            if (clienteId) {
                document.getElementById('pedidoCliente').value = clienteId;
            }
            
            // Buscar la sucursal correspondiente
            const sucursalId = sucursales.find(s => s.nombre === pedidoSeleccionado.sucursal)?.id;
            if (sucursalId) {
                document.getElementById('pedidoSucursal').value = sucursalId;
            }
            
            // Establecer fecha
            document.getElementById('pedidoFecha').value = pedidoSeleccionado.fecha;
            
            // Establecer estado
            document.getElementById('pedidoEstado').value = pedidoSeleccionado.estado;
            
            // Establecer total
            document.getElementById('pedidoTotal').value = '$' + pedidoSeleccionado.total;
            
            // Cargar detalles de productos
            cargarDetallesPedido();
        }
        
    } catch (error) {
        console.error('Error al cargar detalles del pedido:', error);
        alert('Error al cargar detalles del pedido. Por favor, intente nuevamente.');
    }
}

// Función para cargar los detalles del pedido en la interfaz
function cargarDetallesPedido() {
    const productosContainer = document.getElementById('productosContainer');
    productosContainer.innerHTML = '';
    
    if (detallesPedidoSeleccionado.length === 0) {
        productosContainer.innerHTML = '<p>No hay productos en este pedido.</p>';
        return;
    }
    
    // Crear elementos para cada detalle del pedido
    detallesPedidoSeleccionado.forEach((detalle, index) => {
        const detalleElement = document.createElement('div');
        detalleElement.className = 'detalle-producto';
        detalleElement.innerHTML = `
            <p><strong>Producto:</strong> ${detalle.producto}</p>
            <p><strong>Cantidad:</strong> ${detalle.cantidad}</p>
            <p><strong>Precio unitario:</strong> $${detalle.precio_unitario}</p>
            <p><strong>Subtotal:</strong> $${detalle.subtotal}</p>
        `;
        
        productosContainer.appendChild(detalleElement);
        
        // Agregar separador excepto para el último elemento
        if (index < detallesPedidoSeleccionado.length - 1) {
            const separador = document.createElement('hr');
            productosContainer.appendChild(separador);
        }
    });
}

// Función para guardar cambios en el pedido
async function guardarCambiosPedido(e) {
    e.preventDefault();
    
    if (!pedidoSeleccionado) {
        alert('Por favor, seleccione un pedido para modificar');
        return;
    }
    
    try {
        const clienteId = document.getElementById('pedidoCliente').value;
        const sucursalId = document.getElementById('pedidoSucursal').value;
        const fecha = document.getElementById('pedidoFecha').value;
        const estado = document.getElementById('pedidoEstado').value;
        
        // Preparar datos para enviar
        const pedido = {
            id: pedidoSeleccionado.id,
            cliente_id: clienteId,
            sucursal_id: sucursalId,
            fecha: fecha,
            estado: estado,
            // Los productos no se modifican, solo los datos básicos del pedido
            total: parseFloat(pedidoSeleccionado.total)
        };
        
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
            alert('Pedido actualizado correctamente');
            
            // Actualizar la lista de pedidos
            await cargarPedidos();
            cargarPedidosEnSelect();
            
            // Limpiar formulario
            limpiarFormularioPedido();
        } else {
            alert('Error al actualizar pedido: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al enviar pedido:', error);
        alert('Error al actualizar pedido. Por favor, intente nuevamente.');
    }
}

// Función para confirmar eliminación de un pedido
function confirmarEliminarPedido() {
    if (!pedidoSeleccionado) {
        alert('Por favor, seleccione un pedido para eliminar');
        return;
    }
    
    const confirmar = confirm(`¿Está seguro que desea eliminar el Pedido #${pedidoSeleccionado.id}?`);
    
    if (confirmar) {
        eliminarPedido();
    }
}

// Función para eliminar un pedido
async function eliminarPedido() {
    try {
        const respuesta = await fetch(`${API_URL}/pedidos/eliminar/${pedidoSeleccionado.id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();
        
        if (resultado.success) {
            alert('Pedido eliminado correctamente');
            
            // Actualizar la lista de pedidos
            await cargarPedidos();
            cargarPedidosEnSelect();
            
            // Limpiar formulario
            limpiarFormularioPedido();
        } else {
            alert('Error al eliminar pedido: ' + (resultado.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        alert('Error al eliminar pedido. Por favor, intente nuevamente.');
    }
}

// Función para limpiar el formulario
function limpiarFormularioPedido() {
    document.getElementById('pedidoCliente').value = '';
    document.getElementById('pedidoSucursal').value = '';
    document.getElementById('pedidoFecha').value = '';
    document.getElementById('pedidoEstado').value = 'Pendiente';
    document.getElementById('pedidoTotal').value = '';
    document.getElementById('productosContainer').innerHTML = '';
    pedidoSeleccionado = null;
    detallesPedidoSeleccionado = [];
}
