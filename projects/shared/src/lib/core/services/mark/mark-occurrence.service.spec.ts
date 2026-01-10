import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { MarkOccurrenceService } from './mark-occurrence.service';
import { environment } from '@env/environment';
import { HttpParams } from '@angular/common/http';

import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceDetailedDto } from '@api/model/mark-occurrence-detailed-dto';
import { MarkOccurrenceListDto } from '@api/model/mark-occurrence-list-dto';
import { PageMarkOccurrenceListDto } from '@api/model/page-mark-occurrence-list-dto';

describe('MarkOccurrenceService', () => {
  let service: MarkOccurrenceService;
  let httpMock: any;

  const baseUrl = `${environment.apiUrl}/mark-occurrences`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    };

    service = new MarkOccurrenceService(httpMock as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all occurrences with pagination', async () => {
    const response = {} as PageMarkOccurrenceListDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getAll(1, 10));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(baseUrl, expect.any(Object));
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('10');
  });

  it('should fetch occurrence by id', async () => {
    const response = {} as MarkOccurrenceDetailedDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getById(5));

    expect(result).toBe(response);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/5`);
  });

  it('should fetch occurrences by mark id', async () => {
    const response = {} as PageMarkOccurrenceListDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getByMarkId(3, 0, 6, 'desc'));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/by-mark/3`, expect.any(Object));
    expect(params.get('page')).toBe('0');
    expect(params.get('size')).toBe('6');
    expect(params.get('sort')).toBe('desc');
  });

  it('should fetch occurrences by monument id', async () => {
    const response = {} as PageMarkOccurrenceListDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getByMonumentId(7, 1, 20, 'asc'));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/by-monument/7`, expect.any(Object));
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('20');
    expect(params.get('sort')).toBe('asc');
  });

  it('should filter by mark and monument', async () => {
    const response = {} as PageMarkOccurrenceListDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(
      service.filterByMarkAndMonument(2, 9, 0, 6, 'desc')
    );

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(
      `${baseUrl}/filter-by-mark-and-monument`,
      expect.any(Object)
    );

    expect(params.get('markId')).toBe('2');
    expect(params.get('monumentId')).toBe('9');
    expect(params.get('page')).toBe('0');
    expect(params.get('size')).toBe('6');
    expect(params.get('sort')).toBe('desc');
  });

  it('should fetch latest occurrences', async () => {
    const response = [] as MarkOccurrenceListDto[];
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getLatestOccurrences());

    expect(result).toBe(response);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/latest`);
  });

  it('should count occurrences by mark id', async () => {
    httpMock.get.mockReturnValue(of(12));

    const result = await firstValueFrom(service.countByMarkId(4));

    expect(result).toBe(12);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/count-by-mark/4`);
  });

  it('should count occurrences by monument id', async () => {
    httpMock.get.mockReturnValue(of(8));

    const result = await firstValueFrom(service.countByMonumentId(6));

    expect(result).toBe(8);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/count-by-monument/6`);
  });

  it('should count monuments by mark id', async () => {
    httpMock.get.mockReturnValue(of(5));

    const result = await firstValueFrom(service.countMonumentsByMarkId(2));

    expect(result).toBe(5);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/count-monuments-by-mark/2`);
  });

  it('should create a mark occurrence', async () => {
    const dto = {} as MarkOccurrenceDto;
    httpMock.post.mockReturnValue(of(dto));

    const result = await firstValueFrom(service.create(dto));

    expect(result).toBe(dto);
    expect(httpMock.post).toHaveBeenCalledWith(baseUrl, dto);
  });

  it('should update a mark occurrence', async () => {
    const dto = {} as MarkOccurrenceDto;
    httpMock.put.mockReturnValue(of(dto));

    const result = await firstValueFrom(service.update(10, dto));

    expect(result).toBe(dto);
    expect(httpMock.put).toHaveBeenCalledWith(`${baseUrl}/10`, dto);
  });

  it('should delete a mark occurrence', async () => {
    httpMock.delete.mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.delete(11));

    expect(result).toBeUndefined();
    expect(httpMock.delete).toHaveBeenCalledWith(`${baseUrl}/11`);
  });

  it('should fetch available marks by monument', async () => {
    const response = [{ id: 1 }];
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getAvailableMarksByMonument(3));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(
      `${baseUrl}/filters/marks-by-monument`,
      expect.any(Object)
    );
    expect(params.get('monumentId')).toBe('3');
  });

  it('should fetch available monuments by mark', async () => {
    const response = [{ id: 2 }];
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getAvailableMonumentsByMark(4));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(
      `${baseUrl}/filters/monuments-by-mark`,
      expect.any(Object)
    );
    expect(params.get('markId')).toBe('4');
  });
});
