import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BonAPayer } from 'app/models/BonAPayer';
import { MatTableDataSource } from '@angular/material/table';
import { BonAPayerService } from 'app/services/bon-apayer.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-bon-apayer',
    templateUrl: './bon-apayer.component.html',
    styleUrls: ['./bon-apayer.component.css']
})
export class BonAPayerComponent implements OnInit {

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

    GetData() {
        debugger;
        this.service.getAll().subscribe(x => {
            console.log(x);
            this.dataSource.data = x
        });
    }
    getObject(row: BonAPayer) {
        this.selectedRow = row;
    }
    Validate() {
        this.selectedRow.DateValidation = new Date();
        this.selectedRow.ValiderPar = "Aida";
        this.service.Update(this.selectedRow).subscribe(x => { this.GetData(); return x; });

    }

}
