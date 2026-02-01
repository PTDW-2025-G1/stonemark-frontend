import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { AdminMarkOccurrenceService } from './admin-mark-occurrence.service';
import { environment } from '@env/environment';
import { HttpParams } from '@angular/common/http';

import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceRequestDto } from '@api/model/mark-occurrence-request-dto';
import { PageMarkOccurrenceDto } from '@api/model/page-mark-occurrence-dto';

describe('AdminMarkOccurrenceService', () => {
  let service: AdminMarkOccurrenceService;
  let httpMock: any;

  const baseUrl = `${environment.apiUrl}/admin/mark-occurrences`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    };

    service = new AdminMarkOccurrenceService(httpMock as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch mark occurrences management with pagination', async () => {
    const response = {} as PageMarkOccurrenceDto;
    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getMarkOccurrencesManagement(1, 10));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(baseUrl, expect.any(Object));
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('10');
  });

  it('should create a mark occurrence', async () => {
    const dto = {} as MarkOccurrenceRequestDto;
    const responseDto = {} as MarkOccurrenceDto;
    httpMock.post.mockReturnValue(of(responseDto));

    const result = await firstValueFrom(service.createMarkOccurrence(dto));

    expect(result).toBe(responseDto);
    expect(httpMock.post).toHaveBeenCalledWith(baseUrl, expect.any(FormData));
  });

  it('should create a mark occurrence with file', async () => {
    const dto = {} as MarkOccurrenceRequestDto;
    const responseDto = {} as MarkOccurrenceDto;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    httpMock.post.mockReturnValue(of(responseDto));

    const result = await firstValueFrom(service.createMarkOccurrence(dto, file));

    expect(result).toBe(responseDto);
    expect(httpMock.post).toHaveBeenCalledWith(baseUrl, expect.any(FormData));

    const formData = httpMock.post.mock.calls[0][1] as FormData;
    expect(formData.get('file')).toBe(file);
  });

  it('should update a mark occurrence', async () => {
    const dto = {} as MarkOccurrenceRequestDto;
    const responseDto = {} as MarkOccurrenceDto;
    httpMock.put.mockReturnValue(of(responseDto));

    const result = await firstValueFrom(service.updateMarkOccurrence(10, dto));

    expect(result).toBe(responseDto);
    expect(httpMock.put).toHaveBeenCalledWith(`${baseUrl}/10`, expect.any(FormData));
  });

  it('should update a mark occurrence with file', async () => {
    const dto = {} as MarkOccurrenceRequestDto;
    const responseDto = {} as MarkOccurrenceDto;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    httpMock.put.mockReturnValue(of(responseDto));

    const result = await firstValueFrom(service.updateMarkOccurrence(10, dto, file));

    expect(result).toBe(responseDto);
    expect(httpMock.put).toHaveBeenCalledWith(`${baseUrl}/10`, expect.any(FormData));

    const formData = httpMock.put.mock.calls[0][1] as FormData;
    expect(formData.get('file')).toBe(file);
  });

  it('should delete a mark occurrence', async () => {
    httpMock.delete.mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.deleteMarkOccurrence(11));

    expect(result).toBeUndefined();
    expect(httpMock.delete).toHaveBeenCalledWith(`${baseUrl}/11`);
  });

  it('should upload photo', async () => {
    const responseDto = {} as MarkOccurrenceDto;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    httpMock.post.mockReturnValue(of(responseDto));

    const result = await firstValueFrom(service.uploadPhoto(12, file));

    expect(result).toBe(responseDto);
    expect(httpMock.post).toHaveBeenCalledWith(`${baseUrl}/12/photo`, expect.any(FormData));

    const formData = httpMock.post.mock.calls[0][1] as FormData;
    expect(formData.get('file')).toBe(file);
  });
});
