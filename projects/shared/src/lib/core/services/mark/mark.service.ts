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

  /** Fetch paginated list of marks */
  getMarks(): Observable<MarkDto[]> {
    return this.http.get<MarkDto[]>(this.baseUrl);
  }

  getPageMarks(page: number = 0, size: number = 10): Observable<PageMarkDto> {
    return this.http.get<PageMarkDto>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  /** Fetch a single mark by ID */
  getMark(id: number): Observable<MarkDto> {
    return this.http.get<MarkDto>(`${this.baseUrl}/${id}`);
  }

  /** Create a new mark */
  createMark(dto: MarkDto): Observable<MarkDto> {
    return this.http.post<MarkDto>(this.baseUrl, dto);
  }

  /** Update an existing mark */
  updateMark(id: number, dto: MarkDto): Observable<MarkDto> {
    return this.http.put<MarkDto>(`${this.baseUrl}/${id}`, dto);
  }

  /** Delete mark */
  deleteMark(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
