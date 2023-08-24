import { Reservation } from './reservation.model';
import { Residence } from './residence.model';

export type Accueillant = {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    residence: Residence;
    reservations: Reservation[];
};
