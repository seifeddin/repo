
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../models';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type?: string;
    submenus?: RouteInfo[];
    active?: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', active: false, type: 'dropdown' },
    { path: '/supplier', title: 'Preparation Reglements', icon: 'bubble_chart', class: '', active: false, type: 'dropdown', submenus: [{ path: '/user-profile', title: 'User Profile1', icon: 'person', class: '', }, { path: '/user-profile', title: 'User Profile2', icon: 'person', class: '', }] },
    //     { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    //     { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    //     { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //     { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //     { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    //     { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('slide', [
            state('up', style({ height: 0 })),
            state('down', style({ height: '*' })),
            transition('up <=> down', animate(200))
        ])
    ]
})
export class SidebarComponent implements OnInit {
    menus = [];
    currentUser: User;
    constructor(public sidebarservice: SidebarService, private router: Router, private authentificationService: AuthenticationService) {
        this.menus =
            //ROUTES;
            sidebarservice.getMenuList();
        this.authentificationService.currentUser.subscribe(x => this.currentUser = x);
        console.log(this.currentUser);
    }

    ngOnInit() {
    }

    logout() {
        this.authentificationService.logout();
        this.router.navigate(['/login']);
    }
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    toggle(currentMenu) {
        if (currentMenu.type === 'dropdown' || currentMenu.type === 'simple') {
            this.menus.forEach(element => {
                if (element === currentMenu) {
                    currentMenu.active = !currentMenu.active;
                } else {
                    element.active = false;
                }
            });
        }
    }

    getState(currentMenu) {

        if (currentMenu.active) {
            return 'down';
        } else {
            return 'up';
        }
    }

    hasBackgroundImage() {
        return this.sidebarservice.hasBackgroundImage;
    }

}

