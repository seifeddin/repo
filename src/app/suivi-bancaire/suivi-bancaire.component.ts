import { Component, OnInit, ViewChild } from '@angular/core';
import { SuiviBancaireService } from 'app/services/suivi-bancaire.service';
import { CanvasReglement } from 'app/models/CanvasReglement';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-suivi-bancaire',
    templateUrl: './suivi-bancaire.component.html',
    styleUrls: ['./suivi-bancaire.component.css']
})
export class SuiviBancaireComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    DisableEstRegle: boolean = false;
    DisableEstPreavis: boolean = false;
    DisableEstImpaye: boolean = false;
    public displayedColumns = ['Id', 'NumFRs', 'RaisonSocial', 'IdBonAPayer',
        'MontantTotalEcheance', 'EstRegle', 'EstImpaye', 'EstPreavis', 'DateValidation', 'ValiderPar'];
    public dataSource = new MatTableDataSource<CanvasReglement>();
    //selection = new SelectionModel<CanvasReglement>(false, []);
    selectedRow: CanvasReglement;
    constructor(private service: SuiviBancaireService) { }

    ngOnInit(): void {
        this.GetData();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    GetData() {
        this.service.GetReglementPourSuivi().subscribe(res => {
            this.dataSource.data = res;
        });
    }

    TotalMontantTotalEcheance() {
        return this.dataSource.filteredData.map(x => x.MontantTotalEcheance).reduce((a, b) => a + b, 0);
    }
    TotalEstRegle() {
        return this.dataSource.filteredData.reduce((a, c) => c.EstRegle ? ++a : a, 0);
    }
    TotalEstImpaye() {
        return this.dataSource.filteredData.reduce((a, c) => c.EstImpaye ? ++a : a, 0);
    }
    TotalEstPreavis() {
        return this.dataSource.filteredData.reduce((a, c) => c.EstPreavis ? ++a : a, 0);
    }

    EstRegleChange(element) {
        debugger;
        if (element.EstRegle) {
            element.EstPreavis = false;
            element.EstImpaye = false;
        }
        this.service.UpdateSuivi(element).subscribe(x => { return x });
    }

    EstPreavisChange(element) {
        if (element.EstPreavis) {
            element.EstRegle = false;
            element.EstImpaye = false;
        }
        this.service.UpdateSuivi(element).subscribe(x => { return x });
    }

    EstImpayeChange(element) {
        if (element.EstImpaye) {
            element.EstRegle = false;
            element.EstPreavis = false;
        }
        this.service.UpdateSuivi(element).subscribe(x => { return x });
    }

}
