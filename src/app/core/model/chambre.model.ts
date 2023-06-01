import { Pavillon } from './pavillon.model';

export type Chambre = {
    id: number;
    numero: number;
    nombrePlace: number;
    reference: string;
    pavillon: Pavillon;
};
