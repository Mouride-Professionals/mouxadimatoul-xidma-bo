export type AccountType = 'ADMIN' | 'KHIDMA_AGENT';

export type Utilisateur = {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    whatsapp: string;
    statut: boolean;
    accountType: AccountType;
    hasAssignment?: boolean;
    assignedResidenceName?: string;
};
