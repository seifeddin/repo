import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Utilisateur } from 'app/models/Utilisateur';
import { MatTableDataSource } from '@angular/material/table';
import { AdminstrationService } from 'app/services/adminstration.service';
import Swal from 'sweetalert2';
import { ModalUtilisateurComponent } from './modal-utilisateur/modal-utilisateur.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isRedOnly = true;
  public displayedColumns = ['Id', 'NomUtilisateur', 'Nom', 'Prenom', 'MotDePasse', 'Email', 'Telephone', 'EstActive', 'Operation'];
  public dataSource = new MatTableDataSource<Utilisateur>();

  constructor(private service: AdminstrationService, private dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.service.getUtilisateurs().subscribe(res => {
      this.dataSource.data = res.map(x => new Utilisateur(x)) as Utilisateur[];
      console.log(this.dataSource.data);
    });
  }
  public Create() {
    const dialog = this.dialog.open(ModalUtilisateurComponent, {
      id: 'dialog1',
      height: '600px',
      width: '1100px',
      data: { id: null }
    });
    dialog.afterClosed().subscribe(x => {
      this.getUsers();
    });
  }
  public Edit(Id) {
    const dialog = this.dialog.open(ModalUtilisateurComponent, {
      id: 'dialog2',
      height: '600px',
      width: '1100px',
      data: { id: Id }
    });
    dialog.afterClosed().subscribe(x => {
      this.getUsers();
    });
  }
  public Delete(Id) {
    Swal.fire({
      title: 'Voulez vous supprimer cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.service.Delete(Id).subscribe(x => {
          Swal.fire(
            'Utilisateur supprimé avec succés',
            'success'
          );
          this.getUsers();
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
