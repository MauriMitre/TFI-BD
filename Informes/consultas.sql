-- 1) Se necesita conocer el stock del artículo cuyo SKU es 6FJ44 existente en la empresa discriminando las cantidades por sucursales
SELECT 
    s.nombre AS Sucursal, 
    ss.cantidad AS Stock
FROM stocksucursal ss
JOIN producto p ON ss.producto_id = p.id_Producto
JOIN sucursal s ON ss.sucursal_id = s.id_Sucursal
WHERE p.SKU = '6FJ44';

-- 2) Listado de todas las devoluciones realizadas entre las fechas 01/11/25 al 15/11/2025
SELECT * 
FROM devolucion 
WHERE fecha BETWEEN '2025-11-01 00:00:00' AND '2025-11-15 23:59:59';

-- 3) Se desea conocer la dirección del envío cuya orden de compra tiene el ID=1346
SELECT 
    d.calle, 
    d.numero, 
    d.ciudad, 
    d.provincia, 
    d.pais, 
    d.alias
FROM direccion d
JOIN envio e ON d.id_Direccion = e.direccion_id
WHERE e.orden_id = 1346;

-- 4) Listado de clientes registrados que la empresa tiene en Santiago del Estero.
SELECT DISTINCT 
    c.id_Cliente, 
    c.nombre, 
    c.apellido, 
    c.email, 
    c.telefono
FROM cliente c
JOIN direccion d ON c.id_Cliente = d.cliente_id
WHERE d.provincia LIKE '%Santiago del Estero%';

-- 5) Cuál fue el transportista responsable de la entrega del envío cuyo id de orden de compra es 125
SELECT 
    t.nombre AS Transportista
FROM transportista t
JOIN envio e ON t.id_transportista = e.transportista_id
WHERE e.orden_id = 125;

-- 6) Top 5 Productos más vendidos por ingresos totales
-- Muestra los productos que más dinero han generado a la empresa.
SELECT 
    p.Nombre AS Producto,
    SUM(op.cantidad * op.precio_unitario) AS Ingresos_Totales
FROM orden_producto op
JOIN producto p ON op.producto_id = p.id_Producto
GROUP BY p.id_Producto, p.Nombre
ORDER BY Ingresos_Totales DESC
LIMIT 5;

-- 7) Ranking de Clientes (Mejores Compradores)
-- Identifica a los clientes que más han gastado, útil para programas de fidelización.
SELECT 
    c.nombre, 
    c.apellido, 
    SUM(o.total) AS Total_Gastado,
    COUNT(o.id_Orden) AS Cantidad_Ordenes
FROM orden_de_compra o
JOIN cliente c ON o.cliente_id = c.id_Cliente
WHERE o.estado = 'PAGADA' OR o.estado = 'ENTREGADA' -- Filtramos órdenes concretadas
GROUP BY c.id_Cliente, c.nombre, c.apellido
ORDER BY Total_Gastado DESC
LIMIT 10;

-- 8) Preferencias de Métodos de Pago
-- Analiza qué métodos de pago son los más utilizados por los clientes.
SELECT 
    mp.Nombre AS Metodo_Pago,
    COUNT(op.id_Pago) AS Cantidad_Usos,
    SUM(op.total_pagado) AS Total_Procesado
FROM orden_de_pago op
JOIN metodo_de_pago mp ON op.metodo_id = mp.id_Metodo
GROUP BY mp.id_Metodo, mp.Nombre
ORDER BY Cantidad_Usos DESC;

-- 9) Alerta de Stock Crítico (Global)
-- Lista productos que tienen menos de 10 unidades en total sumando todas las sucursales.
SELECT 
    p.Nombre, 
    p.SKU, 
    SUM(ss.cantidad) AS Stock_Total_Empresa
FROM stocksucursal ss
JOIN producto p ON ss.producto_id = p.id_Producto
GROUP BY p.id_Producto, p.Nombre, p.SKU
HAVING Stock_Total_Empresa < 10
ORDER BY Stock_Total_Empresa ASC;

-- 10) Rendimiento de Sucursales (Facturación)
-- Compara el desempeño de ventas de cada sucursal.
SELECT 
    s.nombre AS Sucursal,
    COUNT(o.id_Orden) AS Ordenes_Generadas,
    SUM(o.total) AS Facturacion_Total
FROM orden_de_compra o
JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal
WHERE o.estado IN ('PAGADA', 'ENTREGADA', 'ENVIADA')
GROUP BY s.id_Sucursal, s.nombre
ORDER BY Facturacion_Total DESC;

