import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { UserContactDto } from '@api/model/user-contact-dto';

@Injectable({ providedIn: 'root' })
export class UserContactService {
  private getBaseUrl(userId: number) {
    return `${environment.apiUrl}/users/${userId}/contacts`;
  }

  constructor(private http: HttpClient) {}

  getContacts(userId: number): Observable<UserContactDto[]> {
    return this.http.get<UserContactDto[]>(this.getBaseUrl(userId));
  }

  addContact(userId: number, contact: UserContactDto): Observable<UserContactDto> {
    return this.http.post<UserContactDto>(this.getBaseUrl(userId), contact);
  }

  updateContact(userId: number, contactId: number, contact: UserContactDto): Observable<UserContactDto> {
    return this.http.put<UserContactDto>(`${this.getBaseUrl(userId)}/${contactId}`, contact);
  }

  deleteContact(userId: number, contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.getBaseUrl(userId)}/${contactId}`);
  }
}
