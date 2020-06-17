import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    toggled = false;
    _hasBackgroundImage = true;
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
                },
                {
                    title: 'Facture',
                    path: '/facture',
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
