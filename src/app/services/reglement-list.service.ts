import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reglement } from 'app/models/Reglement';
import { environment } from 'environments/environment';
import { BonAPayer } from 'app/models/BonAPayer';
import { Supplier } from 'app/models/supplier';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { RubriqueRetenu } from 'app/models/RubriqueRetenu';
import { Retenu } from 'app/models/Retenu';

@Injectable({
    providedIn: 'root'
})
export class ReglementListService {

    constructor(private http: HttpClient) { }
    getLookupFournisseur(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/Fournisseur/GetLookupSuppliers`);
    }
    GetAllByFrs(id: number): Observable<Reglement[]> {
        if (id !== undefined && id !== NaN) {
            return this.http.get<Reglement[]>(`${environment.apiUrl}/api/Fournisseur/GetReglementDtosByFournissuer/` + id);
        }
        return null;
    }
    GetFrsById(id: number): Observable<Supplier> {
        return this.http.get<Supplier>(`${environment.apiUrl}/api/Fournisseur/GetFournisseur/` + id);
    }

    GetMontantRegelement(id: number): Observable<number> {

        return this.http.get<number>(`${environment.apiUrl}/api/Reglement/GetMontantRegelement/` + id);
    }
    GetTotalMontantRetenu(id: number): Observable<number> {
        return this.http.get<number>(`${environment.apiUrl}/api/Reglement/GetTotalMontantRetenu/` + id);
    }
    AddBonAPayer(bon: BonAPayer): Observable<BonAPayer> {
        return this.http.post<BonAPayer>(`${environment.apiUrl}/api/BonAPayer/`, bon)
    }
    UpdateReglement(reg: Reglement): Observable<Reglement> {

        return this.http.put<Reglement>(`${environment.apiUrl}/api/Reglement`, reg);
    }
    getLookupRubrique(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/Rubrique/GetLookup`);
    }
    getLookupAnnexe(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/Annexe/GetLookup`);
    }

    AddRetenu(retenu: Retenu): Observable<Retenu> {
        debugger;
        console.log(retenu);
        return this.http.post<Retenu>(`${environment.apiUrl}/api/Retenu/Validate`, retenu);
    }
    // Get(id: number): Observable<RubriqueRetenu[]> {
    //     return this.http.get<RubriqueRetenu[]>(`${environment.apiUrl}/api/RubriqueRetenu/GetByReglement/` + id);
    // }
    // Add(data: RubriqueRetenu): Observable<RubriqueRetenu> {
    //     return this.http.post<RubriqueRetenu>(`${environment.apiUrl}/api/RubriqueRetenu`, data);
    // }
    // Edit(data: RubriqueRetenu): Observable<RubriqueRetenu> {
    //     return this.http.put<RubriqueRetenu>(`${environment.apiUrl}/api/RubriqueRetenu`, data);
    // }
    // Delete(id: number): Observable<RubriqueRetenu> {
    //     // tslint:disable-next-line:max-line-length
    //     return this.http.delete<RubriqueRetenu>(`${environment.apiUrl}/api/RubriqueRetenu`, { params: new HttpParams().set('id', id.toString()) });
    // }

}
