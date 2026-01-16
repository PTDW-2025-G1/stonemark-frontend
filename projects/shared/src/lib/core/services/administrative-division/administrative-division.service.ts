import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { AdministrativeDivisionDto } from '@api/model/administrative-division-dto';
import { MessageResponseDto } from '@api/model/message-response-dto';

@Injectable({ providedIn: 'root' })
export class AdministrativeDivisionService {

  private baseUrl = `${environment.apiUrl}/divisions`;
  private importUrl = `${environment.apiUrl}/import`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<AdministrativeDivisionDto> {
    return this.http.get<AdministrativeDivisionDto>(`${this.baseUrl}/${id}`);
  }

  getDistricts(withMonuments: boolean = false): Observable<AdministrativeDivisionDto[]> {
    const params = new HttpParams().set('withMonuments', withMonuments.toString());
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/districts`, { params });
  }

  getMunicipalities(withMonuments: boolean = false): Observable<AdministrativeDivisionDto[]> {
    const params = new HttpParams().set('withMonuments', withMonuments.toString());
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/municipalities`, { params });
  }

  getParishes(withMonuments: boolean = false): Observable<AdministrativeDivisionDto[]> {
    const params = new HttpParams().set('withMonuments', withMonuments.toString());
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/parishes`, { params });
  }

  getMunicipalitiesByDistrict(districtId: number): Observable<AdministrativeDivisionDto[]> {
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/districts/${districtId}/municipalities`);
  }

  getParishesByMunicipality(municipalityId: number): Observable<AdministrativeDivisionDto[]> {
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/municipalities/${municipalityId}/parishes`);
  }

  getDistrictByMunicipality(municipalityId: number): Observable<AdministrativeDivisionDto> {
    return this.http.get<AdministrativeDivisionDto>(`${this.baseUrl}/municipalities/${municipalityId}/district`);
  }

  getMunicipalityByParish(parishId: number): Observable<AdministrativeDivisionDto> {
    return this.http.get<AdministrativeDivisionDto>(`${this.baseUrl}/parishes/${parishId}/municipality`);
  }

  getDivisionsByCoordinates(latitude: number, longitude: number): Observable<AdministrativeDivisionDto[]> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString());
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/coordinates`, { params });
  }

  importDivisionsFromPbf(file: File): Observable<MessageResponseDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MessageResponseDto>(`${this.importUrl}/divisions/pbf`, formData);
  }
}
