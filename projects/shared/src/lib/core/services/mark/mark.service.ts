import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MarkDto } from '@api/model/mark-dto';
import { PageMarkListDto } from '@api/model/page-mark-list-dto';
import { PageMarkDetailedDto } from '@api/model/page-mark-detailed-dto';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private readonly baseUrl = `${environment.apiUrl}/public/marks`;

  constructor(private http: HttpClient) {}

  getMarks(page: number = 0, size: number = 9): Observable<PageMarkListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkListDto>(this.baseUrl, { params });
  }

  getDetailedMarks(page: number = 0, size: number = 9): Observable<PageMarkDetailedDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkDetailedDto>(`${this.baseUrl}/details`, { params });
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
