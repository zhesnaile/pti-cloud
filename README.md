# PTI Cloud Comunitario

## Entorno
El proyecto esta creado con [node-16](https://nodejs.org/en/).
Hace falta instalar las dependencias del proyecto para correrlo; basta con ejecutar:
```
npm install
```

Instalar la versión 16 de node en Ubuntu o Debian.
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -&&sudo apt-get install -y nodejs
```
El proyecto está dividido en dos partes.

## Backend
En este se encuentra la logica de nuestro servidor web
Se puede acceder al backend por [aquí](/backend)

## Frontend
Ofrece una interfaz web para acceder a los servicios proporcionados por nuestro servidor web.
Se puede acceder al frontend por [aquí](/frontend)

## Git
Recomendaciones:
- Trabajar en ramas separadas para cada objetivo.
- Evitar hacer muchos cambios en un solo commit (no siempre es malo, pero cambios no relacionados deberian ir separados)
- Empezar los mensajes de commit con `[ADD]`, `[DEL]`, `[FIX]`, `[IMP]`, `[DOC]`.
