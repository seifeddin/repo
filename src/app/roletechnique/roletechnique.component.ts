import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalRolefonctionnelComponent } from 'app/rolefonctionnel/modal-rolefonctionnel/modal-rolefonctionnel.component';
import { RoleFonctionnel } from 'app/models/RoleFonctionnel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminstrationService } from 'app/services/adminstration.service';
import { MatDialog } from '@angular/material/dialog';
import { RoleTechnique } from 'app/models/RoleTechnique';
import { ModalAffiliationRoleComponent } from './modal-affiliation-role/modal-affiliation-role.component';

@Component({
  selector: 'app-roletechnique',
  templateUrl: './roletechnique.component.html',
  styleUrls: ['./roletechnique.component.css']
})
export class RoletechniqueComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isRedOnly = true;
  public displayedColumnsRoleFonctionnel = ['Id', 'Description'];
  public displayedColumnsRoleTechnique = ['Id', 'Description', 'Operation'];
  public dataSourceRoleFonctionnel = new MatTableDataSource<RoleFonctionnel>();
  public dataSourceRoleTechnique = new MatTableDataSource<RoleTechnique>();
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
    this.dataSourceRoleTechnique.sort = this.sort;
    this.dataSourceRoleTechnique.paginator = this.paginator;
  }

  public getRoleFonctionnels() {
    this.service.getRoleFonctionnels().subscribe(res => {
      this.dataSourceRoleFonctionnel.data = res.map(x => new RoleFonctionnel(x)) as RoleFonctionnel[];
      this.selection.select(this.dataSourceRoleFonctionnel.data[0]);
    });
  }

  public getRoleFonctionnelById(id) {
    this.service.getRoleFonctionnelById(id).subscribe(res => {
      this.service.GetRoleTechniqueDtosByRoleFonctionel(res.Id).subscribe(res => {
        this.dataSourceRoleTechnique.data = res.map(x => new RoleTechnique(x)) as RoleTechnique[];
      })
    });
  }

  public Create() {
    const dialog = this.dialog.open(ModalAffiliationRoleComponent, {
      id: 'dialog1',
      height: '400px',
      width: '850px',
      data: { id: this.selection.selected[0].Id }
    });
    dialog.afterClosed().subscribe(x => {
      this.getRoleFonctionnels();
    });
  }
  public Edit(Id) {
    const dialog = this.dialog.open(ModalAffiliationRoleComponent, {
      id: 'dialog2',
      height: '400px',
      width: '850px',
      data: { id: Id }
    });
    dialog.afterClosed().subscribe(x => {
      this.getRoleFonctionnels();
    });
  }
  public Delete(roleTechniqueId, rolefonctionnelId) {
    Swal.fire({
      title: 'Voulez vous supprimer cet role fonctionnel ?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.service.DeleteRoleTechniqueFormFonctionnelRole(roleTechniqueId, this.selection.selected[0].Id).subscribe(x => {
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
