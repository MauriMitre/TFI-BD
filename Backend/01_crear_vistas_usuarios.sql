-- ============================================
-- SCRIPT 1: CREAR VISTAS Y USUARIOS
-- Ejecutar este script en MySQL Workbench o línea de comandos
-- ============================================

USE tfi_bd;

-- ============================================
-- PARTE 1: CREAR VISTAS
-- ============================================

-- Vista 1: Productos disponibles con su categoría
CREATE OR REPLACE VIEW vista_productos_disponibles AS
SELECT 
    p.id_Producto,
    p.Nombre AS producto,
    c.Nombre AS categoria,
    p.Precio_Lista AS precio,
    p.Estado
FROM producto p
JOIN categoria c ON p.categoria_id = c.id_Categoria
WHERE p.Estado = 'Disponible';

-- Vista 2: Resumen de órdenes de compra
CREATE OR REPLACE VIEW vista_resumen_ordenes AS
SELECT 
    o.id_Orden,
    CONCAT(cl.nombre, ' ', cl.apellido) AS cliente,
    o.fecha,
    o.total,
    o.estado,
    s.nombre AS sucursal
FROM orden_de_compra o
JOIN cliente cl ON o.cliente_id = cl.id_Cliente
JOIN sucursal s ON o.sucursalOrigen_id = s.id_Sucursal;

-- ============================================
-- PARTE 2: CREAR USUARIOS CON PERMISOS
-- ============================================

-- Usuario 1: empleado_lectura (Solo lectura en vistas)
DROP USER IF EXISTS 'empleado_lectura'@'localhost';
CREATE USER 'empleado_lectura'@'localhost' IDENTIFIED BY 'lectura123';

-- Otorgar permisos de SELECT en las vistas
GRANT SELECT ON tfi_bd.vista_productos_disponibles TO 'empleado_lectura'@'localhost';
GRANT SELECT ON tfi_bd.vista_resumen_ordenes TO 'empleado_lectura'@'localhost';

-- Usuario 2: gerente (Lectura en vistas + Modificación en tablas específicas)
DROP USER IF EXISTS 'gerente'@'localhost';
CREATE USER 'gerente'@'localhost' IDENTIFIED BY 'gerente123';

-- Otorgar permisos de SELECT en las vistas
GRANT SELECT ON tfi_bd.vista_productos_disponibles TO 'gerente'@'localhost';
GRANT SELECT ON tfi_bd.vista_resumen_ordenes TO 'gerente'@'localhost';

-- Otorgar permisos de modificación en tablas específicas
GRANT SELECT, INSERT, UPDATE ON tfi_bd.producto TO 'gerente'@'localhost';
GRANT SELECT, INSERT, UPDATE ON tfi_bd.orden_de_compra TO 'gerente'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Consultar las vistas creadas
SELECT * FROM vista_productos_disponibles LIMIT 5;
SELECT * FROM vista_resumen_ordenes LIMIT 5;

-- Verificar usuarios creados
SELECT User, Host FROM mysql.user WHERE User IN ('empleado_lectura', 'gerente');
