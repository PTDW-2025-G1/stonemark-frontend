import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '@api/model/user-dto';
import { PageUserDto } from '@api/model/page-user-dto';
import {UserPublicDto} from '@api/model/user-public-dto';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 20, sort?: string): Observable<PageUserDto> {
    let params: any = { page: page.toString(), size: size.toString() };

    if (sort) {
      params.sort = sort;
    }

    return this.http.get<PageUserDto>(this.baseUrl, { params });
  }

  getById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  // Todo: create a dedicated service maybe
  publicGetById(id: number): Observable<UserPublicDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}/public`);
  }

  update(id: number, userDto: Partial<UserDto>): Observable<UserDto> {
    return this.http.patch<UserDto>(`${this.baseUrl}/${id}`, userDto);
  }

  updateRole(id: number, role: string): Observable<UserDto> {
    return this.http.patch<UserDto>(`${this.baseUrl}/${id}/role`, null, {
      params: { role }
    });
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
