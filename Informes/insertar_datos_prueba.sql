-- Script para insertar datos de prueba que coincidan con las consultas solicitadas

-- 1) Stock del artículo SKU '6FJ44'
-- Primero aseguramos que existe la categoría (usamos una existente o creamos)
-- Asumimos categoría 1 'Cocina' existe por el dump anterior.
-- Insertamos el producto
INSERT INTO producto (categoria_id, Nombre, SKU, Precio_Lista, Estado, fechaAlta)
VALUES (1, 'Producto Test 6FJ44', '6FJ44', 15000.00, 'Disponible', NOW());

-- Obtenemos el ID del producto recién insertado (en un script real se usaría LAST_INSERT_ID(), aquí asumimos que es el siguiente disponible o usamos subquery si el motor lo permite en insert, pero para datos de prueba directos:
-- Para asegurar consistencia en este script, usaremos variables si es posible, o valores fijos asumiendo IDs.
-- Dado que es un script para correr, usaremos variables de usuario para referenciar los IDs.

SET @id_producto_6fj44 = LAST_INSERT_ID();

-- Insertamos stock en sucursales (Asumimos sucursal 1 y 2 existen)
INSERT INTO stocksucursal (producto_id, sucursal_id, cantidad) VALUES (@id_producto_6fj44, 1, 50);
INSERT INTO stocksucursal (producto_id, sucursal_id, cantidad) VALUES (@id_producto_6fj44, 2, 30);


-- 2) Devolución entre 01/11/25 y 15/11/2025
-- Necesitamos una orden previa. Creamos una orden para esto.
INSERT INTO orden_de_compra (cliente_id, sucursalOrigen_id, fecha, total, canal, estado, usuario_creacion_id)
VALUES (1, 1, '2025-10-25 10:00:00', 5000.00, 'WEB', 'ENTREGADA', 1);

SET @id_orden_devolucion = LAST_INSERT_ID();

-- Insertamos la devolución
INSERT INTO devolucion (orden_id, estado_devolucion_id, fecha, motivo, personal_id)
VALUES (@id_orden_devolucion, 1, '2025-11-05 14:30:00', 'Producto defectuoso', 1);


-- 3) Dirección del envío para Orden ID=1346
-- Necesitamos crear la orden con ID 1346 explícitamente.
-- Nota: Si el auto_increment está en un valor menor, esto podría saltar el contador, pero es necesario para cumplir el requerimiento.
INSERT INTO orden_de_compra (id_Orden, cliente_id, sucursalOrigen_id, fecha, total, canal, estado, usuario_creacion_id)
VALUES (1346, 1, 1, NOW(), 12000.00, 'WEB', 'ENVIADA', 1);

-- Creamos una dirección específica para este envío
INSERT INTO direccion (cliente_id, calle, numero, ciudad, provincia, pais, alias, esPrincipal)
VALUES (1, 'Calle Falsa', '123', 'Springfield', 'Buenos Aires', 'Argentina', 'Casa Nueva', 0);

SET @id_direccion_1346 = LAST_INSERT_ID();

-- Insertamos el envío asociado a la orden 1346
INSERT INTO envio (orden_id, direccion_id, transportista_id, costo, trackingCode, estado, personal_id)
VALUES (1346, @id_direccion_1346, 1, 1500.00, 'TRACK1346', 'EN CAMINO', 1);


-- 4) Clientes en Santiago del Estero
-- Creamos un cliente
INSERT INTO cliente (nombre, apellido, email, telefono)
VALUES ('Juan', 'Santiagueño', 'juan.sde@example.com', '3851234567');

SET @id_cliente_sde = LAST_INSERT_ID();

-- Le asignamos una dirección en Santiago del Estero
INSERT INTO direccion (cliente_id, calle, numero, ciudad, provincia, pais, alias, esPrincipal)
VALUES (@id_cliente_sde, 'Av. Belgrano', '500', 'Santiago del Estero', 'Santiago del Estero', 'Argentina', 'Casa', 1);


-- 5) Transportista para Orden ID=125
-- Creamos la orden con ID 125 explícitamente
INSERT INTO orden_de_compra (id_Orden, cliente_id, sucursalOrigen_id, fecha, total, canal, estado, usuario_creacion_id)
VALUES (125, 1, 1, NOW(), 8500.00, 'WEB', 'ENTREGADA', 1);

-- Asumimos que existe una dirección (usamos la creada anteriormente o una existente, ej: 1)
-- Asumimos transportista 2 (Andreani) para variar.
INSERT INTO envio (orden_id, direccion_id, transportista_id, costo, trackingCode, estado, personal_id)
VALUES (125, 1, 2, 1200.00, 'TRACK0125', 'ENTREGADO', 1);
