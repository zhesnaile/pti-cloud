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
├── README.md
└── src
    ├── api
    │   ├── api.js
    │   └── endpoints
    │       ├── login.js
    │       ├── registerNode.js
    │       ├── registerUser.js
    │       └── runTask.js
    ├── frontend
    ├── main.js
    └── utils
        ├── access-k3s.js
        ├── access-redis.js
        └── access-wg.js
```


- **[`main.js`](src/main.js)** contiene una instancia de Koa
    - Llama al método [`set_up_routes`](src/api/api.js) de **[`api/api.js`](src/api/api.js)**

- **[`api/api.js`](src/api/api.js)** configura un Router de Koa para nuestras API.
    - Para cada Router declarado en cada API, añade sus rutas a nuestro router.
    - Para cada archivo .js en [/api/endpoint/](src/api/endpoint/) hace falta importar su router y añadirlo al array `api_routers`
    
- **[`api/endpoints/`](src/api/endpoints/)**:
    - Cada uno representa una API [REST](https://www.restapitutorial.com/lessons/httpmethods.html).
    - Debemos crear un router para cada endpoint.
    - Contiene los metodos utilizados por cada API. Deben incluir un parametro `ctx`.
    - Es recomendable utilizar KoaBodyParser en el router; de esta manera nuestros metodos tienen acceso los parametros directamente en `ctx.request.body`, **¡¡¡Mirad documentación de bodyparser, por defecto rechaza todo lo que no sea JSON o Forms!!!**.
    - En caso de tener que acceder a Redis, configuración de K3S o Wireguard, o cualquier tipo de lógica más compleja, es preferible declarar funciones que los gestionen en [`utils/`](src/utils/) y llamarlas desde el metodo de la API que lo requiera.

- **[`utils/`](src/utils/)**: los archivos de aqui contienen métodos auxiliares para nuestro servidor web, por ejemplo comprobar que un usuario pertenece a la base de datos, o ejecutar un comando de terminal.
## Git
Recomendaciones:
- Trabajar en ramas separadas para cada objetivo.
- Evitar hacer muchos cambios en un solo commit (no siempre es malo, pero cambios no relacionados deberian ir separados)
- Empezar los mensajes de commit con `[ADD]`, `[DEL]`, `[FIX]`, `[IMP]`, `[DOC]`.
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
