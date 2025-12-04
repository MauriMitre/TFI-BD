// ============================================
// CÓDIGO PARA AGREGAR A server.js
// Copiar y pegar ANTES del app.listen (final del archivo)
// ============================================

// ENDPOINT DE LOGIN CON VERIFICACIÓN DE PASSWORD HASHEADO
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            error: 'Usuario y contraseña son requeridos'
        });
    }

    // Llamar al procedimiento almacenado para verificar password
    connection.query(
        'CALL sp_verificar_password(?, ?, @es_valdio, @role)',
        [username, password],
        (err) => {
            if (err) {
                console.error('Error al verificar credenciales:', err);
                return res.status(500).json({
                    success: false,
                    error: 'Error al verificar credenciales'
                });
            }

            // Obtener los parámetros de salida
            connection.query(
                'SELECT @es_valido as es_valido, @role as role',
                (err, results) => {
                    if (err) {
                        console.error('Error al obtener resultado:', err);
                        return res.status(500).json({
                            success: false,
                            error: 'Error en la verificación'
                        });
                    }

                    const esValido = results[0].es_valido;
                    const rol = results[0].role;

                    if (!esValido || esValido === 0) {
                        return res.status(401).json({
                            success: false,
                            error: 'Credenciales inválidas'
                        });
                    }

                    console.log(`Login exitoso: ${username} (${rol})`);
                    res.json({
                        success: true,
                        role: rol,
                        username: username
                    });
                }
            );
        }
    );
});
