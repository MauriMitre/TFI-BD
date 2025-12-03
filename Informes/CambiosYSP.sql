CREATE TABLE rol_personal (
  id_Rol   INT NOT NULL AUTO_INCREMENT,
  nombre   VARCHAR(50) NOT NULL, -- 'ADMIN', 'SOPORTE', 'LOGISTICA', etc.
  PRIMARY KEY (id_Rol)
) ENGINE=InnoDB;

CREATE TABLE personal (
  id_Personal INT NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100) NOT NULL,
  apellido    VARCHAR(100) NOT NULL,
  email       VARCHAR(100) NOT NULL,
  rol_id      INT NOT NULL,
  PRIMARY KEY (id_Personal),
  CONSTRAINT fk_personal_rol
    FOREIGN KEY (rol_id)
    REFERENCES rol_personal (id_Rol)
) ENGINE=InnoDB;

ALTER TABLE orden_de_compra
ADD COLUMN usuario_creacion_id INT NULL,
ADD CONSTRAINT fk_orden_usuario_crea
  FOREIGN KEY (usuario_creacion_id)
  REFERENCES personal (id_Personal);
  
ALTER TABLE envio
ADD COLUMN personal_id INT NULL,
ADD CONSTRAINT fk_envio_personal
  FOREIGN KEY (personal_id)
  REFERENCES personal (id_Personal);
  
ALTER TABLE devolucion
ADD COLUMN personal_id INT NULL,
ADD CONSTRAINT fk_devolucion_personal
  FOREIGN KEY (personal_id)
  REFERENCES personal (id_Personal);
  
INSERT INTO rol_personal (nombre) VALUES
  ('ADMIN'),
  ('SOPORTE'),
  ('LOGISTICA');
  
INSERT INTO personal (nombre, apellido, email, rol_id) VALUES
  ('Juan', 'García', 'juan.admin@tienda.com', 1),      -- ADMIN
  ('Lucía', 'Pérez', 'lucia.soporte@tienda.com', 2),   -- SOPORTE
  ('Carlos', 'López', 'carlos.logistica@tienda.com', 3); -- LOGISTICA
  
ALTER TABLE moneda_cripto
ADD COLUMN simbolo VARCHAR(10) not NULL
AFTER nombre;
  
ALTER TABLE transaccioncripto
ADD COLUMN wallet_cliente VARCHAR(255) NOT NULL;

ALTER TABLE envio
ADD COLUMN servicio_tracking VARCHAR(100) NULL,
ADD COLUMN url_tracking      VARCHAR(255) NULL;

ALTER TABLE cliente
ADD CONSTRAINT uq_cliente_email UNIQUE (email);

ALTER TABLE producto
ADD CONSTRAINT uq_producto_sku UNIQUE (SKU);

ALTER TABLE producto
ADD CONSTRAINT uq_producto_nombre UNIQUE (Nombre);

ALTER TABLE categoria
ADD CONSTRAINT uq_categoria_nombre UNIQUE (Nombre);

ALTER TABLE moneda_cripto
ADD CONSTRAINT uq_moneda_cripto_nombre UNIQUE (nombre),
ADD CONSTRAINT uq_moneda_cripto_simbolo UNIQUE (simbolo);

ALTER TABLE sucursal
ADD CONSTRAINT uq_sucursal_nombre UNIQUE (Nombre);

ALTER TABLE tipo_metodo
ADD CONSTRAINT uq_tipo_metodo_nombre UNIQUE (Nombre);

ALTER TABLE metodo_de_pago
ADD CONSTRAINT uq_metodo_nombre UNIQUE (Nombre);

ALTER TABLE personal
ADD CONSTRAINT uq_personal_email UNIQUE (email);

ALTER TABLE rol_personal
ADD CONSTRAINT uq_rol_personal_nombre UNIQUE (nombre);

ALTER TABLE stocksucursal
ADD CONSTRAINT uq_stocksucursal_sucursal_producto
  UNIQUE (sucursal_id, producto_id);
  
ALTER TABLE carrito_producto
ADD CONSTRAINT uq_carrito_producto
  UNIQUE (carrito_id, producto_id);

ALTER TABLE orden_producto
ADD CONSTRAINT uq_orden_producto
  UNIQUE (orden_id, producto_id);
  
DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_actualizar_cliente`(
    IN p_id        INT,
    IN p_nombre    VARCHAR(100),
    IN p_apellido  VARCHAR(100),
    IN p_email     VARCHAR(100),
    IN p_telefono  VARCHAR(25)
)
BEGIN
    UPDATE cliente
    SET nombre   = p_nombre,
        apellido = p_apellido,
        email    = p_email,
        telefono = p_telefono
    WHERE id_Cliente = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_actualizar_categoria`(
    IN p_id          INT,
    IN p_nombre      VARCHAR(100),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    UPDATE categoria
    SET Nombre      = p_nombre,
        Descripcion = p_descripcion
    WHERE id_Categoria = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_actualizar_sucursal`(
    IN p_id        INT,
    IN p_nombre    VARCHAR(150),
    IN p_direccion VARCHAR(255),
    IN p_provincia VARCHAR(100),
    IN p_telefono  VARCHAR(25)
)
BEGIN
    UPDATE sucursal
    SET nombre    = p_nombre,
        direccion = p_direccion,
        provincia = p_provincia,
        telefono  = p_telefono
    WHERE id_Sucursal = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_actualizar_personal`(
    IN p_id       INT,
    IN p_nombre   VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_email    VARCHAR(100),
    IN p_rol_id   INT
)
BEGIN
    UPDATE personal
    SET nombre   = p_nombre,
        apellido = p_apellido,
        email    = p_email,
        rol_id   = p_rol_id
    WHERE id_Personal = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_actualizar_pedido`(
    IN p_id                 INT,
    IN p_cliente_id         INT,
    IN p_sucursalOrigen_id  INT,
    IN p_fecha              DATETIME,
    IN p_total              DECIMAL(10,2),
    IN p_canal              VARCHAR(50),
    IN p_estado             VARCHAR(50),
    IN p_usuario_creacion_id INT
)
BEGIN
    UPDATE orden_de_compra
    SET cliente_id         = p_cliente_id,
        sucursalOrigen_id  = p_sucursalOrigen_id,
        fecha              = p_fecha,
        total              = p_total,
        canal              = p_canal,
        estado             = p_estado,
        usuario_creacion_id = p_usuario_creacion_id
    WHERE id_Orden = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_categoria`(
    IN p_id INT
)
BEGIN
    DELETE FROM categoria
    WHERE id_Categoria = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_sucursal`(
    IN p_id INT
)
BEGIN
    -- 1) Borrar envíos de órdenes de esta sucursal
    DELETE e
    FROM envio e
    JOIN orden_de_compra o ON e.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 2) Borrar devoluciones de órdenes de esta sucursal
    DELETE d
    FROM devolucion d
    JOIN orden_de_compra o ON d.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 3) Borrar transacciones cripto de pagos de órdenes de esta sucursal
    DELETE tc
    FROM transaccioncripto tc
    JOIN orden_de_pago op ON tc.pago_id = op.id_Pago
    JOIN orden_de_compra o ON op.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 4) Borrar pagos de órdenes de esta sucursal
    DELETE op
    FROM orden_de_pago op
    JOIN orden_de_compra o ON op.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 5) Borrar detalle de productos de órdenes de esta sucursal
    DELETE opdet
    FROM orden_producto opdet
    JOIN orden_de_compra o ON opdet.orden_id = o.id_Orden
    WHERE o.sucursalOrigen_id = p_id;

    -- 6) Borrar órdenes de esta sucursal
    DELETE FROM orden_de_compra
    WHERE sucursalOrigen_id = p_id;

    -- 7) Borrar movimientos de stock y stock por sucursal
    DELETE FROM stockmovimiento WHERE sucursal_id = p_id;
    DELETE FROM stocksucursal    WHERE sucursal_id = p_id;

    -- 8) Finalmente borrar la sucursal
    DELETE FROM sucursal
    WHERE id_Sucursal = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_cliente`(
    IN p_id INT
)
BEGIN
    -- 1) Borrar productos de carritos del cliente
    DELETE cp
    FROM carrito_producto cp
    JOIN carrito_de_compra c ON cp.carrito_id = c.id_Carrito
    WHERE c.cliente_id = p_id;

    -- 2) Borrar carritos del cliente
    DELETE FROM carrito_de_compra
    WHERE cliente_id = p_id;

    -- 3) Borrar envíos de órdenes del cliente
    DELETE e
    FROM envio e
    JOIN orden_de_compra o ON e.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 4) Borrar devoluciones de órdenes del cliente
    DELETE d
    FROM devolucion d
    JOIN orden_de_compra o ON d.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 5) Borrar transacciones cripto de pagos de órdenes del cliente
    DELETE tc
    FROM transaccioncripto tc
    JOIN orden_de_pago op ON tc.pago_id = op.id_Pago
    JOIN orden_de_compra o ON op.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 6) Borrar pagos de órdenes del cliente
    DELETE op
    FROM orden_de_pago op
    JOIN orden_de_compra o ON op.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 7) Borrar detalle de productos de órdenes del cliente
    DELETE opdet
    FROM orden_producto opdet
    JOIN orden_de_compra o ON opdet.orden_id = o.id_Orden
    WHERE o.cliente_id = p_id;

    -- 8) Borrar órdenes del cliente
    DELETE FROM orden_de_compra
    WHERE cliente_id = p_id;

    -- 9) Borrar direcciones del cliente
    DELETE FROM direccion
    WHERE cliente_id = p_id;

    -- 10) Finalmente borrar el cliente
    DELETE FROM cliente
    WHERE id_Cliente = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_personal`(
    IN p_id INT
)
BEGIN
    -- Quitar referencias al empleado en órdenes, devoluciones y envíos
    UPDATE orden_de_compra
    SET usuario_creacion_id = NULL
    WHERE usuario_creacion_id = p_id;

    UPDATE devolucion
    SET personal_id = NULL
    WHERE personal_id = p_id;

    UPDATE envio
    SET personal_id = NULL
    WHERE personal_id = p_id;

    -- Finalmente borrar el registro de personal
    DELETE FROM personal
    WHERE id_Personal = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_pedido`(
    IN p_id INT
)
BEGIN
    -- 1) Envíos de la orden
    DELETE FROM envio
    WHERE orden_id = p_id;

    -- 2) Devoluciones de la orden
    DELETE FROM devolucion
    WHERE orden_id = p_id;

    -- 3) Transacciones cripto de pagos de la orden
    DELETE tc
    FROM transaccioncripto tc
    JOIN orden_de_pago op ON tc.pago_id = op.id_Pago
    WHERE op.orden_id = p_id;

    -- 4) Pagos de la orden
    DELETE FROM orden_de_pago
    WHERE orden_id = p_id;

    -- 5) Detalle de productos de la orden
    DELETE FROM orden_producto
    WHERE orden_id = p_id;

    -- 6) Finalmente la orden
    DELETE FROM orden_de_compra
    WHERE id_Orden = p_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_obtener_metodos_pago` ()
BEGIN
    SELECT mp.id_Metodo as id, 
           mp.Nombre as nombre, 
           mp.Empresa as empresa, 
           tm.Nombre as tipo_metodo
    FROM metodo_de_pago mp
    JOIN tipo_metodo tm ON mp.tipo_metodo_id = tm.id_Tipomet;
END$$
DELIMITER ;
  
DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_obtener_transaccion_cripto` (IN p_pago_id INT)
BEGIN
    SELECT mc.nombre as moneda, 
           tc.hash, 
           tc.wallet_cliente
    FROM transaccioncripto tc
    JOIN moneda_cripto mc ON tc.moneda_cripto_id = mc.id_Moneda
    WHERE tc.pago_id = p_pago_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_obtener_orden_pago` (IN p_orden_id INT)
BEGIN
    SELECT op.id_Pago as id, 
           op.total_pagado, 
           op.moneda, 
           mp.Nombre as metodo
    FROM orden_de_pago op
    JOIN metodo_de_pago mp ON op.metodo_id = mp.id_Metodo
    WHERE op.orden_id = p_orden_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_obtener_orden_productos` (IN p_orden_id INT)
BEGIN
    SELECT p.Nombre as nombre, 
           op.cantidad, 
           op.precio_unitario
    FROM orden_producto op
    JOIN producto p ON op.producto_id = p.id_Producto
    WHERE op.orden_id = p_orden_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_obtener_orden_detalle` (IN p_orden_id INT)
BEGIN
    SELECT o.id_Orden AS id, 
           CONCAT(c.nombre, ' ', c.apellido) AS cliente,
           s.nombre AS sucursal, 
           o.fecha, 
           o.total, 
           o.canal,
           o.estado
    FROM orden_de_compra o
    JOIN cliente c ON o.cliente_id = c.id_Cliente
    JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal
    WHERE o.id_Orden = p_orden_id;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_obtener_ordenes_compra` ()
BEGIN
    SELECT o.id_Orden AS id, 
           CONCAT(c.nombre, ' ', c.apellido) AS cliente,
           s.nombre AS sucursal, 
           o.fecha, 
           o.total, 
           o.canal,
           o.estado
    FROM orden_de_compra o
    JOIN cliente c ON o.cliente_id = c.id_Cliente
    JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal;
END$$
DELIMITER ;

DELIMITER $$
USE `tfi_bd`$$
CREATE PROCEDURE `sp_obtener_personal` ()
BEGIN
    SELECT p.id_Personal as id, 
           p.nombre, 
           p.apellido, 
           p.email, 
           r.nombre as rol
    FROM personal p
    JOIN rol_personal r ON p.rol_id = r.id_Rol;
END$$
DELIMITER ;
