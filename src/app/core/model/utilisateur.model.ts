import {Role} from '@core/model/role.model';

export type Utilisateur = {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    statut: boolean;
    role: Role;
};
