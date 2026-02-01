import { describe, it, beforeEach, expect, vi } from 'vitest';
import { AccountSecurityService } from './account-security.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AccountSecurityService', () => {
  let service: AccountSecurityService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = {
      post: vi.fn(),
      get: vi.fn(),
    };
    service = new AccountSecurityService(httpMock as HttpClient);
  });

  it('should setup TOTP', () => {
    httpMock.post.mockReturnValue(of({ qrCode: 'test', secret: 'abc' }));
    service.setupTotp().subscribe(result => {
      expect(result).toEqual({ qrCode: 'test', secret: 'abc' });
    });
    expect(httpMock.post).toHaveBeenCalledWith(expect.stringContaining('/setup/totp'), {});
  });

  it('should enable TOTP', () => {
    httpMock.post.mockReturnValue(of({ message: 'enabled' }));
    service.enableTotp('123456').subscribe(result => {
      expect(result).toEqual({ message: 'enabled' });
    });
    expect(httpMock.post).toHaveBeenCalledWith(expect.stringContaining('/enable/totp'), { code: '123456' });
  });

  it('should get TFA status', () => {
    httpMock.get.mockReturnValue(of({ enabled: true, method: 'TOTP' }));
    service.getTfaStatus().subscribe(result => {
      expect(result).toEqual({ enabled: true, method: 'TOTP' });
    });
    expect(httpMock.get).toHaveBeenCalledWith(expect.stringContaining('/status'));
  });

  it('should disable TFA', () => {
    httpMock.post.mockReturnValue(of({ message: 'disabled' }));
    service.disableTfa('654321').subscribe(result => {
      expect(result).toEqual({ message: 'disabled' });
    });
    expect(httpMock.post).toHaveBeenCalledWith(expect.stringContaining('/disable'), { code: '654321' });
  });

  it('should set TFA method', () => {
    httpMock.post.mockReturnValue(of({ message: 'method set' }));
    service.setTfaMethod('SMS').subscribe(result => {
      expect(result).toEqual({ message: 'method set' });
    });
    expect(httpMock.post).toHaveBeenCalledWith(expect.stringContaining('/method'), { tfaMethod: 'SMS' });
  });

  it('should request contact code', () => {
    httpMock.post.mockReturnValue(of({ message: 'code requested' }));
    service.requestContactCode().subscribe(result => {
      expect(result).toEqual({ message: 'code requested' });
    });
    expect(httpMock.post).toHaveBeenCalledWith(expect.stringContaining('/contact/request-code'), {});
  });

  it('should verify contact code', () => {
    httpMock.post.mockReturnValue(of({ message: 'code verified' }));
    service.verifyContactCode('9999').subscribe(result => {
      expect(result).toEqual({ message: 'code verified' });
    });
    expect(httpMock.post).toHaveBeenCalledWith(expect.stringContaining('/contact/verify-code'), { code: '9999' });
  });
});
