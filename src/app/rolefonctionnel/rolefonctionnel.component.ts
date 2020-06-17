import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleFonctionnel } from 'app/models/RoleFonctionnel';
import { AdminstrationService } from 'app/services/adminstration.service';

@Component({
  selector: 'app-rolefonctionnel',
  templateUrl: './rolefonctionnel.component.html',
  styleUrls: ['./rolefonctionnel.component.css']
})
export class RolefonctionnelComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isRedOnly = true;
  public displayedColumns = ['Id', 'Description', 'Operation'];
  public dataSourceRoleFonctionnel = new MatTableDataSource<RoleFonctionnel>();
  constructor(private service: AdminstrationService) { }

  ngOnInit(): void {
    this.getRoleFonctionnels();
  }

  public getRoleFonctionnels() {
    this.service.getRoleFonctionnels().subscribe(res => {
      this.dataSourceRoleFonctionnel.data = res.map(x => new RoleFonctionnel(x)) as RoleFonctionnel[];
    })
  }

}
