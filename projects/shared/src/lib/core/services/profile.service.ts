import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { UserDto } from "@api/model/user-dto"
import { EmailChangeRequestDto } from "@api/model/email-change-request-dto"
import { PasswordChangeRequestDto } from "@api/model/password-change-request-dto"
import { ProfileUpdateRequestDto } from "@api/model/profile-update-request-dto"

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/profile`);
  }

  updateProfile(profile: ProfileUpdateRequestDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/profile`, profile);
  }

  changeEmail(newEmail: string): Observable<void> {
    const payload: EmailChangeRequestDto = { newEmail };
    return this.http.post<void>(`${this.baseUrl}/request-email-change`, payload);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    const payload: PasswordChangeRequestDto = {oldPassword, newPassword};
    return this.http.post<void>(`${this.baseUrl}/change-password`, payload);
  }

  changeTelephone(newPhone: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/request-phone-change`, {newPhone});
  }

}
