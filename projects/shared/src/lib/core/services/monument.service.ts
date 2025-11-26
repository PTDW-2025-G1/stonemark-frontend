import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageMonumentDto } from '@api/model/page-monument-dto';
import { environment } from '@env/environment';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {MonumentRequestDto} from '@api/model/monument-request-dto';

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

  getMonuments(): Observable<MonumentResponseDto[]> {
    return this.http.get<PageMonumentDto>(`${this.baseUrl}?size=10000`).pipe(
      map(page => page.content || [])
    );
  }

  getLatestMonuments(): Observable<MonumentResponseDto[]> {
    return this.http.get<MonumentResponseDto[]>(`${this.baseUrl}/latest`);
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
