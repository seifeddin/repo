import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RetenuParams } from 'app/models/RetenuParams';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lookup } from 'app/models/Lookup';
import { ReglementListService } from 'app/services/reglement-list.service';
import { RubriqueRetenu } from 'app/models/RubriqueRetenu';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from 'app/services/notification.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'angular-sweetalert-service';
import Swal from 'sweetalert2';
import { Retenu } from 'app/models/Retenu';
import { Reglement } from 'app/models/Reglement';

@Component({
    selector: 'app-modal-retenu',
    templateUrl: './modal-retenu.component.html',
    styleUrls: ['./modal-retenu.component.css']
})
export class ModalRetenuComponent implements OnInit {
    formGroup: FormGroup;
    rubriques: Lookup[];
    annexes: Lookup[];
    rubRetenus: RubriqueRetenu[];
    rowData: RubriqueRetenu;
    formGroupRubrique: FormGroup;
    SelectedRow: RubriqueRetenu;
    retenu: Retenu;
    operation: string;
    isDisabled = false;
    public displayedColumns = ['Id', 'IdRubrique', 'MontantHt', 'Tva', 'MontantTtc'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource = new MatTableDataSource<RubriqueRetenu>();
    selection = new SelectionModel<RubriqueRetenu>(false, []);
    //modeReglementControl = new FormControl('', Validators.required);
    constructor(public dialogRef: MatDialogRef<ModalRetenuComponent>, private serviceReglement: ReglementListService,
        @Inject(MAT_DIALOG_DATA) public data: RetenuParams,
        private toastService: NotificationService,
        private alertService: SweetAlertService) { }

    ngOnInit(): void {

        this.rubRetenus = [];
        this.GetData();
        this.rowData = new RubriqueRetenu();
        this.retenu = new Retenu();
        this.formGroup = new FormGroup({
            DateValidation: new FormControl(),
            EstPhysique: new FormControl(),
            EstMorale: new FormControl(),
            NomPrenom: new FormControl(),
            NumFrs: new FormControl()
        });

        this.formGroup.disable();
        this.serviceReglement.getLookupRubrique().subscribe(x => { this.rubriques = x });
        this.serviceReglement.getLookupAnnexe().subscribe(x => { this.annexes = x });
        this.formGroupRubrique = new FormGroup({
            Rubrique: new FormControl(),
            MontantHt: new FormControl(),
            Tva: new FormControl(),
            MontantTtc: new FormControl(),
            Annexe: new FormControl()
        });
        this.formGroupRubrique.disable();
    }
    GetData() {
        this.dataSource.data = this.rubRetenus;
    }
    onTvaChange(value) {
        if (this.rowData.Tva) {
            this.rowData.MontantTtc = this.rowData.MontantHt * (this.rowData.Tva / 100);
        }
    }
    Add() {
        this.formGroupRubrique.enable();
        this.operation = 'Create';
        this.rowData = new RubriqueRetenu();
        this.serviceReglement.GetMontantRegelement(this.data.Reglement.Id).subscribe(res => this.rowData.MontantHt = res);

    }
    Edit() {
        if (this.selection.selected.length > 0) {
            this.operation = 'Edit';
            this.formGroupRubrique.enable();
        } else {
            this.toastService.showError('Vous devez séléctionner un enregistrement', 'Erreur');
        }

    }
    Save() {
        Swal.fire({
            title: 'Voulez vous enregistré ce retenu?',
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                if (this.operation === 'Create') {
                    const index = this.dataSource.data.findIndex(x => x.IdRubrique == this.rowData.IdRubrique);
                    if (index > 0) {
                        this.toastService.showError('Ce rubrique existe déjà!', 'Error');
                    } else {

                        this.rubRetenus.push(this.rowData);
                        Swal.fire(
                            'Enregistrement retrnu effectué avec succés',
                            'success'
                        )
                        console.log(this.rubRetenus);
                        this.GetData();
                    }


                }
                if (this.operation === 'Edit') {

                    const index = this.rubRetenus.findIndex(x => x.IdRubrique === this.SelectedRow.IdRubrique);
                    if (index !== -1) {
                        this.rubRetenus.splice(index, 1);
                    }
                    this.rubRetenus.push(this.rowData);

                    Swal.fire('Enregistrement retenu effectué avec succés',
                        'success')
                    this.GetData();

                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Enregistrement Annulé',
                    'error'
                )
            }
        })
        this.formGroupRubrique.disable();

    }
    Delete() {

        if (this.selection.selected.length > 0) {
            Swal.fire({
                title: 'Voulez vous supprimer ce retenu?',
                icon: 'warning',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    const index = this.rubRetenus.findIndex(x => x.IdRubrique === this.SelectedRow.IdRubrique);
                    if (index !== -1) {
                        this.rubRetenus.splice(index, 1);
                    }
                    Swal.fire(
                        'Retenu supprimé avec succés',
                        'success'
                    )
                    this.GetData();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Suppression Annulé',
                        'error'
                    )
                }
            })
        } else {
            this.toastService.showError('Vous devez séléctionner un enregistrement', 'Erreur');
        }
    }
    Cancel() {
        this.dialogRef.close();

    }
    Validate() {
        this.isDisabled = true;
        this.retenu.RubriqueRetenu = this.rubRetenus;
        console.log(this.rubRetenus);
        this.retenu.NumeroCertficat = 1;
        this.retenu.DateValidation = new Date();
        this.retenu.ValiderPar = 'Aida';
        this.retenu.IdReglement = this.data.Reglement.Id;
        /*this.retenu.Reglement.Id = this.data.Reglement.Id;*/
        //   this.retenu.Reglement = [];
        let AddedRetenu: Retenu;
        this.serviceReglement.AddRetenu(this.retenu).subscribe(x => {
            AddedRetenu = x;
            debugger;
            this.data.Reglement.IdRetenu = x.Id;
            this.serviceReglement.UpdateReglement(this.data.Reglement).subscribe(x => { return x });
        });



    }

    getObject(row: RubriqueRetenu) {
        this.SelectedRow = row;
        this.rowData.Id = row.Id;
        this.rowData.IdRubrique = row.IdRubrique;
        this.rowData.IdRetenu = row.IdRetenu;
        this.rowData.IdAnnexe = row.IdAnnexe;
        this.rowData.MontantHt = row.MontantHt;
        this.rowData.MontantTtc = row.MontantTtc;
        this.rowData.Tva = row.Tva;
    }

}
