import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { MarkService } from './mark.service';
import { environment } from '@env/environment';
import { MarkDto } from '@api/model/mark-dto';
import { PageMarkDto } from '@api/model/page-mark-dto';
import { HttpParams } from '@angular/common/http';

describe('MarkService', () => {
  let service: MarkService;
  let httpMock: any;

  const baseUrl = `${environment.apiUrl}/public/marks`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn()
    };

    service = new MarkService(httpMock as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch paginated marks', async () => {
    const response = {} as PageMarkDto;

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
    const response = {} as PageMarkDto;

    httpMock.get.mockReturnValue(of(response));

    const result = await firstValueFrom(service.getDetailedMarks(2, 5));

    expect(result).toBe(response);

    const [, options] = httpMock.get.mock.calls[0];
    const params = options.params as HttpParams;

    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/details`, expect.any(Object));
    expect(params.get('page')).toBe('2');
    expect(params.get('size')).toBe('5');
  });

  it('should fetch a single mark by id', async () => {
    const mark: MarkDto = { id: 1 } as MarkDto;

    httpMock.get.mockReturnValue(of(mark));

    const result = await firstValueFrom(service.getMark(1));

    expect(result).toEqual(mark);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/1`);
  });

  it('should search by image', async () => {
    const response: string[] = ['result1', 'result2'];
    const file = new File([''], 'test.jpg');

    httpMock.post.mockReturnValue(of(response));

    const result = await firstValueFrom(service.searchByImage(file));

    expect(result).toEqual(response);
    expect(httpMock.post).toHaveBeenCalled();
    const [url, body] = httpMock.post.mock.calls[0];
    expect(url).toBe(`${baseUrl}/search/image`);
    expect(body).toBeInstanceOf(FormData);
    expect(body.get('file')).toBe(file);
  });
});
