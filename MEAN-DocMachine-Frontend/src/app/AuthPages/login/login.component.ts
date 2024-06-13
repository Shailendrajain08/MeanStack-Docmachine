import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  password: any;
  show = false;
  loginForm!: FormGroup;
  isDisabled: boolean = false;
  isVisible: boolean = false;
  submitted: boolean = false;
  otp: any;
  value: any;
  data1: any;
  data: any;
  closeResult: string | undefined;

  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.password = 'password';

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  inputFun(a: any) {
    this.submitted = false
    this.isDisabled = false;
    this.value = a
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

  onSubmit() {
    if (!this.value) {
      this.submitted = true
      this.isDisabled = true;
      if (this.loginForm.invalid) {
        this.isDisabled = false;
        return;
      }
    }
    this.authService.login(this.loginForm.value)
      .subscribe(
        (data: any) => {
          this.authService.addLoginData(data);
          this.data = data
          if (data['result']) {
            this.authService.addToken(data['result'].token);
            if (data['result']['dataURL']) {
              this.router.navigate(['/2FA']);
            } else {
              this.otp = true;
              // if (data['result']) {
              //   this.userService.addToken(data['result'].token);
              this.authService.getUser().subscribe(
                data => {
                  this.data1 = data
                },
                () => {
                  this.loginError();
                });
            }
          } else {
            this.loginError();
          }
        })
  }


  loginError() {
    this.isDisabled = false;
  }
  onSignup() {
    this.router.navigate(['/signUp'])
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
