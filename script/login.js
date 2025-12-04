// URL base de la API
const API_URL = 'http://localhost:3000/api';

// Manejar el envío del formulario de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensaje-error');

    // Ocultar mensaje de error anterior
    mensajeError.style.display = 'none';

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            // Guardar información del usuario en sessionStorage
            sessionStorage.setItem('userRole', result.role);
            sessionStorage.setItem('username', username);

            console.log('Login exitoso:', username, 'rol:', result.role);

            // Redirigir a la página principal
            window.location.href = 'index.html';
        } else {
            // Mostrar error
            mensajeError.textContent = result.error || 'Credenciales inválidas';
            mensajeError.style.display = 'block';
        }
    } catch (error) {
        console.error('Error en login:', error);
        mensajeError.textContent = 'Error de conexión. Verifique que el servidor esté ejecutándose.';
        mensajeError.style.display = 'block';
    }
});

// Permitir Enter en los campos
document.getElementById('password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});
