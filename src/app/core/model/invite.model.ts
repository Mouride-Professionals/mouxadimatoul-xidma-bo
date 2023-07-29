import { Delegation } from './delegation.model';
import { Reservation } from './reservation.model';

export type Invite = {
    id: number;
    prenom: string;
    nom: string;
    telephone: string;
    adresse: string;
    email: string;
    delegation?: Delegation;
    estResponsable: boolean;
    reservations: Reservation[];
};
