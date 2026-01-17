import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ContactRequestDto } from '@api/model/contact-request-dto';
import { ContactRequest } from '@api/model/contact-request';
import { PageContactRequest } from '@api/model/page-contact-request';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private baseUrl = `${environment.apiUrl}/contact-requests`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 10, sort?: string): Observable<PageContactRequest> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageContactRequest>(this.baseUrl, { params });
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
