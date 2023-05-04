# Payana Proyecto

Es un proyecto hecho con las siguientes tecnologias y herramientas.

- [Nest](https://github.com/nestjs/nest) (se requiere tener instalado Node)
- Typescript
- Postgres
- prettier + eslint
- swagger

Para la construcción del proyecto se siguió las practicas de Nestjs.

Para poder ejecutar correctamente el proyecto se debe crear el archivo .env y deben configurar las variables de entorno correspondientes. Al repositorio se subió unos ejemplos de variables

## Installation

```bash
$ npm install
```

## Correr el microservicio Login

```bash
# development
$ npm run start:login

# watch mode
$ npm run start:dev:login

# production mode
$ npm run start:prod:login
```

## Levantar el proyecto con docker

Correr los dos siguientes comandos

```bash
$ docker-compose build
```

```bash
$ docker-compose up
```


## Documentacion API (swagger)

Se agregó documentación al proyecto.

La url para ingresar a la documentación es. Por ejemplo http://localhost:3018/swagger

## Consideraciones

LLeve a cabo la realización del challenge con nest debido a la robustez y a la agilidad que tiene esta tecnología para abarcar buenas prácticas.

Es recomendable que no se suba los archivos .env en los repositorios pero en esta ocasión está subido para que tengan la facilidad de desplegar la aplicación


