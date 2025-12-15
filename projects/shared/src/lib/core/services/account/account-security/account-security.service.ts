import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { TfaSetupResponseDto } from '@api/model/tfa-setup-response-dto';
import { TfaVerificationRequestDto } from '@api/model/tfa-verification-request-dto';
import { SetTfaMethodRequestDto } from '@api/model/set-tfa-method-request-dto';
import { MessageResponseDto } from '@api/model/message-response-dto';

@Injectable({ providedIn: 'root' })
export class AccountSecurityService {
  private baseUrl = `${environment.apiUrl}/auth/tfa`;

  constructor(private http: HttpClient) {}

  setupTotp(): Observable<TfaSetupResponseDto> {
    return this.http.post<TfaSetupResponseDto>(
      `${this.baseUrl}/setup/totp`,
      {}
    );
  }

  enableTotp(code: string): Observable<MessageResponseDto> {
    const payload: TfaVerificationRequestDto = { code };
    return this.http.post<MessageResponseDto>(
      `${this.baseUrl}/enable/totp`,
      payload
    );
  }

  getTfaStatus(): Observable<{ enabled: boolean; method: 'TOTP' | 'EMAIL' | 'SMS' | 'NONE' }> {
    return this.http.get<{ enabled: boolean; method: 'TOTP' | 'EMAIL' | 'SMS' | 'NONE' }>(
      `${this.baseUrl}/status`
    );
  }

  disableTfa(code: string): Observable<MessageResponseDto> {
    const payload: TfaVerificationRequestDto = { code };
    return this.http.post<MessageResponseDto>(
      `${this.baseUrl}/disable`,
      payload
    );
  }

  setTfaMethod(method: 'TOTP' | 'SMS' | 'EMAIL'): Observable<MessageResponseDto> {
    const payload: SetTfaMethodRequestDto = { tfaMethod: method };
    return this.http.post<MessageResponseDto>(
      `${this.baseUrl}/method`,
      payload
    );
  }

  requestContactCode(): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(
      `${this.baseUrl}/contact/request-code`,
      {}
    );
  }

  verifyContactCode(code: string): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(
      `${this.baseUrl}/contact/verify-code`,
      { code }
    );
  }
}
