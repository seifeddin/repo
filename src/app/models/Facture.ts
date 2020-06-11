export class Facture {
    Id: number;
    Reference: string;
    Date?: Date;
    Echeance?: Date;
    MontantTotale?: number;
    MontantDev?: number;
    MontantRegle?: number;
    MontantReste?: number;
    MontantAPayes: number;
    Statut: string;
    IdFournisseur: number;

    constructor(facture: Facture) {
        this.Id = facture.Id;
        this.Reference = facture.Reference;
        this.Date = facture.Date;
        this.Echeance = facture.Echeance;
        this.MontantTotale = facture.MontantTotale;
        this.MontantDev = facture.MontantDev;
        this.MontantRegle = facture.MontantRegle;
        this.MontantReste = facture.MontantReste;
        this.Statut = facture.Statut;
        this.IdFournisseur = facture.IdFournisseur;
        this.MontantAPayes = 0;
    }


}