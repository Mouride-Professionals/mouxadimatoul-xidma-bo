import {Chambre} from '@core/model/chambre.model';

export type Pavillon = {
    id: number;
    libelle: string;
    statut: boolean;
    chambre: Chambre;
};
