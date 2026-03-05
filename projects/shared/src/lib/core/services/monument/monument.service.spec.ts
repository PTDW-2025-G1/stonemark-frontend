import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { MonumentService } from './monument.service';
import { MonumentDto } from '@api/model/monument-dto';
import { PageMonumentListDto } from '@api/model/page-monument-list-dto';
import { MonumentListDto } from '@api/model/monument-list-dto';
import { MonumentMapDto } from '@api/model/monument-map-dto';
import { PageMonumentMapDto } from '@api/model/page-monument-map-dto';
import { environment } from '@env/environment';

describe('MonumentService', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };

  let service: MonumentService;
  const baseUrl = `${environment.apiUrl}/public/monuments`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
    };

    service = new MonumentService(httpMock as any);
  });

  it('should fetch paginated monuments', async () => {
    const mockPage: PageMonumentListDto = {
      content: [{ id: 1, name: 'Torre de Belém' }],
      totalElements: 1,
      totalPages: 1,
    };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.getMonuments(0, 9));

    expect(result).toEqual(mockPage);
    expect(httpMock.get).toHaveBeenCalled();

    const [url, options] = (httpMock.get as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}`);
    expect(options.params.get('page')).toBe('0');
    expect(options.params.get('size')).toBe('9');
  });

  it('should fetch all monuments for map', async () => {
    const mockMonuments: MonumentMapDto[] = [{ id: 1, latitude: 10, longitude: 20 }];
    const mockPage: PageMonumentMapDto = { content: mockMonuments };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.getAllForMap());

    expect(result).toEqual(mockMonuments);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/map?size=100`);
  });

  it('should search monuments', async () => {
    const mockPage: PageMonumentListDto = {
      content: [{ id: 1, name: 'Torre de Belém' }],
    };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.searchMonuments('Torre', 0, 9, 'name,asc'));

    expect(result).toEqual(mockPage);
    expect(httpMock.get).toHaveBeenCalled();

    const [url, options] = (httpMock.get as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}/search`);
    expect(options.params.get('query')).toBe('Torre');
    expect(options.params.get('page')).toBe('0');
    expect(options.params.get('size')).toBe('9');
    expect(options.params.get('sort')).toBe('name,asc');
  });

  it('should find monuments by polygon', async () => {
    const mockPage: PageMonumentListDto = {
      content: [{ id: 1, name: 'Torre de Belém' }],
    };
    const geoJson = '{"type":"Polygon",...}';

    (httpMock.post as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.findByPolygon(geoJson, 0, 9));

    expect(result).toEqual(mockPage);
    expect(httpMock.post).toHaveBeenCalled();
    const [url, body, options] = (httpMock.post as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}/search/polygon`);
    expect(body).toBe(geoJson);
    expect(options.params.get('page')).toBe('0');
    expect(options.params.get('size')).toBe('9');
  });

  it('should filter monuments by division', async () => {
    const mockPage: PageMonumentListDto = {
      content: [{ id: 1, name: 'Torre de Belém' }],
    };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.filterByDivision(123, 0, 9));

    expect(result).toEqual(mockPage);
    expect(httpMock.get).toHaveBeenCalled();
    const [url, options] = (httpMock.get as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}/division/123`);
    expect(options.params.get('page')).toBe('0');
    expect(options.params.get('size')).toBe('9');
  });

  it('should fetch popular monuments', async () => {
    const mockMonuments: MonumentListDto[] = [{ id: 1, name: 'Torre de Belém' }];

    (httpMock.get as any).mockReturnValue(of(mockMonuments));

    const result = await firstValueFrom(service.getPopularMonuments(6));

    expect(result).toEqual(mockMonuments);
    expect(httpMock.get).toHaveBeenCalled();
    const [url, options] = (httpMock.get as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}/popular`);
    expect(options.params.get('limit')).toBe('6');
  });

  it('should fetch latest monuments', async () => {
    const mockMonuments: MonumentListDto[] = [
      { id: 1, name: 'Torre de Belém' },
      { id: 2, name: 'Mosteiro dos Jerónimos' },
    ];

    (httpMock.get as any).mockReturnValue(of(mockMonuments));

    const result = await firstValueFrom(service.getLatestMonuments());

    expect(result).toEqual(mockMonuments);
    expect(httpMock.get).toHaveBeenCalled();
    const [url, options] = (httpMock.get as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}/latest`);
    expect(options.params.get('limit')).toBe('6');
  });

  it('should count monuments', async () => {
    (httpMock.get as any).mockReturnValue(of(100));

    const result = await firstValueFrom(service.countMonuments());

    expect(result).toBe(100);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/count`);
  });

  it('should fetch a monument by ID', async () => {
    const mockMonument: MonumentDto = {
      id: 1,
      name: 'Torre de Belém',
      description: 'Torre histórica',
      protectionTitle: 'Monumento Nacional',
      createdAt: '2024-01-01T10:00:00Z',
    };

    (httpMock.get as any).mockReturnValue(of(mockMonument));

    const result = await firstValueFrom(service.getMonumentById(1));

    expect(result).toEqual(mockMonument);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/1`);
  });
});
