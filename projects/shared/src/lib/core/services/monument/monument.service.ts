import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {MonumentRequestDto} from '@api/model/monument-request-dto';
import {MonumentListDto} from '@api/model/monument-list-dto';
import {PageMonumentListDto} from '@api/model/page-monument-list-dto';
import {MonumentMapDto} from '@api/model/monument-map-dto';
import {PageMonumentMapDto} from '@api/model/page-monument-map-dto';
import {PageMonumentResponseDto} from '@api/model/page-monument-response-dto';
import {MessageResponseDto} from '@api/model/message-response-dto';

@Injectable({ providedIn: 'root' })
export class MonumentService {

  private baseUrl = `${environment.apiUrl}/monuments`;
  private importUrl = `${environment.apiUrl}/import`;

  constructor(private http: HttpClient) {}

  createMonument(monument: MonumentRequestDto, file?: File): Observable<MonumentResponseDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(monument)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<MonumentResponseDto>(this.baseUrl, formData);
  }

  updateMonument(id: number, monument: MonumentRequestDto, file?: File): Observable<MonumentResponseDto> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(monument)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<MonumentResponseDto>(`${this.baseUrl}/${id}`, formData);
  }

  deleteMonument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadPhoto(id: number, file: File): Observable<MonumentResponseDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MonumentResponseDto>(`${this.baseUrl}/${id}/photo`, formData);
  }

  getMonuments(page: number = 0, size: number = 9): Observable<PageMonumentListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMonumentListDto>(`${this.baseUrl}`, { params });
  }

  getDetailedMonuments(page: number = 0, size: number = 10, sort?: string): Observable<PageMonumentResponseDto> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageMonumentResponseDto>(`${this.baseUrl}/details`, { params });
  }

  getDetailedMonumentsManagement(page: number = 0, size: number = 10, sort?: string): Observable<PageMonumentResponseDto> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageMonumentResponseDto>(`${this.baseUrl}/management`, { params });
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

  countMonuments(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getMonumentById(id: number): Observable<MonumentResponseDto> {
    return this.http.get<MonumentResponseDto>(`${this.baseUrl}/${id}`);
  }

  importMonumentsFromGeoJson(file: File): Observable<MessageResponseDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MessageResponseDto>(`${this.importUrl}/monuments/geojson`, formData);
  }

}
