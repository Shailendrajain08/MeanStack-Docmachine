import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NotVerifiedComponent } from './not-verified/not-verified.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [SignUpComponent, LoginComponent, TwoFactorAuthComponent, VerifyEmailComponent, NotVerifiedComponent, NewUserComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
})
export class AuthModule { }
