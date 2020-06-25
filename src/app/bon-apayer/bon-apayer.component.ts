import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BonAPayer } from 'app/models/BonAPayer';
import { MatTableDataSource } from '@angular/material/table';
import { BonAPayerService } from 'app/services/bon-apayer.service';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';

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
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }


    GetData() {
        this.service.getAll().subscribe(x => {
            this.dataSource.data = x
        });
    }
    getObject(row: BonAPayer) {
        this.selectedRow = row;
    }
    Validate() {
        Swal.fire({
            title: 'Voulez vous signé ce règlement ?',
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                this.selectedRow.DateValidation = new Date();
                this.selectedRow.DateSignature = new Date();
                this.selectedRow.ValiderPar = "Aida";
                this.service.Update(this.selectedRow).subscribe(x => { this.GetData(); return x; });
                Swal.fire('Règlement signé avec succés',
                    'success')
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Singature Annulé',
                    'error'
                )
            }
        });
    }

    TotalSolde() {
        return this.dataSource.filteredData.map(t => t.MontantTotalEcheance).reduce((acc, value) => acc + value, 0);
    }



}
