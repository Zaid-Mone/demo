import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { LockScreenComponent } from './Components/lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { VerificationComponent } from './Components/verification/verification.component';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
    {
      path: 'reset-password',
      component: ResetPasswordComponent,
    },
    {
      path: 'lock-screen',
      component: LockScreenComponent,
    },
    {
      path: 'verification',
      component: VerificationComponent,
    },
    {
      path: 'access-denied',
      component: AccessDeniedComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
