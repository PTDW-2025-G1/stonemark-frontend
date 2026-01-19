import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { MonumentService } from './monument.service';
import { MonumentRequestDto } from '@api/model/monument-request-dto';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { PageMonumentDto } from '@api/model/page-monument-dto';
import { PageMonumentResponseDto } from '@api/model/page-monument-response-dto';
import { HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

describe('MonumentService', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let service: MonumentService;
  const baseUrl = `${environment.apiUrl}/monuments`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    service = new MonumentService(httpMock as any);
  });

  it('should create a new monument', async () => {
    const payload: MonumentRequestDto = {
      name: 'Torre de Belém',
      latitude: 38.6916,
      longitude: -9.2160,
      description: 'Torre histórica',
      street: 'Av. Brasília',
    };

    const mockCreated: MonumentResponseDto = {
      id: 1,
      name: 'Torre de Belém',
      latitude: 38.6916,
      longitude: -9.2160,
      description: 'Torre histórica',
      street: 'Av. Brasília',
      createdAt: '2024-01-01T10:00:00Z',
    };

    (httpMock.post as any).mockReturnValue(of(mockCreated));

    const result = await firstValueFrom(service.createMonument(payload));

    expect(result).toEqual(mockCreated);
    expect(httpMock.post).toHaveBeenCalled();
    const [url, body] = (httpMock.post as any).mock.calls[0];
    expect(url).toBe(baseUrl);
    expect(body).toBeInstanceOf(FormData);
  });

  it('should update a monument', async () => {
    const payload: MonumentRequestDto = {
      name: 'Torre de Belém Atualizada',
      latitude: 38.6916,
      longitude: -9.2160,
      description: 'Torre histórica atualizada',
    };

    const mockUpdated: MonumentResponseDto = {
      id: 1,
      name: 'Torre de Belém Atualizada',
      description: 'Torre histórica atualizada',
      lastModifiedAt: '2024-01-02T10:00:00Z',
    };

    (httpMock.put as any).mockReturnValue(of(mockUpdated));

    const result = await firstValueFrom(service.updateMonument(1, payload));

    expect(result).toEqual(mockUpdated);
    expect(httpMock.put).toHaveBeenCalled();
    const [url, body] = (httpMock.put as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}/1`);
    expect(body).toBeInstanceOf(FormData);
  });

  it('should delete a monument', async () => {
    (httpMock.delete as any).mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.deleteMonument(1));

    expect(result).toBeUndefined();
    expect(httpMock.delete).toHaveBeenCalledWith(`${baseUrl}/1`);
  });

  it('should upload a photo', async () => {
    const mockUpdated: MonumentResponseDto = {
      id: 1,
      name: 'Torre de Belém',
      description: 'Torre histórica',
    };
    const file = new File([''], 'photo.jpg');

    (httpMock.post as any).mockReturnValue(of(mockUpdated));

    const result = await firstValueFrom(service.uploadPhoto(1, file));

    expect(result).toEqual(mockUpdated);
    expect(httpMock.post).toHaveBeenCalled();
    const [url, body] = (httpMock.post as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}/1/photo`);
    expect(body).toBeInstanceOf(FormData);
  });

  it('should fetch all monuments', async () => {
    const mockMonuments: MonumentResponseDto[] = [
      { id: 1, name: 'Torre de Belém', protectionTitle: 'Monumento Nacional' },
      { id: 2, name: 'Mosteiro dos Jerónimos', protectionTitle: 'Monumento Nacional' },
    ];

    const mockPage: PageMonumentResponseDto = {
      content: mockMonuments,
      totalElements: 2,
      totalPages: 1,
    };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.getDetailedMonuments(0, 10));

    expect(result).toEqual(mockPage);
    expect(httpMock.get).toHaveBeenCalledWith(
      `${baseUrl}/details`,
      expect.objectContaining({
        params: expect.any(HttpParams)
      })
    );
  });

  it('should fetch paginated monuments', async () => {
    const mockPage: PageMonumentDto = {
      content: [{ id: 1, name: 'Torre de Belém', protectionTitle: 'Monumento Nacional' }],
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

  it('should search monuments', async () => {
    const mockPage: PageMonumentDto = {
      content: [{ id: 1, name: 'Torre de Belém', protectionTitle: 'Monumento Nacional' }],
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

  it('should filter monuments by city', async () => {
    const mockPage: PageMonumentDto = {
      content: [{ id: 1, name: 'Torre de Belém', protectionTitle: 'Monumento Nacional' }],
    };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.filterByCity('Lisboa', 0, 9, 'name,asc'));

    expect(result).toEqual(mockPage);
    expect(httpMock.get).toHaveBeenCalled();

    const [url, options] = (httpMock.get as any).mock.calls[0];
    expect(url).toBe(`${baseUrl}/filter`);
    expect(options.params.get('city')).toBe('Lisboa');
  });

  it('should fetch latest monuments', async () => {
    const mockMonuments: MonumentResponseDto[] = [
      { id: 1, name: 'Torre de Belém', protectionTitle: 'Monumento Nacional' },
      { id: 2, name: 'Mosteiro dos Jerónimos', protectionTitle: 'Monumento Nacional' },
    ];

    (httpMock.get as any).mockReturnValue(of(mockMonuments));

    const result = await firstValueFrom(service.getLatestMonuments());

    expect(result).toEqual(mockMonuments);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/latest`);
  });

  it('should fetch a monument by ID', async () => {
    const mockMonument: MonumentResponseDto = {
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

  it('should import monuments from Overpass', async () => {
    const geoJson = '{"type":"FeatureCollection","features":[]}';
    const mockMonuments: MonumentResponseDto[] = [
      { id: 1, name: 'Imported Monument', protectionTitle: 'Monumento Importado' },
    ];

    (httpMock.post as any).mockReturnValue(of(mockMonuments));

    const result = await firstValueFrom(service.importMonumentsFromGeoJson(geoJson));

    expect(result).toEqual(mockMonuments);
    expect(httpMock.post).toHaveBeenCalledWith(
      `${environment.apiUrl}/import/monuments/overpass`,
      geoJson,
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    );
  });
});
