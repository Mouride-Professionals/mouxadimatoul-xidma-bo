import { Utilisateur } from '@core/model/utilisateur.model';
import { Pavillon } from '@core/model/pavillon.model';
import { Image } from '@core/model/image.model';

export type Residence = {
    id: number;
    libelle: string;
    image: Image;
    telephoneResidence: string;
    adresse: string;
    statut: boolean;
    responsable: Utilisateur;
    pavillons: Pavillon[];
};
