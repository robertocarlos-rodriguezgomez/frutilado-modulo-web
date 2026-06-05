# Sistema de facturación e inventario Frutilado

Módulo web desarrollado para la evidencia GA7-220501096-AA3-EV01 del programa Tecnólogo en Análisis y Desarrollo de Software del SENA.

## Framework seleccionado

Se utilizó Vue.js 3 para la gestión de la interfaz y Bootstrap 5 para los estilos base de formularios, tablas y botones.

## Módulo codificado

El módulo permite:

- Registrar productos del inventario.
- Editar y eliminar productos.
- Identificar productos con bajo stock.
- Crear una factura provisional de venta.
- Registrar la venta y descontar existencias.
- Guardar la información del inventario en `localStorage`.

## Estándar de codificación

El código JavaScript sigue criterios de legibilidad similares a JavaScript Standard Style: nombres descriptivos, indentación uniforme de dos espacios, funciones pequeñas y comentarios en las reglas de negocio más relevantes.

## Ejecución

Abra el archivo `index.html` en un navegador moderno. La aplicación no requiere instalación de dependencias porque usa Vue y Bootstrap desde CDN.

## Versionamiento

El proyecto fue preparado para Git y puede publicarse en GitHub con los siguientes comandos:

```bash
git init
git add .
git commit -m "Entrega modulo web Frutilado"
git branch -M main
git remote add origin https://github.com/robertocarlos-rodriguezgomez/frutilado-modulo-web.git
git push -u origin main
```
