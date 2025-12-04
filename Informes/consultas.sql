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
