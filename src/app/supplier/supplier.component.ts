import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Lookup } from '../models/Lookup';
import { HttpResponse } from '@angular/common/http';



@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public displayedColumns = ['Id', 'RaisonSocial', 'Prenom', 'Nom', 'FraisGeneraux', 'EstMorale', 'EstPhysique', 'Solde', 'details'];
    public dataSource = new MatTableDataSource<Supplier>();
    totalFraisGeneraux: number;
    totalSolde: number;
    pipe: DatePipe;
    fournisseurs: Supplier[];

    // for autocomplete input
    myControl = new FormControl();
    filteredOptions: Observable<Lookup[]>;
    lstSuppliers: Lookup[];

    filterForm = new FormGroup({
        fromDate: new FormControl(),
        toDate: new FormControl(),
    });

    get fromDate() { return this.filterForm.get('fromDate').value; }
    get toDate() { return this.filterForm.get('toDate').value; }

    constructor(private supplierService: SupplierService, private router: Router) {

        this.pipe = new DatePipe('en');
        this.dataSource.filterPredicate = (data, filter) => {
            if (this.fromDate && this.toDate) {
                return new Date(data.EcheanceDate) >= this.fromDate && new Date(data.EcheanceDate) <= this.toDate;
            }
            return true;
        }
    }

    ngOnInit() {
        this.getAllOwners();
        this.supplierService.getLookupFournisseur().subscribe((res) => {
            this.lstSuppliers = res.map((item: { Id: number; Designation: string; }) => new Lookup(item.Id, item.Designation));
        });

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                map(value => this._filter(value))
            );
    }
    applyFilterDate() {
        this.dataSource.filter = '' + Math.random();
    }
    public getAllOwners = () => {
        this.supplierService.getAll()
            .subscribe(res => {
                console.log(res);
                this.fournisseurs = res;
                this.dataSource.data = res as Supplier[];
            });
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    TotalFraisGeneraux() {
        return this.dataSource.filteredData.map(t => t.FraisGeneraux).reduce((acc, value) => acc + value, 0);
    }
    TotalSolde() {
        return this.dataSource.filteredData.map(t => t.Solde).reduce((acc, value) => acc + value, 0);
    }

    public customSort = (event) => {
        console.log(event);
    }
    public redirectToDetails = (Id: string) => {
        this.router.navigate(['/facture'], { queryParams: { Id: Id } });
    }
    // autocomplete filter treatment
    private _filter(value: string): Lookup[] {
        const filterValue = value.toLowerCase();
        if (this.lstSuppliers !== undefined) {
            this.dataSource = new MatTableDataSource(this.fournisseurs.filter(e => e.Nom.toLowerCase().includes(filterValue)));
            return this.lstSuppliers.filter(option => option.Designation.toLowerCase().includes(filterValue));
        }
    }

    ReadPF() {
        debugger;
        this.supplierService.getPdfDocument()
            .subscribe(
                (data) => {
                    this.openFileForPrint(data);
                });
    }

    openFileForPrint(data1: HttpResponse<any>) {
        debugger;
        console.log(data1.body);
        const binaryData = [];
        binaryData.push(data1);
        const fileUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
        window.open(fileUrl, '_blank', 'location=yes,height=600,width=800,scrollbars=yes,status=yes');
    }
}
