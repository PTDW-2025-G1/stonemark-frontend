import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { environment } from '@env/environment';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let httpMock: any;

  const baseUrl = `${environment.apiUrl}/public/bookmarks`;

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    };

    service = new BookmarkService(httpMock as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user bookmarks', async () => {
    const mockBookmarks: BookmarkDto[] = [
      {
        id: 1,
        type: BookmarkDto.TypeEnum.Monument,
        targetId: 10,
      }
    ];

    httpMock.get.mockReturnValue(of(mockBookmarks));

    const result = await firstValueFrom(service.getUserBookmarks());

    expect(result).toEqual(mockBookmarks);
    expect(httpMock.get).toHaveBeenCalledWith(baseUrl);
  });

  it('should create a bookmark', async () => {
    const mockBookmark: BookmarkDto = {
      id: 2,
      type: BookmarkDto.TypeEnum.Mark,
      targetId: 42,
    };

    httpMock.post.mockReturnValue(of(mockBookmark));

    const result = await firstValueFrom(
      service.createBookmark(BookmarkDto.TypeEnum.Mark, 42)
    );

    expect(result).toEqual(mockBookmark);
    expect(httpMock.post).toHaveBeenCalledWith(
      `${baseUrl}/MARK/42`,
      null
    );
  });

  it('should delete a bookmark', async () => {
    httpMock.delete.mockReturnValue(of(undefined));

    const result = await firstValueFrom(service.deleteBookmark(5));

    expect(result).toBeUndefined();
    expect(httpMock.delete).toHaveBeenCalledWith(`${baseUrl}/5`);
  });

  it('should check if item is bookmarked', async () => {
    httpMock.get.mockReturnValue(of(true));

    const result = await firstValueFrom(
      service.isBookmarked(BookmarkDto.TypeEnum.Monument, 99)
    );

    expect(result).toBe(true);
    expect(httpMock.get).toHaveBeenCalledWith(
      `${baseUrl}/check/MONUMENT/99`
    );
  });
});
