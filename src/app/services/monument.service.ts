import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Monument {
  id: number;
  name?: string;
  lat: number;
  lon: number;
  wikidata?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class MonumentService {
  private overpassUrl = 'https://overpass-api.de/api/interpreter';

  constructor(private http: HttpClient) {}

  getMonumentsPortugal(): Observable<Monument[]> {
    const query = `
    [out:json][timeout:60];
    area["name"="Portugal"]->.searchArea;

    (
      node["historic"="monument"](area.searchArea);
      way["historic"="monument"](area.searchArea);
      relation["historic"="monument"](area.searchArea);
    );

    out center;
  `;

    const url = `${this.overpassUrl}?data=${encodeURIComponent(query)}`;

    return this.http.get<any>(url).pipe(
      map(response =>
        response.elements
          .filter((el: any) => el.lat || el.center) // garante que há coordenadas
          .map((el: any) => ({
            id: el.id,
            name: el.tags?.name || 'Unnamed Monument',
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
            wikidata: el.tags?.wikidata,
            image: el.tags?.image
          }))
      )
    );
  }
}
