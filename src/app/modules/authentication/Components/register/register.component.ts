import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, routes } from 'src/app/core/core.index';
import { RegisterDTO } from 'src/app/core/models/auth/LoginDTO';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  public isValidConfirmPassword = false;
  public CustomControler: undefined;
  public routes = routes;


  // form = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required]),
  //   confirmPassword: new FormControl('', [Validators.required]),
  // });



  constructor(private router: Router, private fg: FormBuilder , private auth: AuthService) {

    const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {

      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };

    this.registerForm = this.fg.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: passwordMatchValidator, 
      }
    );


  }








  ngOnInit(): void {

  }
  







  submit() {

    var obj =new RegisterDTO();
    obj.username=this.registerForm.value.username;
    obj.email=this.registerForm.value.email;
    obj.password=this.registerForm.value.password;
    obj.ModifyBy=0;
    this.auth.registerUser(obj).subscribe((res) => {
      console.log(res);
      if(res.code==200){
        this.router.navigate([this.routes.login]);
      }
    },(error)=>{
      console.log(error);
    });
  }

}
