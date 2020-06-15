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
    modeReglement: Lookup[];
    caisses: Lookup[];
    banques: Lookup[];
    regDetail: ReglementDetail;

    constructor(public dialogRef: MatDialogRef<ReglementComponent>, private service: ReglementService,
        @Inject(MAT_DIALOG_DATA) public data: ReglementPrams, private alertService: SweetAlertService,
        private toastService: NotificationService) {

    }
    ngOnInit(): void {
        this.regDetail = new ReglementDetail();

        this.formGroup = new FormGroup({
            Echeance: new FormControl(),
            ModeReglement: new FormControl(),
            Caisse: new FormControl(),
            Banque: new FormControl(),
            Montant: new FormControl(),

        });
        this.formGroup.disable();

        this.service.getLookupModeReglement().subscribe(x => { this.modeReglement = x });
        this.service.getLookupBanque().subscribe(x => { this.banques = x });
        this.service.getLookupCaisse().subscribe(x => { this.caisses = x });

        this.regDetail.Echeance = new Date();
        this.regDetail.IdReglement = this.data.IdReglement;
        this.regDetail.Montant = 0;
        this.service.Get(this.data.IdReglement).subscribe(x => this.datasource.data = x);

    }
    
    addNew() {
        this.formGroup.enable();
        this.edit = 'Create';
        this.regDetail = new ReglementDetail();
        this.regDetail.IdReglement = this.data.IdReglement;
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
                    this.service.Add(this.regDetail).subscribe(x => {

                        Swal.fire(
                            'Enregistrement règlement effectué avec succés',
                            'success'
                        )
                    });
                }
                if (this.edit === 'Edit') {
                    this.service.Edit(this.regDetail);
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
                    this.service.Delete(this.regDetail.Id);
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
        this.regDetail.Id = row.Id;
        this.regDetail.Echeance = row.Echeance;
        this.regDetail.IdBanque = row.IdBanque;
        this.regDetail.IdModeReglement = row.IdModeReglement;
        this.regDetail.IdCaisse = row.IdCaisse;
        this.regDetail.Montant = row.Montant;
        this.formGroup.disable();
    }

    Validate() {
        const cumul: Number = this.datasource.data.map(x => x.Montant).reduce((a, b) => a + b, 0);

        if (cumul > this.data.MontantTotal || cumul < this.data.MontantTotal) {
            this.toastService.showError('La somme des montant doit être égale à la somme des montant à payer ', 'Erreur');
        }
        this.data.factures.forEach(element => {
            element.MontantRegle = element.MontantAPayes;
            element.MontantAPayes = 0;
            element.MontantReste = element.MontantTotale - element.MontantRegle;
            this.service.updateFacture(element);
        });
    }

}


