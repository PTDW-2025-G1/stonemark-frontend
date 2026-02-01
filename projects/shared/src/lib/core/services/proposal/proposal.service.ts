import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageProposalSummaryDto } from '@api/model/page-proposal-summary-dto';
import { ProposalStatsProjection } from '@api/model/proposal-stats-projection';
import { ProposalSummaryDto } from '@api/model/proposal-summary-dto';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private readonly baseUrl = `${environment.apiUrl}/public/proposals`;

  constructor(private http: HttpClient) {}

  findByUser(page: number = 0, size: number = 6): Observable<PageProposalSummaryDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageProposalSummaryDto>(`${this.baseUrl}/user/me`, { params });
  }

  getUserStats(): Observable<ProposalStatsProjection> {
    return this.http.get<ProposalStatsProjection>(`${this.baseUrl}/user/me/stats`);
  }

  findById(id: number): Observable<ProposalSummaryDto> {
    return this.http.get<ProposalSummaryDto>(`${this.baseUrl}/${id}`);
  }
}
