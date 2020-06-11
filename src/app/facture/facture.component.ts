import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactureService } from 'app/services/facture.service';
import { Facture } from 'app/models/facture';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ReglementComponent } from '../reglement/reglement.component';
import { ReglementDetail } from '../models/ReglementDetail';
import { NotificationService } from 'app/services/notification.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Reglement } from 'app/models/Reglement';
import { stringify } from 'querystring';
import { ReglementFacture } from 'app/models/ReglementFacture';
import { ReglementPrams } from 'app/models/ReglementParams';


@Component({
    selector: 'app-facture',
    templateUrl: './facture.component.html',
    styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    editRowId = -1
    @ViewChildren(MatInput, { read: ElementRef }) inputs: QueryList<ElementRef>;


    public displayedColumns = ['Id', 'Reference', 'Date', 'Echeance', 'MontantTotale', 'MontantDev', 'MontantRegle', 'MontantReste', 'select', 'MontantAPayes'];
    public dataSource = new MatTableDataSource<Facture>();
    selection = new SelectionModel<Facture>(true, []);
    IdFournisseur: any;

    constructor(private route: ActivatedRoute, private service: FactureService, public dialog: MatDialog,
        private toast: NotificationService, private authentificate: AuthenticationService) {
        this.route.queryParams.subscribe(params => {
            console.log(params.Id);
            this.IdFournisseur = params.Id;
        });
    }


    ngOnInit(): void {
        this.getFacture();


    }
    getFacture() {
        this.service.getFacturesByFournisseurs(this.IdFournisseur).subscribe(res => {
            this.dataSource.data = res.map(x => new Facture(x)) as Facture[];
        });
    }
    edit(row, element) {
        this.editRowId = row;
        setTimeout(() => {
            this.inputs.find(x => x.nativeElement.getAttribute('name') == element).nativeElement.focus()

        })
    }



    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));

    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Facture): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
    }


    Validate() {
        debugger;
        // tslint:disable-next-line:label-position
        if (this.selection.selected.length) {

            const montant: number[] = [];

            this.selection.selected.forEach(x => { montant.push(Number(x.MontantAPayes)); });
            const montantTotal: number = montant.reduce((a, b) => a + b, 0);

            console.log(montantTotal);

            if (montantTotal > 0) {
                //Inserttion de reglement dans la base de donnée et recupérer son Id 
                let currentUser: string;
                this.authentificate.currentUser.subscribe(x => currentUser = x.firstName + ' ' + x.lastName);
                const reg: Reglement = new Reglement();
                reg.DateReglement = new Date();
                reg.DateValidation = new Date();
                reg.ValiderPar = currentUser;
                this.service.AddReglement(reg);
                const idReglement = 1;
                //Ajout dans Table Facture l'id de resglement associés avec les id des factures selectioonées 

                const regFactures: ReglementFacture[] = [];
                this.selection.selected.forEach(x => {
                    const fact: ReglementFacture = new ReglementFacture();
                    fact.IdFacture = x.Id;
                    fact.IdReglement = idReglement;
                    fact.MontantTotal = x.MontantAPayes;
                    this.service.AddReglementFacture(fact);
                    // regFactures.push(fact);
                });

                const regparams: ReglementPrams = new ReglementPrams();
                regparams.MontantTotal = montantTotal;
                regparams.IdFournisseur = this.IdFournisseur;
                regparams.IdReglement = idReglement;
                regparams.NombreFacture = this.selection.selected.length;
                regparams.factures = this.selection.selected;


                const dialog = this.dialog.open(ReglementComponent, {
                    id: 'dialog1',
                    height: '600px',
                    width: '700px',
                    data: { reglement: ReglementPrams }
                });
                dialog.afterClosed().subscribe(result => {
                    console.log(`Dialog result: ${result}`); // Pizza!
                });
            } else {
                this.toast.showError('Il faut remplir le montant à payer avant de valider ce règlement', 'Erreur');
            }
        } else {
            this.toast.showWarning('Pour valider un règlement il faut au moins sélectionner une facture!', 'Warning');
        }

    }

    Cancel() {

    }

}
