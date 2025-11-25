import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageMonumentDto } from '@api/model/page-monument-dto';
import { environment } from '@env/environment';
import {MonumentResponseDto} from '@api/model/monument-response-dto';

@Injectable({ providedIn: 'root' })
export class MonumentService {

  private baseUrl = `${environment.apiUrl}/monuments`;

  constructor(private http: HttpClient) {}

  getMonuments(): Observable<MonumentResponseDto[]> {
    return this.http.get<PageMonumentDto>(this.baseUrl).pipe(
      map(page => page.content || [])
    );
  }

  getLatestMonuments(): Observable<MonumentResponseDto[]> {
    return this.http.get<MonumentResponseDto[]>(`${this.baseUrl}/latest`);
  }

  getMonumentById(id: number): Observable<MonumentResponseDto> {
    return this.http.get<MonumentResponseDto>(`${this.baseUrl}/${id}`);
  }
}
