import { Evenement } from '@core/model/evenement.model';
import { Chambre } from '@core/model/chambre.model';
import { Invite } from '@core/model/invite.model';

export type Reservation = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    dateEntree: Date;
    dateSortie: Date;
    dateSortieProvisoire: Date;
    statut: boolean;
    evenement: Evenement;
    chambre: Chambre;
    invite: Invite;
};
