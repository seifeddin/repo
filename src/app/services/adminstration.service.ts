import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from 'app/models/Utilisateur';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lookup } from 'app/models/Lookup';
import { RoleFonctionnel } from 'app/models/RoleFonctionnel';

@Injectable({
  providedIn: 'root'
})
export class AdminstrationService {

  constructor(private http: HttpClient) { }

  getUtilisateurs(): Observable<Utilisateur[]> {

    return this.http.get<Utilisateur[]>(`${environment.apiUrl}/api/Utilisateur/GetUtilisateurs`);

  }
  getUtilisateurById(id): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${environment.apiUrl}/api/Utilisateur/GetUtilisateurById/` + id);
  };
  getRoleFonctionnelLookUp(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/api/RoleFonctionnel/GetLookup`);
  }
  Delete(id: number): Observable<boolean> {
    console.log(id);
    return this.http.delete<boolean>(`${environment.apiUrl}/api/Utilisateur/Delete/` + id);
  }
  AddUser(data: Utilisateur): Observable<Utilisateur> {
    console.log(data);
    return this.http.post<Utilisateur>(`${environment.apiUrl}/api/Utilisateur`, data);
  }
  EditUser(data: Utilisateur): Observable<Utilisateur> {

    return this.http.put<Utilisateur>(`${environment.apiUrl}/api/Utilisateur`, data);
  }

  getRoleFonctionnels(): Observable<RoleFonctionnel[]> {

    return this.http.get<RoleFonctionnel[]>(`${environment.apiUrl}/api/RoleFonctionnel`);
  }

  getRoleFonctionnelById(id): Observable<RoleFonctionnel> {

    return this.http.get<RoleFonctionnel>(`${environment.apiUrl}/api/RoleFonctionnel/GetById/` + id);
  }

  EditRoleFonctionnel(data: RoleFonctionnel): Observable<RoleFonctionnel> {
    return this.http.put<RoleFonctionnel>(`${environment.apiUrl}/api/RoleFonctionnel`, data);
  }

  AddRoleFonctionnel(data: RoleFonctionnel): Observable<RoleFonctionnel> {
    return this.http.post<RoleFonctionnel>(`${environment.apiUrl}/api/RoleFonctionnel`, data);
  }
}
