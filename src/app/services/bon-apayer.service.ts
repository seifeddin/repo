import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BonAPayer } from 'app/models/BonAPayer';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BonAPayerService {

    constructor(private http: HttpClient) { }
    getAll(): Observable<BonAPayer[]> {
        return this.http.get<BonAPayer[]>(`${environment.apiUrl}/api/BonAPayer/GetAllBonApayer`);
    }
    Update(data: BonAPayer): Observable<BonAPayer> {
        return this.http.put<BonAPayer>(`${environment.apiUrl}/api/BonAPayer`, data);
    }

    GetReglementRecuperes(): Observable<BonAPayer[]> {
        return this.http.get<BonAPayer[]>(`${environment.apiUrl}/api/BonAPayer/GetBonsRecuperes`);
    }

}
