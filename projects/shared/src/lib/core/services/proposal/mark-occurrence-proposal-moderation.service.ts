import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProposalModeratorViewDto } from '@api/model/proposal-moderator-view-dto';
import { DecisionHistoryItem } from '@api/model/decision-history-item';
import { ManualDecisionRequest } from '@api/model/manual-decision-request';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MarkOccurrenceProposalModerationService {
  private readonly baseUrl = `${environment.apiUrl}/proposals/mark-occurrences`;

  constructor(private http: HttpClient) {}

  /**
   * Get all proposals for moderation
   * @returns Observable of ProposalModeratorViewDto array
   */
  getAllProposals(): Observable<ProposalModeratorViewDto[]> {
    return this.http.get<ProposalModeratorViewDto[]>(this.baseUrl);
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

