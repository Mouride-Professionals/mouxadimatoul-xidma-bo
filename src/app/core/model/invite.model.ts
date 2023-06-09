import { Reservation } from './reservation.model';

export type Invite = {
    id: number;
    prenom: string;
    nom: string;
    telephone: string;
    adresse: string;
    email: string;
    reservations: Reservation[];
};
