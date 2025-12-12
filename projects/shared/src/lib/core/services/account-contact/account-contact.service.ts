import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ContactDto } from '@api/model/contact-dto';
import { UserContactDto } from '@api/model/user-contact-dto';
import { MessageResponseDto } from '@api/model/message-response-dto';

@Injectable({ providedIn: 'root' })
export class AccountContactService {
  private baseUrl = `${environment.apiUrl}/account/contacts`;

  constructor(private http: HttpClient) {}

  getContacts(): Observable<UserContactDto[]> {
    return this.http.get<UserContactDto[]>(this.baseUrl);
  }

  addContact(contact: ContactDto): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(this.baseUrl, contact);
  }

  requestVerification(contactId: number): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(
      `${this.baseUrl}/${contactId}/verify`,
      {}
    );
  }

  confirmContactCode(code: string): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(
      `${environment.apiUrl}/auth/account-verification/confirm`,
      { code }
    );
  }

  setPrimary(contactId: number): Observable<MessageResponseDto> {
    return this.http.patch<MessageResponseDto>(
      `${this.baseUrl}/${contactId}/primary`,
      {}
    );
  }

  deleteContact(contactId: number): Observable<MessageResponseDto> {
    return this.http.delete<MessageResponseDto>(
      `${this.baseUrl}/${contactId}`
    );
  }
}
