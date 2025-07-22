# Bicis BA - Visualización de estaciones de bicicletas públicas en CABA

Este proyecto obtiene y visualiza en tiempo real la información de las estaciones de bicicletas públicas de la Ciudad de Buenos Aires, incluyendo su estado actual (bicicletas y docks disponibles).

---

## Repositorio y despliegues

- **Repositorio:** [github.com/martinnegro/prueba-tecnica-searchmas](https://github.com/martinnegro/prueba-tecnica-searchmas/)
- **API:** [https://bicis-api.martindev.ar](https://bicis-api.martindev.ar)
- **Frontend:** [https://bicis.martindev.ar](https://bicis.martindev.ar)

> **Nota:** La API puede demorar unos segundos en responder la primera vez por cold start del servidor.

---

## Descripción del proyecto

El sistema está compuesto por tres partes principales:

1. **API REST (Node.js + Express + MongoDB):**
   - `/api/external-data`: obtiene la información pública de las estaciones y la guarda en MongoDB.
   - `/api/data`: devuelve la información actual desde la base de datos.
   - `/api/export-csv`: exporta los datos de las estaciones en un archivo CSV.

2. **Frontend (Next.js):**
   - Visualiza todas las estaciones en un mapa interactivo.
   - Muestra la cantidad de bicicletas y docks disponibles en tiempo real.
   - Desde `/admin` se puede exportar:
     - Un CSV con las estaciones actuales.
     - Un CSV con el historial de estados en un rango de fechas.

3. **Worker (cronjob):**
   - Ejecuta cada 15 minutos un job que guarda el estado de las estaciones en MongoDB.
   - Implementado con `node-cron` y desplegable vía Docker.

---

## Endpoints extra utilizados por el frontend

- `/api/data/stations-status`: obtiene y redirige el estado en tiempo real de todas las estaciones al cliente.
- `/api/export-csv/statuses`: genera un CSV con el historial de estados entre dos fechas.

---

## Docker

Tanto la API como el worker tienen su propio `Dockerfile` para facilitar el despliegue y la orquestación.

---

## Estructura del repositorio (Monorepo)

```bash
.
├── /app               # API (Node.js + Express)
├── /worker            # Worker con cronjob (Node.js)
└── /bicis-frontend    # Frontend (Next.js + React Leaflet)
```
## Frontend en acción
El mapa muestra la ubicación y disponibilidad de cada estación. Accedé a la app aquí:

➡️ https://bicis.martindev.ar

## Acceso a administración
Desde /admin podés:

Descargar un CSV con los datos actuales.

Descargar un CSV con el historial de estados en un rango de fechas.