# 🚲 Bici Baires API

Una API que provee información de estaciones de bicicletas públicas en la ciudad de Buenos Aires, conectándose con la **API de Transporte del Gobierno de la Ciudad**.

## 📦 Tecnologías y dependencias principales

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [module-alias](https://www.npmjs.com/package/module-alias)
- [PapaParse](https://www.papaparse.com/) (para exportar CSV)

## 🔑 API externa requerida

Para poder consumir los datos oficiales de estaciones de Ecobici, se necesita acceder a la **API de Transporte de Buenos Aires**.

### 📍 URL informativa:
[https://api-transporte.buenosaires.gob.ar/](https://api-transporte.buenosaires.gob.ar/)

### 🔐 Requisitos:
- Crear una cuenta y generar tus claves desde el sitio.
- Obtener un `CLIENT_ID` y `CLIENT_SECRET`.

## ⚙️ Configuración

Creá un archivo `.env` en la raíz del proyecto con este contenido:

```env
API_URL=https://apitransporte.buenosaires.gob.ar
STATIONS_INFO_PATH=/ecobici/gbfs/stationInformation
CLIENT_ID=tu_client_id
CLIENT_SECRET=tu_client_secret

MONGO_URI=mongodb://localhost:27017/stations
PORT=3000
Podés usar tu propia URI de MongoDB (por ejemplo, una conexión a MongoDB Atlas).
```

## 🛠️ Instalación
Cloná el repositorio y luego instalá las dependencias:

```bash
git clone https://github.com/tu-usuario/bici-baires.git
cd bici-baires
npm install
```
## 🚀 Scripts disponibles
```bash
npm run dev	# Levanta el servidor en modo desarrollo con recarga en caliente.
npm run build # Compila TypeScript a JavaScript en la carpeta dist/.
npm start # Corre el servidor compilado (dist/index.js). Ejecutar build antes.
```

## 🐳 Levantar con Docker
También podés levantar todo el entorno usando Docker.

### Construir la imagen
```bash
docker build -t bici-baires-api .
```
### Ejecutar el contenedor
```bash
docker run -p 3000:3000 --env-file .env bici-baires-api
```

## 🧪 Endpoints disponibles
Todos los endpoints están bajo la ruta base /api:

POST /api/external-data: Consume los datos de la API de transporte y los guarda en MongoDB.

GET /api/data: Devuelve todas las estaciones almacenadas.

GET /api/export-csv: Devuelve un archivo CSV con los datos de las estaciones.

## 📝 Notas adicionales
- Se utilizan imports absolutos con @ gracias a module-alias.
- El objeto rental_uri es convertido a string para poder exportarlo correctamente como CSV.
- En desarrollo, se ejecuta con ts-node-dev; en producción, se compila con npm run build.

## 👤 Autor
Martin Negro Ruffino