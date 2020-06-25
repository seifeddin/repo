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

  EstRegleChange(element) {
    debugger;
    if (element.EstRegle) {
      element.EstPreavis = false;
      element.EstImpaye = false;
    }
  }

  EstPreavisChange(element) {
    if (element.EstPreavis) {
      element.EstRegle = false;
      element.EstImpaye = false;
    }
  }

  EstImpayeChange(element) {
    if (element.EstImpaye) {
      element.EstRegle = false;
      element.EstPreavis = false;
    }
  }

}
