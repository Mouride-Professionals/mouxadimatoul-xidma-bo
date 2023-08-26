import { Chambre } from './chambre.model';
import { Residence } from './residence.model';

export type Responsable = {
    id: number;
    prenom: string;
    nom: string;
    telephone: string;
    residence: Residence;
    chambres: Chambre[];
};
