# BACKEND
La mayoría de la lógica que tiene que utilizar nuestra aplicación se situa en este.

## Indicaciones para desarrollar en el backend.

El punto de entrada de la web es `src/main.ts`

El proyecto está escrito en [Typescript](https://www.typescriptlang.org/).

Para compilar el proyecto correr:
```
npx tsc
```

Una vez compilado, para correr el proyecto deberia bastar con:
```
npm run start
```

Si no quereis recargar el proyecto a cada cambio podéis abrir dos terminales;
Una corriendo:
```
npx tsc -w
```
Y la otra corriendo
```
npx nodemon
```
Esto reiniciará la apliación cada vez que realizeis cambios en un archivo del directorio src/


## Estructura del proyecto
Aqui teneis la estructura bajo forma de arbol del proyecto.
```
├── README.md
├── public
├── scripts
└── src
    ├── api
    │   ├── api.ts
    │   └── endpoints
    │       ├── login.ts
    │       ├── registerNode.ts
    │       ├── registerUser.ts
    │       └── runTask.ts
    ├── main.ts
    └── utils
        ├── access-k3s.ts
        ├── access-redis.ts
        └── access-wg.ts
```


- **[`main.js`](src/main.ts)** contiene una instancia de Koa
    - Llama al método [`set_up_routes`](src/api/api.js) de **[`api/api.ts`](src/api/api.ts)**

- **[`api/api.ts`](src/api/api.ts)** configura un Router de Koa para nuestras API.
    - Para cada Router declarado en cada API, añade sus rutas a nuestro router.
    - Para cada archivo .ts en [/api/endpoint/](src/api/endpoint/) hace falta importar su router y añadirlo al array `api_routers`

- **[`api/endpoints/`](src/api/endpoints/)**:
    - Cada uno representa una API [REST](https://www.restapitutorial.com/lessons/httpmethods.html).
    - Debemos crear un router para cada endpoint.
    - Contiene los metodos utilizados por cada API. Deben incluir un parametro `ctx`.
    - Es recomendable utilizar KoaBodyParser en el router; de esta manera nuestros metodos tienen acceso los parametros directamente en `ctx.request.body`, **¡¡¡Mirad documentación de bodyparser, por defecto rechaza todo lo que no sea JSON o Forms!!!**.
    - En caso de tener que acceder a Redis, configuración de K3S o Wireguard, o cualquier tipo de lógica más compleja, es preferible declarar funciones que los gestionen en [`utils/`](src/utils/) y llamarlas desde el metodo de la API que lo requiera.

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
