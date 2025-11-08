import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
