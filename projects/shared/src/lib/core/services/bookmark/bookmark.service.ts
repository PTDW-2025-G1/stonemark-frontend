import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { BookmarkDto } from '@api/model/bookmark-dto';

@Injectable({ providedIn: 'root' })
export class BookmarkService {

  private baseUrl = `${environment.apiUrl}/bookmarks`;

  constructor(private http: HttpClient) {}

  getUserBookmarks(): Observable<BookmarkDto[]> {
    return this.http.get<BookmarkDto[]>(this.baseUrl);
  }

  createBookmark(type: BookmarkDto.TypeEnum, targetId: number): Observable<BookmarkDto> {
    return this.http.post<BookmarkDto>(`${this.baseUrl}/${type}/${targetId}`, null);
  }

  deleteBookmark(bookmarkId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${bookmarkId}`);
  }

  isBookmarked(type: BookmarkDto.TypeEnum, targetId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check/${type}/${targetId}`);
  }
}
