// Este archivo simula una conexión a la base de datos
// En un entorno real, se utilizaría una base de datos real y un backend para las consultas

// Simulación de consultas a la base de datos
class BaseDatos {
    constructor() {
        console.log("Simulación de Base de Datos iniciada");
        
        // Estos datos simulan tablas en la base de datos
        this.tablas = {
            categoria: [
                { id_Categoria: 1, Nombre: "Electrónica" },
                { id_Categoria: 2, Nombre: "Informática" },
                { id_Categoria: 3, Nombre: "Accesorios" },
                { id_Categoria: 4, Nombre: "Hogar" },
                { id_Categoria: 5, Nombre: "Muebles" }
            ],
            producto: [
                { id_Producto: 1, categoria_id: 1, Nombre: "Smartphone Galaxy A52", SKU: "EL-SMG-A52", Precio_Lista: 299.99, Estado: "Disponible", fechaAlta: "2025-10-01" },
                { id_Producto: 2, categoria_id: 2, Nombre: "Laptop HP Pavilion", SKU: "INF-LHP-P15", Precio_Lista: 749.99, Estado: "Disponible", fechaAlta: "2025-10-03" },
                { id_Producto: 3, categoria_id: 2, Nombre: "Monitor LG 24\"", SKU: "INF-MLG-24", Precio_Lista: 169.99, Estado: "Agotado", fechaAlta: "2025-10-05" },
                { id_Producto: 4, categoria_id: 3, Nombre: "Teclado Mecánico Redragon", SKU: "ACC-TMR-K552", Precio_Lista: 59.99, Estado: "Disponible", fechaAlta: "2025-10-07" },
                { id_Producto: 5, categoria_id: 3, Nombre: "Mouse Logitech G203", SKU: "ACC-MLG-G203", Precio_Lista: 29.99, Estado: "Disponible", fechaAlta: "2025-10-09" }
            ],
            sucursal: [
                { id_Sucursal: 1, nombre: "Centro Comercial", direccion: "Av. Libertador 1500", provincia: "Buenos Aires", telefono: "011-4523-7890" },
                { id_Sucursal: 2, nombre: "Sucursal Norte", direccion: "Calle San Martín 450", provincia: "Córdoba", telefono: "0351-442-5678" },
                { id_Sucursal: 3, nombre: "Sucursal Sur", direccion: "Av. Belgrano 789", provincia: "Santa Fe", telefono: "0342-456-7890" },
                { id_Sucursal: 4, nombre: "Sucursal Este", direccion: "Calle Rivadavia 234", provincia: "Mendoza", telefono: "0261-423-4567" },
                { id_Sucursal: 5, nombre: "Sucursal Oeste", direccion: "Av. San Juan 567", provincia: "Tucumán", telefono: "0381-430-5678" }
            ],
            cliente: [
                { id_Cliente: 1, nombre: "Juan", apellido: "Pérez", email: "jperez@email.com", telefono: "011-1234-5678" },
                { id_Cliente: 2, nombre: "María", apellido: "González", email: "mgonzalez@email.com", telefono: "011-2345-6789" },
                { id_Cliente: 3, nombre: "Carlos", apellido: "Rodríguez", email: "crodriguez@email.com", telefono: "0351-345-6789" },
                { id_Cliente: 4, nombre: "Ana", apellido: "Martínez", email: "amartinez@email.com", telefono: "0341-456-7890" },
                { id_Cliente: 5, nombre: "Luis", apellido: "Sánchez", email: "lsanchez@email.com", telefono: "0261-567-8901" }
            ],
            orden_de_compra: [
                { id_Orden: 1, cliente_id: 1, sucursal_id: 1, fecha: "2025-11-15", total: 329.98, estado: "Entregado" },
                { id_Orden: 2, cliente_id: 2, sucursal_id: 2, fecha: "2025-11-16", total: 749.99, estado: "En proceso" },
                { id_Orden: 3, cliente_id: 3, sucursal_id: 3, fecha: "2025-11-17", total: 199.98, estado: "Enviado" },
                { id_Orden: 4, cliente_id: 4, sucursal_id: 4, fecha: "2025-11-18", total: 89.98, estado: "En proceso" },
                { id_Orden: 5, cliente_id: 5, sucursal_id: 5, fecha: "2025-11-19", total: 169.99, estado: "Pendiente" }
            ],
            carrito_producto: [
                { carrito_id: 1, producto_id: 1, cantidad: 1 },
                { carrito_id: 1, producto_id: 5, cantidad: 1 },
                { carrito_id: 2, producto_id: 2, cantidad: 1 },
                { carrito_id: 3, producto_id: 4, cantidad: 2 },
                { carrito_id: 4, producto_id: 4, cantidad: 1 },
                { carrito_id: 4, producto_id: 5, cantidad: 1 },
                { carrito_id: 5, producto_id: 3, cantidad: 1 }
            ],
            stockmovimiento: [
                { id_StockM: 1, producto_id: 1, sucursal_id: 1, tipo_mov_id: 1, fechaHora: "2025-11-01 10:00:00", Cantidad: 50, Motivo: "Ingreso Inicial" },
                { id_StockM: 2, producto_id: 2, sucursal_id: 1, tipo_mov_id: 1, fechaHora: "2025-11-01 10:30:00", Cantidad: 30, Motivo: "Ingreso Inicial" },
                { id_StockM: 3, producto_id: 3, sucursal_id: 2, tipo_mov_id: 1, fechaHora: "2025-11-02 09:15:00", Cantidad: 20, Motivo: "Ingreso Inicial" },
                { id_StockM: 4, producto_id: 4, sucursal_id: 3, tipo_mov_id: 1, fechaHora: "2025-11-02 11:45:00", Cantidad: 40, Motivo: "Ingreso Inicial" },
                { id_StockM: 5, producto_id: 5, sucursal_id: 4, tipo_mov_id: 1, fechaHora: "2025-11-03 14:20:00", Cantidad: 60, Motivo: "Ingreso Inicial" }
            ],
            stocksucursal: [
                { producto_id: 1, sucursal_id: 1, cantidad: 48 },
                { producto_id: 2, sucursal_id: 1, cantidad: 29 },
                { producto_id: 3, sucursal_id: 2, cantidad: 0 },
                { producto_id: 4, sucursal_id: 3, cantidad: 37 },
                { producto_id: 5, sucursal_id: 4, cantidad: 58 }
            ],
            tipo_mov: [
                { id_TipoMov: 1, nombre: "Ingreso" },
                { id_TipoMov: 2, nombre: "Egreso" },
                { id_TipoMov: 3, nombre: "Transferencia" },
                { id_TipoMov: 4, nombre: "Ajuste" }
            ]
        };
    }

    // Método para realizar una consulta SELECT simulada
    async select(tabla, condicion = null) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!this.tablas[tabla]) {
                    resolve({ error: `La tabla ${tabla} no existe` });
                    return;
                }
                
                let resultado = [...this.tablas[tabla]];
                
                if (condicion) {
                    resultado = resultado.filter(condicion);
                }
                
                resolve(resultado);
            }, 200); // Simulamos un pequeño retraso para simular la consulta
        });
    }

    // Método para realizar un JOIN simulado
    async join(tabla1, tabla2, campoJoin1, campoJoin2, campos = null) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!this.tablas[tabla1] || !this.tablas[tabla2]) {
                    resolve({ error: "Una o ambas tablas no existen" });
                    return;
                }
                
                const resultado = [];
                
                for (const registro1 of this.tablas[tabla1]) {
                    for (const registro2 of this.tablas[tabla2]) {
                        if (registro1[campoJoin1] === registro2[campoJoin2]) {
                            let registroJoin = { ...registro1, ...registro2 };
                            
                            // Si se especifican campos, filtramos solo esos campos
                            if (campos) {
                                const registroFiltrado = {};
                                for (const campo of campos) {
                                    registroFiltrado[campo] = registroJoin[campo];
                                }
                                registroJoin = registroFiltrado;
                            }
                            
                            resultado.push(registroJoin);
                        }
                    }
                }
                
                resolve(resultado);
            }, 300); // Simulamos un pequeño retraso para simular la consulta
        });
    }

    // Método para realizar una consulta más compleja con múltiples tablas
    async consultaCompleja(consulta) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let resultado;
                
                // Simulamos diferentes consultas complejas predefinidas
                switch(consulta) {
                    case "productosConCategoria":
                        resultado = this.tablas.producto.map(producto => {
                            const categoria = this.tablas.categoria.find(cat => cat.id_Categoria === producto.categoria_id);
                            return {
                                id: producto.id_Producto,
                                nombre: producto.Nombre,
                                categoria: categoria ? categoria.Nombre : "Sin categoría",
                                sku: producto.SKU,
                                precio: producto.Precio_Lista,
                                estado: producto.Estado
                            };
                        });
                        break;
                        
                    case "pedidosConClienteYSucursal":
                        resultado = this.tablas.orden_de_compra.map(orden => {
                            const cliente = this.tablas.cliente.find(cli => cli.id_Cliente === orden.cliente_id);
                            const sucursal = this.tablas.sucursal.find(suc => suc.id_Sucursal === orden.sucursal_id);
                            
                            return {
                                id: orden.id_Orden,
                                cliente: cliente ? `${cliente.nombre} ${cliente.apellido}` : "Cliente desconocido",
                                sucursal: sucursal ? sucursal.nombre : "Sucursal desconocida",
                                fecha: orden.fecha,
                                total: orden.total,
                                estado: orden.estado
                            };
                        });
                        break;
                        
                    case "stockPorSucursal":
                        resultado = this.tablas.stocksucursal.map(stock => {
                            const producto = this.tablas.producto.find(prod => prod.id_Producto === stock.producto_id);
                            const sucursal = this.tablas.sucursal.find(suc => suc.id_Sucursal === stock.sucursal_id);
                            
                            return {
                                producto: producto ? producto.Nombre : "Producto desconocido",
                                sucursal: sucursal ? sucursal.nombre : "Sucursal desconocida",
                                cantidad: stock.cantidad,
                                estado: stock.cantidad > 0 ? "Disponible" : "Agotado"
                            };
                        });
                        break;
                        
                    default:
                        resultado = { error: "Consulta no reconocida" };
                }
                
                resolve(resultado);
            }, 400); // Simulamos un pequeño retraso para simular la consulta
        });
    }
}

// Exportamos la clase para usarla en otros archivos
const db = new BaseDatos();
