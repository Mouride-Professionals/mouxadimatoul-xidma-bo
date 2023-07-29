import { Invite } from './invite.model';

export type Delegation = {
    id: number;
    nom: string;
    nombre: number;
    chef: Invite;
    invites: Invite[];
};
