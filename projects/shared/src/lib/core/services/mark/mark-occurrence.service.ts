import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceDetailedDto } from '@api/model/mark-occurrence-detailed-dto';
import { MarkOccurrenceListDto } from '@api/model/mark-occurrence-list-dto';
import { MarkOccurrenceMapDto } from '@api/model/mark-occurrence-map-dto';
import { PageMarkOccurrenceListDto } from '@api/model/page-mark-occurrence-list-dto';
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

  findAllManagement(page: number = 0, size: number = 20): Observable<PageMarkOccurrenceDto> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageMarkOccurrenceDto>(`${this.baseUrl}/management`, { params });
  }

  getById(id: number): Observable<MarkOccurrenceDetailedDto> {
    return this.http.get<MarkOccurrenceDetailedDto>(`${this.baseUrl}/${id}`);
  }

  getByMarkId(markId: number, page: number = 0, size: number = 6, sort: string = 'desc'): Observable<PageMarkOccurrenceListDto> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
    return this.http.get<PageMarkOccurrenceListDto>(`${this.baseUrl}/by-mark/${markId}`, { params });
  }

  getByMarkIdForMap(markId: number): Observable<MarkOccurrenceMapDto[]> {
    return this.http.get<MarkOccurrenceMapDto[]>(`${this.baseUrl}/map/by-mark/${markId}`);
  }

  getByMonumentId(monumentId: number, page: number = 0, size: number = 20, sort: string = 'desc'): Observable<PageMarkOccurrenceListDto> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
    return this.http.get<PageMarkOccurrenceListDto>(`${this.baseUrl}/by-monument/${monumentId}`, { params });
  }

  filterByMarkAndMonument(markId: number, monumentId: number, page: number = 0, size: number = 6, sort: string = 'desc'): Observable<PageMarkOccurrenceListDto> {
    const params = new HttpParams()
      .set('markId', markId)
      .set('monumentId', monumentId)
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
    return this.http.get<PageMarkOccurrenceListDto>(`${this.baseUrl}/filter-by-mark-and-monument`, { params });
  }

  getLatestOccurrences(): Observable<MarkOccurrenceListDto[]> {
    return this.http.get<MarkOccurrenceListDto[]>(`${this.baseUrl}/latest`);
  }

  countByMarkId(markId: number | undefined): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-by-mark/${markId}`);
  }

  countByMonumentId(monumentId: number | undefined): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-by-monument/${monumentId}`);
  }

  countMonumentsByMarkId(markId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-monuments-by-mark/${markId}`);
  }

  create(dto: MarkOccurrenceDto, file?: File): Observable<MarkOccurrenceDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<MarkOccurrenceDto>(this.baseUrl, formData);
  }

  update(id: number, dto: MarkOccurrenceDto, file?: File): Observable<MarkOccurrenceDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<MarkOccurrenceDto>(`${this.baseUrl}/${id}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadPhoto(id: number, file: File): Observable<MarkOccurrenceDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MarkOccurrenceDto>(`${this.baseUrl}/${id}/photo`, formData);
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
