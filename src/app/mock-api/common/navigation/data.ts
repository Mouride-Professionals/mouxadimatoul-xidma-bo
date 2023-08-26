/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        link: '/dashboard',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_RESPONSABLE', 'ROLE_ACCUEILLANT'],
        },
    },
    {
        id: 'utilisateurs',
        title: 'Gestion des utilisateurs',
        type: 'basic',
        icon: 'heroicons_solid:users',
        link: 'utilisateurs',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
    },
    {
        id: 'residences',
        title: 'Résidences',
        type: 'basic',
        icon: 'mat_solid:home',
        link: 'residences',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_RESPONSABLE'],
        },
    },
    {
        id: 'reservations',
        title: 'Réservations',
        type: 'basic',
        icon: 'heroicons_solid:bookmark',
        link: 'reservations',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_RESPONSABLE', 'ROLE_ACCUEILLANT'],
        },
    },
    // {
    //     id: 'residences',
    //     title: 'Résidences',
    //     type: 'collapsable',
    //     icon: 'mat_solid:home',
    //     children: [
    //         {
    //             id: '/dashbord',
    //             title: 'Tableau de bord',
    //             type: 'basic',
    //             link: 'residences/dashboard',
    //         },
    //         {
    //             id: '/reservation',
    //             title: 'Réservations',
    //             type: 'basic',
    //             link: 'residences/reservation',
    //         },
    //         {
    //             id: '/chambre',
    //             title: 'Chambres',
    //             type: 'basic',
    //             link: 'residences/chambre',
    //         },
    //         {
    //             id: '/liste-residences',
    //             title: 'liste des résidences',
    //             type: 'basic',
    //             link: 'residences/liste-residences',
    //         },
    //         {
    //             id: '/pavillon',
    //             title: 'Pavillons',
    //             type: 'basic',
    //             link: 'residences/pavillon',
    //         }
    //     ],
    // },
    {
        id: 'evenements',
        title: 'Événements',
        type: 'basic',
        icon: 'event',
        link: '/evenements',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
    },
    {
        id: 'delegations',
        title: 'Délégations',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/delegations',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_RESPONSABLE', 'ROLE_ACCUEILLANT'],
        },
    },
    {
        id: 'accueillants',
        title: 'Accueillants',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/accueillants',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_RESPONSABLE'],
        },
    },
    {
        id: 'responsables',
        title: 'Responsables des chambres',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/responsables',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_RESPONSABLE'],
        },
    },
    /*{
        id: 'dons',
        title: 'Gestion des dons',
        type: 'basic',
        icon: 'mat_solid:money',
        link: '/dons',
    },*/
];
