import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password',
  standalone: false,
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent implements OnInit {

  resetForm!: FormGroup;
  show = false;
  show1 = false;
  password = 'password';
  password1 = 'password';
  message: any;
  token: any;
  email: any;
  toggle!: boolean;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['id'];
    let val: any = jwtDecode(this.token);
    this.email = val._id;
    this.resetForm = this.formBuilder.group({
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    if (this.resetForm.value) {
      if (this.resetForm.value.password1 === this.resetForm.value.password2) {
        this.submitted = true
        this.authService.updatePsw(this.resetForm.value, this.email)
          .subscribe(
            (data: any) => {
              if (data['success'] == true) {
                this.toggle = true;
                this.toastr.success('Password Updated Successfully!', 'Congratulations');
              }
            },
            error => {
              this.toastr.error('Please try again!', 'Something went wrong');
            });
      }
      else{
        this.toastr.error('Both Password should be same!', 'Password Mismatch');
      }
    }
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  onClick1() {
    if (this.password1 === 'password') {
      this.password1 = 'text';
      this.show1 = true;
    } else {
      this.password1 = 'password';
      this.show1 = false;
    }
  }
}
