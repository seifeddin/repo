import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reglement } from 'app/models/Reglement';
import { environment } from 'environments/environment';
import { BonAPayer } from 'app/models/BonAPayer';

@Injectable({
    providedIn: 'root'
})
export class ReglementListService {

    constructor(private http: HttpClient) { }
    getLookupFournisseur(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/Fournisseur/GetLookupSuppliers`);
    }
    GetAllByFrs(id: number): Observable<Reglement[]> {
        return this.http.get<Reglement[]>(`${environment.apiUrl}/api/Reglement/GetReglementDtosByFournissuer/` + id);
    }

    AddBonAPayer(bon: BonAPayer): Observable<BonAPayer> {
        return this.http.post<BonAPayer>(`${environment.apiUrl}/api/BonAPayer/`, bon)
    }
    UpdateReglement(reg: Reglement): Observable<Reglement> {
        return this.http.put<Reglement>(`${environment.apiUrl}api/Reglement`, reg);
    }
}
