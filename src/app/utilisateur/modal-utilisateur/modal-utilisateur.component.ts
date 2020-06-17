import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/services/notification.service';
import { SweetAlertService } from 'angular-sweetalert-service';
import { AdminstrationService } from 'app/services/adminstration.service';
import { Utilisateur } from 'app/models/Utilisateur';
import Swal from 'sweetalert2';
import { Lookup } from 'app/models/Lookup';

@Component({
  selector: 'app-modal-utilisateur',
  templateUrl: './modal-utilisateur.component.html',
  styleUrls: ['./modal-utilisateur.component.css']
})
export class ModalUtilisateurComponent implements OnInit {
  formGroup: FormGroup;
  Operation: string;
  Utilisateur: Utilisateur;
  roleFonctionnels: Lookup[];
  utilisateurControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<ModalUtilisateurComponent>,
    private service: AdminstrationService,
    private alertService: SweetAlertService,
    private toastService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      NomUtilisateur: new FormControl(),
      Nom: new FormControl(),
      Prenom: new FormControl(),
      MotDePasse: new FormControl(),
      Email: new FormControl(),
      Telephone: new FormControl(),
      IdRoleFonctionnel: new FormControl(),
      EstActive: new FormControl()

    });

    this.formGroup.disable();
    console.log(this.data);
    this.Utilisateur = new Utilisateur(undefined);
    this.Operation = this.data?.id !== null && this.data?.id !== undefined ? 'Modifier' : 'Ajouter';
    console.log(this.data?.id);
    this.service.getRoleFonctionnelLookUp().subscribe(x => { this.roleFonctionnels = x });
    if (this.Operation == 'Modifier') {
      this.service.getUtilisateurById(this.data.id).subscribe(x => { this.Utilisateur = new Utilisateur(x) });
    }

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
      title: 'Voulez vous enregistré ce détail de règlement?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        if (this.Operation === 'Modifier') {
          this.service.EditUser(this.Utilisateur).subscribe(x => {

            Swal.fire(
              'Modification Utilisateur effectué avec succés',
              'success'
            );
          });
        }
        if (this.Operation === 'Ajouter') {
          this.service.AddUser(this.Utilisateur).subscribe(
            x => {

              Swal.fire(
                'Enregistrement Utilisateur effectué avec succés',
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
