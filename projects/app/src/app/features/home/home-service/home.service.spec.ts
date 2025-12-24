import { describe, it, beforeEach, beforeAll, expect, vi } from 'vitest';
import { of, throwError, firstValueFrom } from 'rxjs';

import { HomeService, NewsItem } from './home.service';
import { HttpClient } from '@angular/common/http';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('HomeService (unit, without Angular TestBed)', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
  };

  let service: HomeService;

  const rssUrl = 'https://rss.app/feeds/v1.1/WOt7WpisaYQyWxKA.json';

  beforeEach(() => {
    httpMock = {
      get: vi.fn()
    };

    service = new HomeService(httpMock as any as HttpClient);
  });

  it('should return list of news when response contains items array', async () => {
    const mockResponse = {
      items: [
        { id: '1', title: 'News 1' },
        { id: '2', title: 'News 2' }
      ]
    };

    httpMock.get.mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.getLatestNews());

    expect(result.length).toBe(2);
    expect(result[0].title).toBe('News 1');
    expect(httpMock.get).toHaveBeenCalledWith(rssUrl);
  });

  it('should wrap single news object into array', async () => {
    const mockResponse: NewsItem = {
      id: '99',
      title: 'Single News',
      url: 'https://example.com'
    };

    httpMock.get.mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.getLatestNews());

    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Single News');
  });

  it('should return empty array when response format is invalid', async () => {
    httpMock.get.mockReturnValue(of({ foo: 'bar' }));

    const result = await firstValueFrom(service.getLatestNews());

    expect(result).toEqual([]);
  });

  it('should return empty array when http request fails', async () => {
    httpMock.get.mockReturnValue(throwError(() => new Error('Network error')));

    const result = await firstValueFrom(service.getLatestNews());

    expect(result).toEqual([]);
  });

  it('should call RSS URL correctly', async () => {
    httpMock.get.mockReturnValue(of({ items: [] }));

    await firstValueFrom(service.getLatestNews());

    expect(httpMock.get).toHaveBeenCalledWith(rssUrl);
  });
});
