import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { ReportService } from './report.service';
import { environment } from '@env/environment';

import { ReportRequestDto } from '@api/model/report-request-dto';
import { ReportResponseDto } from '@api/model/report-response-dto';
import { PageReportResponseDto } from '@api/model/page-report-response-dto';

describe('ReportService', () => {
  let service: ReportService;
  let httpMock: any;

  const baseUrl = `${environment.apiUrl}/reports`;

  beforeEach(() => {
    httpMock = {
      post: vi.fn(),
      get: vi.fn(),
      patch: vi.fn()
    };

    service = new ReportService(httpMock as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should create a report', async () => {
    const payload = {} as ReportRequestDto;
    const response = {} as ReportResponseDto;

    httpMock.post.mockReturnValue(of(response));

    const result = await firstValueFrom(service.createReport(payload));

    expect(result).toBe(response);
    expect(httpMock.post).toHaveBeenCalledWith(baseUrl, payload);
  });

  it('should fetch all reports with pagination', async () => {
    const response = {} as PageReportResponseDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getAllReports(1, 20));

    expect(result).toBe(response);

    const [url, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(url).toBe(baseUrl);
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('20');
  });

  it('should update report status', async () => {
    const response = {} as ReportResponseDto;
    const status = ReportResponseDto.StatusEnum.Resolved;

    httpMock.patch.mockReturnValue(of(response));

    const result = await firstValueFrom(service.updateStatus(42, status));

    expect(result).toBe(response);

    const [url, body, options] = httpMock.patch.mock.calls[0];
    const params = options.params as HttpParams;

    expect(url).toBe(`${baseUrl}/42/status`);
    expect(body).toBeNull();
    expect(params.get('status')).toBe(status);
  });
});
