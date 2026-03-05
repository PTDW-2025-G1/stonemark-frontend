import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MonumentDto } from '@api/model/monument-dto';
import { MonumentListDto } from '@api/model/monument-list-dto';
import { PageMonumentListDto } from '@api/model/page-monument-list-dto';
import { MonumentMapDto } from '@api/model/monument-map-dto';
import { PageMonumentMapDto } from '@api/model/page-monument-map-dto';
import { MessageResponseDto } from '@api/model/message-response-dto';

@Injectable({ providedIn: 'root' })
export class MonumentService {
  private baseUrl = `${environment.apiUrl}/public/monuments`;

  constructor(private http: HttpClient) {}

  getMonuments(page: number = 0, size: number = 9): Observable<PageMonumentListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMonumentListDto>(`${this.baseUrl}`, { params });
  }

  getAllForMap(): Observable<MonumentMapDto[]> {
    return this.http.get<PageMonumentMapDto>(`${this.baseUrl}/map?size=100`).pipe(
      map(page => page.content || [])
    );
  }

  searchMonuments(query: string, page: number = 0, size: number = 9, sort: string = 'name,asc'): Observable<PageMonumentListDto> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<PageMonumentListDto>(`${this.baseUrl}/search`, { params });
  }

  findByPolygon(geoJson: string, page: number = 0, size: number = 9): Observable<PageMonumentListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.post<PageMonumentListDto>(`${this.baseUrl}/search/polygon`, geoJson, { params });
  }

  filterByDivision(divisionId: number, page: number = 0, size: number = 9): Observable<PageMonumentListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageMonumentListDto>(`${this.baseUrl}/division/${divisionId}`, { params });
  }

  getPopularMonuments(limit: number = 6): Observable<MonumentListDto[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<MonumentListDto[]>(`${this.baseUrl}/popular`, { params });
  }

  getLatestMonuments(limit: number = 6): Observable<MonumentListDto[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<MonumentListDto[]>(`${this.baseUrl}/latest`, { params });
  }

  countMonuments(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getMonumentById(id: number): Observable<MonumentDto> {
    return this.http.get<MonumentDto>(`${this.baseUrl}/${id}`);
  }
}
