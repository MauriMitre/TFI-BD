-- =============================================
-- Procedimientos Almacenados para el sistema de gestión
-- =============================================

-- Eliminar procedimientos si ya existen
DROP PROCEDURE IF EXISTS sp_obtener_productos;
DROP PROCEDURE IF EXISTS sp_obtener_categorias;
DROP PROCEDURE IF EXISTS sp_obtener_sucursales;
DROP PROCEDURE IF EXISTS sp_obtener_pedidos;
DROP PROCEDURE IF EXISTS sp_obtener_clientes;
DROP PROCEDURE IF EXISTS sp_crear_producto;
DROP PROCEDURE IF EXISTS sp_crear_sucursal;
DROP PROCEDURE IF EXISTS sp_crear_cliente;
DROP PROCEDURE IF EXISTS sp_crear_empleado;
DROP PROCEDURE IF EXISTS sp_crear_pedido;
DROP PROCEDURE IF EXISTS sp_obtener_precio_producto;
DROP PROCEDURE IF EXISTS sp_agregar_producto_carrito;

-- =============================================
-- Procedimientos de CONSULTA (SELECT)
-- =============================================

-- Procedimiento para obtener todos los productos con su categoría
DELIMITER //
CREATE PROCEDURE sp_obtener_productos()
BEGIN
    SELECT p.id_Producto as id, p.Nombre as nombre, 
           c.Nombre as categoria, p.SKU as sku, 
           p.Precio_Lista as precio, p.Estado as estado 
    FROM producto p 
    JOIN categoria c ON p.categoria_id = c.id_Categoria;
END //
DELIMITER ;

-- Procedimiento para obtener todas las categorías
DELIMITER //
CREATE PROCEDURE sp_obtener_categorias()
BEGIN
    SELECT id_Categoria as id, Nombre as nombre
    FROM categoria;
END //
DELIMITER ;

-- Procedimiento para obtener todas las sucursales
DELIMITER //
CREATE PROCEDURE sp_obtener_sucursales()
BEGIN
    SELECT id_Sucursal as id, nombre, direccion, provincia, telefono 
    FROM sucursal;
END //
DELIMITER ;

-- Procedimiento para obtener todos los pedidos con cliente y sucursal
DELIMITER //
CREATE PROCEDURE sp_obtener_pedidos()
BEGIN
    SELECT o.id_Orden as id, 
           CONCAT(c.nombre, ' ', c.apellido) as cliente,
           s.nombre as sucursal, 
           o.fecha, o.total, o.estado
    FROM orden_de_compra o
    JOIN cliente c ON o.cliente_id = c.id_Cliente
    JOIN sucursal s ON o.sucursal_id = s.id_Sucursal;
END //
DELIMITER ;

-- Procedimiento para obtener todos los clientes
DELIMITER //
CREATE PROCEDURE sp_obtener_clientes()
BEGIN
    SELECT id_Cliente as id, nombre, apellido, email, telefono
    FROM cliente;
END //
DELIMITER ;

-- Procedimiento para obtener el precio de un producto
DELIMITER //
CREATE PROCEDURE sp_obtener_precio_producto(IN p_producto_id INT)
BEGIN
    SELECT Precio_Lista as precio 
    FROM producto 
    WHERE id_Producto = p_producto_id;
END //
DELIMITER ;

-- =============================================
-- Procedimientos de INSERCIÓN (INSERT)
-- =============================================

-- Procedimiento para crear un nuevo producto
DELIMITER //
CREATE PROCEDURE sp_crear_producto(
    IN p_nombre VARCHAR(255),
    IN p_categoria_id INT,
    IN p_sku VARCHAR(100),
    IN p_precio DECIMAL(10,2),
    IN p_estado VARCHAR(50)
)
BEGIN
    INSERT INTO producto (Nombre, categoria_id, SKU, Precio_Lista, Estado, fechaAlta) 
    VALUES (p_nombre, p_categoria_id, p_sku, p_precio, p_estado, NOW());
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Procedimiento para crear una nueva sucursal
DELIMITER //
CREATE PROCEDURE sp_crear_sucursal(
    IN p_nombre VARCHAR(255),
    IN p_direccion VARCHAR(255),
    IN p_provincia VARCHAR(100),
    IN p_telefono VARCHAR(50)
)
BEGIN
    INSERT INTO sucursal (nombre, direccion, provincia, telefono) 
    VALUES (p_nombre, p_direccion, p_provincia, p_telefono);
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Procedimiento para crear un nuevo cliente
DELIMITER //
CREATE PROCEDURE sp_crear_cliente(
    IN p_nombre VARCHAR(255),
    IN p_apellido VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_telefono VARCHAR(50)
)
BEGIN
    INSERT INTO cliente (nombre, apellido, email, telefono) 
    VALUES (p_nombre, p_apellido, p_email, p_telefono);
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Procedimiento para crear un nuevo empleado
DELIMITER //
CREATE PROCEDURE sp_crear_empleado(
    IN p_nombre VARCHAR(255),
    IN p_apellido VARCHAR(255),
    IN p_cargo VARCHAR(255),
    IN p_sucursal_id INT
)
BEGIN
    INSERT INTO empleado (nombre, apellido, cargo, sucursal_id) 
    VALUES (p_nombre, p_apellido, p_cargo, p_sucursal_id);
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Procedimiento para crear un nuevo pedido
DELIMITER //
CREATE PROCEDURE sp_crear_pedido(
    IN p_cliente_id INT,
    IN p_sucursal_id INT,
    IN p_fecha DATE,
    IN p_total DECIMAL(10,2),
    IN p_estado VARCHAR(50)
)
BEGIN
    INSERT INTO orden_de_compra (cliente_id, sucursal_id, fecha, total, estado) 
    VALUES (p_cliente_id, p_sucursal_id, p_fecha, p_total, p_estado);
    
    -- Devolver el ID insertado
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Procedimiento para agregar un producto al carrito
DELIMITER //
CREATE PROCEDURE sp_agregar_producto_carrito(
    IN p_carrito_id INT,
    IN p_producto_id INT,
    IN p_cantidad INT
)
BEGIN
    INSERT INTO carrito_producto (carrito_id, producto_id, cantidad)
    VALUES (p_carrito_id, p_producto_id, p_cantidad);
END //
DELIMITER ;

-- =============================================
-- Procedimientos adicionales que podrías necesitar
-- =============================================

-- Procedimiento para actualizar un producto
DELIMITER //
CREATE PROCEDURE sp_actualizar_producto(
    IN p_id INT,
    IN p_nombre VARCHAR(255),
    IN p_categoria_id INT,
    IN p_sku VARCHAR(100),
    IN p_precio DECIMAL(10,2),
    IN p_estado VARCHAR(50)
)
BEGIN
    UPDATE producto 
    SET Nombre = p_nombre,
        categoria_id = p_categoria_id,
        SKU = p_sku,
        Precio_Lista = p_precio,
        Estado = p_estado
    WHERE id_Producto = p_id;
END //
DELIMITER ;

-- Procedimiento para eliminar un producto
DELIMITER //
CREATE PROCEDURE sp_eliminar_producto(
    IN p_id INT
)
BEGIN
    DELETE FROM producto 
    WHERE id_Producto = p_id;
END //
DELIMITER ;
