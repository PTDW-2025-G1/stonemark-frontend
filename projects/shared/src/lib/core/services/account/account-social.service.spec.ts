import { describe, it, beforeEach, expect, vi } from 'vitest';
import { AccountSocialService } from './account-social.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AccountSocialService', () => {
  let service: AccountSocialService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    };
    service = new AccountSocialService(httpMock as HttpClient);
  });

  it('should get linked providers', () => {
    httpMock.get.mockReturnValue(of([]));
    service.getLinkedProviders().subscribe(result => {
      expect(result).toEqual([]);
    });
    expect(httpMock.get).toHaveBeenCalledWith(expect.stringContaining('/providers'));
  });

  it('should link Google account', () => {
    httpMock.post.mockReturnValue(of({ message: 'linked' }));
    service.linkGoogle('token123').subscribe(result => {
      expect(result).toEqual({ message: 'linked' });
    });
    expect(httpMock.post).toHaveBeenCalledWith(expect.stringContaining('/google'), { token: 'token123' });
  });

  it('should unlink Google account', () => {
    httpMock.delete.mockReturnValue(of({ message: 'unlinked' }));
    service.unlinkGoogle().subscribe(result => {
      expect(result).toEqual({ message: 'unlinked' });
    });
    expect(httpMock.delete).toHaveBeenCalledWith(expect.stringContaining('/google'));
  });
});
