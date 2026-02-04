import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '@api/model/user-dto';
import { Page } from '@api/model/page';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
  private readonly baseUrl = `${environment.apiUrl}/admin/users`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 20, sort?: string): Observable<Page> {
    let params: any = { page: page.toString(), size: size.toString() };

    if (sort) {
      params.sort = sort;
    }

    return this.http.get<Page>(this.baseUrl, { params });
  }

  getById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
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
