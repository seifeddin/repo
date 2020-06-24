export class BonAPayer {
    Id: number;
    MontantRetenu?: number;
    MontantTotalEcheance?: number;
    NetAPayer?: number;
    ValiderPar: string;
    DateValidation?: Date;
    DateSignature?: Date;
    EstRegle?: boolean;
    EstValide?: boolean;

    //les information de fournisseur
    NumFRs: number;
    RaisonSocial: string;
    NomPrenom: string;

    //les informations de reglement
    NumReglement: number;
    EcheanceReglement?: Date;


}