import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  image?: string;
  content_text?: string;
  date_published?: string;
  author?: string;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private rssUrl = 'https://rss.app/feeds/v1.1/yhCIsflq60FLbmbs.json';

  constructor(private http: HttpClient) {}

  getLatestNews(): Observable<NewsItem[]> {
    return this.http.get<any>(this.rssUrl).pipe(
      map(res => {
        if (Array.isArray(res.items)) {
          return res.items;
        }
        if (res.id && res.title) {
          return [res];
        }
        return [];
      }),
      catchError(err => {
        console.error('Error fetching RSS:', err);
        return of([]);
      })
    );
  }
}
