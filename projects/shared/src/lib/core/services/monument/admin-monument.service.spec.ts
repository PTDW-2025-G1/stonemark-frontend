import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { AdminMonumentService } from './admin-monument.service';
import { MonumentRequestDto } from '@api/model/monument-request-dto';
import { MonumentDto } from '@api/model/monument-dto';
import { PageMonumentDto } from '@api/model/page-monument-dto';
import { environment } from '@env/environment';

describe('AdminMonumentService', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let service: AdminMonumentService;
  const baseUrl = `${environment.apiUrl}/admin/monuments`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    service = new AdminMonumentService(httpMock as any);
  });

  it('should create a new monument', async () => {
    const payload: MonumentRequestDto = {
      name: 'Torre de Belém',
      latitude: 38.6916,
      longitude: -9.2160,
      description: 'Torre histórica',
      street: 'Av. Brasília',
    };

    const mockCreated: MonumentDto = {
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

    const mockUpdated: MonumentDto = {
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
    const mockUpdated: MonumentDto = {
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

  it('should fetch monuments management', async () => {
    const mockPage: PageMonumentDto = {
      content: [{ id: 1, name: 'Torre de Belém', protectionTitle: 'Monumento Nacional' }],
      totalElements: 1,
      totalPages: 1,
    };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.getMonumentsManagement(0, 10, true));

    expect(result).toEqual(mockPage);
    expect(httpMock.get).toHaveBeenCalled();

    const [url, options] = (httpMock.get as any).mock.calls[0];
    expect(url).toBe(baseUrl);
    expect(options.params.get('page')).toBe('0');
    expect(options.params.get('size')).toBe('10');
    expect(options.params.get('active')).toBe('true');
  });
});
