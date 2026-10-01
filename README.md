# MetricsFlow | B2B Client Analytics Portal & Executive Insights

Portal de métricas de alto rendimiento y resúmenes ejecutivos automatizados diseñado para agencias, clínicas y pequeñas empresas B2B.

---

## 🚀 Inicio Rápido (Local)

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno (opcional):**
   ```bash
   cp .env.example .env
   ```

3. **Iniciar el servidor:**
   ```bash
   npm run dev
   # o en producción
   npm start
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📦 Despliegue en GitHub & Vercel

### 1. Subir a GitHub
```bash
git init
git add .
git commit -m "feat: initial commit MetricsFlow B2B Portal"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/metricsflow-saas.git
git push -u origin main
```

### 2. Despliegue en Vercel
* Importa el repositorio desde tu panel de [Vercel](https://vercel.com/new).
* Vercel detectará automáticamente la configuración de `vercel.json` y desplegará tanto la API en Node.js como el frontend estático optimizado.
* Si configuras `GEMINI_API_KEY` en las variables de entorno de Vercel, el motor de insights se conectará directamente con la API de Gemini.

---

## 🛠️ Estructura del Proyecto

```
metricsflow/
├── server.js          # Backend en Node.js/Express (API REST, análisis y fallback)
├── package.json       # Configuración y dependencias
├── vercel.json        # Configuración de despliegue serverless en Vercel
├── .env.example       # Plantilla de variables de entorno
├── .gitignore         # Exclusiones de Git
├── README.md          # Documentación del proyecto
└── public/
    └── index.html     # Frontend corporativo conectado al backend
```

---

## 📡 Endpoints de la API

* `GET /api/health` - Estado del servicio y tiempo de actividad.
* `GET /api/workspaces` - Listado de entidades/empresas activas.
* `GET /api/metrics/:workspaceId?period=30d` - Consulta de KPIs, gráficas y transacciones.
* `POST /api/insights/generate` - Generación de diagnóstico ejecutivo (vía Gemini o motor de reglas).
* `POST /api/connect-source` - Simulación y verificación de conexión a base de datos externa.
