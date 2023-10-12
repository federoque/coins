# Coins

Aplicación backend con la siguiente funcionalidad: en el metaverso aparecen coleccionables representados en forma de una moneda en 3D, la persona se acerca y obtiene la moneda y su recompensa.
Una vez que una persona agarra la moneda, ya desaparece y nadie más la puede obtener, por lo menos la moneda que estaba en esa posición.

# Para correrla localmente

## BACKEND

Clonar el Repositorio en un directorio local.

- Crear archivo .env de variables de entorno con la siguiente variable:

```
PORT=TU_PUERTO

```

Luego en la consola ejecutar:

docker-compose up -d

para crear las imagenes de docker y correr los contenedores en segundo plano.

La app quedará espuesta en el puerto 3000 del localhost y podra ser accedida mediante Postman (u otra aplicación)
