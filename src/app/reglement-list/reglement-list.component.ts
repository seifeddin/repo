import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reglement } from 'app/models/Reglement';
import { Observable } from 'rxjs';
import { Lookup } from 'app/models/Lookup';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReglementListService } from 'app/services/reglement-list.service';

@Component({
    selector: 'app-reglement-list',
    templateUrl: './reglement-list.component.html',
    styleUrls: ['./reglement-list.component.css']
})
export class ReglementListComponent implements OnInit {
    public displayedColumns = ['Id', 'IdBonAPayer', 'NumFrs', 'NumPreparation', 'IdRetenu', 'Date', 'Montant'];
    public dataSource = new MatTableDataSource<Reglement>();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // for autocomplete input
    myControl = new FormControl();
    filteredOptions: Observable<Lookup[]>;
    lstSuppliers: Lookup[];
    lstReglement: Reglement[];

    constructor(private service: ReglementListService) { }

    ngOnInit(): void {
        this.service.getLookupFournisseur().subscribe((res) => {
            this.lstSuppliers = res.map((item: { Id: number; Designation: string; }) => new Lookup(item.Id, item.Designation));
        });
        this.GetAllReglement();
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                Map(value => this._filter(value))
            );

    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    GetAllReglement() {
        // this.supplierService.getAll()
        // .subscribe(res => {
        //     console.log(res);
        //     this.lstReglement = res;
        //     this.dataSource.data = res as Supplier[];
        // });
    }

    // autocomplete filter treatment
    private _filter(value: string): Lookup[] {
        const filterValue = value.toLowerCase();
        if (this.lstSuppliers !== undefined) {
            // tslint:disable-next-line:radix
            this.dataSource = new MatTableDataSource(this.lstReglement.filter(e => e.NumFrs === Number.parseInt(filterValue)));
            return this.lstSuppliers.filter(option => option.Designation.toLowerCase().includes(filterValue));
        }
    }

}
