/// <reference types="jest" />

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    service = new DashboardService();

    global.fetch = jest.fn();

    process.env.WEATHERAPI_API_KEY = 'test-key';
    process.env.WEATHERAPI_BASE_URL = 'http://fake-url';
    process.env.COINGECKO_BASE_URL = 'http://fake-url';

    jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.clearAllMocks();
  });

  it('should return combined widget data when both APIs succeed', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            current: {
              temp_c: 25,
              condition: { text: 'Sunny' },
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            bitcoin: { usd: 70000 },
          }),
      });

    const result = await service.getWidget('Lima');

    expect(result).toEqual({
      city: 'Lima',
      temperature: 25,
      weather: 'sunny',
      bitcoinPriceUSD: 70000,
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should handle weather API failure gracefully', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Weather error'),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            bitcoin: { usd: 70000 },
          }),
      });

    const result = await service.getWidget('Lima');

    expect(result).toEqual({
      city: 'Lima',
      temperature: null,
      weather: 'not available',
      bitcoinPriceUSD: 70000,
    });
  });

  it('should handle bitcoin API failure gracefully', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            current: {
              temp_c: 20,
              condition: { text: 'Cloudy' },
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Bitcoin error'),
      });

    const result = await service.getWidget('Lima');

    expect(result).toEqual({
      city: 'Lima',
      temperature: 20,
      weather: 'cloudy',
      bitcoinPriceUSD: null,
    });
  });

  it('should return fallback when both APIs fail', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Weather error'),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Bitcoin error'),
      });

    const result = await service.getWidget('Lima');

    expect(result).toEqual({
      city: 'Lima',
      temperature: null,
      weather: 'not available',
      bitcoinPriceUSD: null,
    });
  });
});
