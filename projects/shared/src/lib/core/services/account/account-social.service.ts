import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MessageResponseDto } from '@api/model/message-response-dto';
import {LinkedProviderDto} from '@api/model/linked-provider-dto';

@Injectable({ providedIn: 'root' })
export class AccountSocialService {
  private readonly baseUrl = `${environment.apiUrl}/account/socials`;

  constructor(private http: HttpClient) {}

  getLinkedProviders(): Observable<LinkedProviderDto[]> {
    return this.http.get<LinkedProviderDto[]>(
      `${this.baseUrl}/providers`
    );
  }

  linkGoogle(token: string): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(
      `${this.baseUrl}/google`,
      { token }
    );
  }

  unlinkGoogle(): Observable<MessageResponseDto> {
    return this.http.delete<MessageResponseDto>(
      `${this.baseUrl}/google`
    );
  }
}
