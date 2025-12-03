import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { ProfileService } from './profile.service';
import { UserDto } from '@api/model/user-dto';
import { ProfileUpdateRequestDto } from '@api/model/profile-update-request-dto';
import { EmailChangeRequestDto } from '@api/model/email-change-request-dto';
import { PasswordChangeRequestDto } from '@api/model/password-change-request-dto';
import { TelephoneChangeRequestDto } from '@api/model/telephone-change-request-dto';
import { TelephoneCodeVerificationDto } from '@api/model/telephone-code-verification-dto';
import { environment } from '@env/environment';

describe('ProfileService (unit, without Angular TestBed)', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
  };

  let service: ProfileService;
  const baseUrl = `${environment.apiUrl}/account`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
    };

    service = new ProfileService(httpMock as any);
  });

  it('should get current user profile', async () => {
    const mockUser: UserDto = {
      id: 1,
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao@example.com',
      telephone: '+351912345678',
      role: 'USER',
      createdAt: '2024-01-01T10:00:00Z',
      accountLocked: false,
      enabled: true,
    };

    (httpMock.get as any).mockReturnValue(of(mockUser));

    const result = await firstValueFrom(service.getCurrentUser());

    expect(result).toEqual(mockUser);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/profile`);
  });

  it('should update user profile', async () => {
    const payload: ProfileUpdateRequestDto = {
      firstName: 'João',
      lastName: 'Santos',
    };

    (httpMock.put as any).mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.updateProfile(payload));

    expect(result).toBeUndefined();
    expect(httpMock.put).toHaveBeenCalledWith(`${baseUrl}/profile`, payload);
  });

  it('should request email change', async () => {
    const newEmail = 'newemail@example.com';
    const expectedPayload: EmailChangeRequestDto = { newEmail };

    (httpMock.post as any).mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.changeEmail(newEmail));

    expect(result).toBeUndefined();
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/request-email-change`, expectedPayload);
  });

  it('should change password', async () => {
    const oldPassword = 'oldPassword123';
    const newPassword = 'newPassword456';
    const expectedPayload: PasswordChangeRequestDto = { oldPassword, newPassword };

    (httpMock.post as any).mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.changePassword(oldPassword, newPassword));

    expect(result).toBeUndefined();
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/change-password`, expectedPayload);
  });

  it('should request telephone change (legacy)', async () => {
    const newPhone = '+351923456789';
    const mockResponse = { message: 'Phone change requested' };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.changeTelephone(newPhone));

    expect(result).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/request-phone-change`, { newPhone });
  });

  it('should request telephone change', async () => {
    const newTelephone = '+351923456789';
    const payload: TelephoneChangeRequestDto = { newTelephone };
    const mockResponse = { message: 'Telephone change requested' };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.requestTelephoneChange(payload));

    expect(result).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/request-telephone-change`, payload);
  });

  it('should verify telephone change', async () => {
    const newTelephone = '+351923456789';
    const code = '123456';
    const payload: TelephoneCodeVerificationDto = { newTelephone, code };
    const mockResponse = { message: 'Telephone verified successfully' };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.verifyTelephoneChange(payload));

    expect(result).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/verify-telephone-change`, payload);
  });
});
