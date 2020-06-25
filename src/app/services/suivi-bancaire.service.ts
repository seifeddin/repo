import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reglement } from 'app/models/Reglement';
import { environment } from 'environments/environment';
import { CanvasReglement } from 'app/models/CanvasReglement';

@Injectable({
  providedIn: 'root'
})
export class SuiviBancaireService {

  constructor(private http: HttpClient) { }

  GetReglementPourSuivi(): Observable<CanvasReglement[]> {
    return this.http.get<CanvasReglement[]>(`${environment.apiUrl}/api/SuiviBancaire/GetReglementPourSuivi`);
  }

}
