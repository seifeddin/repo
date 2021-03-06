import { Utilisateur } from "./Utilisateur";
import { FoncTechRole } from "./FoncTechRole";

export class RoleFonctionnel {
    Id: number;
    Description: string;
    Utilisateur: Utilisateur[];
    FoncTechRole: FoncTechRole[];

    /**
     *
     */
    constructor(role: RoleFonctionnel) {
        if (role !== undefined) {
            this.Id = role.Id;
            this.Description = role.Description;
            this.Utilisateur = role.Utilisateur;
            this.FoncTechRole = role.FoncTechRole;
        }
    }
}