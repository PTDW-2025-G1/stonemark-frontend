import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { UserManagementService } from './user-management.service';
import { environment } from '@env/environment';

describe('UserManagementService (unit)', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let service: UserManagementService;
  const baseUrl = `${environment.apiUrl}/users`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    service = new UserManagementService(httpMock as any);
  });

  it('should fetch paginated users', async () => {
    const mockPage = {
      content: [{ id: 1, firstName: 'John' }],
      totalElements: 1,
      totalPages: 1,
      page: 0
    };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.getAll(0, 20));

    expect(result).toEqual(mockPage);
    expect(httpMock.get).toHaveBeenCalledWith(baseUrl, {
      params: { page: '0', size: '20' }
    });
  });

  it('should fetch a user by id', async () => {
    const mockUser = { id: 1, firstName: 'John Doe' };

    (httpMock.get as any).mockReturnValue(of(mockUser));

    const result = await firstValueFrom(service.getById(1));

    expect(result).toEqual(mockUser);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/1`);
  });

  it('should update a user', async () => {
    const dto = { firstName: 'Ana' };
    const updated = { id: 1, firstName: 'Ana' };

    (httpMock.patch as any).mockReturnValue(of(updated));

    const result = await firstValueFrom(service.update(1, dto));

    expect(result).toEqual(updated);
    expect(httpMock.patch).toHaveBeenCalledWith(`${baseUrl}/1`, dto);
  });

  it('should update the user role', async () => {
    const updated = { id: 1, role: 'ADMIN' };

    (httpMock.patch as any).mockReturnValue(of(updated));

    const result = await firstValueFrom(service.updateRole(1, 'ADMIN'));

    expect(result).toEqual(updated);

    const [url, body, options] = (httpMock.patch as any).mock.calls[0];

    expect(url).toBe(`${baseUrl}/1/role`);
    expect(body).toBeNull();
    expect(options.params.role).toBe('ADMIN');
  });

  it('should delete a user by id', async () => {
    (httpMock.delete as any).mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.deleteById(5));

    expect(result).toBeUndefined();
    expect(httpMock.delete).toHaveBeenCalledWith(`${baseUrl}/5`);
  });
});
