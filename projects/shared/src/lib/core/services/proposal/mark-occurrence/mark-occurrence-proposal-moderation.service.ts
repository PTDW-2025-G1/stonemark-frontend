import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProposalModeratorViewDto } from '@api/model/proposal-moderator-view-dto';
import { DecisionHistoryItem } from '@api/model/decision-history-item';
import { ManualDecisionRequest } from '@api/model/manual-decision-request';
import { environment } from '@env/environment';
import {PageProposalModeratorListDto} from '@api/model/page-proposal-moderator-list-dto';

@Injectable({
  providedIn: 'root'
})
export class MarkOccurrenceProposalModerationService {
  private readonly baseUrl = `${environment.apiUrl}/proposals/mark-occurrences/moderation`;

  constructor(private http: HttpClient) {}

  /**
   * Get all proposals for moderation
   * @param page - Page number (default: 0)
   * @param size - Page size (default: 10)
   * @param status - Optional status filter
   * @param sort - Optional sort parameter (e.g., "submittedAt,desc")
   * @returns Observable of PageProposalModeratorListDto
   */
  getAllProposals(page: number = 0, size: number = 10, status?: string[], sort?: string): Observable<PageProposalModeratorListDto> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status && status.length > 0) {
      status.forEach(s => {
        params = params.append('status', s);
      });
    }

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageProposalModeratorListDto>(this.baseUrl, { params });
  }

  /**
   * Get proposal details for moderation
   * @param id - Proposal ID
   * @returns Observable of ProposalModeratorViewDto
   */
  getProposal(id: number): Observable<ProposalModeratorViewDto> {
    return this.http.get<ProposalModeratorViewDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get decision history for a proposal
   * @param id - Proposal ID
   * @returns Observable of DecisionHistoryItem array
   */
  getDecisionHistory(id: number): Observable<DecisionHistoryItem[]> {
    return this.http.get<DecisionHistoryItem[]>(`${this.baseUrl}/${id}/history`);
  }

  /**
   * Create a manual decision for a proposal (Accept/Reject)
   * @param id - Proposal ID
   * @param request - Manual decision request with outcome and notes
   * @returns Observable of void
   */
  createManualDecision(id: number, request: ManualDecisionRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/decisions/manual`, request);
  }

  /**
   * Rerun automatic decision logic for a proposal
   * @param id - Proposal ID
   * @returns Observable of void
   */
  rerunAutomaticDecision(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/decisions/automatic/rerun`, {});
  }

  /**
   * Activate a previous decision attempt, reverting the proposal status
   * @param id - Proposal ID
   * @param attemptId - Decision attempt ID to activate
   * @returns Observable of void
   */
  activateDecision(id: number, attemptId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/decisions/${attemptId}/activate`, {});
  }
}

