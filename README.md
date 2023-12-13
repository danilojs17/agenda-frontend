# Next.js & NextUI Template

This is a template for creating applications using Next.js 13 (pages directory) and NextUI (v2).

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI](https://nextui.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-pages-template
```
## License

Licensed under the [MIT license](https://github.com/nextui-org/next-pages-template/blob/main/LICENSE).


###########################################################################################################

PROYECTO PRUEBA DESARROLLADOR FRONTEND - TODO

Description:
En la prueba se desarrollo un app para la gestion de actividades de un usuario donde cuenta con las siguientes funcionalidades:

1 - Creacion de tarea
2 - Visualizacion de tarea
3 - Actualizacion de una tarea como su titulo, descripción y su estado
4 - Eliminar una tarea
4 - Filtro de tarea por titulo, descripción y por estado

ESTRUCTURA DEL PROYECTO Y ARQUITECTURA

Se esta usando la carpeta src como origen de toda la app, donde podemos encontrar las siguientes carpetas como:
core: En esta carpeta se esta almacenando el contexto global de nuestra app y los hooks.
data: Aquí tenemos una capa de datos donde tenemos las interfaces de nuestros componentes y funciones, tamebien tenemos las variables que se usan para el contexto global.
pages: Aquí tenemos las paginas de nuestra app.
shared: En esta carpeta almacenamos todos los archivos compartidos de nuestra app como los componentes, variables, fuentes, librerias y de más.
styles: Aqui tenemos los estilos de la app.

Notas:
Sobre la api https://dummyjson.com/docs/todos tuve unos incovenientes a la hora de realizar el crud.

El metodo GET, no esta haciendo devuelta de un titulo o descripcion, lo cual tome la clave todo como descripción y le asigne una texto random al titulo, pero no es impedimento para crear una tarea con titulo y descripcion.

En el metodo POST, el resultado de la peticion solo es el userId y id del todo, lo cual tuve que usar las claves que vienen como parametro de mi función createToDo.

En el metodo PUT, no podia actualizar una tarea creada por mi, la api me respondia que no existia un todo con el id que le pasaba como paramatro a la peticion, el metodo PUT me limitaba a solo enviar la clave completed, si enviaba alguna mas me daba error 404 - BadRequest, por lo tanto utilizo las claves que recibo como parametro para actualizar el titulo y descripcion.
