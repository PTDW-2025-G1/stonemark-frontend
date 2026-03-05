import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ReportResponseDto } from '@api/model/report-response-dto';
import { PageReportResponseDto } from '@api/model/page-report-response-dto';

@Injectable({ providedIn: 'root' })
export class AdminReportService {

  private baseUrl = `${environment.apiUrl}/admin/reports`;

  constructor(private http: HttpClient) {}

  getAllReports(page: number = 0, size: number = 10, sort?: string): Observable<PageReportResponseDto> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageReportResponseDto>(this.baseUrl, { params });
  }

  updateStatus(reportId: number, status: ReportResponseDto.StatusEnum): Observable<ReportResponseDto> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<ReportResponseDto>(`${this.baseUrl}/${reportId}/status`, null, { params });
  }
}

