# MiFicho

Sistema de **fichos digitales** para las cafeterías de una universidad. El estudiante compra su ficho de comida desde la web, recibe un código QR y lo muestra en la cafetería, donde lo validan escaneándolo.

## Roles

| Rol | Qué puede hacer |
|---|---|
| Estudiante | Comprar fichos (tarjeta, Nequi o PSE, simulados), ver su QR e historial de compras |
| Validador | Escanear el QR con la cámara, validar el ficho y ver el historial de validaciones |
| Vendedor | Ver ventas recientes y su historial |
| Admin | Administrar usuarios y cafeterías, y ver todas las ventas y compras |

El admin también puede invalidar de una vez los fichos viejos que no se usaron.

## Sesión y permisos

- Al iniciar sesión, la API entrega un **token** (Laravel Sanctum) que el frontend manda en cada llamada (`Authorization: Bearer <token>`). Vence en 7 días.
- Cada ruta revisa el rol: el estudiante solo ve y compra lo suyo, y el panel es solo para vendedor y validador. Las rutas están en `routes/api.php` y la revisión del rol en `app/Http/Middleware/Rol.php`.
- Las contraseñas se guardan con hash. Las cuentas viejas con la clave en texto plano se convierten solas la primera vez que inician sesión.

## Tecnologías

- **Backend:** Laravel 13 (PHP 8.3), API REST y MySQL.
- **Frontend:** React con Vite (dentro de `resources/js`), React Router, `qrcode.react` para generar el QR y `html5-qrcode` para leerlo.

## Correrlo

Necesitas PHP 8.3, Composer, Node.js y MySQL.

```sh
composer install
npm install
cp .env.example .env          # pon los datos de tu MySQL
php artisan key:generate
php artisan migrate          # incluye la tabla de tokens de sesión
composer run dev              # levanta Laravel y Vite juntos
```
Abre http://localhost:8000

## Estado

Proyecto académico en equipo.
