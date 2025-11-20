# Sistema de Gestión - Demostración

Este proyecto es una demostración simple para un Trabajo Final Integrador de Bases de Datos. Consiste en una interfaz web básica que simula la interacción con una base de datos de un sistema de gestión de productos, sucursales, pedidos y clientes.

## Características

- Panel de control con contadores
- Listado de productos con su categoría
- Listado de sucursales
- Listado de pedidos
- Listado de clientes
- Búsqueda en cada sección
- Simulación de consultas SQL en la consola del navegador

## Estructura de la Base de Datos

La aplicación simula una base de datos con las siguientes tablas:

- categoria
- producto
- sucursal
- cliente
- orden_de_compra
- carrito_producto
- stockmovimiento
- stocksucursal
- tipo_mov

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Cómo Ejecutar

1. Descarga todos los archivos de este proyecto
2. Abre el archivo `index.html` en tu navegador web
3. La aplicación se cargará automáticamente

No se requiere ningún servidor web ni configuración adicional, ya que es una demostración basada completamente en el navegador.

## Funcionamiento

La aplicación simula consultas a una base de datos utilizando JavaScript. Cuando se realiza una búsqueda, se mostrará en la consola del navegador la consulta SQL equivalente que se ejecutaría en un entorno real.

Para ver las consultas SQL:

1. Abre las herramientas de desarrollador en tu navegador (F12 o Ctrl+Shift+I)
2. Ve a la pestaña "Consola"
3. Realiza alguna búsqueda en la aplicación

## Notas

- Esta es una demostración simplificada para fines educativos
- No se conecta a una base de datos real
- Los datos son simulados y estáticos
- En un entorno real, se implementaría:
  - Un backend con conexión a una base de datos real (MySQL, PostgreSQL, etc.)
  - Autenticación de usuarios
  - Validación de formularios
  - Mayor seguridad
  - Más funcionalidades como crear, actualizar y eliminar registros
