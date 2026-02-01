import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { UserContactService } from './user-contact.service';
import { UserContactDto } from '@api/model/user-contact-dto';
import { environment } from '@env/environment';

describe('UserContactService', () => {
  let service: UserContactService;
  let httpMock: any;

  const userId = 10;
  const baseUrl = `${environment.apiUrl}/admin/users/${userId}/contacts`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    service = new UserContactService(httpMock as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user contacts', async () => {
    const mockContacts: UserContactDto[] = [
      {
        id: 1,
        type: UserContactDto.TypeEnum.Email,
        value: 'user@example.com',
        primary: true,
        verified: true
      }
    ];

    httpMock.get.mockReturnValue(of(mockContacts));

    const result = await firstValueFrom(service.getContacts(userId));

    expect(result).toEqual(mockContacts);
    expect(httpMock.get).toHaveBeenCalledWith(baseUrl);
  });

  it('should add a new contact', async () => {
    const contact: UserContactDto = {
      type: UserContactDto.TypeEnum.Telephone,
      value: '+351912345678',
      primary: false,
      verified: false
    };

    const returnedContact: UserContactDto = {
      ...contact,
      id: 2
    };

    httpMock.post.mockReturnValue(of(returnedContact));

    const result = await firstValueFrom(
      service.addContact(userId, contact)
    );

    expect(result).toEqual(returnedContact);
    expect(httpMock.post).toHaveBeenCalledWith(baseUrl, contact);
  });

  it('should update an existing contact', async () => {
    const contactId = 5;

    const updatedContact: UserContactDto = {
      id: contactId,
      type: UserContactDto.TypeEnum.Email,
      value: 'new@email.com',
      primary: true,
      verified: true
    };

    httpMock.put.mockReturnValue(of(updatedContact));

    const result = await firstValueFrom(
      service.updateContact(userId, contactId, updatedContact)
    );

    expect(result).toEqual(updatedContact);
    expect(httpMock.put).toHaveBeenCalledWith(
      `${baseUrl}/${contactId}`,
      updatedContact
    );
  });

  it('should delete a contact', async () => {
    const contactId = 7;

    httpMock.delete.mockReturnValue(of(undefined));

    const result = await firstValueFrom(
      service.deleteContact(userId, contactId)
    );

    expect(result).toBeUndefined();
    expect(httpMock.delete).toHaveBeenCalledWith(
      `${baseUrl}/${contactId}`
    );
  });
});
