import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Lookup } from '../models/Lookup';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    constructor(private http: HttpClient) { }
    getAll(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(`${environment.apiUrl}/api/Fournisseur/suppliers`);
    }
    getLookupFournisseur(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/Fournisseur/GetLookupSuppliers`);
    }
    getPdfDocument(): Observable<any> {
        debugger;
        const headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
        return this.http
            .get(`${environment.apiUrl}/api/Fournisseur/getFournisseurReport`,
                { headers: headers, responseType: 'arraybuffer', observe: 'response' as 'body' }
            );
    }
}
