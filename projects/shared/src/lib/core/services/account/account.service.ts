import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { UserDto } from "@api/model/user-dto"
import { EmailChangeRequestDto } from "@api/model/email-change-request-dto"
import { PasswordChangeRequestDto } from "@api/model/password-change-request-dto"
import { ProfileUpdateRequestDto } from "@api/model/profile-update-request-dto"
import { TelephoneChangeRequestDto } from "@api/model/telephone-change-request-dto"
import {ConfirmationResponseDto} from '@api/model/confirmation-response-dto';
import {CodeConfirmationRequestDto} from '@api/model/code-confirmation-request-dto';
import {PasswordSetRequestDto} from '@api/model/password-set-request-dto';
import {AccountSecurityStatusDto} from '@api/model/account-security-status-dto';
import {MessageResponseDto} from '@api/model/message-response-dto';


@Injectable({ providedIn: 'root' })
export class AccountService {
  private baseUrl = `${environment.apiUrl}/account`;
  private authUrl = `${environment.apiUrl}/auth`;

  private hasPasswordSubject = new BehaviorSubject<boolean | null>(null);
  public hasPassword$ = this.hasPasswordSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/profile`);
  }

  getSecurityStatus(): Observable<AccountSecurityStatusDto> {
    return this.http.get<AccountSecurityStatusDto>(
      `${this.baseUrl}/security/status`
    ).pipe(
      tap(status => this.hasPasswordSubject.next(status.hasPassword ?? false))
    );
  }

  getHasPassword(): boolean | null {
    return this.hasPasswordSubject.value;
  }

  updateProfile(profile: ProfileUpdateRequestDto): Observable<MessageResponseDto> {
    return this.http.put<MessageResponseDto>(`${this.baseUrl}/profile`, profile);
  }

  setPassword(password: PasswordSetRequestDto): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(`${this.baseUrl}/set-password`, password).pipe(
      tap(() => this.hasPasswordSubject.next(true))
    );
  }

  changeEmail(newEmail: string): Observable<void> {
    const payload: EmailChangeRequestDto = { newEmail };
    return this.http.post<void>(`${this.baseUrl}/request-email-change`, payload);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<MessageResponseDto> {
    const payload: PasswordChangeRequestDto = {oldPassword, newPassword};
    return this.http.post<MessageResponseDto>(`${this.baseUrl}/change-password`, payload);
  }

  requestTelephoneChange(request: TelephoneChangeRequestDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/request-telephone-change`, request);
  }

  confirmCode(request: CodeConfirmationRequestDto): Observable<ConfirmationResponseDto> {
    return this.http.post(`${this.authUrl}/confirm-code`, request);
  }

  uploadPhoto(file: File): Observable<UserDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UserDto>(`${this.baseUrl}/photo`, formData);
  }

  deleteAccount(): Observable<MessageResponseDto> {
    return this.http.delete<MessageResponseDto>(`${this.baseUrl}`);
  }

}
