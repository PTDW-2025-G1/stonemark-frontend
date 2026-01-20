import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MarkDto } from '@api/model/mark-dto';
import { PageMarkListDto } from '@api/model/page-mark-list-dto';
import { PageMarkDetailedDto } from '@api/model/page-mark-detailed-dto';
import { PageMarkDto } from '@api/model/page-mark-dto';


@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private readonly baseUrl = `${environment.apiUrl}/marks`;

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

  getDetailedMarksManagement(page: number = 0, size: number = 9): Observable<PageMarkDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkDto>(`${this.baseUrl}/management`, { params });
  }

  searchMarks(query: string, page: number = 0, size: number = 9, sort: string = 'title,asc'){
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PageMarkListDto>(`${this.baseUrl}/search`, { params });
  }

  searchByImage(file: File): Observable<string[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string[]>(`${this.baseUrl}/search/image`, formData);
  }

  getMark(id: number): Observable<MarkDto> {
    return this.http.get<MarkDto>(`${this.baseUrl}/${id}`);
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
