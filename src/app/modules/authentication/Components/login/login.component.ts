import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, routes } from 'src/app/core/core.index';
import { LoginDTO } from 'src/app/core/models/auth/LoginDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  loginForm!:FormGroup ;
  public routes = routes;
  destory!:Subscription;
  public show_password = true;
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private router: Router, private auth: AuthService) {}


 

  loginFormSubmit() {
    if (this.form.valid) {
      var obj =new LoginDTO();
      obj.userName = this.form.value.username ?? '';
      obj.password = this.form.value.password ?? '';
    this.destory =  this.auth.authenticateUser(obj).subscribe((res) => {
      if(res.code==200){
        this.auth.SaveToken(res?.content?.token ?? '',res?.content?.roleIds[0]??0);
        this.router.navigate([this.auth.getUserGroup(res?.content?.roleIds[0]??0)]);
      }
    },(error)=>{
      console.log(error);
    });
    }
  }


  ngOnDestroy(): void {
    if (this.destory) {
      this.destory.unsubscribe();
    }
  }
}
