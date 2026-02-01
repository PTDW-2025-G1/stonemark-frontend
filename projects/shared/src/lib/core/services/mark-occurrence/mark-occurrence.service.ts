import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { PageMarkOccurrenceDto } from '@api/model/page-mark-occurrence-dto';
import { PageMarkOccurrenceListDto } from '@api/model/page-mark-occurrence-list-dto';
import { MarkOccurrenceMapDto } from '@api/model/mark-occurrence-map-dto';
import { MarkOccurrenceListDto } from '@api/model/mark-occurrence-list-dto';
import { MarkDto } from '@api/model/mark-dto';
import { MonumentListDto } from '@api/model/monument-list-dto';

@Injectable({
  providedIn: 'root'
})
export class MarkOccurrenceService {
  private readonly baseUrl = `${environment.apiUrl}/public/mark-occurrences`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 9): Observable<PageMarkOccurrenceDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkOccurrenceDto>(this.baseUrl, { params });
  }

  getById(id: number): Observable<MarkOccurrenceDto> {
    return this.http.get<MarkOccurrenceDto>(`${this.baseUrl}/${id}`);
  }

  getByMarkId(markId: number, page: number = 0, size: number = 6, sort: string = 'publishedAt,desc'): Observable<PageMarkOccurrenceListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PageMarkOccurrenceListDto>(`${this.baseUrl}/by-mark/${markId}`, { params });
  }

  getByMarkIdForMap(markId: number): Observable<MarkOccurrenceMapDto[]> {
    return this.http.get<MarkOccurrenceMapDto[]>(`${this.baseUrl}/map/by-mark/${markId}`);
  }

  getLatest(limit: number = 6): Observable<MarkOccurrenceListDto[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<MarkOccurrenceListDto[]>(`${this.baseUrl}/latest`, { params });
  }

  countByMonumentId(monumentId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-by-monument/${monumentId}`);
  }

  countByMarkId(markId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-by-mark/${markId}`);
  }

  countMonumentsByMarkId(markId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-monuments-by-mark/${markId}`);
  }

  getByMonumentId(monumentId: number, page: number = 0, size: number = 6, sort: string = 'publishedAt,desc'): Observable<PageMarkOccurrenceListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PageMarkOccurrenceListDto>(`${this.baseUrl}/by-monument/${monumentId}`, { params });
  }

  getAvailableMarksByMonument(monumentId: number): Observable<MarkDto[]> {
    const params = new HttpParams().set('monumentId', monumentId.toString());
    return this.http.get<MarkDto[]>(`${this.baseUrl}/filters/marks-by-monument`, { params });
  }

  getAvailableMonumentsByMark(markId: number): Observable<MonumentListDto[]> {
    const params = new HttpParams().set('markId', markId.toString());
    return this.http.get<MonumentListDto[]>(`${this.baseUrl}/filters/monuments-by-mark`, { params });
  }

  filterByMarkAndMonument(markId: number, monumentId: number, page: number = 0, size: number = 6, sort: string = 'createdAt,desc'): Observable<PageMarkOccurrenceListDto> {
    const params = new HttpParams()
      .set('markId', markId.toString())
      .set('monumentId', monumentId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PageMarkOccurrenceListDto>(`${this.baseUrl}/filter-by-mark-and-monument`, { params });
  }

  searchByImage(file: File): Observable<string[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string[]>(`${this.baseUrl}/search/image`, formData);
  }
}
