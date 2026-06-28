import { Residence } from './residence.model';
import { Utilisateur } from './utilisateur.model';

export type Responsibility = 'ACCUEILLANT' | 'RESPONSABLE_DELEGATION' | 'CHEF_CHAMBRE';

export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type RotationSlot = {
    id?: number;
    dayOfWeek: DayOfWeek | null;
    fromTime: string;
    toTime: string;
};

export type Assignment = {
    id?: number;
    agent: Utilisateur;
    residence: Residence;
    responsibilities: Responsibility[];
    rotationSlots: RotationSlot[];
    startDate?: string;
    endDate?: string;
};

export const ALL_RESPONSIBILITIES: Responsibility[] = [
    'ACCUEILLANT',
    'RESPONSABLE_DELEGATION',
    'CHEF_CHAMBRE',
];

export const ALL_DAYS: DayOfWeek[] = [
    'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY',
];
