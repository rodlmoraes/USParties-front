import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartiesService } from '../../parties.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './create-party.component.html',
})
export class CreatePartyComponent implements OnInit {

  partyForm: FormGroup;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data,
      public dialogRef: MatDialogRef<CreatePartyComponent>,
      private formBuilder: FormBuilder,
      private partiesService: PartiesService,
  ) {}

  ngOnInit(): void {
      this.partyForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
      });
  }

  submit(): void {
    if (!this.partyForm.valid || this.partyForm.pending) {
      Swal.fire('Fill the required fields', '', 'error');
      return;
    }
    const party = this.partyForm.getRawValue();
    this.partiesService.getAcademicCenter(this.data.idAcademicCenter).subscribe(academicCenter => {
      party.academicCenter = academicCenter;
      this.partiesService.createParty(party).subscribe(createdParty => console.log(createdParty));
    });
    this.dialogRef.close();
  }
}
