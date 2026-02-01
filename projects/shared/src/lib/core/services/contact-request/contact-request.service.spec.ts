import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { ContactRequestService } from './contact-request.service';
import { ContactRequestDto } from '@api/model/contact-request-dto';
import { ContactRequest } from '@api/model/contact-request';
import { PageContactRequest } from '@api/model/page-contact-request';
import { HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

describe('ContactService', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let service: ContactRequestService;
  const baseUrl = `${environment.apiUrl}/contact-requests`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    service = new ContactRequestService(httpMock as any);
  });

  it('should fetch all contact requests', async () => {
    const mockContacts: ContactRequest[] = [
      { id: 1, name: 'John Doe', message: 'Hi', status: 'PENDING' } as any,
      { id: 2, name: 'Jane Doe', message: 'Hello', status: 'REVIEWED' } as any,
    ];

    const mockPage: PageContactRequest = {
      content: mockContacts,
      totalElements: 2,
      totalPages: 1,
    };

    (httpMock.get as any).mockReturnValue(of(mockPage));

    const result = await firstValueFrom(service.getAll(0, 10));

    expect(result).toEqual(mockPage);
    expect(httpMock.get).toHaveBeenCalledWith(
      baseUrl,
      expect.objectContaining({
        params: expect.any(HttpParams)
      })
    );
  });

  it('should fetch a contact by ID', async () => {
    const mockContact: ContactRequest = {
      id: 1,
      name: 'John Doe',
      message: 'Test message',
      status: 'PENDING',
    } as any;

    (httpMock.get as any).mockReturnValue(of(mockContact));

    const result = await firstValueFrom(service.getById(1));

    expect(result).toEqual(mockContact);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/1`);
  });

  it('should create a new contact request', async () => {
    const payload: ContactRequestDto = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Hello!',
    };

    const mockCreated: ContactRequest = {
      id: 10,
      ...payload,
      status: 'PENDING',
    } as any;

    (httpMock.post as any).mockReturnValue(of(mockCreated));

    const result = await firstValueFrom(service.create(payload));

    expect(result).toEqual(mockCreated);
    expect(httpMock.post).toHaveBeenCalledWith(baseUrl, payload);
  });

  it('should update contact status', async () => {
    const updated: ContactRequest = {
      id: 1,
      name: 'John',
      message: 'Updated message',
      status: 'RESOLVED',
    } as any;

    (httpMock.patch as any).mockReturnValue(of(updated));

    const result = await firstValueFrom(
      service.updateStatus(1, ContactRequest.StatusEnum.Resolved)
    );

    expect(result).toEqual(updated);
    expect(httpMock.patch).toHaveBeenCalled();

    const [url, body, options] = (httpMock.patch as any).mock.calls[0];

    expect(url).toBe(`${baseUrl}/1/status`);
    expect(body).toBeNull();
    expect(options).toBeDefined();
    expect(options.params?.get('status')).toBe('RESOLVED');
  });

  it('should delete a contact request', async () => {
    (httpMock.delete as any).mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.delete(5));

    expect(result).toBeUndefined();
    expect(httpMock.delete).toHaveBeenCalledWith(`${baseUrl}/5`);
  });
});
