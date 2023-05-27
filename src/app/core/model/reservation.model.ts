import {Evenement} from "@core/model/evenement.model";
import {Chambre} from "@core/model/chambre.model";
import {Invite} from "@core/model/invite.model";

export type Reservation = {
    id: number;
    dateEntree: Date;
    dateProvisoire: Date;
    dateSortie: Date;
    evenement: Evenement;
    chambre: Chambre;
    invite: Invite;
};

