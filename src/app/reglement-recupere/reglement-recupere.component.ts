import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BonAPayer } from 'app/models/BonAPayer';
import { SelectionModel } from '@angular/cdk/collections';
import { BonAPayerService } from 'app/services/bon-apayer.service';

@Component({
    selector: 'app-reglement-recupere',
    templateUrl: './reglement-recupere.component.html',
    styleUrls: ['./reglement-recupere.component.css']
})
export class ReglementRecupereComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public displayedColumns = ['Id', 'NumFRs', 'NomPrenom', 'MontantRetenu', 'MontantTotalEcheance', 'EstValide', 'DateValidation', 'ValiderPar'];
    public dataSource = new MatTableDataSource<BonAPayer>();
    selection = new SelectionModel<BonAPayer>(false, []);
    selectedRow: BonAPayer;
    constructor(private service: BonAPayerService) { }

    ngOnInit(): void {
        this.GetData();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    GetData() {
        this.service.GetReglementRecuperes().subscribe(x => {
            this.dataSource.data = x
        });
    }
    getObject(row: BonAPayer) {
        this.selectedRow = row;
    }
    Validate() {
        this.selectedRow.EstRegle = true;
        this.service.Update(this.selectedRow).subscribe(x => { this.GetData(); return x; });
    }

    TotalSolde() {
        return this.dataSource.filteredData.map(t => t.MontantTotalEcheance).reduce((acc, value) => acc + value, 0);
    }
}
