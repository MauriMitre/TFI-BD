// ============================================
// CÓDIGO PARA AGREGAR AL INICIO DE script.js
// Copiar y pegar después de las declaraciones de variables (línea 13)
// ============================================

// Verificar autenticación
const userRole = sessionStorage.getItem('userRole');
const username = sessionStorage.getItem('username');

if (!userRole || !username) {
    window.location.href = 'login.html';
}

console.log('Usuario autenticado:', username, '- Rol:', userRole);

// ============================================
// CÓDIGO PARA AGREGAR AL FINAL DE cargarDatos()
//  Agregar dentro de la función cargarDatos, al final (después de línea 155)
// ============================================

// Configurar UI según rol de usuario
configurarUISegunRol();
configurarLogout();

// ============================================
// FUNCIONES PARA AGREGAR AL FINAL DEL ARCHIVO
// ============================================

function configurarUISegunRol() {
    // Mostrar información del usuario
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        const roleDisplay = userRole === 'gerente' ? 'Gerente' : 'Empleado (Lectura)';
        userNameElement.textContent = `${username} - ${roleDisplay}`;
    }

    // Si es empleado_lectura, ocultar elementos de modificación
    if (userRole === 'empleado_lectura') {
        console.log('Aplicando restricciones para empleado_lectura');

        // Ocultar links de gestión y modificación
        const linkGestion = document.querySelector('.link-gestion');
        if (linkGestion) {
            linkGestion.parentElement.style.display = 'none';
        }

        const linkModificar = document.querySelector('a[href="pages/modificar.html"]');
        if (linkModificar) {
            linkModificar.parentElement.style.display = 'none';
        }

        // Ocultar todos los botones de modificación y eliminación
        document.querySelectorAll('.btn-modificar, .btn-eliminar, .btn-agregar').forEach(btn => {
            btn.style.display = 'none';
        });

        // Ocultar formularios de creación
        document.querySelectorAll('form').forEach(form => {
            if (form.id.includes('Form') || form.id.includes('form')) {
                const formContainer = form.closest('.tab-content');
                if (formContainer) {
                    formContainer.style.display = 'none';
                }
            }
        });
    }
}

function configurarLogout() {
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // Limpiar sesión
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('username');

            // Redirigir al login
            window.location.href = 'login.html';
        });
    }
}
