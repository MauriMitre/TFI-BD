const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Habilitar CORS para permitir peticiones desde tu frontend
app.use(cors());

// Configurar body-parser para procesar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root',
  database: 'TFI',
  port: 3306 // Puerto por defecto de MySQL
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// ===== ENDPOINTS QUE UTILIZAN PROCEDIMIENTOS ALMACENADOS =====

// Endpoint para obtener productos con sus categorías
app.get('/api/productos', (req, res) => {
  connection.query('CALL sp_obtener_productos()', (err, results) => {
    if (err) {
      console.error('Error al llamar al procedimiento sp_obtener_productos:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    // Los resultados del procedimiento están en el primer conjunto de resultados
    res.json(results[0]);
  });
});

// Endpoint para obtener categorías
app.get('/api/categorias', (req, res) => {
  connection.query('CALL sp_obtener_categorias()', (err, results) => {
    if (err) {
      console.error('Error al llamar al procedimiento sp_obtener_categorias:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener sucursales
app.get('/api/sucursales', (req, res) => {
  connection.query('CALL sp_obtener_sucursales()', (err, results) => {
    if (err) {
      console.error('Error al llamar al procedimiento sp_obtener_sucursales:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener pedidos con cliente y sucursal
app.get('/api/pedidos', (req, res) => {
  connection.query('CALL sp_obtener_pedidos()', (err, results) => {
    if (err) {
      console.error('Error al llamar al procedimiento sp_obtener_pedidos:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para obtener clientes
app.get('/api/clientes', (req, res) => {
  connection.query('CALL sp_obtener_clientes()', (err, results) => {
    if (err) {
      console.error('Error al llamar al procedimiento sp_obtener_clientes:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para crear un nuevo producto
app.post('/api/productos/nuevo', (req, res) => {
  const { nombre, categoria_id, sku, precio, estado } = req.body;
  
  connection.query('CALL sp_crear_producto(?, ?, ?, ?, ?)', 
    [nombre, categoria_id, sku, precio, estado], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_crear_producto:', err);
        res.status(500).json({ error: 'Error al crear producto', details: err.message });
        return;
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

// Endpoint para crear una nueva sucursal
app.post('/api/sucursales/nueva', (req, res) => {
  const { nombre, direccion, provincia, telefono } = req.body;
  
  connection.query('CALL sp_crear_sucursal(?, ?, ?, ?)', 
    [nombre, direccion, provincia, telefono], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_crear_sucursal:', err);
        res.status(500).json({ error: 'Error al crear sucursal', details: err.message });
        return;
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

// Endpoint para crear un nuevo cliente
app.post('/api/clientes/nuevo', (req, res) => {
  const { nombre, apellido, email, telefono } = req.body;
  
  connection.query('CALL sp_crear_cliente(?, ?, ?, ?)', 
    [nombre, apellido, email, telefono], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_crear_cliente:', err);
        res.status(500).json({ error: 'Error al crear cliente', details: err.message });
        return;
      }
      
      // El ID del nuevo cliente está en results[0][0].id
      const id = results[0][0]?.id || null;
      
      res.json({ 
        success: true, 
        message: 'Cliente creado correctamente',
        id: id
      });
    }
  );
});

// Endpoint para crear un nuevo empleado
app.post('/api/empleados/nuevo', (req, res) => {
  const { nombre, apellido, cargo, sucursal_id } = req.body;
  
  connection.query('CALL sp_crear_empleado(?, ?, ?, ?)', 
    [nombre, apellido, cargo, sucursal_id], 
    (err, results) => {
      if (err) {
        console.error('Error al llamar al procedimiento sp_crear_empleado:', err);
        res.status(500).json({ error: 'Error al crear empleado', details: err.message });
        return;
      }
      
      // El ID del nuevo empleado está en results[0][0].id
      const id = results[0][0]?.id || null;
      
      res.json({ 
        success: true, 
        message: 'Empleado creado correctamente',
        id: id
      });
    }
  );
});

// Endpoint para crear un nuevo pedido (más complejo)
app.post('/api/pedidos/nuevo', (req, res) => {
  const { cliente_id, sucursal_id, productos, fecha, estado } = req.body;
  
  // Calculamos el total sumando precio * cantidad para cada producto
  let total = 0;
  const productosPromises = productos.map(item => {
    return new Promise((resolve, reject) => {
      // Obtener precio del producto usando procedimiento almacenado
      connection.query('CALL sp_obtener_precio_producto(?)', 
        [item.producto_id], 
        (err, results) => {
          if (err || !results[0] || !results[0].length) {
            reject(err || new Error('Producto no encontrado'));
            return;
          }
          
          const precio = results[0][0].precio;
          const subtotal = precio * item.cantidad;
          total += subtotal;
          
          resolve({
            ...item,
            precio,
            subtotal
          });
        });
    });
  });
  
  Promise.all(productosPromises)
    .then(productosConPrecio => {
      // Comenzamos una transacción para asegurar que todo se guarda correctamente
      connection.beginTransaction(err => {
        if (err) {
          res.status(500).json({ error: 'Error al iniciar transacción', details: err.message });
          return;
        }
        
        // 1. Crear la orden de compra usando procedimiento almacenado
        connection.query(
          'CALL sp_crear_pedido(?, ?, ?, ?, ?)',
          [cliente_id, sucursal_id, fecha, total, estado],
          (err, result) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ error: 'Error al crear orden', details: err.message });
              });
            }
            
            // El ID del nuevo pedido está en result[0][0].id
            const ordenId = result[0][0].id;
            
            // 2. Crear registros en carrito_producto para cada producto usando procedimiento almacenado
            const carritoPromises = productosConPrecio.map(prod => {
              return new Promise((resolve, reject) => {
                connection.query(
                  'CALL sp_agregar_producto_carrito(?, ?, ?)',
                  [ordenId, prod.producto_id, prod.cantidad],
                  (err) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  }
                );
              });
            });
            
            // 3. Ejecutar todas las inserciones de carrito_producto
            Promise.all(carritoPromises)
              .then(() => {
                // 4. Commit si todo salió bien
                connection.commit(err => {
                  if (err) {
                    return connection.rollback(() => {
                      res.status(500).json({ error: 'Error al finalizar transacción', details: err.message });
                    });
                  }
                  
                  res.json({
                    success: true,
                    message: 'Pedido creado correctamente',
                    id: ordenId,
                    total
                  });
                });
              })
              .catch(err => {
                // Rollback si hubo error en alguna inserción
                connection.rollback(() => {
                  res.status(500).json({ error: 'Error al crear detalles del pedido', details: err.message });
                });
              });
          }
        );
      });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error al procesar productos', details: err.message });
    });
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
  console.log(`- sp_crear_producto(nombre, categoria_id, sku, precio, estado)`);
  console.log(`- sp_crear_sucursal(nombre, direccion, provincia, telefono)`);
  console.log(`- sp_crear_cliente(nombre, apellido, email, telefono)`);
  console.log(`- sp_crear_empleado(nombre, apellido, cargo, sucursal_id)`);
  console.log(`- sp_crear_pedido(cliente_id, sucursal_id, fecha, total, estado)`);
  console.log(`- sp_obtener_precio_producto(producto_id)`);
  console.log(`- sp_agregar_producto_carrito(carrito_id, producto_id, cantidad)`);
});