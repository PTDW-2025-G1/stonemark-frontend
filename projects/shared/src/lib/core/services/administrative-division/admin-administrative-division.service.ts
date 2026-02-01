import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MessageResponseDto } from '@api/model/message-response-dto';

@Injectable({ providedIn: 'root' })
export class AdminAdministrativeDivisionService {

  private baseUrl = `${environment.apiUrl}/admin/divisions`;

  constructor(private http: HttpClient) {}

  importDivisionsFromPbf(file: File): Observable<MessageResponseDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MessageResponseDto>(`${this.baseUrl}/import/pbf`, formData);
  }
}
