import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, firstValueFrom, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthenticationRequestDto } from '@api/model/authentication-request-dto';
import { AuthenticationResponseDto } from '@api/model/authentication-response-dto';
import { RegisterRequestDto } from '@api/model/register-request-dto';
import { PasswordResetRequestDto } from '@api/model/password-reset-request-dto';
import { ResetPasswordRequestDto } from '@api/model/reset-password-request-dto';
import { VerificationRequestDto } from '@api/model/verification-request-dto';
import { ConfirmationResponseDto } from '@api/model/confirmation-response-dto';
import { RefreshTokenRequestDto } from '@api/model/refresh-token-request-dto';
import { environment } from '@env/environment';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

beforeAll(() => {
  vi.stubGlobal('location', { replace: vi.fn() });
});


describe('AuthService', () => {
  let httpMock: any;
  let cookieMock: any;
  let service: AuthService;
  const baseUrl = `${environment.apiUrl}/auth`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    cookieMock = {
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
    };

    service = new AuthService(httpMock as any, cookieMock as any);
  });

  it('should login successfully', async () => {
    const payload: AuthenticationRequestDto = {
      username: 'user1',
      password: 'password123',
    };

    const mockResponse: AuthenticationResponseDto = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      role: 'USER',
    };

    const httpResponse = new HttpResponse({
      body: mockResponse,
      status: 200,
    });

    (httpMock.post as any).mockReturnValue(of(httpResponse));

    const result = await firstValueFrom(service.login(payload));

    expect(result.body).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/authenticate`, payload, { observe: 'response' });
  });

  it('should register successfully', async () => {
    const payload: RegisterRequestDto = {
      username: 'newuser',
      password: 'password123',
      firstName: 'Gustavo',
      lastName: 'Giãozinho'
    };

    const mockResponse: AuthenticationResponseDto = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      role: 'USER',
    };

    const httpResponse = new HttpResponse({
      body: mockResponse,
      status: 200,
    });

    (httpMock.post as any).mockReturnValue(of(httpResponse));

    const result = await firstValueFrom(service.register(payload));

    expect(result.body).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/register`, payload, { observe: 'response' });
    // Não espera mais cookieMock.set aqui
  });

  it('should logout successfully with token', async () => {
    (cookieMock.get as any).mockReturnValue('access-token');
    (httpMock.post as any).mockReturnValue(of({}));

    const result = await firstValueFrom(service.logout());

    expect(result).toBeDefined();
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/logout`, {}, {
      headers: { Authorization: 'Bearer access-token' }
    });
    expect(cookieMock.delete).toHaveBeenCalledWith('accessToken');
    expect(cookieMock.delete).toHaveBeenCalledWith('refreshToken');
    expect(cookieMock.delete).toHaveBeenCalledWith('role');
  });

  it('should logout locally when no token exists', async () => {
    (cookieMock.get as any).mockReturnValue(null);

    const result = await firstValueFrom(service.logout());

    expect(result.message).toBe('Logged out locally.');
    expect(httpMock.post).not.toHaveBeenCalled();
    expect(cookieMock.delete).toHaveBeenCalledWith('accessToken');
  });

  it('should handle logout error and force local logout', async () => {
    (cookieMock.get as any).mockReturnValue('access-token');
    const error = new HttpErrorResponse({ status: 401 });
    (httpMock.post as any).mockReturnValue(throwError(() => error));

    const result = await firstValueFrom(service.logout());

    expect(result.message).toBe('Forced local logout.');
    expect(cookieMock.delete).toHaveBeenCalledWith('accessToken');
  });

  it('should request password reset', async () => {
    const email = 'user@example.com';
    const payload: PasswordResetRequestDto = { contactValue: email };

    (httpMock.post as any).mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.requestPasswordReset(email));

    expect(result).toBeUndefined();
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/password-reset/request`, payload);
  });

  it('should reset password', async () => {
    const token = 'reset-token';
    const newPassword = 'newPassword123';
    const payload: ResetPasswordRequestDto = { token, newPassword };

    (httpMock.post as any).mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.resetPassword(token, newPassword));

    expect(result).toBeUndefined();
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/password-reset/reset`, payload);
  });

  it('should confirm code', async () => {
    const code = '123456';
    const payload: VerificationRequestDto = { code };
    const mockResponse: ConfirmationResponseDto = {
      status: ConfirmationResponseDto.StatusEnum.Success,
      message: 'Code confirmed',
    };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.confirmCode(code));

    expect(result).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/account-verification/confirm`, payload);
  });

  it('should refresh token', async () => {
    const token = 'old-refresh-token';
    const payload: RefreshTokenRequestDto = { refreshToken: token };
    const mockResponse: AuthenticationResponseDto = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    };

    (httpMock.post as any).mockReturnValue(of(mockResponse));

    const result = await firstValueFrom(service.refreshToken(token));

    expect(result).toEqual(mockResponse);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/refresh`, payload);
    expect(cookieMock.set).toHaveBeenCalledWith('accessToken', 'new-access-token', 1);
    expect(cookieMock.set).toHaveBeenCalledWith('refreshToken', 'new-refresh-token', 7);
  });

  it('should get access token from cookies', () => {
    (cookieMock.get as any).mockReturnValue('access-token');

    const token = service.getAccessToken();

    expect(token).toBe('access-token');
    expect(cookieMock.get).toHaveBeenCalledWith('accessToken');
  });

  it('should get refresh token from cookies', () => {
    (cookieMock.get as any).mockReturnValue('refresh');

    const token = service.getRefreshToken();

    expect(token).toBe('refresh');
    expect(cookieMock.get).toHaveBeenCalledWith('refreshToken');
  });

  it('should get role from cookies', () => {
    (cookieMock.get as any).mockReturnValue('ADMIN');

    const role = service.getRole();

    expect(role).toBe('ADMIN');
    expect(cookieMock.get).toHaveBeenCalledWith('role');
  });

  it('should remove tokens', () => {
    service.removeTokens();

    expect(cookieMock.delete).toHaveBeenCalledWith('accessToken');
    expect(cookieMock.delete).toHaveBeenCalledWith('refreshToken');
    expect(cookieMock.delete).toHaveBeenCalledWith('role');
  });

  it('should save tokens', () => {
    service.saveTokens('access-token', 'refresh', 'USER');

    expect(cookieMock.set).toHaveBeenCalledWith('accessToken', 'access-token', 1);
    expect(cookieMock.set).toHaveBeenCalledWith('refreshToken', 'refresh', 7);
    expect(cookieMock.set).toHaveBeenCalledWith('role', 'USER', 7);
  });
});
