import { Pavillon } from './pavillon.model';
import { Responsable } from './responsable.model';

export type Chambre = {
    id: number;
    numero: number;
    nombrePlace: number;
    placeReservee: number;
    placeChoisie?: number;
    reference: string;
    pavillon: Pavillon;
    responsables: Responsable[];
};
