import { Reservation } from './reservation.model';
import { Residence } from './residence.model';
import { Utilisateur } from './utilisateur.model';

export type Accueillant = {
    id: number;
    utilisateur: Utilisateur;
    residence: Residence;
    reservations: Reservation[];
};
