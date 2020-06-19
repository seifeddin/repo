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

@Component({
    selector: 'app-reglement-list',
    templateUrl: './reglement-list.component.html',
    styleUrls: ['./reglement-list.component.css']
})
export class ReglementListComponent implements OnInit {
    // public displayedColumns = ['Id', 'IdBonAPayer', 'NumFrs', 'NumPreparation', 'IdRetenu', 'Date', 'Montant'];
    public displayedColumns = ['Id', 'IdBonAPayer', 'NumFrs', 'NumPreparation', 'IdRetenu', 'DateValidation'];
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
            debugger;
            this.lstSuppliers = res.map((item: { Id: number; Designation: string; }) => new Lookup(item.Id, item.Designation));
        });
        this.GetAllReglement();
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                map(value => this._filter(value))
            );

    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    GetAllReglement() {

        this.dataSource.data = [];
        // this.service.GetAllByFrs()
        //     .subscribe(res => {
        //         console.log(res);
        //         this.lstReglement = res;
        //         this.dataSource.data = res as Reglement[];
        //     });
    }

    // autocomplete filter treatment
    private _filter(value: string): Lookup[] {

        //  const filterValue = value.toLowerCase();
        if (this.lstSuppliers !== undefined) {

            // tslint:disable-next-line:radix

            // tslint:disable-next-line:radix
            this.service.GetAllByFrs(Number.parseInt(value)).subscribe(x => this.dataSource = new MatTableDataSource(x));
            ;
            // tslint:disable-next-line:radix
            return this.lstSuppliers.filter(option => option.Id === Number.parseInt(value));
        }
    }

    Generate() {
        //  this.service.AddBonAPayer();
        //this.service.UpdateReglement()
    }
    AddRetenu() { }

}
