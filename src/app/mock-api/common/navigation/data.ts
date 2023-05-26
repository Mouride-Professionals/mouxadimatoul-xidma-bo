/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        link: '/dashboard',
    },
    {
        id: 'admin',
        title: 'Administration',
        type: 'collapsable',
        icon: 'heroicons_solid:users',
        children: [
            {
                id: 'admin-users',
                title: 'Utilisateurs',
                type: 'basic',
                link: 'admin/users',
            },
            {
                id: 'admin-roles',
                title: 'Roles',
                type: 'basic',
                link: 'admin/roles',
            },
            {
                id: 'admin-acces',
                title: "Droits d'accès",
                type: 'basic',
                link: 'admin/acces',
            },
        ],
    },
    {
        id: 'residences',
        title: 'Résidences',
        type: 'collapsable',
        icon: 'mat_solid:home',
        children: [
            {
                id: 'residences-dashbord',
                title: 'Tableau de bord',
                type: 'basic',
                link: 'residences/dashboard',
            },
            {
                id: 'residences-listes',
                title: 'Voir la liste',
                type: 'basic',
                link: 'residences',
            },
            {
                id: 'residences-reservations',
                title: 'Réservations',
                type: 'basic',
                link: 'residences/reservations',
            },
        ],
    },
    {
        id: 'dons',
        title: 'Gestion des dons',
        type: 'basic',
        icon: 'mat_solid:money',
        link: '/dons',
    },
];
