import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MarkDto } from '@api/model/mark-dto';
import { PageMarkDto } from '@api/model/page-mark-dto';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private readonly baseUrl = `${environment.apiUrl}/marks`;

  constructor(private http: HttpClient) {}

  getMarks(): Observable<MarkDto[]> {
    return this.http.get<MarkDto[]>(this.baseUrl);
  }

  getPageMarks(page: number = 0, size: number = 10): Observable<PageMarkDto> {
    return this.http.get<PageMarkDto>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getMark(id: number): Observable<MarkDto> {
    return this.http.get<MarkDto>(`${this.baseUrl}/${id}`);
  }

  createMark(dto: MarkDto): Observable<MarkDto> {
    return this.http.post<MarkDto>(this.baseUrl, dto);
  }

  updateMark(id: number, dto: MarkDto): Observable<MarkDto> {
    return this.http.put<MarkDto>(`${this.baseUrl}/${id}`, dto);
  }

  deleteMark(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
