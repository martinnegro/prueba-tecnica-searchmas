# Prueba Técnica - Node.js, Express, Docker/Serverless

## Descripción
Esta prueba técnica consiste en crear una pequeña API con Node.js, utilizando cualquier base de datos (como MongoDB, PostgreSQL, etc.) y un ORM (Sequelize, Mongoose, etc.). El objetivo es demostrar el manejo de Node.js, consumo de APIs externas, manejo de base de datos y generación de archivos CSV.

El candidato puede elegir implementar la solución utilizando Docker, Serverless o solo Express, según su preferencia.

## Requerimientos
La API debe contar con los siguientes endpoints:

1. **POST /api/external-data**:
    - Consume una API externa de libre elección.
    - Guarda los datos obtenidos en la base de datos.

2. **GET /api/data**:
    - Permite realizar una petición GET.
    - Devuelve datos almacenados en la base de datos o algo adicional (estadísticas, etc.).

3. **GET /api/export-csv**:
    - Genera un archivo CSV con los datos almacenados en la base de datos.
    - El archivo CSV debe ser descargable.

## Consideraciones
- Se permite el uso de Docker o la implementación como Serverless (AWS Lambda o similar).
- Se debe incluir un archivo `README.md` que explique:
    - Cómo ejecutar la aplicación.
    - Las dependencias del proyecto.
    - Instrucciones sobre cómo levantar el servicio (Docker/Serverless).
- Se puede utilizar cualquier base de datos y ORM.
- El examen debe tener una duración máxima de **1-2 horas**.

## Estructura sugerida del proyecto

```
/project-root
│   ├── /src
│   │   ├── /controllers
│   │   │   └── dataController.js  # Lógica de los endpoints
│   │   ├── /models
│   │   │   └── dataModel.js       # Definición del modelo de datos
│   │   ├── /routes
│   │   │   └── api.js             # Definición de rutas
│   │   └── /services
│   │       └── externalAPI.js     # Lógica para consumir la API externa
│   ├── server.js                  # Configuración del servidor Express
│   ├── README.md                  # Documentación del proyecto
│   ├── Dockerfile                 # (opcional) para el uso con Docker
│   └── serverless.yml             # (opcional) para el uso con Serverless
```

## Ejemplo de endpoints

1. **POST /api/external-data**:

 - Llama a una API externa y almacena los datos en la base de datos.

2. **GET /api/data:**

 - Devuelve datos almacenados en la base de datos.

3. **GET /api/export-csv:**

- Genera y devuelve un archivo CSV con los datos almacenados.

# Evaluación
- El uso adecuado de Docker o Serverless es valorado.
- Se evaluará la claridad y organización del código.
- La documentación en el archivo README.md es importante para la evaluación.
 - Se permite el uso de IA y herramientas como ChatGPT para asistencia.

## Duración
La prueba que no les lleve más de 1-2 horas. El objetivo es ver como usan las tecnologías. No tiene que ser perfecto. Solo funcional