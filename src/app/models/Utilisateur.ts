import { RoleFonctionnel } from "./RoleFonctionnel";

export class Utilisateur {
    Id: number;
    IdRoleFonctionnel: number;
    NomUtilisateur: string;
    Nom: string;
    Prenom: string;
    MotDePasse: string;
    Email: string;
    Telephone: string
    EstActive: boolean;
    RoleFonctionnel: RoleFonctionnel;

    constructor(utilisateur: Utilisateur) {
        if (utilisateur !== undefined) {
            this.Id = utilisateur.Id;
            this.Email = utilisateur.Email;
            this.EstActive = utilisateur.EstActive;
            this.IdRoleFonctionnel = utilisateur.IdRoleFonctionnel;
            this.MotDePasse = utilisateur.MotDePasse;
            this.Nom = utilisateur.Nom;
            this.Prenom = utilisateur.Prenom;
            this.Telephone = utilisateur.Telephone;
            this.NomUtilisateur = utilisateur.NomUtilisateur;
            this.RoleFonctionnel = utilisateur.RoleFonctionnel ?? new RoleFonctionnel(undefined);
        }

    }
}