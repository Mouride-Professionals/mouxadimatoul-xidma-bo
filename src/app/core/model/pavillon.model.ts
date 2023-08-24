import { Chambre } from '@core/model/chambre.model';
import { Residence } from './residence.model';

export type Pavillon = {
    id: number;
    libelle: string;
    niveau: number;
    residence: Residence;
    chambres: Chambre[];
};
