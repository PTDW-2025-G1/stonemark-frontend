import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { AccountService } from './account.service';
import { UserDto } from '@api/model/user-dto';
import { ProfileUpdateRequestDto } from '@api/model/profile-update-request-dto';
import { PasswordChangeRequestDto } from '@api/model/password-change-request-dto';
import { PasswordSetRequestDto } from '@api/model/password-set-request-dto';
import { AccountSecurityStatusDto } from '@api/model/account-security-status-dto';
import { MessageResponseDto } from '@api/model/message-response-dto';
import { environment } from '@env/environment';

describe('AccountService', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let service: AccountService;
  const baseUrl = `${environment.apiUrl}/account`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    service = new AccountService(httpMock as any);
  });

  it('should get current user profile', async () => {
    const mockUser: UserDto = {
      id: 1,
      firstName: 'João',
      lastName: 'Silva',
      username: 'joaosilva',
      role: 'USER',
      createdAt: '2024-01-01T10:00:00Z',
      accountLocked: false,
      enabled: true,
      photoId: 42,
      tfaMethod: 'NONE',
    };

    (httpMock.get as any).mockReturnValue(of(mockUser));

    const result = await firstValueFrom(service.getCurrentUser());

    expect(result).toEqual(mockUser);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/profile`);
  });

  it('should get security status and update hasPasswordSubject', async () => {
    const mockStatus: AccountSecurityStatusDto = { hasPassword: true };

    (httpMock.get as any).mockReturnValue(of(mockStatus));

    const result = await firstValueFrom(service.getSecurityStatus());

    expect(result).toEqual(mockStatus);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/security/status`);
    expect(service.getHasPassword()).toBe(true);
  });

  it('should update user profile', async () => {
    const payload: ProfileUpdateRequestDto = {
      firstName: 'João',
      lastName: 'Santos',
    };
    const mockResponse: MessageResponseDto = { message: 'Profile updated' };

    (httpMock.put as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.updateProfile(payload));

    expect(result).toEqual(mockResponse);
    expect(httpMock.put).toHaveBeenCalledWith(`${baseUrl}/profile`, payload);
  });

  it('should set password and update hasPasswordSubject', async () => {
    const payload: PasswordSetRequestDto = { newPassword: 'newPassword123' };
    const mockResponse: MessageResponseDto = { message: 'Password set' };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.setPassword(payload));

    expect(result).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/set-password`, payload);
    expect(service.getHasPassword()).toBe(true);
  });

  it('should change password', async () => {
    const oldPassword = 'oldPassword123';
    const newPassword = 'newPassword456';
    const expectedPayload: PasswordChangeRequestDto = { oldPassword, newPassword };
    const mockResponse: MessageResponseDto = { message: 'Password changed' };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.changePassword(oldPassword, newPassword));

    expect(result).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/change-password`, expectedPayload);
  });

  it('should upload photo', async () => {
    const file = new File([''], 'photo.jpg');
    const mockUser: UserDto = { id: 1, photoId: 100 } as UserDto;

    (httpMock.post as any).mockReturnValue(of(mockUser));

    const result = await firstValueFrom(service.uploadPhoto(file));

    expect(result).toEqual(mockUser);
    expect(httpMock.post).toHaveBeenCalled();
    const [url, body] = httpMock.post.mock.calls[0];
    expect(url).toBe(`${baseUrl}/photo`);
    expect(body).toBeInstanceOf(FormData);
    expect(body.get('file')).toBe(file);
  });

  it('should delete account', async () => {
    const mockResponse: MessageResponseDto = { message: 'Account deleted' };

    (httpMock.delete as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.deleteAccount());

    expect(result).toEqual(mockResponse);
    expect(httpMock.delete).toHaveBeenCalledWith(`${baseUrl}`);
  });
});
