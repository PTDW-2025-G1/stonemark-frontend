import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ContactRequestDto } from '@api/model/contact-request-dto';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private baseUrl = `${environment.apiUrl}/contact-requests`;

  constructor(private http: HttpClient) {}

  sendMessage(payload: ContactRequestDto): Observable<void> {
    return this.http.post<void>(this.baseUrl, payload);
  }
}
