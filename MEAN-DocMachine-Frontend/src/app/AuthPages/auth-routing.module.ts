import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    }, 
    {
        path: 'signUp',
        component: SignUpComponent,
        pathMatch: 'full'
    },
    {
        path: '2FA',
        component: TwoFactorAuthComponent,
        pathMatch: 'full'
    },
    {
        path: "verifyEmail/:id",
        component: VerifyEmailComponent,
        pathMatch: "full",
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }