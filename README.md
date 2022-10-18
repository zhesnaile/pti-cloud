# PTI Cloud Comunitario

## Entorno
El proyecto esta creado con [node-16](https://nodejs.org/en/).
Hace falta instalar las dependencias del proyecto para correrlo; basta con ejecutar:
```
npm install
```
Desde el directorio del git. No hacen falta permisos de superusuario.

El punto de entrada de la web es `src/main.js`

Para correr el proyecto deberia bastar con:

```
node src/main.js
```

Ya lo haremos mejor para el futuro.

## Estructura del proyecto
Aqui teneis la estructura bajo forma de arbol del proyecto.
```
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── api
    │   ├── api.js
    │   └── endpoints
    │       ├── login.js
    │       ├── registerNode.js
    │       ├── registerUser.js
    │       └── runTask.js
    ├── components
    ├── main.js
    ├── pages
    └── utils
        ├── access-k3s.js
        ├── access-redis.js
        └── access-wg.js
```


- **[`main.js`](src/main.js)** contiene una instancia de Koa
    - Llama al método [`set_up_routes`](src/api/api.js) de **[`api/api.js`](src/api/api.js)**

- **[`api/api.js`](src/api/api.js)** configura un Router de Koa para nuestras API.
    - Importa los metodos get/put/post/patch/del; corresponden a los tipos de acceso HTTP tolerados en una API [REST](https://www.restapitutorial.com/lessons/httpmethods.html).
    - Para cada archivo .js en [/api/endpoint/](src/api/endpoint/) asigna los metodos declarados en ellos a la ruta que tienen asignada.
    - También añade un KoaBodyParser al router, haciendo que las API solo acepten JSON i Forms; de esta manera los metodos declarados en cada Endpoint tienen los parametros directamente en `ctx.request.body`.

- **[`api/endpoints/`](src/api/endpoints/)**:
    - Contiene los metodos utilizados por cada API. Deben incluir un parametro `ctx`.
    - En caso de tener que acceder a Redis, configuración de K3S o Wireguard, es preferible declarar funciones que los gestionen en [`utils/`](src/utils/) y llamarlas desde el metodo de la API que lo requiera.

- **[`utils/`](src/utils/)**: los archivos de aqui contienen métodos auxiliares para nuestro servidor web, por ejemplo comprobar que un usuario pertenece a la base de datos, o ejecutar un comando de terminal.

## Líbrerias que Usamos:
- KoaJS:
    - Documentación: https://koajs.com.
    - Paquete de npm: https://www.npmjs.com/package/koa.
- Koa-Router:
    - Documentación: https://github.com/koajs/router/blob/master/API.md.
    - Paquete de npm: https://www.npmjs.com/package/@koa/router.
- Koa-bodyparser:
    - Documentación:
    - Paquete de npm: https://www.npmjs.com/package/koa-bodyparser.
