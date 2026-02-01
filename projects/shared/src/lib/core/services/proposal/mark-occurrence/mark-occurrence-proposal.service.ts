import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarkOccurrenceProposalDto } from '@api/model/mark-occurrence-proposal-dto';
import { PageMarkOccurrenceProposalListDto } from '@api/model/page-mark-occurrence-proposal-list-dto';
import { PageMarkOccurrenceProposalDto } from '@api/model/page-mark-occurrence-proposal-dto';
import { MarkOccurrenceProposalCreateDto } from '@api/model/mark-occurrence-proposal-create-dto';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MarkOccurrenceProposalService {
  private readonly baseUrl = `${environment.apiUrl}/public/proposals/mark-occurrences`;

  constructor(private http: HttpClient) {}

  findByUser(page: number = 0, size: number = 6): Observable<PageMarkOccurrenceProposalListDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkOccurrenceProposalListDto>(`${this.baseUrl}/user/me`, { params });
  }

  findDetailedByUser(page: number = 0, size: number = 6): Observable<PageMarkOccurrenceProposalDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageMarkOccurrenceProposalDto>(`${this.baseUrl}/user/me/detailed`, { params });
  }

  findById(proposalId: number): Observable<MarkOccurrenceProposalDto> {
    return this.http.get<MarkOccurrenceProposalDto>(`${this.baseUrl}/${proposalId}`);
  }

  createAndSubmit(dto: MarkOccurrenceProposalCreateDto): Observable<MarkOccurrenceProposalDto> {
    return this.http.post<MarkOccurrenceProposalDto>(this.baseUrl, dto);
  }
}
