import { RubriqueRetenu } from "./RubriqueRetenu";
import { Reglement } from "./Reglement";

export class Retenu {
    Id: number;
    Date?: Date;
    NumeroCertficat?: number;
    TypeMontant: string;
    IdReglement: number;
    DateValidation?: Date;
    ValiderPar: string;
    RubriqueRetenu: Array<RubriqueRetenu>;
    Reglement: Reglement;
}