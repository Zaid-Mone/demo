import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, routes } from 'src/app/core/core.index';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnDestroy,OnInit{
  constructor(private router: Router, private auth: AuthService,private route: ActivatedRoute) {}
  public routes = routes;
  public show_password = true;
  public userID!:number;
  public email: string | null = null;
  destory:Subscription[]=[];
  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.destory.push(this.route.queryParams.subscribe(params => {
      const encodedEmail = params['_e'];
      this.email = encodedEmail ? atob(encodedEmail) : null;
      this.userID = Number(atob(params['_u']));
      console.log('Email:', this.email);
      console.log('userID:', this.userID);
    }));

  }



  get f() {
    return this.form.controls;
  }

  reset_password() {

    if (this.form.valid) {
      this.destory.push(this.auth.ResetPassword(this.userID,this.form.value.password??'').subscribe((res) => {
        if(res.code==200){
          this.router.navigate(['/Auth/login']);
        }
      },(error)=>{
        console.log(error);
      }));
    }
  }


  ngOnDestroy(): void {
    this.destory.forEach(subscription => subscription.unsubscribe());
  }
}
