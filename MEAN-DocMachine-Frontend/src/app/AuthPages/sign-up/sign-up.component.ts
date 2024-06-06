import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {


  password = 'password';
  password1 = 'password';
  show = false;
  show1 = false;
  isDisabled: boolean = false;
  isVisible: boolean = false;
  submitted = false;
  registerForm!: FormGroup;
  closeResult!: string;


  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private toaster : ToastrService, private authService : AuthService, private router : Router) {
  }

  ngOnInit(): void {
    this.password = 'password';
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      checked:['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onsubmit() {
    if(this.registerForm.value.checked === true){
      this.submitted = true
      this.isDisabled = true;
      if(this.registerForm.invalid) {
        alert('Invalid inputs, please check again!');
        this.isDisabled = false;
        return ;
      }
      this.registerForm.value.role = 'manager';
      this.registerForm.value.verified = 'no';
      this.authService.register(this.registerForm.value).subscribe(
        data => {
        this.router.navigate(['/'], { queryParams: { registered: true } });
        return data
      }, (error) => {
        console.error(error)
      })
    }
    else{
      alert('Please Accept Terms and Conditions!');
      
    }
  }

  onLogin() {
    throw new Error('Method not implemented.');
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