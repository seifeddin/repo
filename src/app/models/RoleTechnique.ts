import { FoncTechRole } from "./FoncTechRole";

export class RoleTechnique {

    Id: number;
    Description: string;
    FoncTechRole: FoncTechRole[];

    /**
     *
     */
    constructor(role: RoleTechnique) {
        if (role !== undefined) {
            this.Id = role.Id;
            this.Description = role.Description;
            this.FoncTechRole = role.FoncTechRole;
        }
    }
}