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
  private rssUrl = 'https://rss.app/feeds/v1.1/sif8xkok0xUHIWgA.json';

  constructor(private http: HttpClient) {}

  getLatestNews(): Observable<NewsItem[]> {
    return this.http.get<any>(this.rssUrl).pipe(
      map(res => {
        // caso venha array em res.items
        if (Array.isArray(res.items)) {
          return res.items;
        }
        // caso venha apenas um objeto
        if (res.id && res.title) {
          return [res];
        }
        // caso inesperado → devolve vazio
        return [];
      }),
      catchError(err => {
        console.error('Erro ao carregar RSS:', err);
        return of([]);
      })
    );
  }
}
