import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminstrationService } from 'app/services/adminstration.service';
import { SweetAlertService } from 'angular-sweetalert-service';
import { NotificationService } from 'app/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleTechnique } from 'app/models/RoleTechnique';
import Swal from 'sweetalert2';
import { RoleFonctionnel } from 'app/models/RoleFonctionnel';

@Component({
  selector: 'app-modal-affiliation-role',
  templateUrl: './modal-affiliation-role.component.html',
  styleUrls: ['./modal-affiliation-role.component.css']
})
export class ModalAffiliationRoleComponent implements OnInit {

  formGroup: FormGroup;
  Operation: string;
  RoleFonctionnel: RoleFonctionnel;
  RoleTechniques: RoleTechnique[];

  roleFonctionnelControl = new FormControl('', Validators.required);
  constructor(public dialogRef: MatDialogRef<ModalAffiliationRoleComponent>,
    private service: AdminstrationService,
    private alertService: SweetAlertService,
    private toastService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      RoleTechnique: new FormControl(),
    });

    this.formGroup.disable();
    this.RoleFonctionnel = new RoleFonctionnel(undefined);
    this.Operation = this.data?.id !== null && this.data?.id !== undefined ? 'Modifier' : 'Ajouter';
    let ids = [];
    this.service.getNotAffectedRoleTechnique(this.data?.id).subscribe(x => {
      this.RoleTechniques = x;
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
      title: 'Voulez vous affilié ses role techniques?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.RoleFonctionnel.Id = this.data?.id;
        console.log(this.RoleFonctionnel);
        this.service.AddRoleTechniqueToRoleFonctionnel(this.RoleFonctionnel).subscribe(
          x => {
            console.log(x);
            Swal.fire(
              'Affiliation effectué avec succés',
              'success'
            )
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Affiliation Annulé',
          'error'
        )
      }
    })
    this.formGroup.disable();
  }


}
