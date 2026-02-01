import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPublicDto } from '@api/model/user-public-dto';
import {UserDto} from '@api/model/user-dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/public/users`;

  constructor(private http: HttpClient) {}

  publicGetById(id: number): Observable<UserPublicDto> {
    return this.http.get<UserPublicDto>(`${this.baseUrl}/${id}`);
  }

  existsByUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/by-username`, {
      params: { username }
    });
  }
}
