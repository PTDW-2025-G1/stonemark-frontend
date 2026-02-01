import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MarkDto } from '@api/model/mark-dto';
import { PageMarkDto } from '@api/model/page-mark-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminMarkService {
  private readonly baseUrl = `${environment.apiUrl}/admin/marks`;

  constructor(private http: HttpClient) {}

  getMarksManagement(page: number = 0, size: number = 9): Observable<PageMarkDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkDto>(this.baseUrl, { params });
  }

  createMark(dto: MarkDto, file?: File): Observable<MarkDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<MarkDto>(this.baseUrl, formData);
  }

  updateMark(id: number, dto: MarkDto, file?: File): Observable<MarkDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<MarkDto>(`${this.baseUrl}/${id}`, formData);
  }

  deleteMark(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadPhoto(id: number, file: File): Observable<MarkDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MarkDto>(`${this.baseUrl}/${id}/photo`, formData);
  }
}
