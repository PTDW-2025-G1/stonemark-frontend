import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ActiveDecisionViewDto } from '@api/model/active-decision-view-dto';
import { ManualDecisionRequest } from '@api/model/manual-decision-request';
import { MonumentRequestDto } from '@api/model/monument-request-dto';

@Injectable({
  providedIn: 'root'
})
export class ProposalDecisionService {

  constructor(private http: HttpClient) {}

  private getDecisionsUrl(proposalId: number): string {
    return `${environment.apiUrl}/admin/proposals/${proposalId}/decisions`;
  }

  getActiveDecision(proposalId: number): Observable<ActiveDecisionViewDto> {
    return this.http.get<ActiveDecisionViewDto>(`${this.getDecisionsUrl(proposalId)}/active`);
  }

  getDecisionHistory(proposalId: number): Observable<ActiveDecisionViewDto[]> {
    return this.http.get<ActiveDecisionViewDto[]>(`${this.getDecisionsUrl(proposalId)}/history`);
  }

  createManualDecision(proposalId: number, request: ManualDecisionRequest): Observable<void> {
    return this.http.post<void>(`${this.getDecisionsUrl(proposalId)}/manual`, request);
  }

  rerunAutomaticDecision(proposalId: number): Observable<void> {
    return this.http.post<void>(`${this.getDecisionsUrl(proposalId)}/automatic/rerun`, {});
  }

  activateDecision(proposalId: number, attemptId: number): Observable<void> {
    return this.http.post<void>(`${this.getDecisionsUrl(proposalId)}/${attemptId}/activate`, {});
  }

  deactivateDecision(proposalId: number): Observable<void> {
    return this.http.post<void>(`${this.getDecisionsUrl(proposalId)}/deactivate`, {});
  }
}
