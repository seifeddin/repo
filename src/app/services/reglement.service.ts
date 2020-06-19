import { Injectable } from '@angular/core';
import { ReglementDetail } from '../models/ReglementDetail';
import { Facture } from 'app/models/facture';
import { Observable, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})

export class ReglementService {
    httpClient: any;

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
    Edit(data: ReglementDetail): Observable<ReglementDetail> {
        return this.http.put<ReglementDetail>(`${environment.apiUrl}/api/DetailReglement`, data);
    }
    Delete(id: number): Observable<ReglementDetail> {
        // tslint:disable-next-line:max-line-length
        return this.http.delete<ReglementDetail>(`${environment.apiUrl}/api/DetailReglement`, { params: new HttpParams().set('id', id.toString()) });
    }
    updateFacture(element: Facture): Observable<Facture> {
        return this.http.put<Facture>(`${environment.apiUrl}/api/facture`, element);
    }


}
