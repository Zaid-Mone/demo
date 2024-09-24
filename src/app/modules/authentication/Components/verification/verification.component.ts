import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService, routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent implements OnInit ,OnDestroy {
  public routes = routes;
  destory:Subscription[]=[];
  email: string | null = null;
  userId: string | null = null;
   form = new FormGroup({
    Vcode: new FormControl('', [Validators.required]),
  });
  constructor(private route: ActivatedRoute,private router: Router, private auth: AuthService,private toats:ToastrService) {}
  ngOnInit() {
  
    this.destory.push(this.route.queryParams.subscribe(params => {
      const encodedEmail = params['_e'];
      this.email = encodedEmail ? atob(encodedEmail) : null;
      console.log('Email:', this.email);
    }));
  }
  
  get f() {
    return this.form.controls;
  }


  resend(){
    this.destory.push(this.auth.ForgotPassword(this.email??'').subscribe((res) => {
      if(res.code==200){
        this.userId = (res?.content ?? '0').toString();
        this.toats.success('تم ارسال رمز التحقق بنجاح');
      }
    }));
  }
  onSubmit() {
try{
    var  vcode = this.form.value.Vcode?.toString();
var vCode= vcode?.substring(0,4);
 this.userId= vcode?.substring(4)??'';


    if (this.form.valid) {
      this.destory.push(this.auth.VerifyCode(vcode??'').subscribe((res) => {
        if(res.code==200){
          this.router.navigate(['/Auth/reset-password'], {
            queryParams: {
              _e: btoa(this.email ?? '') , // encrypt the email
              _u: btoa(this.userId ?? '') // encrypt the user ID
            }
          });
        }
        else{
          this.toats.error('رمز التحقق خاطئ');
        }
      },(error)=>{
        this.toats.error('رمز التحقق خاطئ');
      }));
      }
  }
  catch(error){

    this.toats.error('رمز التحقق خاطئ');
  }
}
 







  
  ngOnDestroy(): void {
    this.destory.forEach(subscription => subscription.unsubscribe());
  }
}