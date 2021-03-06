import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    toggled = false;
    _hasBackgroundImage = true;
    administration = { title: 'admin', path: '/administration' };
    menus = [
        {
            title: 'Dashboard',
            icon: 'fa fa-tachometer',
            active: false,
            type: 'simple'
        },
        {
            title: 'Payements',
            icon: 'fa fa-shopping-cart',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Preparation',
                    path: '/supplier',
                },
                {
                    title: 'Generation',
                    path: '/reglement-list',
                }
            ]
        },
        {
            title: 'Situation Règlements',
            icon: 'fas fa-balance-scale-right',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Signature',
                    path: '/bon-apayer',
                },
                {
                    title: 'Recupération',
                    path: '/reglement-recupere',
                }
            ]
        },
        {
            title: 'Suivi Bancaire',
            icon: 'fas fa-money-check',
            active: true,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Suivi',
                    path: '/suivi-bancaire',
                },
            ]
        }
    ];
    constructor() { }

    toggle() {
        this.toggled = !this.toggled;
    }

    getSidebarState() {
        return this.toggled;
    }

    setSidebarState(state: boolean) {
        this.toggled = state;
    }

    getMenuList() {
        return this.menus;
    }

    get hasBackgroundImage() {
        return this._hasBackgroundImage;
    }

    set hasBackgroundImage(hasBackgroundImage) {
        this._hasBackgroundImage = hasBackgroundImage;
    }
}
