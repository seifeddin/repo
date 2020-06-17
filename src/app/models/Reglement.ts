export class Reglement {
    Id: number;
    Echeance: number;
    DateValidation: Date;
    ValiderPar: string;
    DateReglement: Date;
    IdRetenu?: number;
    IdSuiviBancaire?: number;
    IdBonAPayer?: number;
    NumFrs: number;
    NumPreparation: string;
    Montant: number;
}