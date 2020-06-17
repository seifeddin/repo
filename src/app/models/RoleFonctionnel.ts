export class RoleFonctionnel {
    Id: number;
    Description: string;

    /**
     *
     */
    constructor(role: RoleFonctionnel) {
        if (role !== undefined) {
            this.Id = role.Id;
            this.Description = role.Description;
        }
    }
}