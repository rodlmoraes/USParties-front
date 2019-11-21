import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegisterService } from './register.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  Roles: string[] = ['Academic Center', 'Salesman'];
  role: 'Academic Center' | 'Salesman';

  constructor(private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      campus: ['', Validators.required],
      university: [''],
      tel: [''],
      name: [''],
      description: [''],
    });
  }

  onRoleChange(event) {
    this.role = event.value;
  }

  register() {

    if (!this.registerForm.valid || this.registerForm.pending) {
      Swal.fire('Fill the required fields', '', 'error');
      return;
    }

    const formValues = this.registerForm.getRawValue();

    if (this.role === 'Academic Center') {
      delete formValues.university;
      delete formValues.tel;
      this.registerService.registerAcademicCenter(formValues).subscribe(res => {
        if (res) {
          Swal.fire('You are registered', '', 'success');
          this.router.navigate(['parties', res.id]);
        }
      });
    } else if (this.role === 'Salesman') {
      delete formValues.name;
      delete formValues.description;
      this.registerService.registerSalesman(formValues).subscribe(res => {
        if (res) {
          Swal.fire('You are registered', '', 'success');
          this.router.navigate(['posts', res.id]);
        }
      });
    }

  }

}
