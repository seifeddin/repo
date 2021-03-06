import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { SupplierComponent } from '../../supplier/supplier.component';
import { FactureComponent } from '../../facture/facture.component';
import { ReglementComponent } from '../../reglement/reglement.component';
import { ReglementListComponent } from 'app/reglement-list/reglement-list.component';
import { AdministrationComponent } from 'app/administration/administration.component';
import { BonAPayerComponent } from 'app/bon-apayer/bon-apayer.component';
import { ReglementRecupereComponent } from 'app/reglement-recupere/reglement-recupere.component';
import { SuiviBancaireComponent } from 'app/suivi-bancaire/suivi-bancaire.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'supplier', component: SupplierComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'facture', component: FactureComponent },
    { path: 'reglement', component: ReglementComponent },
    { path: 'reglement-list', component: ReglementListComponent },
    { path: 'administration', component: AdministrationComponent },
    { path: 'bon-apayer', component: BonAPayerComponent },
    { path: 'reglement-recupere', component: ReglementRecupereComponent },
    { path: 'suivi-bancaire', component: SuiviBancaireComponent }
];
