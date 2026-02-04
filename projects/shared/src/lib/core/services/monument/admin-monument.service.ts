import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MonumentDto } from '@api/model/monument-dto';
import { MonumentRequestDto } from '@api/model/monument-request-dto';
import { PageMonumentDto } from '@api/model/page-monument-dto';

@Injectable({ providedIn: 'root' })
export class AdminMonumentService {
  private baseUrl = `${environment.apiUrl}/admin/monuments`;

  constructor(private http: HttpClient) {}

  getMonumentsManagement(page: number = 0, size: number = 10, active: boolean = true): Observable<PageMonumentDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('active', active.toString());

    return this.http.get<PageMonumentDto>(this.baseUrl, { params });
  }

  createMonument(monument: MonumentRequestDto, file?: File): Observable<MonumentDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(monument)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<MonumentDto>(this.baseUrl, formData);
  }

  updateMonument(id: number, monument: MonumentRequestDto, file?: File): Observable<MonumentDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(monument)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<MonumentDto>(`${this.baseUrl}/${id}`, formData);
  }

  deleteMonument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadPhoto(id: number, file: File): Observable<MonumentDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MonumentDto>(`${this.baseUrl}/${id}/photo`, formData);
  }
}
