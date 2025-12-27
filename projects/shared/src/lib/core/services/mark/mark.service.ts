import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MarkDto } from '@api/model/mark-dto';
import { PageMarkDto } from '@api/model/page-mark-dto';
import { PageMarkListDto } from '@api/model/page-mark-list-dto';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private readonly baseUrl = `${environment.apiUrl}/marks`;

  constructor(private http: HttpClient) {}

  getMarks(): Observable<MarkDto[]> {
    return this.http.get<MarkDto[]>(this.baseUrl);
  }

  getListMarks(page: number = 0, size: number = 9): Observable<PageMarkListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkListDto>(`${this.baseUrl}/list`, { params });
  }

  searchMarks(query: string, page: number = 0, size: number = 9, sort: string = 'title,asc'){
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PageMarkDto>(`${this.baseUrl}/search`, { params });
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
