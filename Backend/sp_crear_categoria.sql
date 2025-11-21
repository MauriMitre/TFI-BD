DELIMITER //

-- Procedimiento almacenado para crear una nueva categoría
CREATE PROCEDURE sp_crear_categoria(
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT
)
BEGIN
    -- Insertar la nueva categoría
    INSERT INTO categoria (Nombre, Descripcion) 
    VALUES (p_nombre, p_descripcion);
    
    -- Devolver el ID de la categoría recién creada
    SELECT LAST_INSERT_ID() AS id;
END //

DELIMITER ;
