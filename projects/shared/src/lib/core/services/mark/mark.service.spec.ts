import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { MarkService } from './mark.service';
import { environment } from '@env/environment';
import { MarkDto } from '@api/model/mark-dto';
import { PageMarkListDto } from '@api/model/page-mark-list-dto';
import { PageMarkDetailedDto } from '@api/model/page-mark-detailed-dto';
import { HttpParams } from '@angular/common/http';

describe('MarkService', () => {
  let service: MarkService;
  let httpMock: any;

  const baseUrl = `${environment.apiUrl}/marks`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    };

    service = new MarkService(httpMock as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch paginated marks', async () => {
    const response = {} as PageMarkListDto;

    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getMarks(1, 12));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(baseUrl, expect.any(Object));
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('12');
  });

  it('should fetch detailed paginated marks', async () => {
    const response = {} as PageMarkDetailedDto;

    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getDetailedMarks(2, 5));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/details`, expect.any(Object));
    expect(params.get('page')).toBe('2');
    expect(params.get('size')).toBe('5');
  });

  it('should search marks with query and sorting', async () => {
    const response = {} as PageMarkListDto;

    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(
      service.searchMarks('cross', 0, 9, 'title,desc')
    );

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/search`, expect.any(Object));
    expect(params.get('query')).toBe('cross');
    expect(params.get('page')).toBe('0');
    expect(params.get('size')).toBe('9');
    expect(params.get('sort')).toBe('title,desc');
  });

  it('should fetch a single mark by id', async () => {
    const mark: MarkDto = { id: 1 } as MarkDto;

    httpMock.get.mockReturnValue(of(mark));

    const result = await firstValueFrom(service.getMark(1));

    expect(result).toEqual(mark);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/1`);
  });

  it('should create a mark', async () => {
    const dto: MarkDto = { title: 'New Mark' } as MarkDto;

    httpMock.post.mockReturnValue(of(dto));

    const result = await firstValueFrom(service.createMark(dto));

    expect(result).toEqual(dto);
    expect(httpMock.post).toHaveBeenCalledWith(baseUrl, dto);
  });

  it('should update a mark', async () => {
    const dto: MarkDto = { id: 5, title: 'Updated Mark' } as MarkDto;

    httpMock.put.mockReturnValue(of(dto));

    const result = await firstValueFrom(service.updateMark(5, dto));

    expect(result).toEqual(dto);
    expect(httpMock.put).toHaveBeenCalledWith(`${baseUrl}/5`, dto);
  });

  it('should delete a mark', async () => {
    httpMock.delete.mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.deleteMark(3));

    expect(result).toBeUndefined();
    expect(httpMock.delete).toHaveBeenCalledWith(`${baseUrl}/3`);
  });
});
