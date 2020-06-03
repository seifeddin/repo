import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';

export const supplier: Supplier[] = [{RaisonSocial:'soc', Nom:'aida',Prenom:'Athamnia',Status:1,FraisGeneraux:12,Solde:122}];

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

    public displayedColumns = ['Nom','RaisonSocial','FraisGeneraux','details','update','delete'];
  public dataSource = new MatTableDataSource<Supplier>(supplier);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    // this.getAllOwners();
      this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
 
  public getAllOwners = () => {
      this.dataSource.data = supplier;

    // this.supplierService.getAll()
    // .subscribe(res => {
    //   this.dataSource.data = res as Supplier[];
    // })
  }

  

  public customSort = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
 
  public redirectToDetails = (id: string) => {
    
  }
}
