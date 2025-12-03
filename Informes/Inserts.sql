USE tfi_bd;

-- =====================================================
-- 1. CATÁLOGOS / TABLAS MAESTRAS
-- =====================================================


-- Tipos de método de pago
INSERT INTO tipo_metodo (Nombre) VALUES
  ('TARJETA'),
  ('CRIPTO'),
  ('TRANSFERENCIA');

-- Monedas cripto
INSERT INTO moneda_cripto (nombre, simbolo) VALUES
  ('Bitcoin',      'BTC'),
  ('Ethereum',     'ETH'),
  ('Tether USDT',  'USDT');

-- Tipos de movimiento de stock
INSERT INTO tipo_mov (nombre) VALUES
  ('Ingreso inicial'),
  ('Venta'),
  ('Ajuste inventario');

-- Estados de devolución
INSERT INTO estado_devolucion (nombre) VALUES
  ('Pendiente revisión'),
  ('Aceptada'),
  ('Rechazada');

-- Categorías de productos
INSERT INTO categoria (Nombre, Descripcion) VALUES
  ('Sillas',   'Comodidad'),
  ('Hardware',   'Componentes de PC'),
  ('Software',   'Licencias y servicios'),
  ('Accesorios', 'Periféricos y cables');


-- Sucursales
INSERT INTO sucursal (nombre, direccion, provincia, telefono) VALUES
  ('Sucursal Centro', 'Av. Principal 123', 'Tucumán', '3814000000'),
  ('Sucursal Norte',  'Av. Norte 456',     'Tucumán', '3814111111');

-- Transportistas
INSERT INTO transportista (nombre) VALUES
  ('Correo Argentino'),
  ('Andreani'),
  ('OCA');

-- =====================================================
-- 2. PERSONAL (empleados internos)
-- =====================================================

INSERT INTO personal (nombre, apellido, email, rol_id)
SELECT 'Ana',  'García', 'ana.admin@tienda.com', id_Rol
FROM rol_personal WHERE nombre = 'ADMIN';

INSERT INTO personal (nombre, apellido, email, rol_id)
SELECT 'Luis', 'Pérez',  'luis.soporte@tienda.com', id_Rol
FROM rol_personal WHERE nombre = 'SOPORTE';

INSERT INTO personal (nombre, apellido, email, rol_id)
SELECT 'Carla','López',  'carla.logistica@tienda.com', id_Rol
FROM rol_personal WHERE nombre = 'LOGISTICA';

-- =====================================================
-- 3. CLIENTES + DIRECCIONES
-- =====================================================

INSERT INTO cliente (nombre, apellido, email, telefono) VALUES
  ('Juan',  'Ramírez', 'juan@example.com',  '3815000000'),
  ('María', 'Suárez',  'maria@example.com', '3815111111'),
  ('Pedro', 'Luna',    'pedro@example.com', '3815222222');

-- Direcciones de envío
INSERT INTO direccion (cliente_id, calle, numero, ciudad, provincia, pais, alias, esPrincipal)
SELECT id_Cliente, 'San Martín', '1000', 'San Miguel de Tucumán', 'Tucumán', 'Argentina', 'Casa', 1
FROM cliente WHERE email = 'juan@example.com';

INSERT INTO direccion (cliente_id, calle, numero, ciudad, provincia, pais, alias, esPrincipal)
SELECT id_Cliente, 'Belgrano', '200', 'San Miguel de Tucumán', 'Tucumán', 'Argentina', 'Depto', 1
FROM cliente WHERE email = 'maria@example.com';

INSERT INTO direccion (cliente_id, calle, numero, ciudad, provincia, pais, alias, esPrincipal)
SELECT id_Cliente, 'Mitre', '300', 'San Miguel de Tucumán', 'Tucumán', 'Argentina', 'Casa', 1
FROM cliente WHERE email = 'pedro@example.com';

-- =====================================================
-- 4. PRODUCTOS
-- =====================================================

-- Hardware
INSERT INTO producto (categoria_id, Nombre, SKU, Precio_Lista, Estado, fechaAlta)
SELECT c.id_Categoria, 'Placa de video RTX 4060', 'RTX4060', 450000.00, 'ACTIVO', NOW()
FROM categoria c WHERE c.Nombre = 'Hardware';

INSERT INTO producto (categoria_id, Nombre, SKU, Precio_Lista, Estado, fechaAlta)
SELECT c.id_Categoria, 'Motherboard B550M', 'MB-B550M', 180000.00, 'ACTIVO', NOW()
FROM categoria c WHERE c.Nombre = 'Hardware';

-- Software
INSERT INTO producto (categoria_id, Nombre, SKU, Precio_Lista, Estado, fechaAlta)
SELECT c.id_Categoria, 'Licencia Windows 11 Pro', 'WIN11PRO', 120000.00, 'ACTIVO', NOW()
FROM categoria c WHERE c.Nombre = 'Software';

-- Accesorios
INSERT INTO producto (categoria_id, Nombre, SKU, Precio_Lista, Estado, fechaAlta)
SELECT c.id_Categoria, 'Mouse Gamer RGB', 'MOUSE-RGB', 25000.00, 'ACTIVO', NOW()
FROM categoria c WHERE c.Nombre = 'Accesorios';

-- =====================================================
-- 5. STOCK POR SUCURSAL + MOVIMIENTOS
-- =====================================================

-- Stock inicial en Sucursal Centro
INSERT INTO stocksucursal (producto_id, sucursal_id, cantidad)
SELECT p.id_Producto, s.id_Sucursal, 10
FROM producto p, sucursal s
WHERE p.Nombre = 'Placa de video RTX 4060'
  AND s.nombre = 'Sucursal Centro';

INSERT INTO stocksucursal (producto_id, sucursal_id, cantidad)
SELECT p.id_Producto, s.id_Sucursal, 15
FROM producto p, sucursal s
WHERE p.Nombre = 'Licencia Windows 11 Pro'
  AND s.nombre = 'Sucursal Centro';

-- Stock inicial en Sucursal Norte
INSERT INTO stocksucursal (producto_id, sucursal_id, cantidad)
SELECT p.id_Producto, s.id_Sucursal, 8
FROM producto p, sucursal s
WHERE p.Nombre = 'Motherboard B550M'
  AND s.nombre = 'Sucursal Norte';

INSERT INTO stocksucursal (producto_id, sucursal_id, cantidad)
SELECT p.id_Producto, s.id_Sucursal, 20
FROM producto p, sucursal s
WHERE p.Nombre = 'Mouse Gamer RGB'
  AND s.nombre = 'Sucursal Norte';

-- Movimientos de stock (ingreso inicial)
INSERT INTO stockmovimiento (producto_id, sucursal_id, tipo_mov, fechaHora, Cantidad, Motivo)
SELECT p.id_Producto, s.id_Sucursal, tm.id_TipoMov, NOW(), 10, 'Carga inicial'
FROM producto p, sucursal s, tipo_mov tm
WHERE p.Nombre = 'Placa de video RTX 4060'
  AND s.nombre = 'Sucursal Centro'
  AND tm.nombre = 'Ingreso inicial';

INSERT INTO stockmovimiento (producto_id, sucursal_id, tipo_mov, fechaHora, Cantidad, Motivo)
SELECT p.id_Producto, s.id_Sucursal, tm.id_TipoMov, NOW(), 15, 'Carga inicial'
FROM producto p, sucursal s, tipo_mov tm
WHERE p.Nombre = 'Licencia Windows 11 Pro'
  AND s.nombre = 'Sucursal Centro'
  AND tm.nombre = 'Ingreso inicial';

-- =====================================================
-- 6. MÉTODOS DE PAGO
-- =====================================================

-- Visa crédito (tarjeta)
INSERT INTO metodo_de_pago (tipo_metodo_id, Nombre, Empresa)
SELECT tm.id_Tipomet, 'Visa Crédito', 'Visa'
FROM tipo_metodo tm WHERE tm.Nombre = 'TARJETA';

-- Wallet BTC (cripto)
INSERT INTO metodo_de_pago (tipo_metodo_id, Nombre, Empresa)
SELECT tm.id_Tipomet, 'Wallet BTC', 'Binance'
FROM tipo_metodo tm WHERE tm.Nombre = 'CRIPTO';

-- Transferencia bancaria
INSERT INTO metodo_de_pago (tipo_metodo_id, Nombre, Empresa)
SELECT tm.id_Tipomet, 'Transferencia Banco Nación', 'Banco Nación'
FROM tipo_metodo tm WHERE tm.Nombre = 'TRANSFERENCIA';

-- =====================================================
-- 7. CARRITOS (simplemente para tener algo cargado)
-- =====================================================

-- Carrito ONLINE de Juan
INSERT INTO carrito_de_compra (cliente_id, fecha, canal)
SELECT id_Cliente, NOW(), 'ONLINE'
FROM cliente WHERE email = 'juan@example.com';

-- Producto RTX 4060 al carrito de Juan (1 unidad)
INSERT INTO carrito_producto (carrito_id, producto_id, cantidad)
SELECT c.id_Carrito, p.id_Producto, 1
FROM carrito_de_compra c
JOIN cliente cli ON c.cliente_id = cli.id_Cliente
JOIN producto p   ON p.Nombre = 'Placa de video RTX 4060'
WHERE cli.email = 'juan@example.com';

-- =====================================================
-- 8. ÓRDENES DE COMPRA + DETALLE
-- =====================================================

-- Orden 1: Juan compra ONLINE en Sucursal Centro
INSERT INTO orden_de_compra (
    cliente_id, sucursalOrigen_id, fecha, total, canal, estado, usuario_creacion_id
)
SELECT cli.id_Cliente,
       s.id_Sucursal,
       NOW(),
       450000.00,               -- total = solo RTX 4060
       'ONLINE',
       'PAGADA',
       per.id_Personal
FROM cliente cli,
     sucursal s,
     personal per
WHERE cli.email      = 'juan@example.com'
  AND s.nombre       = 'Sucursal Centro'
  AND per.email      = 'ana.admin@tienda.com';

-- Orden 2: María compra FÍSICO en Sucursal Norte (Motherboard + Mouse)
INSERT INTO orden_de_compra (
    cliente_id, sucursalOrigen_id, fecha, total, canal, estado, usuario_creacion_id
)
SELECT cli.id_Cliente,
       s.id_Sucursal,
       NOW(),
       205000.00,               -- 180000 + 25000
       'FISICO',
       'PENDIENTE',
       per.id_Personal
FROM cliente cli,
     sucursal s,
     personal per
WHERE cli.email = 'maria@example.com'
  AND s.nombre  = 'Sucursal Norte'
  AND per.email = 'ana.admin@tienda.com';

-- Detalle de Orden 1 (Juan: 1 x RTX 4060)
INSERT INTO orden_producto (orden_id, producto_id, cantidad, precio_unitario)
SELECT o.id_Orden, p.id_Producto, 1, p.Precio_Lista
FROM orden_de_compra o
JOIN cliente cli ON o.cliente_id = cli.id_Cliente
JOIN producto p  ON p.Nombre = 'Placa de video RTX 4060'
WHERE cli.email = 'juan@example.com';

-- Detalle de Orden 2 (María: 1 x Motherboard, 1 x Mouse)
INSERT INTO orden_producto (orden_id, producto_id, cantidad, precio_unitario)
SELECT o.id_Orden, p.id_Producto, 1, p.Precio_Lista
FROM orden_de_compra o
JOIN cliente cli ON o.cliente_id = cli.id_Cliente
JOIN producto p  ON p.Nombre = 'Motherboard B550M'
WHERE cli.email = 'maria@example.com';

INSERT INTO orden_producto (orden_id, producto_id, cantidad, precio_unitario)
SELECT o.id_Orden, p.id_Producto, 1, p.Precio_Lista
FROM orden_de_compra o
JOIN cliente cli ON o.cliente_id = cli.id_Cliente
JOIN producto p  ON p.Nombre = 'Mouse Gamer RGB'
WHERE cli.email = 'maria@example.com';

-- =====================================================
-- 9. ÓRDENES DE PAGO + TRANSACCIÓN CRIPTO
-- =====================================================

-- Pago 1: Juan paga con Visa Crédito (ARS)
INSERT INTO orden_de_pago (orden_id, metodo_id, total_pagado, moneda)
SELECT o.id_Orden,
       m.id_Metodo,
       o.total,
       'ARS'
FROM orden_de_compra o,
     metodo_de_pago m,
     cliente cli
WHERE o.cliente_id = cli.id_Cliente
  AND cli.email = 'juan@example.com'
  AND m.Nombre = 'Visa Crédito';

-- Pago 2: María paga en USDT con Wallet BTC
INSERT INTO orden_de_pago (orden_id, metodo_id, total_pagado, moneda)
SELECT o.id_Orden,
       m.id_Metodo,
       o.total,
       'USDT'
FROM orden_de_compra o,
     metodo_de_pago m,
     cliente cli
WHERE o.cliente_id = cli.id_Cliente
  AND cli.email = 'maria@example.com'
  AND m.Nombre = 'Wallet BTC';

-- Transacción cripto asociada al pago de María
INSERT INTO transaccioncripto (pago_id, moneda_cripto_id, hash, wallet_cliente)
SELECT op.id_Pago,
       mc.id_Moneda,
       '0xABC123DEF456',
       'bc1qejemplo_wallet_maria'
FROM orden_de_pago op,
     moneda_cripto mc,
     orden_de_compra o,
     cliente cli
WHERE op.orden_id = o.id_Orden
  AND o.cliente_id = cli.id_Cliente
  AND cli.email = 'maria@example.com'
  AND mc.simbolo = 'USDT'
LIMIT 1;

-- =====================================================
-- 10. DEVOLUCIÓN + ENVÍO
-- =====================================================

-- Devolución pendiente sobre la orden de Juan
INSERT INTO devolucion (orden_id, estado_devolucion_id, fecha, motivo, personal_id)
SELECT o.id_Orden,
       ed.id_EstDevol,
       NOW(),
       'Producto con artefactos en pantalla',
       per.id_Personal
FROM orden_de_compra o,
     estado_devolucion ed,
     personal per,
     cliente cli
WHERE o.cliente_id = cli.id_Cliente
  AND cli.email = 'juan@example.com'
  AND ed.nombre = 'Pendiente revisión'
  AND per.email = 'luis.soporte@tienda.com'
LIMIT 1;

-- Envío para la orden de Juan (desde Sucursal Centro)
INSERT INTO envio (
    orden_id, direccion_id, transportista_id,
    costo, trackingCode, estado, personal_id,
    servicio_tracking, url_tracking
)
SELECT o.id_Orden,
       d.id_Direccion,
       t.id_transportista,
       2500.00,
       'TRACK123456AR',
       'EN CAMINO',
       per.id_Personal,
       'Correo Argentino',
       'https://www.correoargentino.com.ar/formularios/oidn?tracking=TRACK123456AR'
FROM orden_de_compra o
JOIN cliente cli      ON o.cliente_id = cli.id_Cliente
JOIN direccion d      ON d.cliente_id = cli.id_Cliente AND d.esPrincipal = 1
JOIN transportista t  ON t.nombre = 'Correo Argentino'
JOIN personal per     ON per.email = 'carla.logistica@tienda.com'
WHERE cli.email = 'juan@example.com'
LIMIT 1;
