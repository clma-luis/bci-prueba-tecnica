# 🧠 bci-backend (BFF)

Backend-for-Frontend (BFF) encargado de centralizar y transformar datos provenientes de APIs externas (clima y Bitcoin) para ser consumidos por el frontend.

---

# 🚀 Tecnologías utilizadas

- Node.js
- NestJS
- Axios / HttpModule
- TypeScript
- Docker

---

# 🧠 Descripción

Este servicio implementa un patrón **BFF (Backend-for-Frontend)** que:

- Consume APIs externas:
  - 🌤 Clima (OpenWeather / WeatherAPI)
  - ₿ Precio de Bitcoin (CoinGecko / CoinDesk)
- Combina ambas respuestas
- Devuelve un JSON simplificado para el frontend

---

# 🎯 Endpoint principal

```bash
GET /api/dashboard/widget?city=Lima
```

---

# Ejemplo de respuesta

{
  "city": "Lima",
  "temperature": 22,
  "weather": "Cloudy",
  "bitcoinPriceUSD": 65000
}

---

# Rol en la arquitectura

Frontend (dashboard-mf)
        ↓
Backend (BFF - NestJS)
        ↓
[API Clima + API Bitcoin]

---

# Requisitos
Node.js 18+ (recomendado 20)
npm

## 🔌 Variables de entorno

Crear un archivo `.env` en la raíz del backend con las siguientes variables:

```env
PORT=3000

# API Bitcoin (CoinGecko)
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3

# API Clima (OpenWeatherMap)
OPENWEATHERMAP_BASE_URL=https://api.openweathermap.org/data/2.5
OPENWEATHERMAP_API_KEY=your_api_key_here