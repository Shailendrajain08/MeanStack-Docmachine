import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-two-factor-auth',
  standalone: false,
  templateUrl: './two-factor-auth.component.html',
  styleUrl: './two-factor-auth.component.scss'
})
export class TwoFactorAuthComponent implements OnInit {
  public authcode: any;
  public tfa: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private toastr : ToastrService) {

  }

  ngOnInit(): void {
    this.authService.loginData.subscribe((data:any) => {
      if (data['result']) {
        this.tfa = data['result']
      }
    })
  }

  confirm() {
    this.authService.verify(this.authcode)
      .subscribe(
        (result:any) => {
          if (result['status'] == 200) {
            this.toastr.success(result['message']);
            this.router.navigate(['/'], { queryParams: { registered: true } });
          } else {
            this.toastr.error(result['message']);
          }
        },
        error => {
          this.toastr.error('something wrong, please check the details!');
        });
  }
}
