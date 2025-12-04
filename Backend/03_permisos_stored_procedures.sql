-- Script para otorgar permisos EXECUTE sobre stored procedures
-- a los usuarios empleado_lectura y gerente

USE tfi_bd;

-- ==================================================
-- PERMISOS PARA empleado_lectura
-- ==================================================
-- Solo puede ejecutar SPs de lectura (SELECT)

GRANT EXECUTE ON PROCEDURE sp_obtener_productos TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_categorias TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_sucursales TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_pedidos TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_clientes TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_personal TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_ordenes_compra TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_orden_detalle TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_orden_productos TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_orden_pago TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_transaccion_cripto TO 'empleado_lectura'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_metodos_pago TO 'empleado_lectura'@'localhost';

-- ==================================================
-- PERMISOS PARA gerente
-- ==================================================
-- Puede ejecutar SPs de lectura
GRANT EXECUTE ON PROCEDURE sp_obtener_productos TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_categorias TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_sucursales TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_pedidos TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_clientes TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_personal TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_ordenes_compra TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_orden_detalle TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_orden_productos TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_orden_pago TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_transaccion_cripto TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_obtener_metodos_pago TO 'gerente'@'localhost';

-- Puede ejecutar SPs de escritura SOLO en producto y orden_de_compra
GRANT EXECUTE ON PROCEDURE sp_crear_producto TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_actualizar_producto TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_eliminar_producto TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_agregar_stock_producto TO 'gerente'@'localhost';

GRANT EXECUTE ON PROCEDURE sp_crear_orden TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_crear_orden_pago TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_agregar_orden_producto TO 'gerente'@'localhost';
GRANT EXECUTE ON PROCEDURE sp_actualizar_pedido TO 'gerente'@'localhost';

-- Aplicar los cambios
FLUSH PRIVILEGES;

-- Verificar permisos
SELECT 
    GRANTEE,
    ROUTINE_NAME,
    PRIVILEGE_TYPE
FROM 
    information_schema.ROUTINE_PRIVILEGES
WHERE 
    ROUTINE_SCHEMA = 'tfi_bd'
    AND GRANTEE IN ("'empleado_lectura'@'localhost'", "'gerente'@'localhost'")
ORDER BY 
    GRANTEE, ROUTINE_NAME;
