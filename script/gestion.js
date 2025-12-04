// URL base de tu API
const API_URL = 'http://localhost:3000/api';

// Datos obtenidos de la API
let productos = [];
let sucursales = [];
let clientes = [];
let categorias = [];
let personal = [];
let metodosPago = [];

// Cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Cargamos datos desde la API (backend Node.js)

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

        // Cargamos métodos de pago
        const respuestaMetodosPago = await fetch(`${API_URL}/metodosPago`);
        const resultadoMetodosPago = await respuestaMetodosPago.json();
        if (Array.isArray(resultadoMetodosPago)) {
            metodosPago = resultadoMetodosPago;
            console.log(`Métodos de pago cargados: ${metodosPago.length}`);
        }

        // Inicializamos los formularios
        inicializarFormularios();

        // Configuramos el manejo de pestañas
        configurarPestanas();

    } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Hubo un error al cargar los datos. Por favor, intenta nuevamente.");
    }
});

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

    // Cargar datos específicos según la pestaña activa
    switch (tabId) {
        case 'nuevoPedido':
            inicializarFormularioPedido();
            break;
        case 'nuevoProducto':
            inicializarFormularioProducto();
            break;
        case 'nuevaCategoria':
            inicializarFormularioCategoria();
            break;
        case 'nuevaSucursal':
            inicializarFormularioSucursal();
            break;
        case 'nuevoCliente':
            inicializarFormularioCliente();
            break;
        case 'nuevoEmpleado':
            inicializarFormularioEmpleado();
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

// Función para prevenir envíos múltiples de formularios
function prevenirEnviosMultiples(formularioId, callback) {
    const form = document.getElementById(formularioId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Prevenir múltiples envíos deshabilitando el botón de submit
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            if (submitButton.disabled) {
                console.log(`Formulario ${formularioId} ya está siendo procesado, evitando envío múltiple`);
                return; // Ya se está procesando, evitar envío duplicado
            }
            submitButton.disabled = true;
            const textoOriginal = submitButton.innerHTML;
            submitButton.innerHTML = 'Procesando...';

            try {
                await callback(e);
            } finally {
                // Reactivar el botón después de completar el proceso
                submitButton.disabled = false;
                submitButton.innerHTML = textoOriginal;
            }
        } else {
            await callback(e);
        }
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
    if (!selectCliente) {
        console.error('No se encontró el selector de clientes');
        return;
    }

    selectCliente.innerHTML = '<option value="">Seleccione un cliente</option>';

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nombre} ${cliente.apellido}`;
        selectCliente.appendChild(option);
    });

    // Cargar la lista de sucursales en el select
    const selectSucursal = document.getElementById('pedidoSucursal');
    if (!selectSucursal) {
        console.error('No se encontró el selector de sucursales');
        return;
    }

    selectSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';

    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        selectSucursal.appendChild(option);
    });

    // Cargar la lista de métodos de pago en el select
    const selectMetodoPago = document.getElementById('pedidoMetodoPago');
    if (selectMetodoPago) {
        selectMetodoPago.innerHTML = '<option value="">Seleccione un método de pago</option>';

        metodosPago.forEach(metodo => {
            const option = document.createElement('option');
            option.value = metodo.id;
            option.textContent = metodo.nombre;
            selectMetodoPago.appendChild(option);
        });
    }

    // Cargar la lista de productos en el select
    cargarProductosEnSelect(document.querySelector('.producto-select'));

    // Configurar botón para agregar más productos
    const btnAgregarProducto = document.getElementById('agregarProducto');
    if (btnAgregarProducto) {
        btnAgregarProducto.addEventListener('click', () => {
            const productosContainer = document.getElementById('productosContainer');
            if (!productosContainer) return;

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
    }

    // Configurar eventos para calcular el total
    document.querySelectorAll('.producto-cantidad, .producto-select').forEach(el => {
        el.addEventListener('change', calcularTotalPedido);
    });

    // Configurar envío del formulario usando prevención de envíos múltiples
    prevenirEnviosMultiples('formPedido', async (e) => {
        try {
            const clienteId = document.getElementById('pedidoCliente').value;
            const sucursalId = document.getElementById('pedidoSucursal').value;

            // Obtener todos los productos seleccionados
            const productosItems = document.querySelectorAll('.producto-item');
            const productosSeleccionados = [];

            productosItems.forEach(item => {
                const productoId = item.querySelector('.producto-select').value;
                const cantidad = item.querySelector('.producto-cantidad').value;

                if (productoId && cantidad) {
                    productosSeleccionados.push({
                        producto_id: productoId,
                        cantidad: parseInt(cantidad)
                    });
                }
            });

            // Validar que hay al menos un producto
            if (productosSeleccionados.length === 0) {
                alert('Por favor, seleccione al menos un producto para el pedido.');
                return;
            }

            // Obtener total actual del pedido
            let total = 0;
            document.querySelectorAll('.producto-item').forEach(item => {
                const select = item.querySelector('.producto-select');
                const cantidad = item.querySelector('.producto-cantidad').value;

                if (select && select.value) {
                    const option = select.options[select.selectedIndex];
                    if (option && option.dataset.precio) {
                        const precio = parseFloat(option.dataset.precio);
                        total += precio * parseInt(cantidad);
                    }
                }
            });

            // Obtener el estado seleccionado
            const estado = document.getElementById('pedidoEstado').value;

            // Obtener método de pago y moneda
            const metodoId = document.getElementById('pedidoMetodoPago').value;
            const moneda = document.getElementById('pedidoMoneda').value;

            if (!metodoId) {
                alert('Por favor, seleccione un método de pago.');
                return;
            }

            // Preparar datos para enviar
            const pedido = {
                cliente_id: clienteId,
                sucursal_id: sucursalId,
                fecha: new Date().toISOString().replace('T', ' ').split('.')[0], // Formato YYYY-MM-DD HH:MM:SS
                total: total.toFixed(2),
                canal: 'Web',  // Este valor se envía explícitamente al SP
                estado: estado,
                usuario_creacion_id: null,  // Este valor se envía como NULL al SP
                metodo_id: metodoId,        // ID del método de pago
                moneda: moneda              // Moneda seleccionada
            };

            const userRole = sessionStorage.getItem('userRole');

            // Enviar al servidor para crear la orden
            const respuesta = await fetch(`${API_URL}/ordenesCompra/nueva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': userRole
                },
                body: JSON.stringify({ ...pedido, userRole })
            });

            const resultado = await respuesta.json();

            if (resultado.success) {
                const ordenId = resultado.ordenId; // Usar ordenId en lugar de id

                // Ahora podemos agregar productos a la orden
                // Con el nuevo SP sp_agregar_orden_producto solo necesitamos ID y cantidad
                const productosParaEnviar = productosSeleccionados.map(producto => ({
                    producto_id: producto.producto_id,
                    cantidad: producto.cantidad
                }));

                try {
                    // Enviar productos a la orden usando el nuevo SP
                    const respuestaProductos = await fetch(`${API_URL}/ordenesCompra/${ordenId}/productos`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ productos: productosParaEnviar })
                    });

                    const resultadoProductos = await respuestaProductos.json();

                    if (!resultadoProductos.success) {
                        console.error('Error al agregar productos a la orden:', resultadoProductos.error);
                    }
                } catch (error) {
                    console.error('Error al agregar productos a la orden:', error);
                }

                alert('Pedido/orden creado correctamente con ID: ' + ordenId);

                // Limpiar formulario
                document.getElementById('formPedido').reset();

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
                alert('Error al crear orden: ' + (resultado.error || 'Error desconocido'));
            }

        } catch (error) {
            console.error('Error al enviar pedido:', error);
            alert('Error al crear pedido. Por favor, intente nuevamente.');
        }
    });
}

function cargarProductosEnSelect(select) {
    if (!select) return;

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

        if (select && select.value) {
            const option = select.options[select.selectedIndex];
            if (option && option.dataset.precio) {
                const precio = parseFloat(option.dataset.precio);
                total += precio * parseInt(cantidad);
            }
        }
    });

    const pedidoTotal = document.getElementById('pedidoTotal');
    if (pedidoTotal) {
        pedidoTotal.value = '$' + total.toFixed(2);
    }
}

function inicializarFormularioProducto() {
    // Cargar categorías
    const selectCategoria = document.getElementById('productoCategoria');
    if (!selectCategoria) {
        console.error('No se encontró el selector de categorías');
        return;
    }

    selectCategoria.innerHTML = '<option value="">Seleccione una categoría</option>';

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        selectCategoria.appendChild(option);
    });

    // Cargar sucursales
    const selectSucursal = document.getElementById('productoSucursal');
    if (!selectSucursal) {
        console.error('No se encontró el selector de sucursales');
        return;
    }

    selectSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';

    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        selectSucursal.appendChild(option);
    });

    // Configurar envío del formulario usando prevención de envíos múltiples
    prevenirEnviosMultiples('formProducto', async (e) => {
        try {
            const nombre = document.getElementById('productoNombre').value;
            const categoriaId = document.getElementById('productoCategoria').value;
            const sku = document.getElementById('productoSKU').value;
            const precio = document.getElementById('productoPrecio').value;
            const estado = document.getElementById('productoEstado').value;
            const sucursalId = document.getElementById('productoSucursal').value;
            const cantidad = document.getElementById('productoCantidad').value;

            // Preparar datos para enviar
            const producto = {
                nombre: nombre,
                categoria_id: categoriaId,
                sku: sku,
                precio: precio,
                estado: estado
            };

            // Validación para evitar SKU duplicado
            if (!sku || sku.trim() === '') {
                alert('Por favor, ingrese un SKU válido para el producto.');
                return;
            }

            // Validación para asegurarnos de que seleccionó una sucursal
            if (!sucursalId) {
                alert('Por favor, seleccione una sucursal para el stock inicial.');
                return;
            }

            // Enviar al servidor con rol del usuario para que MySQL aplique permisos
            const userRole = sessionStorage.getItem('userRole');
            const respuesta = await fetch(`${API_URL}/productos/nuevo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': userRole
                },
                body: JSON.stringify({ ...producto, userRole })
            });

            const resultado = await respuesta.json();

            if (resultado.success) {
                // Ahora agregamos el stock inicial
                const productoId = resultado.id;

                // Preparar datos para stock
                const stockData = {
                    producto_id: productoId,
                    sucursal_id: sucursalId,
                    cantidad: parseInt(cantidad),
                    motivo: 'Stock inicial de alta de producto'
                };

                // Llamar al endpoint para agregar stock
                try {
                    const respuestaStock = await fetch(`${API_URL}/productos/stock`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(stockData)
                    });

                    const resultadoStock = await respuestaStock.json();

                    if (resultadoStock.success) {
                        alert('Producto agregado correctamente con stock inicial.');
                    } else {
                        alert('Producto creado pero hubo un error al agregar el stock inicial: ' +
                            (resultadoStock.error || 'Error desconocido'));
                    }
                } catch (stockError) {
                    console.error('Error al agregar stock inicial:', stockError);
                    alert('Producto creado pero hubo un error al agregar el stock inicial.');
                }

                // Limpiar formulario
                document.getElementById('formProducto').reset();

                // Actualizar la lista de productos
                const respuestaProductos = await fetch(`${API_URL}/productos`);
                const resultadoProductos = await respuestaProductos.json();
                if (Array.isArray(resultadoProductos)) {
                    productos = resultadoProductos;

                    // Actualizar los selectores de productos en el formulario de pedidos
                    console.log("Actualizando selectores de productos después de agregar uno nuevo");
                    document.querySelectorAll('.producto-select').forEach(select => {
                        cargarProductosEnSelect(select);
                    });
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
    // Configurar envío del formulario usando prevención de envíos múltiples
    prevenirEnviosMultiples('formSucursal', async (e) => {
        try {
            const nombre = document.getElementById('sucursalNombre').value;
            const direccion = document.getElementById('sucursalDireccion').value;
            const provincia = document.getElementById('sucursalProvincia').value;
            const telefono = document.getElementById('sucursalTelefono').value;

            // Validación básica
            if (!nombre || nombre.trim() === '') {
                alert('Por favor, ingrese un nombre para la sucursal');
                return;
            }

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

                    // Actualizar los selectores de sucursales en todos los formularios
                    actualizarSelectoresSucursales();
                }
            } else {
                // Mostrar mensaje de error específico
                if (resultado.error && resultado.error.includes('Ya existe una sucursal con ese nombre')) {
                    alert('Ya existe una sucursal con ese nombre. Por favor, use un nombre diferente.');
                } else {
                    alert('Error al agregar sucursal: ' + (resultado.error || 'Error desconocido'));
                }
            }

        } catch (error) {
            console.error('Error al enviar sucursal:', error);
            alert('Error al agregar sucursal. Por favor, intente nuevamente.');
        }
    });
}

// Función auxiliar para actualizar todos los selectores de sucursales
function actualizarSelectoresSucursales() {
    // Lista de IDs de selectores que muestran sucursales
    const selectoresSucursales = [
        'pedidoSucursal',
        'empleadoSucursal',
        'productoSucursal'
    ];

    // Actualizar cada selector
    selectoresSucursales.forEach(selectorId => {
        const selectElement = document.getElementById(selectorId);
        if (selectElement) {
            selectElement.innerHTML = '<option value="">Seleccione una sucursal</option>';
            sucursales.forEach(sucursal => {
                const option = document.createElement('option');
                option.value = sucursal.id;
                option.textContent = sucursal.nombre;
                selectElement.appendChild(option);
            });
        }
    });
}

function inicializarFormularioCliente() {
    // Configurar envío del formulario usando prevención de envíos múltiples
    prevenirEnviosMultiples('formCliente', async (e) => {
        try {
            // Datos del cliente
            const nombre = document.getElementById('clienteNombre').value;
            const apellido = document.getElementById('clienteApellido').value;
            const email = document.getElementById('clienteEmail').value;
            const telefono = document.getElementById('clienteTelefono').value;

            // Datos de la dirección
            const calle = document.getElementById('clienteDireccionCalle').value;
            const numero = document.getElementById('clienteDireccionNumero').value;
            const ciudad = document.getElementById('clienteDireccionCiudad').value;
            const provincia = document.getElementById('clienteDireccionProvincia').value;
            const pais = document.getElementById('clienteDireccionPais').value;
            const alias = document.getElementById('clienteDireccionAlias').value || 'Casa';
            const esPrincipal = document.getElementById('clienteDireccionPrincipal').checked;

            // Validación básica
            if (!nombre || !apellido || !email) {
                alert('Por favor, complete todos los campos obligatorios del cliente.');
                return;
            }

            if (!calle || !numero || !ciudad || !provincia) {
                alert('Por favor, complete todos los campos obligatorios de la dirección.');
                return;
            }

            // Validación de formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingrese un correo electrónico válido.');
                return;
            }

            // Preparar datos para enviar
            const datosCompletos = {
                cliente: {
                    nombre,
                    apellido,
                    email,
                    telefono
                },
                direccion: {
                    calle,
                    numero,
                    ciudad,
                    provincia,
                    pais,
                    alias,
                    esPrincipal
                }
            };

            // Enviar al servidor
            const respuesta = await fetch(`${API_URL}/clientes/nuevo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosCompletos)
            });

            const resultado = await respuesta.json();

            if (resultado.success) {
                alert('Cliente y dirección agregados correctamente');

                // Limpiar formulario
                document.getElementById('formCliente').reset();

                // Restaurar valores predeterminados
                document.getElementById('clienteDireccionPais').value = 'Argentina';
                document.getElementById('clienteDireccionAlias').value = 'Casa';
                document.getElementById('clienteDireccionPrincipal').checked = true;

                // Actualizar la lista de clientes
                const respuestaClientes = await fetch(`${API_URL}/clientes`);
                const resultadoClientes = await respuestaClientes.json();
                if (Array.isArray(resultadoClientes)) {
                    clientes = resultadoClientes;

                    // Actualizar el selector de clientes en el formulario de pedidos
                    const selectCliente = document.getElementById('pedidoCliente');
                    if (selectCliente) {
                        selectCliente.innerHTML = '<option value="">Seleccione un cliente</option>';

                        clientes.forEach(cliente => {
                            const option = document.createElement('option');
                            option.value = cliente.id;
                            option.textContent = `${cliente.nombre} ${cliente.apellido}`;
                            selectCliente.appendChild(option);
                        });
                    }
                }
            } else {
                // Mostrar mensaje de error específico
                console.error('Error detallado al crear cliente:', resultado);
                alert('Error al agregar cliente: ' + (resultado.error || 'Error desconocido'));
            }

        } catch (error) {
            console.error('Error al enviar cliente:', error);
            alert('Error al agregar cliente. Por favor, intente nuevamente.');
        }
    });
}

function inicializarFormularioCategoria() {
    // Configurar envío del formulario de categoría usando prevención de envíos múltiples
    prevenirEnviosMultiples('formCategoria', async (e) => {
        try {
            const nombre = document.getElementById('categoriaNombre').value;
            const descripcion = document.getElementById('categoriaDescripcion').value || '';

            // Validación del nombre
            if (!nombre || nombre.trim() === '') {
                alert('Por favor, ingrese un nombre para la categoría');
                return;
            }

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
                alert('Categoría agregada correctamente');

                // Limpiar formulario
                document.getElementById('formCategoria').reset();

                // Actualizar la lista de categorías
                const respuestaCategorias = await fetch(`${API_URL}/categorias`);
                const resultadoCategorias = await respuestaCategorias.json();
                if (Array.isArray(resultadoCategorias)) {
                    categorias = resultadoCategorias;

                    // Actualizar el selector de categorías en el formulario de productos
                    const selectCategoria = document.getElementById('productoCategoria');
                    if (selectCategoria) {
                        selectCategoria.innerHTML = '<option value="">Seleccione una categoría</option>';

                        categorias.forEach(categoria => {
                            const option = document.createElement('option');
                            option.value = categoria.id;
                            option.textContent = categoria.nombre;
                            selectCategoria.appendChild(option);
                        });
                    }
                }
            } else {
                // Mostrar mensaje de error específico
                if (resultado.error && resultado.error.includes('Ya existe una categoría con ese nombre')) {
                    alert('Ya existe una categoría con ese nombre. Por favor, use un nombre diferente.');
                } else {
                    alert('Error al agregar categoría: ' + (resultado.error || 'Error desconocido'));
                }
            }

        } catch (error) {
            console.error('Error al enviar categoría:', error);
            alert('Error al agregar categoría. Por favor, intente nuevamente.');
        }
    });
}

function inicializarFormularioEmpleado() {
    // Cargar la lista de sucursales en el select
    const selectSucursal = document.getElementById('empleadoSucursal');
    if (!selectSucursal) {
        console.error('No se encontró el selector de sucursales para empleados');
        return;
    }

    selectSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';

    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        selectSucursal.appendChild(option);
    });

    // Configurar envío del formulario usando prevención de envíos múltiples
    prevenirEnviosMultiples('formEmpleado', async (e) => {
        try {
            const nombre = document.getElementById('empleadoNombre').value;
            const apellido = document.getElementById('empleadoApellido').value;
            const email = document.getElementById('empleadoEmail').value;
            const rolId = document.getElementById('empleadoRol').value;
            let sucursalId = document.getElementById('empleadoSucursal').value;
            // Si no se selecciona una sucursal, enviamos una cadena vacía que el backend convertirá a null
            sucursalId = sucursalId ? sucursalId : '';

            if (!nombre || !apellido || !email || !rolId) {
                alert('Por favor, complete todos los campos obligatorios');
                return;
            }

            // Preparar datos para enviar
            const empleado = {
                nombre: nombre,
                apellido: apellido,
                email: email,
                rol_id: rolId,
                sucursal_id: sucursalId
            };

            // Enviar al servidor
            const respuesta = await fetch(`${API_URL}/personal/nuevo`, {
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

                // Actualizar la lista de personal
                const respuestaPersonal = await fetch(`${API_URL}/personal`);
                const resultadoPersonal = await respuestaPersonal.json();
                if (Array.isArray(resultadoPersonal)) {
                    personal = resultadoPersonal;
                }
            } else {
                alert('Error al agregar empleado: ' + (resultado.error || 'Error desconocido'));
            }

        } catch (error) {
            console.error('Error al enviar empleado:', error);
            alert('Error al agregar empleado. Por favor, intente nuevamente.');
        }
    });
}