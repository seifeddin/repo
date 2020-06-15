import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from 'app/models/facture';
import { environment } from 'environments/environment';
import { Reglement } from 'app/models/Reglement';
import { ReglementFacture } from 'app/models/ReglementFacture';


@Injectable({
    providedIn: 'root'
})

export class FactureService {

    constructor(private http: HttpClient) { }
    getFacturesByFournisseurs(id: number): Observable<Facture[]> {
        return this.http.get<Facture[]>(`${environment.apiUrl}/api/Facture/factures/` + id);
    }
    AddReglement(reg: Reglement): Observable<Reglement> {
        return this.http.post<Reglement>(`${environment.apiUrl}/api/Reglement`, reg);
    }
    AddReglementFacture(reg: ReglementFacture): Observable<any> {
        return this.http.post(`${environment.apiUrl}/api/ReglementFacture`, reg);
    }
}
