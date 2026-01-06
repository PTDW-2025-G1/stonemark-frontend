import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarkOccurrenceProposalDto } from '@api/model/mark-occurrence-proposal-dto';
import { PageMarkOccurrenceProposalListDto } from '@api/model/page-mark-occurrence-proposal-list-dto';
import { PageMarkOccurrenceProposalDto } from '@api/model/page-mark-occurrence-proposal-dto';
import { MarkOccurrenceProposalStatsDto } from '@api/model/mark-occurrence-proposal-stats-dto';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MarkOccurrenceProposalService {
  private readonly baseUrl = `${environment.apiUrl}/proposals/mark-occurrences`;

  constructor(private http: HttpClient) {}

  findByUser(userId: number, page: number = 0, size: number = 10): Observable<PageMarkOccurrenceProposalListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkOccurrenceProposalListDto>(`${this.baseUrl}/user/${userId}`, { params });
  }

  getUserStats(userId: number): Observable<MarkOccurrenceProposalStatsDto> {
    return this.http.get<MarkOccurrenceProposalStatsDto>(`${this.baseUrl}/user/${userId}/stats`);
  }

  findDetailedByUser(userId: number, page: number = 0, size: number = 10): Observable<PageMarkOccurrenceProposalDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkOccurrenceProposalDto>(`${this.baseUrl}/user/${userId}/detailed`, { params });
  }

  findById(proposalId: number): Observable<MarkOccurrenceProposalDto> {
    return this.http.get<MarkOccurrenceProposalDto>(`${this.baseUrl}/${proposalId}`);
  }
}
