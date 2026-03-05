import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ReportRequestDto } from '@api/model/report-request-dto';
import { ReportResponseDto } from '@api/model/report-response-dto';

@Injectable({ providedIn: 'root' })
export class PublicReportService {

  private baseUrl = `${environment.apiUrl}/public/reports`;

  constructor(private http: HttpClient) {}

  createReport(report: ReportRequestDto): Observable<ReportResponseDto> {
    return this.http.post<ReportResponseDto>(this.baseUrl, report);
  }
}

