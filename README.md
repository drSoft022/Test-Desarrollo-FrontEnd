## Test Desarrollo FrontEnd

Esta es un proyecto realizado como prueba de desarrollo fulstack con Laravel + Vite para la parte del backend y React con Inertia para la parte del frontend

## Descripcion

Se realizo un dashboard con una CRUD para empleados y cargos con relaciones entre estos, paginacion, descargar de datos, login y visualizacion usando laravel y mysql con jetstream para autenticacion, se trabajo React con Inertia para la parte del frontend junto con bootstrap para la estilizacion

## Comando para despliegue local

## REACT
	/npm instal react react-dom
	/npm install --save-dev @vitejs/plugin-react
## INERTIA
	/composer require inertiajs/inertia-laravel DEV
	/npm install @inertiajs/inertia @inertiajs/inertia-react DEV
	/php artisan vendor:publish --provider="Inertia\ServiceProvider"
	/php artisan vendor:publish --tag=vite-config