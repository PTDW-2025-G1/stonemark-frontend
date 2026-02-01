import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ReportRequestDto } from '@api/model/report-request-dto';
import { ReportResponseDto } from '@api/model/report-response-dto';
import { PageReportResponseDto } from '@api/model/page-report-response-dto';

@Injectable({ providedIn: 'root' })
export class ReportService {

  private baseUrl = `${environment.apiUrl}/public/reports`;

  constructor(private http: HttpClient) {}

  createReport(report: ReportRequestDto): Observable<ReportResponseDto> {
    return this.http.post<ReportResponseDto>(this.baseUrl, report);
  }

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

