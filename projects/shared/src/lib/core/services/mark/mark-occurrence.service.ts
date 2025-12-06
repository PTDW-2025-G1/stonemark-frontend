import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { PageMarkOccurrenceDto } from '@api/model/page-mark-occurrence-dto';

@Injectable({
  providedIn: 'root'
})
export class MarkOccurrenceService {

  private readonly baseUrl = `${environment.apiUrl}/mark-occurrences`;

  constructor(private http: HttpClient) {}

  /** Fetch paginated list of mark occurrences */
  getAll(page: number = 0, size: number = 20): Observable<PageMarkOccurrenceDto> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageMarkOccurrenceDto>(this.baseUrl, { params });
  }

  /** Get single occurrence by ID */
  getById(id: number): Observable<MarkOccurrenceDto> {
    return this.http.get<MarkOccurrenceDto>(`${this.baseUrl}/${id}`);
  }

  /** Get all occurrences for a specific mark */
  getByMarkId(markId: number): Observable<MarkOccurrenceDto[]> {
    return this.http.get<MarkOccurrenceDto[]>(`${this.baseUrl}/by-mark/${markId}`);
  }

  /** Create new occurrence (MODERATOR only) */
  create(dto: MarkOccurrenceDto): Observable<MarkOccurrenceDto> {
    return this.http.post<MarkOccurrenceDto>(this.baseUrl, dto);
  }

  /** Update occurrence (MODERATOR only) */
  update(id: number, dto: MarkOccurrenceDto): Observable<MarkOccurrenceDto> {
    return this.http.put<MarkOccurrenceDto>(`${this.baseUrl}/${id}`, dto);
  }

  /** Delete occurrence */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
