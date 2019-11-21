import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PostsService } from '../posts.service';
import Swal from 'sweetalert2';

interface PostData {
    idPost: number;
    idSalesman: number;
    partyEdition: string;
    amount: number;
    price: number;
    create: boolean;
}
@Component({
    templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit {
    partyEditions: [];
    postForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PostData,
        public dialogRef: MatDialogRef<CreatePostComponent>,
        private formBuilder: FormBuilder,
        private postsService: PostsService
    ) {}

    ngOnInit(): void {
        this.postForm = this.formBuilder.group({
            partyEdition: [this.data.partyEdition, Validators.required],
            amount: [this.data.amount, Validators.required],
            price: [this.data.price, Validators.required],
        });

        this.postsService.getPartyEditions().subscribe(partyEditions => {
            this.partyEditions = partyEditions;
        });
    }

    submit(): void {
      if (!this.postForm.valid || this.postForm.pending) {
        Swal.fire('Fill the required fields', '', 'error');
        return;
      }
      const post = this.postForm.getRawValue();
      this.postsService.getSalesman(this.data.idSalesman).subscribe(salesman => {
        post.salesman = salesman;
        if (this.data.create) {
          this.postsService.create(post).subscribe(res => console.log(res));
        } else {
          post.id = this.data.idPost;
          this.postsService.update(post).subscribe(res => console.log(res));
        }
        this.dialogRef.close();
      });
    }
}
