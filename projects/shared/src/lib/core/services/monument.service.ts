import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Monument } from '@core/models/monument.model';

@Injectable({ providedIn: 'root' })
export class MonumentService {
  private readonly overpassUrl = 'https://overpass-api.de/api/interpreter';

  // Array global reutilizável
  private readonly MONUMENTS: Monument[] = [
    {
      id: 1,
      name: 'Castelo de Guimarães',
      cover: 'https://t3.ftcdn.net/jpg/03/93/35/48/360_F_393354815_Ju7YcCJ6QHbhBahy3FeQpcObzkl03faD.jpg',
      location: 'Guimarães, Portugal',
      artist_name: 'Desconhecido',
      material: 'stone',
      start_date: 960,
      architect: 'Desconhecido',
      description: 'O Castelo de Guimarães é considerado o berço de Portugal e um dos mais emblemáticos monumentos do país.',
      lat: 41.448249,
      lon: -8.290090,
      marksCount: 32,
      suggestionsCount: 1
    },
    {
      id: 2,
      name: 'Mosteiro de Alcobaça',
      cover: 'https://www.viveromundo.org/wp-content/uploads/2019/07/DSC_0386-1-e1584724820977.jpg',
      location: 'Alcobaça, Portugal',
      artist_name: 'Bernardo de Claraval',
      material: 'stone',
      start_date: 1153,
      architect: 'Afonso Domingues',
      description: 'O Mosteiro de Alcobaça é Patrimônio Mundial da UNESCO e um dos maiores exemplos da arquitetura gótica em Portugal.',
      lat: 39.54835,
      lon: -8.97963,
      marksCount: 32,
      suggestionsCount: 1
    },
    {
      id: 3,
      name: 'Torre de Belém',
      cover: 'https://static-resources-elementor.mirai.com/wp-content/uploads/sites/1079/post_04_featured.jpg',
      location: 'Belém, Lisboa',
      artist_name: 'Francisco de Arruda',
      material: 'stone',
      start_date: 1515,
      architect: 'Francisco de Arruda',
      description: 'A Torre de Belém é um ícone de Lisboa e símbolo dos Descobrimentos Portugueses.',
      lat: 41.448249,
      lon: -8.290090,
      marksCount: 32,
      suggestionsCount: 1
    },
    {
      id: 4,
      name: 'Mosteiro dos Jerónimos',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Mosteiro_dos_Jeronimos_-_Left_Wing.jpg',
      location: 'Lisboa, Portugal',
      artist_name: 'Diogo de Boitaca',
      material: 'stone',
      start_date: 1501,
      architect: 'Diogo de Boitaca',
      description: 'O Mosteiro dos Jerónimos é uma obra-prima do estilo manuelino e Patrimônio Mundial da UNESCO.',
      lat: 41.448249,
      lon: -8.290090,
      marksCount: 32,
      suggestionsCount: 1
    },
    {
      id: 5,
      name: 'Mosteiro da Batalha',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Mosteiro_da_Batalha_78a.jpg',
      location: 'Batalha, Portugal',
      artist_name: 'Afonso Domingues',
      material: 'stone',
      start_date: 1386,
      architect: 'Afonso Domingues',
      description: 'O Mosteiro da Batalha celebra a vitória portuguesa na Batalha de Aljubarrota e é um dos maiores monumentos góticos do país.',
      lat: 41.448249,
      lon: -8.290090,
      marksCount: 32,
      suggestionsCount: 1
    },
    {
      id: 6,
      name: 'Convento de Cristo',
      cover: 'https://www.patrimoniomundialdocentro.pt/imagens/patrimonio/convento_de_cristo_de_tomar_5b05f68f396e6.jpg',
      location: 'Tomar, Portugal',
      artist_name: 'Diogo de Arruda',
      material: 'stone',
      start_date: 1160,
      architect: 'Diogo de Arruda',
      description: 'O Convento de Cristo foi sede da Ordem dos Templários e é Patrimônio Mundial da UNESCO.',
      lat: 41.448249,
      lon: -8.290090,
      marksCount: 32,
      suggestionsCount: 1
    }
  ];


  constructor(private http: HttpClient) {}

  /**
   * Consulta Overpass API (dados dinâmicos de monumentos reais)
   */
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
          .filter((el: any) => el.lat || el.center)
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

  /**
   * Devolve a lista de monumentos populares
   */
  getPopularMonuments(): Observable<Monument[]> {
    return of(this.MONUMENTS);
  }

  /**
   * Obtém um monumento específico por ID
   */
  getMonumentById(id: number): Observable<Monument | undefined> {
    const monument = this.MONUMENTS.find(m => m.id === id);
    return of(monument);
  }
}
