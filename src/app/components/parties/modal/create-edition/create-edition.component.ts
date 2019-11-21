import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PartiesService } from '../../parties.service';
import Swal from 'sweetalert2';


interface EditionData {
  idEdition: number;
  party: string;
  name: string;
  description: string;
  local: string;
  actualLot: string;
  date: string;
  create: boolean;
  idAcademicCenter: number;
}
@Component({
  templateUrl: './create-edition.component.html',
})
export class CreateEditionComponent implements OnInit {

  editionForm: FormGroup;
  parties: [];
  lots: [];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: EditionData,
      public dialogRef: MatDialogRef<CreateEditionComponent>,
      private formBuilder: FormBuilder,
      private partiesService: PartiesService,
  ) {}

  ngOnInit(): void {
      this.editionForm = this.formBuilder.group({
        party: [this.data.party, Validators.required],
        name: [this.data.name, Validators.required],
        description: [this.data.description, Validators.required],
        local: [this.data.local, Validators.required],
        actualLot: [this.data.actualLot, Validators.required],
        date: [this.data.date, Validators.required],
      });
      this.partiesService.getAcademicCenterParties(this.data.idAcademicCenter).subscribe(parties => {
        this.parties = parties;
      });
      this.partiesService.getLots().subscribe(lots => {
        this.lots = lots;
      });
  }

  submit(): void {
    if (!this.editionForm.valid || this.editionForm.pending) {
      Swal.fire('Fill the required fields', '', 'error');
      return;
    }

    const edition = this.editionForm.getRawValue();

    if (this.data.create) {
      this.partiesService.createEdition(edition).subscribe(res => {
        console.log(res);
      });
    } else {
      edition.id = this.data.idEdition;
      this.partiesService.updateEdition(edition).subscribe(res => {
        console.log(res);
      });
    }
    this.dialogRef.close();
  }

}
