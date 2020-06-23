import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleFonctionnel } from 'app/models/RoleFonctionnel';
import { Utilisateur } from 'app/models/Utilisateur';
import { AdminstrationService } from 'app/services/adminstration.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from 'angular-sweetalert-service';
import { NotificationService } from 'app/services/notification.service';
import Swal from 'sweetalert2';
import { isDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-modal-rolefonctionnel',
  templateUrl: './modal-rolefonctionnel.component.html',
  styleUrls: ['./modal-rolefonctionnel.component.css']
})
export class ModalRolefonctionnelComponent implements OnInit {
  formGroup: FormGroup;
  Operation: string;
  RoleFonctionnel: RoleFonctionnel;
  Utilisateurs: Utilisateur[];
  roleFonctionnelControl = new FormControl('', Validators.required);
  constructor(public dialogRef: MatDialogRef<ModalRolefonctionnelComponent>,
    private service: AdminstrationService,
    private alertService: SweetAlertService,
    private toastService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      Description: new FormControl(),
      Utilisateur: new FormControl(),
    });

    this.formGroup.disable();
    this.RoleFonctionnel = new RoleFonctionnel(undefined);
    this.Operation = this.data?.id !== null && this.data?.id !== undefined ? 'Modifier' : 'Ajouter';
    let ids = [];
    this.service.getUtilisateurs().subscribe(x => {
      this.Utilisateurs = x;
      if (this.Operation === 'Modifier') {
        this.service.getRoleFonctionnelById(this.data.id).subscribe(x => {
          const defaultValue: Utilisateur[] = [
          ];
          let i = 0;
          x.Utilisateur.forEach(element => {
            defaultValue[i] = this.Utilisateurs.find(use => use.Id === element.Id);
            i++;
          });
          this.RoleFonctionnel = new RoleFonctionnel(x);
          this.RoleFonctionnel.Utilisateur = defaultValue;
          this.formGroup.get('Utilisateur').setValue(defaultValue);
        });
      }
    });


  }

  submit(): void { }

  addNew() {
    this.formGroup.enable();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public Save() {

    Swal.fire({
      title: 'Voulez vous enregistré ce role fonctionnel?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        if (this.Operation === 'Modifier') {
          console.log(this.RoleFonctionnel);
          this.service.EditRoleFonctionnel(this.RoleFonctionnel).subscribe(x => {

            Swal.fire(
              'Modification role fonctionnel effectué avec succés',
              'success'
            );
          });
        }
        if (this.Operation === 'Ajouter') {
          console.log(this.RoleFonctionnel);
          this.service.AddRoleFonctionnel(this.RoleFonctionnel).subscribe(
            x => {

              Swal.fire(
                'Enregistrement role fonctionnel effectué avec succés',
                'success'
              )
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Enregistrement Annulé',
          'error'
        )
      }
    })
    this.formGroup.disable();
  }

}
