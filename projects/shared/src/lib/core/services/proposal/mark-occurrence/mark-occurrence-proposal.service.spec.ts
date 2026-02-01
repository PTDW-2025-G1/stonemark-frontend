import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { MarkOccurrenceProposalService } from './mark-occurrence-proposal.service';
import { environment } from '@env/environment';

import { PageMarkOccurrenceProposalListDto } from '@api/model/page-mark-occurrence-proposal-list-dto';
import { PageMarkOccurrenceProposalDto } from '@api/model/page-mark-occurrence-proposal-dto';
import { MarkOccurrenceProposalDto } from '@api/model/mark-occurrence-proposal-dto';
import { MarkOccurrenceProposalStatsDto } from '@api/model/mark-occurrence-proposal-stats-dto';

describe('MarkOccurrenceProposalService', () => {
  let service: MarkOccurrenceProposalService;
  let httpMock: any;

  const baseUrl = `${environment.apiUrl}/proposals/mark-occurrences`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn()
    };

    service = new MarkOccurrenceProposalService(httpMock as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should find proposals by user with pagination', async () => {
    const response = {} as PageMarkOccurrenceProposalListDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.findByUser(10, 1, 6));

    expect(result).toBe(response);

    const [url, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(url).toBe(`${baseUrl}/user/10`);
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('6');
  });

  it('should fetch user proposal statistics', async () => {
    const response = {} as MarkOccurrenceProposalStatsDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getUserStats(5));

    expect(result).toBe(response);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/user/5/stats`);
  });

  it('should find detailed proposals by user with pagination', async () => {
    const response = {} as PageMarkOccurrenceProposalDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.findDetailedByUser(7, 2, 10));

    expect(result).toBe(response);

    const [url, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(url).toBe(`${baseUrl}/user/7/detailed`);
    expect(params.get('page')).toBe('2');
    expect(params.get('size')).toBe('10');
  });

  it('should find proposal by id', async () => {
    const response = {} as MarkOccurrenceProposalDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.findById(42));

    expect(result).toBe(response);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/42`);
  });
});
