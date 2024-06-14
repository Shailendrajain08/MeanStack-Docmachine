import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-verify-email',
  standalone: false,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
  resetForm!: FormGroup;
  message: any;
  token: any;
  email: any;
  toggle: boolean | undefined;

  constructor(private authService: AuthService,private route: ActivatedRoute, private toastr: ToastrService ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['id'];
    let val:any = jwtDecode(this.token);
    this.email = val['_id'];
  }

  onSubmit(){
    if (this.email) {
      this.authService.updateEmail('a', this.email)
        .subscribe(
          (data:any) => {
            console.log("king123")
            console.log(data)
            if (data) {
              this.toggle = true;
              this.toastr.success('Email Verification done');
            } else {
                console.log("error")
            }
          })
    }
  }
}
