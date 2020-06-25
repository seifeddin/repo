import { ReglementFacture } from "./ReglementFacture";
import { ReglementDetail } from "./ReglementDetail";
import { BonAPayer } from "./BonAPayer";
import { Retenu } from "./Retenu";
import { SuiviBancaire } from "./SuiviBancaire";

export class CanvasReglement {
    Id: number;
    Echeance: number;
    RaisonSocial: string;
    DateValidation: Date;
    ValiderPar: string;
    DateReglement: Date;
    IdRetenu?: number;
    IdSuiviBancaire?: number;
    IdBonAPayer?: number;
    IdBanque?: number;
    EstRegle: boolean;
    EstImpaye: boolean;
    EstPreavis: boolean;
    NumFRs: number;
    NumPreparation: string;
    MontantTotalEcheance: number;
    BonAPayer: BonAPayer;
    Retenu: Retenu;
    SuiviBancaire: SuiviBancaire;
    DetailReglement: ReglementDetail[];
    ReglementFacture: Array<ReglementFacture>;
}