const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tfi_bd'
});

// Conectar a MySQL
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para obtener todos los productos
app.get('/api/productos', (req, res) => {
  connection.query('CALL sp_obtener_productos()', (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener todas las categorías
app.get('/api/categorias', (req, res) => {
  connection.query('CALL sp_obtener_categorias()', (err, results) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      res.status(500).json({ error: 'Error al obtener categorías' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener todas las sucursales
app.get('/api/sucursales', (req, res) => {
  connection.query('CALL sp_obtener_sucursales()', (err, results) => {
    if (err) {
      console.error('Error al obtener sucursales:', err);
      res.status(500).json({ error: 'Error al obtener sucursales' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener todos los pedidos
app.get('/api/pedidos', (req, res) => {
  connection.query('CALL sp_obtener_pedidos()', (err, results) => {
    if (err) {
      console.error('Error al obtener pedidos:', err);
      res.status(500).json({ error: 'Error al obtener pedidos' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener todos los clientes
app.get('/api/clientes', (req, res) => {
  connection.query('CALL sp_obtener_clientes()', (err, results) => {
    if (err) {
      console.error('Error al obtener clientes:', err);
      res.status(500).json({ error: 'Error al obtener clientes' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener todo el personal
app.get('/api/personal', (req, res) => {
  connection.query('CALL sp_obtener_personal()', (err, results) => {
    if (err) {
      console.error('Error al obtener personal:', err);
      res.status(500).json({ error: 'Error al obtener personal' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener todas las órdenes de compra
app.get('/api/ordenesCompra', (req, res) => {
  connection.query('CALL sp_obtener_ordenes_compra()', (err, results) => {
    if (err) {
      console.error('Error al obtener órdenes de compra:', err);
      res.status(500).json({ error: 'Error al obtener órdenes de compra' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener una orden de compra y sus detalles
app.get('/api/ordenesCompra/:id', (req, res) => {
  const ordenId = req.params.id;
  
  // Usaremos Promise.all para manejar varias consultas en paralelo
  Promise.all([
    // 1. Obtener detalles básicos de la orden
    new Promise((resolve, reject) => {
      connection.query('CALL sp_obtener_orden_detalle(?)', [ordenId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0][0]); // Primer registro del primer conjunto de resultados
      });
    }),
    
    // 2. Obtener los productos de la orden
    new Promise((resolve, reject) => {
      connection.query('CALL sp_obtener_orden_productos(?)', [ordenId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]); // Todos los registros del primer conjunto
      });
    }),
    
    // 3. Obtener información del pago
    new Promise((resolve, reject) => {
      connection.query('CALL sp_obtener_orden_pago(?)', [ordenId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0][0]); // Primer registro del primer conjunto
      });
    })
  ])
  .then(([orden, productos, pago]) => {
    // Verificamos si hay una transacción cripto asociada
    if (pago && pago.metodo_pago_id === 5) { // Asumiendo que 5 es el ID del método de pago cripto
      return new Promise((resolve, reject) => {
        connection.query('CALL sp_obtener_transaccion_cripto(?)', [pago.id_Pago], (err, results) => {
          if (err) reject(err);
          else {
            // Agregamos la info de cripto al pago
            pago.cripto = results[0][0];
            resolve({ orden, productos, pago });
          }
        });
      });
    } else {
      // No hay transacción cripto, devolvemos lo que tenemos
      return { orden, productos, pago };
    }
  })
  .then(resultado => {
    res.json(resultado);
  })
  .catch(err => {
    console.error('Error al obtener detalles de la orden:', err);
    res.status(500).json({ error: 'Error al obtener detalles de la orden' });
  });
});

// Endpoint para obtener todos los métodos de pago
app.get('/api/metodosPago', (req, res) => {
  connection.query('CALL sp_obtener_metodos_pago()', (err, results) => {
    if (err) {
      console.error('Error al obtener métodos de pago:', err);
      res.status(500).json({ error: 'Error al obtener métodos de pago' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para crear nuevo personal
app.post('/api/personal/nuevo', (req, res) => {
  const { nombre, apellido, cargo, sucursal_id } = req.body;
  
  connection.query('CALL sp_crear_personal(?, ?, ?, ?)', 
    [nombre, apellido, cargo, sucursal_id], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_crear_personal:', err);
        res.status(500).json({ error: 'Error al crear personal', details: err.message });
        return;
      }
      
      // El ID del nuevo personal está en results[0][0].id
      const id = results[0][0]?.id || null;
      
      res.json({ 
        success: true, 
        message: 'Personal creado correctamente',
        id: id
      });
    }
  );
});

// Endpoint para crear nueva orden de compra
app.post('/api/ordenesCompra/nueva', (req, res) => {
  const { cliente_id, sucursal_id, fecha, total, estado, metodo_id, moneda } = req.body;
  
  // Iniciamos una transacción para asegurar consistencia
  connection.beginTransaction(err => {
    if (err) {
      console.error('Error al iniciar transacción:', err);
      res.status(500).json({ error: 'Error al iniciar la transacción', details: err.message });
      return;
    }
    
    // Paso 1: Crear la orden de compra
    connection.query('CALL sp_crear_orden(?, ?, ?, ?, ?, ?, ?)', 
      [cliente_id, sucursal_id, fecha, total, 'Web', estado, null], 
      (err, results) => {
        if (err) {
          connection.rollback(() => {
            console.error('Error al crear orden, transacción cancelada:', err);
            res.status(500).json({ error: 'Error al crear orden', details: err.message });
          });
          return;
        }
        
        // Obtenemos el ID de la orden creada
        const ordenId = results[0][0]?.id;
        if (!ordenId) {
          connection.rollback(() => {
            res.status(500).json({ error: 'No se pudo obtener el ID de la orden creada' });
          });
          return;
        }
        
        // Paso 2: Crear la orden de pago asociada usando el SP sp_crear_orden_pago
        connection.query(
          'CALL sp_crear_orden_pago(?, ?, ?, ?)', 
          [ordenId, metodo_id, total, moneda], 
          (err, pagoResult) => {
            if (err) {
              connection.rollback(() => {
                console.error('Error al crear pago, transacción cancelada:', err);
                res.status(500).json({ error: 'Error al crear pago', details: err.message });
              });
              return;
            }
            
            const pagoId = pagoResult[0][0]?.id;
            
            // Todo salió bien, confirmamos la transacción
            connection.commit(err => {
              if (err) {
                connection.rollback(() => {
                  console.error('Error al confirmar transacción:', err);
                  res.status(500).json({ error: 'Error al confirmar la transacción', details: err.message });
                });
                return;
              }
              
              // Devolvemos éxito y los IDs
              res.json({
                success: true,
                message: 'Orden creada correctamente',
                ordenId: ordenId,
                pagoId: pagoId
              });
            });
          }
        );
      }
    );
  });
});

// Endpoint para añadir productos a una orden existente
app.post('/api/ordenesCompra/:id/productos', (req, res) => {
  const ordenId = req.params.id;
  const productos = req.body.productos;
  
  console.log('Recibida solicitud para añadir productos a la orden:', ordenId);
  console.log('Productos recibidos:', productos);
  
  // Validación básica
  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    res.status(400).json({ error: 'Se requiere un array de productos' });
    return;
  }
  
  // Iniciamos una transacción para asegurar consistencia
  connection.beginTransaction(err => {
    if (err) {
      console.error('Error al iniciar transacción:', err);
      res.status(500).json({ error: 'Error al iniciar la transacción', details: err.message });
      return;
    }
    
    // Preparamos todas las inserciones usando sp_agregar_orden_producto
    const insertPromises = productos.map(producto => {
      return new Promise((resolve, reject) => {
        console.log(`Agregando producto ${producto.producto_id} a la orden ${ordenId}, cantidad: ${producto.cantidad}`);
        connection.query(
          'CALL sp_agregar_orden_producto(?, ?, ?)',
          [ordenId, producto.producto_id, producto.cantidad],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
    });
    
    // Ejecutamos todas las inserciones
    Promise.all(insertPromises)
      .then(results => {
        // Todas las inserciones tuvieron éxito, confirmamos la transacción
        connection.commit(err => {
          if (err) {
            connection.rollback(() => {
              console.error('Error al confirmar transacción:', err);
              res.status(500).json({ error: 'Error al confirmar la transacción', details: err.message });
            });
            return;
          }
          
          res.json({
            success: true,
            message: 'Productos añadidos correctamente',
            ordenId: ordenId,
            productosAñadidos: productos.length
          });
        });
      })
      .catch(err => {
        // Alguna inserción falló, revertimos la transacción
        connection.rollback(() => {
          console.error('Error al añadir productos, transacción cancelada:', err);
          res.status(500).json({ error: 'Error al añadir productos', details: err.message });
        });
      });
  });
});

// Endpoint para crear nuevo producto
app.post('/api/productos/nuevo', (req, res) => {
  const { nombre, categoria_id, sku, precio, estado } = req.body;
  
  // Validación básica
  if (!nombre || !categoria_id || !sku || !precio) {
    return res.status(400).json({ 
      success: false, 
      error: 'Datos de producto incompletos. Se requiere nombre, categoría, SKU y precio.' 
    });
  }
  
  connection.query('CALL sp_crear_producto(?, ?, ?, ?, ?)', 
    [nombre, categoria_id, sku, precio, estado], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_crear_producto:', err);
        
        // Verificar si es un error por SKU o nombre duplicado
        if (err.code === 'ER_DUP_ENTRY') {
          if (err.message.includes('sku')) {
            return res.status(409).json({ 
              success: false, 
              error: 'Ya existe un producto con ese SKU' 
            });
          } else if (err.message.includes('nombre')) {
            return res.status(409).json({ 
              success: false, 
              error: 'Ya existe un producto con ese nombre' 
            });
          }
        }
        
        return res.status(500).json({ 
          success: false, 
          error: 'Error al crear producto', 
          details: err.message 
        });
      }
      
      // El ID del nuevo producto está en results[0][0].id
      const id = results[0][0]?.id || null;
      
      res.json({ 
        success: true, 
        message: 'Producto creado correctamente',
        id: id
      });
    }
  );
});

// Endpoint para agregar stock inicial a un producto
app.post('/api/productos/stock', (req, res) => {
  const { producto_id, sucursal_id, cantidad, motivo } = req.body;
  
  connection.query('CALL sp_agregar_stock_producto(?, ?, ?, ?)', 
    [producto_id, sucursal_id, cantidad, motivo], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_agregar_stock_producto:', err);
        res.status(500).json({ error: 'Error al agregar stock', details: err.message });
        return;
      }
      
      res.json({ 
        success: true, 
        message: 'Stock agregado correctamente'
      });
    }
  );
});

// Endpoint para crear nueva categoría
app.post('/api/categorias/nueva', (req, res) => {
  const { nombre, descripcion } = req.body;
  
  // Validación básica
  if (!nombre || nombre.trim() === '') {
    res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
    return;
  }
  
  connection.query('CALL sp_crear_categoria(?, ?)', 
    [nombre, descripcion], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_crear_categoria:', err);
        
        // Verificar si el error es por clave duplicada (nombre)
        if (err.code === 'ER_DUP_ENTRY' && err.message.includes('uq_categoria_nombre')) {
          res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
          return;
        }
        
        res.status(500).json({ error: 'Error al crear categoría', details: err.message });
        return;
      }
      
      // El ID de la nueva categoría está en results[0][0].id
      const id = results[0][0]?.id || null;
      
      res.json({ 
        success: true, 
        message: 'Categoría creada correctamente',
        id: id
      });
    }
  );
});

// Endpoint para crear nueva sucursal
app.post('/api/sucursales/nueva', (req, res) => {
  const { nombre, direccion, provincia, telefono } = req.body;
  
  // Validación básica
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ success: false, error: 'El nombre de la sucursal es obligatorio' });
  }
  
  connection.query('CALL sp_crear_sucursal(?, ?, ?, ?)', 
    [nombre, direccion, provincia, telefono], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_crear_sucursal:', err);
        
        // Verificar si el error es por nombre duplicado
        if (err.code === 'ER_DUP_ENTRY' && err.message.includes('nombre')) {
          return res.status(409).json({ success: false, error: 'Ya existe una sucursal con ese nombre' });
        }
        
        return res.status(500).json({ success: false, error: 'Error al crear sucursal', details: err.message });
      }
      
      // El ID de la nueva sucursal está en results[0][0].id
      const id = results[0][0]?.id || null;
      
      res.json({ 
        success: true, 
        message: 'Sucursal creada correctamente',
        id: id
      });
    }
  );
});

// Endpoint para crear nuevo cliente con dirección
app.post('/api/clientes/nuevo', (req, res) => {
  const { 
    cliente, 
    direccion 
  } = req.body;

  console.log('Intentando crear cliente con email:', cliente?.email);
  
  // Probar con una inserción directa para diagnóstico
  if (cliente.email === "__TEST__") {
    const testEmail = "test_" + new Date().getTime() + "@test.com";
    connection.query(
      'INSERT INTO cliente (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)',
      [cliente.nombre, cliente.apellido, testEmail, cliente.telefono],
      (err, result) => {
        if (err) {
          console.error('Error en prueba directa de inserción:', err);
          return res.status(500).json({
            success: false,
            error: 'Error en prueba directa: ' + err.message
          });
        }
        console.log('Prueba directa exitosa, ID:', result.insertId);
        return res.status(200).json({
          success: true,
          message: 'Prueba directa exitosa',
          testEmail: testEmail
        });
      }
    );
    return;
  }
  
  // Convertimos el correo electrónico a minúsculas para evitar problemas de duplicados por mayúsculas/minúsculas
  if (cliente && cliente.email) {
    cliente.email = cliente.email.toLowerCase();
  }

  // Verificamos si hay una restricción única en el email
  connection.query(
    `SELECT 
      TABLE_NAME, 
      COLUMN_NAME, 
      CONSTRAINT_NAME 
    FROM 
      INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE 
      TABLE_SCHEMA = 'tfi_bd' AND 
      TABLE_NAME = 'cliente' AND 
      COLUMN_NAME = 'email'`,
    [],
    (err, constraints) => {
      if (err) {
        console.error('Error al verificar restricciones:', err);
      } else {
        console.log('Restricciones encontradas en email:', constraints);
      }

      // Forzamos una limpieza de posibles registros fantasma
      connection.query('COMMIT', [], () => {
        console.log('Forzando commit de transacciones pendientes');
      });
      
      // Primero verificamos directamente en la tabla cliente con condición exacta
      connection.query(
        'SELECT id_Cliente, email FROM cliente WHERE LOWER(email) = LOWER(?)', 
        [cliente?.email], 
        (err, directResults) => {
          if (err) {
            console.error('Error en búsqueda directa:', err);
            return res.status(500).json({
              success: false,
              error: 'Error al verificar email'
            });
          }

          console.log('Búsqueda directa para', cliente?.email, ':', directResults);
          
          if (directResults.length > 0) {
            return res.status(409).json({
              success: false,
              error: 'Ya existe un cliente con este email (verificación directa)'
            });
          }

          // Listamos todos los clientes como verificación adicional
          connection.query('SELECT id_Cliente, email FROM cliente', [], 
            (err, results) => {
              if (err) {
                console.error('Error al obtener clientes:', err);
                return res.status(500).json({
                  success: false,
                  error: 'Error al verificar el email'
                });
              }

              console.log('Clientes en la base de datos:', results);
              
              // Continuamos con la creación normal
  
              // Validación básica
              if (!cliente || !cliente.nombre || !cliente.apellido || !cliente.email) {
                return res.status(400).json({ 
                  success: false, 
                  error: 'Datos de cliente incompletos. Se requiere nombre, apellido y email.' 
                });
              }
              
              if (!direccion || !direccion.calle || !direccion.numero || !direccion.ciudad || !direccion.provincia) {
                return res.status(400).json({ 
                  success: false, 
                  error: 'Datos de dirección incompletos. Se requiere calle, número, ciudad y provincia.' 
                });
              }
              
              // Iniciamos una transacción para asegurar consistencia
              connection.beginTransaction(err => {
                if (err) {
                  console.error('Error al iniciar transacción:', err);
                  return res.status(500).json({ 
                    success: false, 
                    error: 'Error al iniciar la transacción', 
                    details: err.message 
                  });
                }
                
                // Paso 1: Crear el cliente - usamos inserción directa para evitar problemas con SPs
                connection.query(
                  'INSERT INTO cliente (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)',
                  [cliente.nombre, cliente.apellido, cliente.email, cliente.telefono],
                  (err, insertResult) => {
                    // Adaptamos el formato de resultado para mantener compatibilidad con el resto del código
                    const clienteResults = [[{ id: insertResult?.insertId }]];
                    
                    if (err) {
                      connection.rollback(() => {
                        console.error('Error al crear cliente, transacción cancelada:', err);
                        
                        // Verificar si hay un error de clave duplicada (email)
                        if (err.code === 'ER_DUP_ENTRY') {
                          console.log('Error detallado:', err);
                          return res.status(409).json({ 
                            success: false, 
                            error: 'Error de duplicado: ' + err.message
                          });
                        }
                        
                        return res.status(500).json({ 
                          success: false, 
                          error: 'Error al crear cliente', 
                          details: err.message 
                        });
                      });
                      return;
                    }
                    
                    // Obtenemos el ID del cliente creado
                    const clienteId = insertResult.insertId;
                    if (!clienteId) {
                      connection.rollback(() => {
                        return res.status(500).json({ 
                          success: false, 
                          error: 'No se pudo obtener el ID del cliente creado' 
                        });
                      });
                      return;
                    }
                    
                    // Paso 2: Crear la dirección para el cliente
                    connection.query('CALL sp_crear_direccion(?, ?, ?, ?, ?, ?, ?, ?)',
                      [
                        clienteId,
                        direccion.calle,
                        direccion.numero,
                        direccion.ciudad,
                        direccion.provincia,
                        direccion.pais,
                        direccion.alias,
                        direccion.esPrincipal ? 1 : 0
                      ],
                      (err, direccionResults) => {
                        if (err) {
                          connection.rollback(() => {
                            console.error('Error al crear dirección, transacción cancelada:', err);
                            return res.status(500).json({ 
                              success: false, 
                              error: 'Error al crear dirección para el cliente', 
                              details: err.message 
                            });
                          });
                          return;
                        }
                        
                        // Obtenemos el ID de la dirección creada
                        const direccionId = direccionResults[0][0]?.id_Direccion;
                        
                        // Todo salió bien, confirmamos la transacción
                        connection.commit(err => {
                          if (err) {
                            connection.rollback(() => {
                              console.error('Error al confirmar transacción:', err);
                              return res.status(500).json({ 
                                success: false, 
                                error: 'Error al confirmar la transacción', 
                                details: err.message 
                              });
                            });
                            return;
                          }
                          
                          // Devolvemos éxito y los IDs
                          res.json({
                            success: true,
                            message: 'Cliente y dirección creados correctamente',
                            clienteId: clienteId,
                            direccionId: direccionId
                          });
                        });
                      }
                    );
                  }
                );
              });
            });
        }
      );
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`IMPORTANTE: Asegúrate de tener los siguientes procedimientos almacenados en tu base de datos:`);
  console.log(`- sp_obtener_productos()`);
  console.log(`- sp_obtener_categorias()`);
  console.log(`- sp_obtener_sucursales()`);
  console.log(`- sp_obtener_pedidos()`);
  console.log(`- sp_obtener_clientes()`);
  console.log(`- sp_obtener_personal()`);
  console.log(`- sp_obtener_ordenes_compra()`);
  console.log(`- sp_obtener_orden_detalle(orden_id)`);
  console.log(`- sp_obtener_orden_productos(orden_id)`);
  console.log(`- sp_obtener_orden_pago(orden_id)`);
  console.log(`- sp_obtener_transaccion_cripto(pago_id)`);
  console.log(`- sp_obtener_metodos_pago()`);
});