import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './log-in.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  Roles: string[] = ['Academic Center', 'Salesman'];
  role: 'Salesman' | 'Academic Center';

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onRoleChange(event) {
    this.role = event.value;
  }

  login() {

    if (!this.loginForm.valid || this.loginForm.pending) {
      Swal.fire('Fill the required fields', '', 'error');
      return;
    }

    const formValues = this.loginForm.getRawValue();

    if (this.role === 'Academic Center') {
      this.loginService.loginAcademicCenter(formValues).subscribe(res => {
        if (res) {
          this.router.navigate(['parties', res.id]);
        }
      });

    } else if (this.role === 'Salesman') {
      this.loginService.loginSalesman(formValues).subscribe(res => {
        if (res) {
          this.router.navigate(['posts', res.id]);
        }
      });
    }

  }

}
