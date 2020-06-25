import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { MaterialModule } from '../../material/material/material.module';
import { SupplierComponent } from '../../supplier/supplier.component';
import { FactureComponent } from '../../facture/facture.component';
import { ReglementComponent } from '../../reglement/reglement.component';
import { AdministrationComponent } from 'app/administration/administration.component';
import { UtilisateurComponent } from 'app/utilisateur/utilisateur.component';
import { RolefonctionnelComponent } from 'app/rolefonctionnel/rolefonctionnel.component';
import { RoletechniqueComponent } from 'app/roletechnique/roletechnique.component';
import { ModalUtilisateurComponent } from 'app/utilisateur/modal-utilisateur/modal-utilisateur.component';
import { ReglementListComponent } from 'app/reglement-list/reglement-list.component';

// nouvel Modal Ajouter attention git
import { ModalRolefonctionnelComponent } from 'app/rolefonctionnel/modal-rolefonctionnel/modal-rolefonctionnel.component';
import { ModalRetenuComponent } from 'app/reglement-list/modal-retenu/modal-retenu.component';
// nouvel Modal Ajouter attention git
import { ModalAffiliationRoleComponent } from 'app/roletechnique/modal-affiliation-role/modal-affiliation-role.component';
import { BonAPayerComponent } from 'app/bon-apayer/bon-apayer.component';
import { ReglementRecupereComponent } from 'app/reglement-recupere/reglement-recupere.component';
import { SuiviBancaireComponent } from 'app/suivi-bancaire/suivi-bancaire.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        SupplierComponent,
        FactureComponent,
        ReglementComponent,
        AdministrationComponent,
        UtilisateurComponent,
        RolefonctionnelComponent,
        RoletechniqueComponent,
        ModalUtilisateurComponent,
        ReglementListComponent,
        ModalRolefonctionnelComponent,
        ModalRetenuComponent,
        ModalAffiliationRoleComponent,// nouvel Modal Ajouter attention git
        BonAPayerComponent,
        ReglementRecupereComponent,
        SuiviBancaireComponent
    ]
})

export class AdminLayoutModule { }
