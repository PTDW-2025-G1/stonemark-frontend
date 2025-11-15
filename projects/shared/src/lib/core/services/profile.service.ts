import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  role: string;
  createdAt: string;
  accountLocked: boolean;
  enabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/user/account`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/me`);
  }

  updateProfile(profile: { firstName: string; lastName: string; telephone: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/account`, profile);
  }

  changeEmail(newEmail: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/request-email-change`, {
      newEmail
    });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, {
      oldPassword,
      newPassword
    });
  }

}
