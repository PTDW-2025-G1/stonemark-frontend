import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@core/environments/environment';
import { ContactRequestDto } from '@api/model/contact-request-dto';
import { ContactRequest } from '@api/model/contact-request';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private baseUrl = `${environment.apiUrl}/contact-requests`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(this.baseUrl);
  }

  getById(id: number): Observable<ContactRequest> {
    return this.http.get<ContactRequest>(`${this.baseUrl}/${id}`);
  }

  create(payload: ContactRequestDto): Observable<ContactRequest> {
    return this.http.post<ContactRequest>(this.baseUrl, payload);
  }

  updateStatus(id: number, status: ContactRequest.StatusEnum): Observable<ContactRequest> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<ContactRequest>(
      `${this.baseUrl}/${id}/status`,
      null,
      { params }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
