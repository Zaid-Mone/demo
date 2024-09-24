import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule , ReactiveFormsModule , CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy{
  public routes = routes;
  destory!:Subscription;
   form = new FormGroup({
    Email: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }
 constructor(private router: Router, private auth: AuthService) {}
  Submit() {
    var  email = this.form.value.Email;
    if (this.form.valid) {
    this.destory = this.auth.ForgotPassword(email??'').subscribe((res) => {
      if(res.code==200){
        this.router.navigate(['/Auth/verification'], {
          queryParams: {
             _u: encodeURIComponent(res?.content ?? ''), // Encode the userID
            _e: btoa(email ?? '') // encrypt the email
          }
        });
      }
    },(error)=>{
      console.log(error);
    });
    }
  }
  ngOnDestroy(): void {
    this.destory.unsubscribe();
  }
}
