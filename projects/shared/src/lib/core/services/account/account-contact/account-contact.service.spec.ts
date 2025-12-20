import { describe, it, beforeEach, expect, vi } from 'vitest';
import { AccountContactService } from './account-contact.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AccountContactService', () => {
  let service: AccountContactService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    service = new AccountContactService(httpMock as HttpClient);
  });

  it('should get contacts', () => {
    httpMock.get.mockReturnValue(of([]));
    service.getContacts().subscribe(result => {
      expect(result).toEqual([]);
    });
    expect(httpMock.get).toHaveBeenCalled();
  });

  it('should add contact', () => {
    const contact = { email: 'test@test.com' };
    httpMock.post.mockReturnValue(of({ message: 'ok' }));
    service.addContact(contact as any).subscribe(result => {
      expect(result).toEqual({ message: 'ok' });
    });
    expect(httpMock.post).toHaveBeenCalledWith(expect.any(String), contact);
  });

  it('should request verification', () => {
    httpMock.post.mockReturnValue(of({ message: 'requested' }));
    service.requestVerification(1).subscribe(result => {
      expect(result).toEqual({ message: 'requested' });
    });
    expect(httpMock.post).toHaveBeenCalled();
  });

  it('should confirm contact code', () => {
    httpMock.post.mockReturnValue(of({ message: 'confirmed' }));
    service.confirmContactCode('1234').subscribe(result => {
      expect(result).toEqual({ message: 'confirmed' });
    });
    expect(httpMock.post).toHaveBeenCalled();
  });

  it('should set primary contact', () => {
    httpMock.patch.mockReturnValue(of({ message: 'primary' }));
    service.setPrimary(2).subscribe(result => {
      expect(result).toEqual({ message: 'primary' });
    });
    expect(httpMock.patch).toHaveBeenCalled();
  });

  it('should delete contact', () => {
    httpMock.delete.mockReturnValue(of({ message: 'deleted' }));
    service.deleteContact(3).subscribe(result => {
      expect(result).toEqual({ message: 'deleted' });
    });
    expect(httpMock.delete).toHaveBeenCalled();
  });
});
