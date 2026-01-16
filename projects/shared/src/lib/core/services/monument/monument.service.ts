import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageMonumentDto } from '@api/model/page-monument-dto';
import { environment } from '@env/environment';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {MonumentRequestDto} from '@api/model/monument-request-dto';
import {MonumentListDto} from '@api/model/monument-list-dto';
import {PageMonumentListDto} from '@api/model/page-monument-list-dto';
import {MonumentMapDto} from '@api/model/monument-map-dto';
import {PageMonumentMapDto} from '@api/model/page-monument-map-dto';

@Injectable({ providedIn: 'root' })
export class MonumentService {

  private baseUrl = `${environment.apiUrl}/monuments`;

  constructor(private http: HttpClient) {}

  createMonument(monument: MonumentRequestDto): Observable<MonumentResponseDto> {
    return this.http.post<MonumentResponseDto>(this.baseUrl, monument);
  }

  updateMonument(id: number, monument: MonumentRequestDto): Observable<MonumentResponseDto> {
    return this.http.put<MonumentResponseDto>(`${this.baseUrl}/${id}`, monument);
  }

  deleteMonument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getMonuments(page: number = 0, size: number = 9): Observable<PageMonumentListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMonumentListDto>(`${this.baseUrl}`, { params });
  }

  getDetailedMonuments(): Observable<MonumentResponseDto[]> {
    return this.http.get<PageMonumentDto>(`${this.baseUrl}/details?size=10000`).pipe(
      map(page => page.content || [])
    );
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

  filterByCity(city: string, page: number = 0, size: number = 9, sort: string = 'name,asc'): Observable<PageMonumentListDto> {
    const params = new HttpParams()
      .set('city', city)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<PageMonumentListDto>(`${this.baseUrl}/filter`, { params });
  }

  filterByDivision(divisionId: number, page: number = 0, size: number = 9): Observable<PageMonumentListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageMonumentListDto>(`${this.baseUrl}/division/${divisionId}`, { params });
  }

  getPopularMonuments(): Observable<MonumentListDto[]> {
    return this.http.get<MonumentListDto[]>(`${this.baseUrl}/popular`);
  }

  getLatestMonuments(): Observable<MonumentListDto[]> {
    return this.http.get<MonumentListDto[]>(`${this.baseUrl}/latest`);
  }

  getMonumentById(id: number): Observable<MonumentResponseDto> {
    return this.http.get<MonumentResponseDto>(`${this.baseUrl}/${id}`);
  }

  importMonumentsFromOverpass(geoJson: string): Observable<MonumentResponseDto[]> {
    return this.http.post<MonumentResponseDto[]>(
      `${environment.apiUrl}/import/monuments/overpass`,
      geoJson,
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    );
  }

}
