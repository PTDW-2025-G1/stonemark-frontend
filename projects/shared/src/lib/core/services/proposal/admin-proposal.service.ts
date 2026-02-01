import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageProposalAdminListDto } from '@api/model/page-proposal-admin-list-dto';
import { ProposalWithRelationsDto } from '@api/model/proposal-with-relations-dto';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProposalService {
  private readonly baseUrl = `${environment.apiUrl}/admin/proposals`;

  constructor(private http: HttpClient) {}

  getAllProposals(
    page: number = 0,
    size: number = 20,
    sort: string = 'submittedAt,desc',
    statuses?: string[],
    submittedById?: number
  ): Observable<PageProposalAdminListDto> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (statuses && statuses.length > 0) {
      statuses.forEach(status => {
        params = params.append('statuses', status);
      });
    }

    if (submittedById) {
      params = params.set('submittedById', submittedById.toString());
    }

    return this.http.get<PageProposalAdminListDto>(this.baseUrl, { params });
  }

  getProposalDetails(id: number): Observable<ProposalWithRelationsDto> {
    return this.http.get<ProposalWithRelationsDto>(`${this.baseUrl}/${id}`);
  }
}
