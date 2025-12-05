import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { ProfileService } from './profile.service';
import { UserDto } from '@api/model/user-dto';
import { ProfileUpdateRequestDto } from '@api/model/profile-update-request-dto';
import { EmailChangeRequestDto } from '@api/model/email-change-request-dto';
import { PasswordChangeRequestDto } from '@api/model/password-change-request-dto';
import { TelephoneChangeRequestDto } from '@api/model/telephone-change-request-dto';
import { CodeConfirmationRequestDto } from '@api/model/code-confirmation-request-dto';
import { ConfirmationResponseDto } from '@api/model/confirmation-response-dto';
import { environment } from '@env/environment';

describe('ProfileService', () => {
  let httpMock: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
  };

  let service: ProfileService;
  const baseUrl = `${environment.apiUrl}/account`;
  const authUrl = `${environment.apiUrl}/auth`;

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

  it('should request telephone change', async () => {
    const newTelephone = '+351923456789';
    const payload: TelephoneChangeRequestDto = { newTelephone };
    const mockResponse = { message: 'Telephone change requested' };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.requestTelephoneChange(payload));

    expect(result).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/request-telephone-change`, payload);
  });

  it('should confirm code successfully with SUCCESS status', async () => {
    const code = 'ABC123';
    const payload: CodeConfirmationRequestDto = { code };
    const mockResponse: ConfirmationResponseDto = {
      status: ConfirmationResponseDto.StatusEnum.Success,
      message: 'Code verified successfully',
      token: 'jwt-token-here'
    };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.confirmCode(payload));

    expect(result).toEqual(mockResponse);
    expect(result.status).toBe(ConfirmationResponseDto.StatusEnum.Success);
    expect(httpMock.post).toHaveBeenCalledWith(`${authUrl}/confirm-code`, payload);
  });

  it('should confirm code with alphanumeric code', async () => {
    const code = 'XYZ789';
    const payload: CodeConfirmationRequestDto = { code };
    const mockResponse: ConfirmationResponseDto = {
      status: ConfirmationResponseDto.StatusEnum.Success,
      message: 'Code verified successfully'
    };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.confirmCode(payload));

    expect(result).toEqual(mockResponse);
    expect(result.status).toBe(ConfirmationResponseDto.StatusEnum.Success);
    expect(httpMock.post).toHaveBeenCalledWith(`${authUrl}/confirm-code`, payload);
  });

  it('should handle ERROR status in confirmCode', async () => {
    const code = 'INVALID';
    const payload: CodeConfirmationRequestDto = { code };
    const mockResponse: ConfirmationResponseDto = {
      status: ConfirmationResponseDto.StatusEnum.Error,
      message: 'Invalid or expired code'
    };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.confirmCode(payload));

    expect(result).toEqual(mockResponse);
    expect(result.status).toBe(ConfirmationResponseDto.StatusEnum.Error);
  });

  it('should handle PASSWORD_RESET_REQUIRED status in confirmCode', async () => {
    const code = 'RESET123';
    const payload: CodeConfirmationRequestDto = { code };
    const mockResponse: ConfirmationResponseDto = {
      status: ConfirmationResponseDto.StatusEnum.PasswordResetRequired,
      message: 'Password reset is required',
      token: 'temp-token'
    };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.confirmCode(payload));

    expect(result).toEqual(mockResponse);
    expect(result.status).toBe(ConfirmationResponseDto.StatusEnum.PasswordResetRequired);
  });
});
