import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { PageMarkOccurrenceDto } from '@api/model/page-mark-occurrence-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminMarkOccurrenceService {
  private readonly baseUrl = `${environment.apiUrl}/admin/mark-occurrences`;

  constructor(private http: HttpClient) {}

  getMarkOccurrencesManagement(page: number = 0, size: number = 10): Observable<PageMarkOccurrenceDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkOccurrenceDto>(this.baseUrl, { params });
  }

  createMarkOccurrence(dto: MarkOccurrenceRequestDto, file?: File): Observable<MarkOccurrenceDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<MarkOccurrenceDto>(this.baseUrl, formData);
  }

  updateMarkOccurrence(id: number, dto: MarkOccurrenceRequestDto, file?: File): Observable<MarkOccurrenceDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<MarkOccurrenceDto>(`${this.baseUrl}/${id}`, formData);
  }

  deleteMarkOccurrence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadPhoto(id: number, file: File): Observable<MarkOccurrenceDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MarkOccurrenceDto>(`${this.baseUrl}/${id}/photo`, formData);
  }
}
