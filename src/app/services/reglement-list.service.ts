import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reglement } from 'app/models/Reglement';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReglementListService {

    constructor(private http: HttpClient) { }
    getLookupFournisseur(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/Fournisseur/GetLookupSuppliers`);
    }
    GetAllByFrs(id: number): Observable<Reglement[]> {
        return this.http.get<Reglement[]>(`${environment.apiUrl}/api/Reglement/GetReglementByFrs`);
    }
}
