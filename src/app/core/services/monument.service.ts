import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { Monument } from '@core/models/monument.model';

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

  getPopularMonuments(): Observable<Monument[]> {
    const popularMonuments: Monument[] = [
      {
        id: 1,
        name: 'Castelo de Guimarães',
        image: 'https://t3.ftcdn.net/jpg/03/93/35/48/360_F_393354815_Ju7YcCJ6QHbhBahy3FeQpcObzkl03faD.jpg',
        location: 'Guimarães, Portugal'
      },
      {
        id: 2,
        name: 'Mosteiro de Alcobaça',
        image: 'https://www.viveromundo.org/wp-content/uploads/2019/07/DSC_0386-1-e1584724820977.jpg',
        location: 'Alcobaça, Portugal'
      },
      {
        id: 3,
        name: 'Torre de Belém',
        image: 'https://static-resources-elementor.mirai.com/wp-content/uploads/sites/1079/post_04_featured.jpg',
        location: 'Belém, Lisboa'
      },
      {
        id: 4,
        name: 'Mosteiro dos Jerónimos',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Mosteiro_dos_Jeronimos_-_Left_Wing.jpg',
        location: 'Lisboa, Portugal'
      },
      {
        id: 5,
        name: 'Mosteiro da Batalha',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Mosteiro_da_Batalha_78a.jpg',
        location: 'Batalha, Portugal'
      },
      {
        id: 6,
        name: 'Convento de Cristo',
        image: 'https://www.patrimoniomundialdocentro.pt/imagens/patrimonio/convento_de_cristo_de_tomar_5b05f68f396e6.jpg',
        location: 'Tomar, Portugal'
      }
    ];

    return of(popularMonuments);
  }


}
