-- ============================================
-- SCRIPT 2: HASHING DE CONTRASEÑAS (PII)
-- Ejecutar DESPUÉS del script 01
-- ============================================

USE tfi_bd;

-- ============================================
-- PARTE 1: CREAR TABLA DE USUARIOS
-- ============================================

CREATE TABLE IF NOT EXISTS usuarios (
    id_Usuario INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(64) NOT NULL,
    salt VARCHAR(32) NOT NULL,
    role ENUM('empleado_lectura', 'gerente') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PARTE 2: FUNCIÓN PARA GENERAR SALT
-- ============================================

DROP FUNCTION IF EXISTS generar_salt;

DELIMITER $$
CREATE FUNCTION generar_salt() 
RETURNS VARCHAR(32)
DETERMINISTIC
BEGIN
    RETURN MD5(CONCAT(UUID(), RAND(), NOW()));
END$$
DELIMITER ;

-- ============================================
-- PARTE 3: PROCEDIMIENTO PARA CREAR USUARIO
-- ============================================

DROP PROCEDURE IF EXISTS sp_crear_usuario;

DELIMITER $$
CREATE PROCEDURE sp_crear_usuario(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(100),
    IN p_role VARCHAR(20)
)
BEGIN
    DECLARE v_salt VARCHAR(32);
    DECLARE v_hash VARCHAR(64);
    
    -- Generar salt único
    SET v_salt = generar_salt();
    
    -- Generar hash SHA-256 con salt
    SET v_hash = SHA2(CONCAT(v_salt, p_password), 256);
    
    -- Insertar usuario con password hasheado
    INSERT INTO usuarios (username, password_hash, salt, role)
    VALUES (p_username, v_hash, v_salt, p_role);
    
    SELECT CONCAT('Usuario "', p_username, '" creado exitosamente') AS mensaje;
END$$
DELIMITER ;

-- ============================================
-- PARTE 4: PROCEDIMIENTO PARA VERIFICAR PASSWORD
-- ============================================

DROP PROCEDURE IF EXISTS sp_verificar_password;

DELIMITER $$
CREATE PROCEDURE sp_verificar_password(
    IN p_username VARCHAR(50),
    IN p_password_ingresado VARCHAR(100),
    OUT p_es_valido BOOLEAN,
    OUT p_role VARCHAR(20)
)
BEGIN
    DECLARE v_salt VARCHAR(32);
    DECLARE v_hash_almacenado VARCHAR(64);
    DECLARE v_hash_calculado VARCHAR(64);
    DECLARE v_user_role VARCHAR(20);
    
    -- Obtener salt, hash y rol almacenados
    SELECT salt, password_hash, role 
    INTO v_salt, v_hash_almacenado, v_user_role
    FROM usuarios
    WHERE username = p_username;
    
    -- Si el usuario existe
    IF v_salt IS NOT NULL THEN
        -- Calcular hash con el salt almacenado
        SET v_hash_calculado = SHA2(CONCAT(v_salt, p_password_ingresado), 256);
        
        -- Comparar hashes
        IF v_hash_calculado = v_hash_almacenado THEN
            SET p_es_valido = TRUE;
            SET p_role = v_user_role;
        ELSE
            SET p_es_valido = FALSE;
            SET p_role = NULL;
        END IF;
    ELSE
        -- Usuario no existe
        SET p_es_valido = FALSE;
        SET p_role = NULL;
    END IF;
END$$
DELIMITER ;

-- ============================================
-- PARTE 5: CREAR USUARIOS DE PRUEBA
-- ============================================

-- Eliminar usuarios existentes si existen
DELETE FROM usuarios WHERE username IN ('empleado_lectura', 'gerente');

-- Crear usuario empleado_lectura
CALL sp_crear_usuario('empleado_lectura', 'lectura123', 'empleado_lectura');

-- Crear usuario gerente
CALL sp_crear_usuario('gerente', 'gerente123', 'gerente');

-- ============================================
-- VERIFICACIÓN Y EJEMPLOS DE USO
-- ============================================

-- Ver usuarios creados
SELECT id_Usuario, username, role, created_at FROM usuarios;

-- Ejemplo 1: Verificar password correcto
CALL sp_verificar_password('empleado_lectura', 'lectura123', @valido, @rol);
SELECT @valido AS es_password_correcto, @rol AS rol_usuario;
-- Resultado esperado: es_password_correcto=1, rol_usuario='empleado_lectura'

-- Ejemplo 2: Verificar password incorrecto
CALL sp_verificar_password('empleado_lectura', 'password_malo', @valido, @rol);
SELECT @valido AS es_password_correcto, @rol AS rol_usuario;
-- Resultado esperado: es_password_correcto=0, rol_usuario=NULL

-- Ejemplo 3: Verificar usuario inexistente
CALL sp_verificar_password('usuario_fake', 'cualquier_pass', @valido, @rol);
SELECT @valido AS es_password_correcto, @rol AS rol_usuario;
-- Resultado esperado: es_password_correcto=0, rol_usuario=NULL

-- ============================================
-- DEMOSTRACIÓN: Cómo se genera el hash
-- ============================================

-- Mostrar el hash y salt de cada usuario
SELECT 
    username,
    salt,
    password_hash,
    CONCAT('SHA2(CONCAT("', salt, '", "password"), 256)') AS formula_hash
FROM usuarios;

-- Nota: Cada usuario tiene un salt único, por lo que incluso si dos usuarios
-- tuvieran la misma contraseña, sus hashes serían completamente diferentes.
