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

  getAll(page: number = 0, size: number = 20): Observable<PageMarkOccurrenceDto> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageMarkOccurrenceDto>(this.baseUrl, { params });
  }

  getById(id: number): Observable<MarkOccurrenceDto> {
    return this.http.get<MarkOccurrenceDto>(`${this.baseUrl}/${id}`);
  }

  getByMarkId(markId: number, page: number = 0, size: number = 6): Observable<PageMarkOccurrenceDto> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<PageMarkOccurrenceDto>(`${this.baseUrl}/by-mark/${markId}`, { params });
  }

  getByMonumentId(monumentId: number, page: number = 0, size: number = 20): Observable<PageMarkOccurrenceDto> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<PageMarkOccurrenceDto>(`${this.baseUrl}/by-monument/${monumentId}`, { params });
  }

  filterByMarkAndMonument(markId: number, monumentId: number, page: number = 0, size: number = 6): Observable<PageMarkOccurrenceDto> {
    const params = new HttpParams()
      .set('markId', markId)
      .set('monumentId', monumentId)
      .set('page', page)
      .set('size', size);
    return this.http.get<PageMarkOccurrenceDto>(`${this.baseUrl}/filter-by-mark-and-monument`, { params });
  }

  getLatestOccurrences(): Observable<MarkOccurrenceDto[]> {
    return this.http.get<MarkOccurrenceDto[]>(`${this.baseUrl}/latest`);
  }

  countByMarkId(markId: number | undefined): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-by-mark/${markId}`);
  }

  countByMonumentId(monumentId: number | undefined): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-by-monument/${monumentId}`);
  }

  create(dto: MarkOccurrenceDto): Observable<MarkOccurrenceDto> {
    return this.http.post<MarkOccurrenceDto>(this.baseUrl, dto);
  }

  update(id: number, dto: MarkOccurrenceDto): Observable<MarkOccurrenceDto> {
    return this.http.put<MarkOccurrenceDto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAvailableMarksByMonument(monumentId: number): Observable<any[]> {
    const params = new HttpParams().set('monumentId', monumentId);
    return this.http.get<any[]>(`${this.baseUrl}/filters/marks-by-monument`, { params });
  }

  getAvailableMonumentsByMark(markId: number): Observable<any[]> {
    const params = new HttpParams().set('markId', markId);
    return this.http.get<any[]>(`${this.baseUrl}/filters/monuments-by-mark`, { params });
  }
}
