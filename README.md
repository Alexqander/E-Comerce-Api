# E-Comerce-Api
Owner: alexander machado ambrocio

Api en node JS para el proyecto de ecomerce Fast Shop

## 🔧 Instalacion

Antes de comenzar a trabajar el proyecto necesitara comenzar con la instalacion de los modulos y paquetes con lo que estara trabajando la aplicacion

```
npm install
```

## 🛠️ Configuracion

Despues necesitaras configurar tus variables de entorno creando un nuevo archivo **.env**

el contenido del archivo **.env** viene estructurado en el archivo **.env.example** en la raiz del proyecto

```ebnf
DATABASE_URL=
jwtSecret="",
JWT_EXPIRE_IN="",
STRIPE_PUBLIC_KEY=
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET="",
PORT=3000,
NODE_ENV="development",
GOOGLE_CLIENT_ID=
```

### 🐬 Docker compose

Despues en la misma raiz del proyecto encontraras un archivo **docker-compose.yml el cual contiene las configuraciones para levantar un contenedor que contiene una imaged de PostgresSql , esta base de datos es necesario por que es con la cual nos estaremos comunicando desde nuestro backend.**

```yaml
version: '3.1'

services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_DB: [nombre de la base de datos]
      POSTGRES_USER: [usario]
      POSTGRES_PASSWORD: [contraseña del usuario]
    ports:
      - "5432:5432"
    volumes:
      - [ruta de tu computadora]:/var/lib/postgresql/data
```

Ya que hallas modificado con tus datos y especificado la ruta del volumen de tu contenedor , procede a ejecutar el siguiente comando en una consola en la raiz del proyecto.

```
docker compose up -d
```

En caso de que algo llegue a salir mal o tu contenedor este mal configurado puedes revertir y eliminar ese contenedor con el siguiente comando

```
docker compose down
```

## 🦜 Migraciones

Despues de que tu base de datos este correctamente inicializada en docker , es necerio que se ejecuten las migraciones para que la base de datos contenga los modelos de la aplicacion , ahora te muestro las configuraciones que debes de tener en cuenta para que la base de datos se conecte de manera correcta con neustro cliente de prisma

### ⚙️ .env

Dentro del punto env recuerda tener bien configurada tu variables de entorno para la base de datos , ya que de ahi prisma client , tomara la url para concectarse a la base de datos , las estrucutra de tu variables de entorno debe de ser la siguiente

```ebnf
DATABASE_URL="postgresql://[usuario]:[contraseña]@localhost:5432/ecomerceejemplo?schema=public"
```

Despues ejecuta la migracion con el siguiente comando

```
npx prisma migrate dev
```

Si la migracion ocurrio con exito ahora y no ocurrio ningun error previo puedes comenzar a probar la api y dessarrolar mas endpoints.

## ✅ Inicar app

Para poder provar que toda funciona correctamente procede a ejecutar el siguente comando

```
npm run dev
```


