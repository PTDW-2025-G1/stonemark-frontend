import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private baseUrl = `${environment.apiUrl}/public/contact-requests`;

  constructor(private http: HttpClient) {}

  sendMessage(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }
}
