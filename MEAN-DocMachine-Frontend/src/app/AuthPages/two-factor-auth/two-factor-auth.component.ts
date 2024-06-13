import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
              private router: Router) {
    
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
        data => {
          for(let i in data){
          }
          // if (data.status == 200) {
          //   this.toastr.success(data['message']);
          //   this.router.navigate(['/login'], { queryParams: { registered: true } });
          // } else {
          //   alert(data['message']);
          // }
        },
        error => {
          alert('something wrong, please check the details!');
        });
  }
}
