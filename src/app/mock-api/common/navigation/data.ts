/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'navigation.dashboard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        link: '/dashboard',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_KHIDMA_AGENT', 'ROLE_KHIDMA_AGENT'],
            translationKey: 'navigation.dashboard',
        },
    },
    {
        id: 'utilisateurs',
        title: 'navigation.users',
        type: 'basic',
        icon: 'heroicons_solid:users',
        link: 'utilisateurs',
        meta: {
            roles: ['ROLE_ADMIN'],
            translationKey: 'navigation.users',
        },
    },
    {
        id: 'residences',
        title: 'navigation.residences',
        type: 'basic',
        icon: 'mat_solid:home',
        link: 'residences',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_KHIDMA_AGENT'],
            translationKey: 'navigation.residences',
        },
    },
    {
        id: 'reservations',
        title: 'navigation.reservations',
        type: 'basic',
        icon: 'heroicons_solid:bookmark',
        link: 'reservations',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_KHIDMA_AGENT', 'ROLE_KHIDMA_AGENT'],
            translationKey: 'navigation.reservations',
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
        title: 'navigation.events',
        type: 'basic',
        icon: 'event',
        link: '/evenements',
        meta: {
            roles: ['ROLE_ADMIN'],
            translationKey: 'navigation.events',
        },
    },
    {
        id: 'delegations',
        title: 'navigation.delegations',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/delegations',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_KHIDMA_AGENT', 'ROLE_KHIDMA_AGENT'],
            translationKey: 'navigation.delegations',
        },
    },
    // Accueillants and Responsables nav entries removed — Phase 2 replaces
    // these standalone screens with the Équipe Khidma assignment model
    // (agents are assigned per residence with responsibilities from the
    // residence detail screen). Re-enable if legacy screens are needed.
    // {
    //     id: 'accueillants',
    //     title: 'navigation.hosts',
    //     type: 'basic',
    //     icon: 'heroicons_outline:user-group',
    //     link: '/accueillants',
    //     meta: { roles: ['ROLE_ADMIN', 'ROLE_KHIDMA_AGENT'], translationKey: 'navigation.hosts' },
    // },
    // {
    //     id: 'responsables',
    //     title: 'navigation.roomManagers',
    //     type: 'basic',
    //     icon: 'heroicons_outline:user-group',
    //     link: '/responsables',
    //     meta: { roles: ['ROLE_ADMIN', 'ROLE_KHIDMA_AGENT'], translationKey: 'navigation.roomManagers' },
    // },
    /*{
        id: 'dons',
        title: 'Gestion des dons',
        type: 'basic',
        icon: 'mat_solid:money',
        link: '/dons',
    },*/
];
