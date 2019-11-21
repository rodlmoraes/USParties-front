import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { CreateEditionComponent } from './modal/create-edition/create-edition.component';
import { CreatePartyComponent } from './modal/create-party/create-party.component';
import { ActivatedRoute } from '@angular/router';
import { PartiesService, PartyEdition } from './parties.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  idAcademicCenter: number;
  dataSource: MatTableDataSource<object>;
  displayedColumns = ['party', 'name', 'description', 'local', 'actualLot', 'date', 'action'];

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private partiesService: PartiesService) { }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    this.route.params.subscribe(params => {
      this.idAcademicCenter = params.idAcademicCenter;
      this.partiesService.getAcademicCenterPartyEditions(this.idAcademicCenter).subscribe((partyEditions: PartyEdition[]) => {
        partyEditions = partyEditions.map(
          ({party, actualLot, ...partyEdition}) =>
          ({...partyEdition, actualLot: actualLot ? actualLot.price : null, party: party.name})
        );

        this.dataSource = new MatTableDataSource(partyEditions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newParty(): void {
    const modalRef = this.dialog.open(CreatePartyComponent, { data: { idAcademicCenter: this.idAcademicCenter }});
    modalRef.afterClosed().subscribe(() => this.getPageData());
  }

  newEdition(): void {
    const modalRef = this.dialog.open(CreateEditionComponent, {data: {
        create: true,
        idAcademicCenter: this.idAcademicCenter,
        }
      });
    modalRef.afterClosed().subscribe(() => this.getPageData());
  }

  details(edition): void {
      const modalRef = this.dialog.open(CreateEditionComponent, {
        data: {
          idEdition: edition.id,
          party: edition.party,
          name: edition.name,
          description: edition.description,
          local: edition.local,
          actualLot: edition.actualLot,
          date: edition.date,
          idAcademicCenter: this.idAcademicCenter,
        },
      });
      modalRef.afterClosed().subscribe(() => this.getPageData());
  }

  delete(post): void {
    this.partiesService.deleteEdition(post.id).subscribe(() => {
      this.getPageData();
    });
  }

}
