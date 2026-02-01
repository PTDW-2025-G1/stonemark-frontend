import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ContactRequestDto } from '@api/model/contact-request-dto';
import { ContactRequest } from '@api/model/contact-request';
import { PageContactRequest } from '@api/model/page-contact-request';

@Injectable({ providedIn: 'root' })
export class ContactRequestService {
  private baseUrl = `${environment.apiUrl}/public/contact-requests`;

  constructor(private http: HttpClient) {}

  create(payload: ContactRequestDto): Observable<ContactRequest> {
    return this.http.post<ContactRequest>(this.baseUrl, payload);
  }

  getAll(page: number = 0, size: number = 10, sort?: string): Observable<PageContactRequest> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageContactRequest>(this.baseUrl, { params });
  }
}
