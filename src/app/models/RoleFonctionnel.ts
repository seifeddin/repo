import { Utilisateur } from "./Utilisateur";

export class RoleFonctionnel {
    Id: number;
    Description: string;
    Utilisateur: Utilisateur[];

    /**
     *
     */
    constructor(role: RoleFonctionnel) {
        if (role !== undefined) {
            this.Id = role.Id;
            this.Description = role.Description;
            this.Utilisateur = role.Utilisateur;
        }
    }
}