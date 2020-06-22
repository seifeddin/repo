import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reglement } from 'app/models/Reglement';
import { Observable } from 'rxjs';
import { Lookup } from 'app/models/Lookup';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReglementListService } from 'app/services/reglement-list.service';
import { map } from 'rxjs/operators';
import { BonAPayer } from 'app/models/BonAPayer';
import { SelectionModel } from '@angular/cdk/collections';
import { RetenuParams } from 'app/models/RetenuParams';
import { ModalRetenuComponent } from './modal-retenu/modal-retenu.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'app/services/notification.service';


@Component({
    selector: 'app-reglement-list',
    templateUrl: './reglement-list.component.html',
    styleUrls: ['./reglement-list.component.css']
})
export class ReglementListComponent implements OnInit {
    // public displayedColumns = ['Id', 'IdBonAPayer', 'NumFrs', 'NumPreparation', 'IdRetenu', 'Date', 'Montant'];
    public displayedColumns = ['Id', 'IdBonAPayer', 'NumPreparation', 'IdRetenu', 'DateValidation'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource = new MatTableDataSource<Reglement>();
    selection = new SelectionModel<Reglement>(false, []);
    SelectedRow: Reglement;
    reglement: Reglement;
    params: RetenuParams;
    selectedFrs: number;


    // for autocomplete input
    myControl = new FormControl();
    filteredOptions: Observable<Lookup[]>;
    lstSuppliers: Lookup[];
    lstReglement: Reglement[];
    isDisabled = true;


    constructor(private service: ReglementListService, public dialog: MatDialog, private toastService: NotificationService) { }

    ngOnInit(): void {
        this.reglement = new Reglement();
        this.service.getLookupFournisseur().subscribe((res) => {
            this.lstSuppliers = res.map((item: { Id: number; Designation: string; }) => new Lookup(item.Id, item.Designation));
        });
        //this.GetAllReglement();

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                map(value => this._filter(value)
                )
            )




    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    GetAllReglement() {

        this.dataSource.data = [];
        // this.service.GetAllByFrs(1)
        //     .subscribe(res => {
        //         console.log(res);
        //         this.lstReglement = res;
        //         this.dataSource.data = res as Reglement[];
        //     });
    }

    // autocomplete filter treatment
    private _filter(value: string): Lookup[] {
        if (this.lstSuppliers !== undefined) {
            // tslint:disable-next-line:radix

            // tslint:disable-next-line:radix
            return this.lstSuppliers.filter(option => option.Id === Number.parseInt(value));
        }
    }

    getList(IdFrs) {
        this.selectedFrs = IdFrs;
        this.GetData(IdFrs);
    }

    GetData(value) {
        this.service.GetAllByFrs(value).subscribe(x => {
            this.dataSource.data = x;//.map(v => new Reglement(v)) as Reglement[];
        });
    }

    Generate() {
        //  this.service.AddBonAPayer();
        //this.service.UpdateReglement()
    }
    AddRetenu() {
        if (this.SelectedRow.Id !== undefined || this.SelectedRow.Id !== NaN) {
            this.params = new RetenuParams();
            this.params.DateValidation = new Date(null);
            this.params.Reglement = this.SelectedRow;

            this.service.GetFrsById(1).subscribe(x => {
                this.params.NomPrenom = x.Nom + '' + x.Prenom;
                this.params.EstMorale = x.EstPhysique; this.params.EstMorale = x.EstMorale;
                this.params.NumFrs = x.Id;
                this.params.DateValidation = this.SelectedRow.DateValidation;
            });


            const dialog = this.dialog.open(ModalRetenuComponent, {
                id: 'dialog1',
                height: '600px',
                width: '1100px',
                data: this.params
            });
            dialog.afterClosed().subscribe(result => {
                this.GetData(this.selectedFrs);
            });
        } else { this.toastService.showWarning('Vous devez séléctionner un règlement', 'Warning'); }


    }

    getObject(row: Reglement) {
        debugger;
        console.log(row.IdRetenu);
        if (row.IdRetenu == null) {
            this.isDisabled = false;
        } else {
            this.isDisabled = true;
        }

        this.SelectedRow = row;
        this.reglement.Id = row.Id;
        this.reglement.Echeance = row.Echeance;
        this.reglement.DateReglement = row.DateReglement;
        this.reglement.DateValidation = row.DateValidation;
        this.reglement.IdBonAPayer = row.IdBonAPayer;
        this.reglement.IdRetenu = row.IdRetenu;
        this.reglement.IdSuiviBancaire = row.IdSuiviBancaire;
        this.reglement.Montant = row.Montant;
        this.reglement.NumFrs = row.NumFrs;
        this.reglement.NumPreparation = row.NumPreparation;
        this.reglement.ValiderPar = row.ValiderPar;

    }

}
