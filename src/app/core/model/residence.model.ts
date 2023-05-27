import {Utilisateur} from '@core/model/utilisateur.model';
import {Pavillon} from '@core/model/pavillon.model';

export type Residence = {
    id: number;
    nom: string;
    photo: string;
    adresse: string;
    statut: boolean;
    responsable: Utilisateur;
    pavillon: Pavillon;
};


