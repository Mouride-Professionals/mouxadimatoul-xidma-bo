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
        id: 'utilisateurs',
        title: 'Gestion des utilisateurs',
        type: 'basic',
        icon: 'heroicons_solid:users',
        link: 'utilisateurs',
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
                id: 'residences-reservations',
                title: 'Réservations',
                type: 'basic',
                link: 'residences/reservations',
            },
            {
                id: 'residences-reservations',
                title: 'Chambres',
                type: 'basic',
                link: 'residences/reservations',
            },  
            {
                id: 'residences-listes',
                title: 'liste des résidences',
                type: 'basic',
                link: 'residences',
            },
            {
                id: 'a-reservations',
                title: 'Pavillons',
                type: 'basic',
                link: 'h/reservations',
            }
        ],
    },
    {
        id: 'evenements',
        title: 'Événements',
        type: 'basic',
        icon: 'event',
        link: '/evenements',
    },
    {
        id: 'invites',
        title: 'Invités',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/invites',
    },
    /*{
        id: 'dons',
        title: 'Gestion des dons',
        type: 'basic',
        icon: 'mat_solid:money',
        link: '/dons',
    },*/
];
