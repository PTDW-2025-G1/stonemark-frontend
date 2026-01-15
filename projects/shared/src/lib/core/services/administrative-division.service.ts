import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { AdministrativeDivisionDto } from '@api/model/administrative-division-dto';

@Injectable({ providedIn: 'root' })
export class AdministrativeDivisionService {
  private baseUrl = `${environment.apiUrl}/divisions`;

  constructor(private http: HttpClient) {}

  getDistricts(): Observable<AdministrativeDivisionDto[]> {
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/districts`);
  }

  getMunicipalities(): Observable<AdministrativeDivisionDto[]> {
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/municipalities`);
  }

  getParishes(): Observable<AdministrativeDivisionDto[]> {
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/parishes`);
  }

  getMunicipalitiesByDistrict(districtId: number): Observable<AdministrativeDivisionDto[]> {
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/districts/${districtId}/municipalities`);
  }

  getParishesByMunicipality(municipalityId: number): Observable<AdministrativeDivisionDto[]> {
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/municipalities/${municipalityId}/parishes`);
  }

  getDivisionsByCoordinates(latitude: number, longitude: number): Observable<AdministrativeDivisionDto[]> {
    return this.http.get<AdministrativeDivisionDto[]>(`${this.baseUrl}/coordinates?latitude=${latitude}&longitude=${longitude}`);
  }
}
