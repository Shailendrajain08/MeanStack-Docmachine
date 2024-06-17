import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {


  resetForm!: FormGroup;
  message: any;
  no!: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });
  }

  onSubmit() {
    console.log(this.resetForm.value.emailId)
    this.authService.forgotpsw(this.resetForm.value.emailId)
      .subscribe(
        (data:any) => {
          console.log("king123")
          console.log(data)
          this.message = data['message']
          this.no = false;
          // 
        },
        error => {
          this.no = true;
          this.message = null;
          console.log("error")
        });
  }
}
