import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptgroup } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { AuthService, routes } from 'src/app/core/core.index';
import { SettingMenuComponent } from '../setting-menu/setting-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordDTO, EditUserInfoDTO, UserProfileDTO } from 'src/app/core/models/common/UserInfoDTO';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [RouterModule,FormsModule,SettingMenuComponent,SharedModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent implements  OnInit,OnDestroy{
  @ViewChild('userDataImage') userDataImage!: ElementRef<HTMLImageElement>;
  @ViewChild('noDataUserImage') noDataUserImage!: ElementRef<HTMLImageElement>;

  public routes = routes;
    _gender = 1;
    section:number=1;
    userProfile!:UserProfileDTO;
    destroy:Subscription[]=[];


    constructor(private auth:AuthService) {}
  
  ngOnInit(): void {
   this.getUserProfile();
  }
    changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
    
    generalSettingsForm = new FormGroup({
      firstnameAr: new FormControl(''),
      lastnameAr: new FormControl(''),
      phoneNumber: new FormControl(''),
      genderID: new FormControl(0),
      birthDate: new FormControl(''),
  });


    get f() {
      if(this.section==1)
        return this.generalSettingsForm.controls
      else 
        return this.changePasswordForm.controls;
    }

    changeTab(event:number){
      this.section=event;
    }


    onSubmit(tab:number){
      switch(tab){
        case 1: // general settings
        this.editUserProfile();
        break;
          case 2: // chagnge password
          this.changePassword();
            break;
        default:
          break;
      }
    }

    changePassword(){
      debugger
      var obj = new ChangePasswordDTO();
      obj.currentPassword = this.changePasswordForm.controls.currentPassword.value??'';
      obj.newPassword = this.changePasswordForm.controls.confirmNewPassword.value??'';
      this.destroy.push(this.auth.changepassword(obj).subscribe({
        next:(response)=>{
          if(response.code==200){
            alert('Good Job')
            this.changePasswordForm.reset();
          }
        },
        error:(err)=>{
          
          console.log(err);
          console.log(err.error.message);
          alert(err.error.message)
        }
      }))
    }



    onFileChange(event: Event){
      debugger
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);
        this.auth.changeUserProfileImage(formData).subscribe({
          next:(response)=>{
            debugger
            console.log(response);
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }


    getUserProfile(){
      this.destroy.push(this.auth.GetUserProfile().subscribe({
        next:(response)=>{
          this.userProfile = response.content!;
          this.initializeForms();
        },
          error:(err)=>{
        console.log(err);
          }
      }))
    }

    initializeForms() {
      this.generalSettingsForm = new FormGroup({
        firstnameAr: new FormControl(this.userProfile.firstNameAr ?? ''),
        lastnameAr: new FormControl(this.userProfile.lastNameAr ?? ''),
        phoneNumber: new FormControl(this.userProfile.phoneNumber ?? ''),
        genderID: new FormControl(this.userProfile.gender ?? 0),
        birthDate: new FormControl(this.userProfile.birthDate ?? ''),
      });
    }



editUserProfile(){
  debugger
  let obj = new EditUserInfoDTO();
  obj.birthDate = new Date(this.generalSettingsForm.controls.birthDate.value!);
  obj.firstNameAr = this.generalSettingsForm.controls.firstnameAr.value!;
  obj.lastNameAr = this.generalSettingsForm.controls.lastnameAr.value!;
  obj.phoneNumber = this.generalSettingsForm.controls.phoneNumber.value!;
  obj.gender = this.generalSettingsForm.controls.genderID.value!;
  this.destroy.push(this.auth.EditUserProfile(obj).subscribe({
    next:(response)=>{
      console.log(response);
    },
    error:(er)=>{
      console.log(er);
    }
  }));
}



    ngOnDestroy(): void {
    this.destroy.forEach((unSub)=> unSub.unsubscribe())
    }
     
}
