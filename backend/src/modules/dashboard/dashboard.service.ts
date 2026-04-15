import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardResponseDto } from './dto/dashboard-response.dto';

/**
 * WeatherAPI response
 */
type WeatherApiResponse = {
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
};

/**
 * CoinGecko response
 */
type CoinGeckoResponse = {
  bitcoin: {
    usd: number;
  };
};

@Injectable()
export class DashboardService {
  async getWidget(city: string): Promise<DashboardResponseDto> {
    const [weatherResult, bitcoinResult] = await Promise.allSettled([
      this.fetchWeather(city),
      this.fetchBitcoinPrice(),
    ]);

    const temperature =
      weatherResult.status === 'fulfilled'
        ? weatherResult.value.temperature
        : null;

    const weather =
      weatherResult.status === 'fulfilled'
        ? weatherResult.value.description.toLowerCase()
        : 'not available';

    const bitcoinPriceUSD =
      bitcoinResult.status === 'fulfilled' ? bitcoinResult.value : null;

    if (weatherResult.status === 'rejected') {
      console.error('Weather API failed:', weatherResult.reason);
    }

    if (bitcoinResult.status === 'rejected') {
      console.error('Bitcoin API failed:', bitcoinResult.reason);
    }

    return {
      city,
      temperature,
      weather,
      bitcoinPriceUSD,
    };
  }

  private async fetchWeather(
    city: string,
  ): Promise<{ temperature: number; description: string }> {
    const apiKey = process.env.WEATHERAPI_API_KEY;
    const baseUrl = process.env.WEATHERAPI_BASE_URL;

    if (!apiKey || !baseUrl) {
      throw new HttpException(
        'Missing WEATHERAPI env vars',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const url = `${baseUrl}?key=${apiKey}&q=${city}`;

    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('WeatherAPI error:', errorText);

      throw new HttpException(
        `Weather API error: ${res.status}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const json = (await res.json()) as WeatherApiResponse;

    if (
      !json ||
      typeof json.current?.temp_c !== 'number' ||
      !json.current?.condition?.text
    ) {
      throw new HttpException(
        'Unexpected weather API response',
        HttpStatus.BAD_GATEWAY,
      );
    }

    return {
      temperature: json.current.temp_c,
      description: json.current.condition.text,
    };
  }

  private async fetchBitcoinPrice(): Promise<number> {
    const url = process.env.COINGECKO_BASE_URL;

    if (!url) {
      throw new HttpException(
        'Missing COINGECKO_BASE_URL env var',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new HttpException(
        `Bitcoin API error: ${res.status}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const json = (await res.json()) as CoinGeckoResponse;

    if (!json || typeof json.bitcoin?.usd !== 'number') {
      throw new HttpException(
        'Unexpected bitcoin API response',
        HttpStatus.BAD_GATEWAY,
      );
    }

    return json.bitcoin.usd;
  }
}
