import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MarkDto } from '@api/model/mark-dto';
import { PageMarkDto } from '@api/model/page-mark-dto';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private readonly baseUrl = `${environment.apiUrl}/public/marks`;

  constructor(private http: HttpClient) {}

  getMarks(page: number = 0, size: number = 9): Observable<PageMarkDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkDto>(this.baseUrl, { params });
  }

  getDetailedMarks(page: number = 0, size: number = 9): Observable<PageMarkDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkDto>(`${this.baseUrl}/details`, { params });
  }

  getMark(id: number): Observable<MarkDto> {
    return this.http.get<MarkDto>(`${this.baseUrl}/${id}`);
  }

  searchByImage(file: File): Observable<string[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string[]>(`${this.baseUrl}/search/image`, formData);
  }
}
