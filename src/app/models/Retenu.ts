import { RubriqueRetenu } from "./RubriqueRetenu";
import { Reglement } from "./Reglement";

export class Retenu {
    Id: number;
    Date?: Date;
    NumeroCertficat?: number;
    TypeMontant: string;
    DateValidation?: Date;
    ValiderPar: string;
    RubriqueRetenu: Array<RubriqueRetenu>;
}