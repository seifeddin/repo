import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReglementDetail } from '../models/ReglementDetail';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Lookup } from '../models/Lookup';
import { ReglementService } from '../services/reglement.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'angular-sweetalert-service';
import Swal from 'sweetalert2'
import { ReglementPrams } from 'app/models/ReglementParams';
import { NotificationService } from 'app/services/notification.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';




@Component({
    selector: 'app-reglement',
    templateUrl: './reglement.component.html',
    styleUrls: ['./reglement.component.css']
})
export class ReglementComponent implements OnInit {
    public displayedColumns = ['Id', 'Echeance', 'IdModeReglement', 'IdBanque', 'Montant'];
    public datasource = new MatTableDataSource<ReglementDetail>();
    selection = new SelectionModel<ReglementDetail>(false, []);
    formGroup: FormGroup;
    edit = '';
    SelectedRow: ReglementDetail;


    reglements: ReglementDetail[] = [
        { Id: 1, Echeance: new Date('01/06/2019'), IdModeReglement: 1, IdCaisse: 1, IdBanque: 1, Montant: 300, IdReglement: 1 },
        { Id: 2, Echeance: new Date('01/06/2019'), IdModeReglement: 2, IdCaisse: 1, IdBanque: 2, Montant: 200, IdReglement: 1 }];
    // tslint:disable-next-line:member-ordering
    modeReglementControl = new FormControl('', Validators.required);
    modeReglement: Lookup[] = [
        { Id: 1, Designation: 'CHEQUE' },
        { Id: 2, Designation: 'ESPECE' },
    ];
    caisses: Lookup[] = [
        { Id: 1, Designation: 'CaisseTunis' },
        { Id: 2, Designation: 'CaisseSousse' },
    ];

    banques: Lookup[] = [
        { Id: 1, Designation: 'UBCI' },
        { Id: 2, Designation: 'BIAT' },
        { Id: 2, Designation: 'BTE' },
        { Id: 2, Designation: 'ATB' }
    ];
    data: ReglementDetail;

    constructor(public dialogRef: MatDialogRef<ReglementComponent>, private service: ReglementService,
        @Inject(MAT_DIALOG_DATA) public params: ReglementPrams, private alertService: SweetAlertService,
        private toastService: NotificationService) {

    }
    ngOnInit(): void {
        this.data = new ReglementDetail();

        this.formGroup = new FormGroup({
            Echeance: new FormControl(),
            ModeReglement: new FormControl(),
            Caisse: new FormControl(),
            Banque: new FormControl(),
            Montant: new FormControl(),

        });
        this.formGroup.disable();

        this.data.Echeance = new Date();
        this.data.Montant = 0;
        this.datasource.data = this.reglements;

    }
    addNew() {
        this.formGroup.enable();
        this.edit = 'Create';
        this.data = new ReglementDetail();

    }

    submit(): void { }
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
                if (this.edit === 'Create') {
                    this.service.Add(this.data);
                }
                if (this.edit === 'Edit') {
                    this.service.Edit(this.data);
                }
                Swal.fire(
                    'Enregistrement règlement effectué avec succés',
                    'success'
                )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Enregistrement Annulé',
                    'error'
                )
            }
        })
        this.formGroup.disable();
    }

    public Edit() {
        if (this.selection.selected.length > 0) {
            this.edit = 'Edit';
            this.formGroup.enable();
        } else {
            this.toastService.showError('Vous devez séléctionner un enregistrement', 'Erreur');

        }
    }

    public Delete() {
        if (this.selection.selected.length > 0) {
            Swal.fire({
                title: 'Voulez vous supprimer ce détail de règlement?',
                icon: 'warning',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    this.service.Delete(this.data.Id);
                    Swal.fire(
                        'Préparation règlement supprimé avec succés',
                        'success'
                    )
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
    getObject(row: ReglementDetail) {
        console.log(row);
        this.SelectedRow = row;
        this.data.Id = row.Id;
        this.data.Echeance = row.Echeance;
        this.data.IdBanque = row.IdBanque;
        this.data.IdModeReglement = row.IdModeReglement;
        this.data.IdCaisse = row.IdCaisse;
        this.data.Montant = row.Montant;
        this.formGroup.disable();
    }

    Validate() {
        const cumul: Number = this.datasource.data.map(x => x.Montant).reduce((a, b) => a + b, 0);

        if (cumul > this.params.MontantTotal || cumul < this.params.MontantTotal) {
            this.toastService.showError('La somme des montant doit être égale à la somme des montant à payer ', 'Erreur');
        }
        this.params.factures.forEach(element => {
            element.MontantRegle = element.MontantAPayes;
            element.MontantAPayes = 0;
            element.MontantReste = element.MontantTotale - element.MontantRegle;
            this.service.updateFacture(element);
        });


    }

}


