const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Habilitar CORS para permitir peticiones desde tu frontend
app.use(cors());

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

// Endpoint para obtener productos con sus categorías
app.get('/api/productos', (req, res) => {
  const query = `
    SELECT p.id_Producto as id, p.Nombre as nombre, 
           c.Nombre as categoria, p.SKU as sku, 
           p.Precio_Lista as precio, p.Estado as estado 
    FROM producto p 
    JOIN categoria c ON p.categoria_id = c.id_Categoria
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en consulta:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
});

// Endpoint para obtener sucursales
app.get('/api/sucursales', (req, res) => {
  const query = `
    SELECT id_Sucursal as id, nombre, direccion, provincia, telefono 
    FROM sucursal
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en consulta:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
});

// Endpoint para obtener pedidos con cliente y sucursal
app.get('/api/pedidos', (req, res) => {
  const query = `
    SELECT o.id_Orden as id, 
           CONCAT(c.nombre, ' ', c.apellido) as cliente,
           s.nombre as sucursal, 
           o.fecha, o.total, o.estado
    FROM orden_de_compra o
    JOIN cliente c ON o.cliente_id = c.id_Cliente
    JOIN sucursal s ON o.sucursal_id = s.id_Sucursal
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en consulta:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
});

// Endpoint para obtener clientes
app.get('/api/clientes', (req, res) => {
  const query = `
    SELECT id_Cliente as id, nombre, apellido, email, telefono
    FROM cliente
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en consulta:', err);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});