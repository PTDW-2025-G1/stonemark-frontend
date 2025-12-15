import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { UserDto } from "@api/model/user-dto"
import { EmailChangeRequestDto } from "@api/model/email-change-request-dto"
import { PasswordChangeRequestDto } from "@api/model/password-change-request-dto"
import { ProfileUpdateRequestDto } from "@api/model/profile-update-request-dto"
import { TelephoneChangeRequestDto } from "@api/model/telephone-change-request-dto"
import {ConfirmationResponseDto} from '@api/model/confirmation-response-dto';
import {CodeConfirmationRequestDto} from '@api/model/code-confirmation-request-dto';
import {PasswordSetRequestDto} from '@api/model/password-set-request-dto';


@Injectable({ providedIn: 'root' })
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/account`;
  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/profile`);
  }

  getSecurityStatus(): Observable<{ hasPassword: boolean }> {
    return this.http.get<{ hasPassword: boolean }>(
      `${this.baseUrl}/security/status`
    );
  }

  updateProfile(profile: ProfileUpdateRequestDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/profile`, profile);
  }

  setPassword(password: PasswordSetRequestDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/set-password`, password);
  }

  changeEmail(newEmail: string): Observable<void> {
    const payload: EmailChangeRequestDto = { newEmail };
    return this.http.post<void>(`${this.baseUrl}/request-email-change`, payload);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    const payload: PasswordChangeRequestDto = {oldPassword, newPassword};
    return this.http.post<void>(`${this.baseUrl}/change-password`, payload);
  }

  requestTelephoneChange(request: TelephoneChangeRequestDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/request-telephone-change`, request);
  }

  confirmCode(request: CodeConfirmationRequestDto): Observable<ConfirmationResponseDto> {
    return this.http.post(`${this.authUrl}/confirm-code`, request);
  }

}
