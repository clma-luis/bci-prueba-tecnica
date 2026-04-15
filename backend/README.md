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
