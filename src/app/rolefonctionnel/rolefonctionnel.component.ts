import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleFonctionnel } from 'app/models/RoleFonctionnel';
import { AdminstrationService } from 'app/services/adminstration.service';
import { Utilisateur } from 'app/models/Utilisateur';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalRolefonctionnelComponent } from './modal-rolefonctionnel/modal-rolefonctionnel.component';

@Component({
    selector: 'app-rolefonctionnel',
    templateUrl: './rolefonctionnel.component.html',
    styleUrls: ['./rolefonctionnel.component.css']
})
export class RolefonctionnelComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isRedOnly = true;
    public displayedColumnsRoleFonctionnel = ['Id', 'Description', 'Operation'];
    public displayedColumnsUtilisateur = ['Id', 'NomUtilisateur'];
    public dataSourceRoleFonctionnel = new MatTableDataSource<RoleFonctionnel>();
    public dataSourceUtilisateur = new MatTableDataSource<Utilisateur>();
    public selection = new SelectionModel<RoleFonctionnel>(false, [this.dataSourceRoleFonctionnel.data[0]]);
    constructor(private service: AdminstrationService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.getRoleFonctionnels();
        this.selection.changed.subscribe(x => {
            this.getRoleFonctionnelById(x.source.selected.map(y => y.Id)[0]);
        });
    }

    ngAfterViewInit(): void {
        this.dataSourceRoleFonctionnel.sort = this.sort;
        this.dataSourceRoleFonctionnel.paginator = this.paginator;
        this.dataSourceUtilisateur.sort = this.sort;
        this.dataSourceUtilisateur.paginator = this.paginator;

    }
    public getRoleFonctionnels() {
        this.service.getRoleFonctionnels().subscribe(res => {
            this.dataSourceRoleFonctionnel.data = res.map(x => new RoleFonctionnel(x)) as RoleFonctionnel[];
            this.selection.select(this.dataSourceRoleFonctionnel.data[0]);
        });
    }

    public getRoleFonctionnelById(id) {
        this.service.getRoleFonctionnelById(id).subscribe(res => {
            console.log(res.Utilisateur);
            this.dataSourceUtilisateur.data = res.Utilisateur.map(x => new Utilisateur(x)) as Utilisateur[];
        });
    }

    public Create() {
        const dialog = this.dialog.open(ModalRolefonctionnelComponent, {
            id: 'dialog1',
            height: '450px',
            width: '850px',
            data: { id: null }
        });
        dialog.afterClosed().subscribe(x => {
            this.getRoleFonctionnels();
        });
    }
    public Edit(Id) {
        const dialog = this.dialog.open(ModalRolefonctionnelComponent, {
            id: 'dialog2',
            height: '450px',
            width: '850px',
            data: { id: Id }
        });
        dialog.afterClosed().subscribe(x => {
            this.getRoleFonctionnels();
        });
    }
    public Delete(Id) {
        Swal.fire({
            title: 'Voulez vous supprimer cet role fonctionnel ?',
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                this.service.DeleteRoleFonctionnel(Id).subscribe(x => {
                    Swal.fire(
                        'role fonctionnel supprimé avec succés',
                        'success'
                    );
                    this.getRoleFonctionnels();
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Suppression Annulé',
                    'error'
                )
            }
        })
    }

}
