import { Injectable } from '@angular/core';
import { ReglementDetail } from '../models/ReglementDetail';
import { Facture } from 'app/models/facture';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ReglementService {

    constructor(private http: HttpClient) { }



    getLookupBanque(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/Banque/GetLookup/`);
    }
    getLookupCaisse(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/Caisse/GetLookup/`);
    }
    getLookupModeReglement(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/ModeReglement/GetLookup/`);
    }

    Get(id: number): Observable<ReglementDetail[]> {
        return this.http.get<ReglementDetail[]>(`${environment.apiUrl}/api/DetailReglement/GetByReglement/` + id);
    }
    Add(data: ReglementDetail): Observable<ReglementDetail> {
        console.log(data);
        return this.http.post<ReglementDetail>(`${environment.apiUrl}/api/DetailReglement`, data);
    }
    Edit(data: ReglementDetail) {
        this.http.put(`${environment.apiUrl}/api/DetailReglement`, data);
    }
    Delete(id: number) {
        this.http.delete(`${environment.apiUrl}/api/DetailReglement`, { params: new HttpParams().set('id', id.toString()) });
    }
    updateFacture(element: Facture) {
        this.http.put(`${environment.apiUrl}/api/facture`, element);
    }

}
