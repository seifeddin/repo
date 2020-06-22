export class Supplier {
    Id: number;
    RaisonSocial: string;
    Nom: string;
    Prenom: string;
    Status: number;
    FraisGeneraux?: number;
    Solde: number;
    EcheanceDate: Date;
    EstPhysique: boolean;
    EstMorale: boolean;
}
