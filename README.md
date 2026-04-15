# BCI Prueba Técnica

Este proyecto implementa un dashboard financiero que combina información del clima y el precio de Bitcoin mediante una arquitectura basada en **Backend-for-Frontend (BFF)** y **Micro Frontends (MFE)** usando **single-spa**.

---

# Tecnologías utilizadas

## Backend (BFF)
- Node.js + NestJS
- API Clima (OpenWeather / WeatherAPI)
- API Bitcoin (CoinGecko)

## Frontend
- React (Vite)
- single-spa (microfrontends)
- import maps (ESM)

## Infraestructura
- Docker + Docker Compose

---

# Arquitectura
Browser
↓
root-config (single-spa)
↓
dashboard-mf (React)
↓
backend (BFF)
↓
[API Clima + API Bitcoin]


---

# Requisitos

- Docker
- Docker Compose

---

# Cómo ejecutar el proyecto

## 1. Clonar repositorio

```bash
git clone https://github.com/clma-luis/bci-prueba-tecnica.git
cd bci-prueba-tecnica
```

## 2. Levantar el proyecto

docker-compose up --build

## 🌐 Acceder a la aplicación

| Servicio                     | URL                      |
|----------------------------|--------------------------|
| Frontend (root-config)     | http://localhost:9000    |
| Microfrontend (directo)    | http://localhost:5173    |
| Backend (API)              | http://localhost:3000    |

---

## PROMPTS FRONTEND

Para esta oportunidad he usado dos prompts el cual mediante analisis e iteraciones convesacional con chatgpt con el fin de poder alcanzar objetivos en poco tiempo. Luego de obtener
el prompt se lo comparto a gemini porque considero que gemini a nivel front es muy bueno, siempre da respuestas llegando al objetivo. Luego de eso ya entra mi trabajo de ordenar y 
cambiar la logica que sea necesaria para que quede escalable y poder reutilizar el codigo que sea necesario acorde a las necesidad y el contexto

```text
Prompt1
Quiero que generes un microfrontend en React para single-spa llamado dashboard-mf.

Contexto:
- Este microfrontend forma parte de una prueba técnica.
- Debe consumir un endpoint BFF:
  GET /api/dashboard-widget?city=Lima
- La respuesta del backend tiene esta forma:
{
  "city": "Lima",
  "temperature": 25,
  "weather": "sunny",
  "bitcoinPriceUSD": 70000
}

Objetivo:
Necesito un dashboard en React con una apariencia moderna, minimalista, elegante y profesional, inspirado visualmente en la interfaz de ChatGPT:
- sidebar oscura a la izquierda
- área principal limpia
- tarjetas con bordes suaves
- tipografía clara
- tonos oscuros tipo charcoal / zinc / negro suave
- detalles sutiles en verde o acento moderno
- diseño sobrio, no recargado
- debe sentirse premium, como una app moderna SaaS

Requisitos técnicos:
- Usar React funcional con hooks
- No usar Tailwind
- Los estilos deben estar en un archivo CSS separado
- Debe ser responsive para desktop, tablet y mobile
- Debe tener loading, error y success state
- El código debe ser claro, limpio y listo para integrar en un proyecto real
- No usar librerías pesadas de UI
- Puede usar solo React y CSS
- Si usas iconos, que sea opcional y simple

Arquitectura esperada:
Quiero que me entregues estos archivos:
1. DashboardWidget.tsx
2. DashboardWidget.css

Comportamiento:
- Al montar el componente, debe llamar al endpoint del BFF
- Por ahora usa esta URL de ejemplo:
  http://localhost:3000/api/dashboard-widget?city=Lima
- Debe mostrar:
  - nombre de la ciudad
  - temperatura en °C
  - descripción del clima
  - precio actual de Bitcoin en USD
- Debe incluir una tarjeta principal con esos datos
- También quiero una pequeña sección de estado o resumen, por ejemplo:
  - ciudad consultada
  - última actualización
  - estado del servicio
- Si falla el endpoint, mostrar una tarjeta de error elegante
- Si está cargando, mostrar skeleton o placeholders simples en CSS
- Agrega un botón “Actualizar” para volver a consultar el endpoint manualmente

Diseño visual:
Quiero que el diseño esté inspirado en una interfaz como ChatGPT:
- fondo oscuro general
- sidebar izquierda fija o adaptable
- sidebar con título del producto y algunos ítems mock
- área principal centrada
- una card principal para el widget financiero
- spacing amplio
- bordes redondeados
- sombras suaves
- hover sutil
- mobile first
- en mobile la sidebar puede ocultarse o pasar arriba

Importante:
- No quiero una copia exacta de ChatGPT, solo una inspiración visual profesional
- Quiero HTML semántico
- Quiero nombres de clases CSS claros y ordenados
- Quiero que el CSS esté bien organizado por secciones
- Quiero que el componente sea fácil de conectar luego con single-spa

Además:
- Agrega tipos TypeScript para la respuesta del endpoint
- Usa useEffect y useState
- Implementa una función fetchDashboardData reutilizable
- Evita código innecesario
- No uses datos mock en el render final, salvo para sidebar estática

Por favor entrégame el código completo de ambos archivos:
- DashboardWidget.tsx
- DashboardWidget.css
```

```text
prompt 2 

Corrige este componente React + TypeScript para que quede alineado con mi backend real.

IMPORTANTE:
Mi backend devuelve esta estructura:
{
  "city": "Lima",
  "temperature": number | null,
  "weather": string,
  "bitcoinPriceUSD": number | null
}

Y actualmente mi endpoint real puede ser:
GET /dashboard/widget?city=Lima

Quiero que actualices el componente y el CSS con estas reglas:

1. Ajusta el tipo DashboardData para permitir null en:
- temperature
- bitcoinPriceUSD

2. En el render:
- si bitcoinPriceUSD es null, mostrar "N/D"
- si temperature es null, mostrar "N/D"
- si weather viene vacío o inválido, mostrar "Not available"

3. Mantén:
- loading
- error
- success
- botón actualizar
- diseño oscuro moderno tipo ChatGPT / SaaS
- CSS separado
- responsive

4. No cambies la estética general, solo mejora robustez y compatibilidad.

5. Usa la URL:
http://localhost:3000/dashboard/widget?city=Lima

6. Quiero que entregues nuevamente completos:
- DashboardWidget.tsx
- DashboardWidget.css

7. El código debe quedar limpio, listo para integrar en un microfrontend single-spa con React.

8. No uses Tailwind ni librerías extra.

Devuélveme el código completo corregido.
```


---

## PROMPTS FRONTEND

Para el backnd en nest utilizando la misma tecnica de investigacion previa obtengo este prompt mediante iteración el cual no me toma mucho tiempo. Me sirve de 
partida, por supuesto todos los proyectos los creo mediante la documentación y luego  usamos la IA, en este caso copilot CLI y codex aunque también claude es excelente.

```text
You are a senior NestJS developer.

Now I want you to generate a clean and minimal implementation for a Backend-for-Frontend (BFF).

Requirements:

* Create a module called "dashboard"
* It must include:

  * Controller
  * Service
  * DTOs

Endpoint:
GET /api/dashboard-widget?city=Lima

Behavior:

* The service should:

  * Call a Weather API (OpenWeather)
  * Call a Bitcoin API (CoinGecko)
  * Use native fetch (no axios)
  * Use Promise.all for parallel requests
* Transform the response into:
  {
  city: string;
  temperature: number;
  weather: string;
  bitcoinPriceUSD: number;
  }

Constraints:

* Keep the code simple and readable
* Do NOT overengineer (no extra modules like weather/crypto)
* Include basic error handling (HttpException)
* Use DTOs for query validation
* No caching, no retries, no advanced patterns

Output:

* Full module structure
* Controller code
* Service code
* DTOs
```