import { Component, EventEmitter, Input, OnDestroy, Output, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddUserDTO } from 'src/app/core/models/common/AddUserDTO';
import { tblWebUsersTypeLockup } from 'src/app/core/models/common/UserInfoDTO';
import { UsersService } from 'src/app/core/services/users/users.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'add-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnDestroy{
  @Input() roles: tblWebUsersTypeLockup[] = [];
  @Output() isAdded= new EventEmitter<boolean>(false);

  selectedRole: number | null = null;
  destroy!:Subscription;
  Action = 'status';
  status = 'action';


  constructor(private _userService:UsersService,private toast:ToastrService) {}




  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    roleID: new FormControl(0, [Validators.required]),
    // password: new FormControl('', [Validators.required]),
    // confirmPassword: new FormControl('', [Validators.required]),
  });


  get f() {
    return this.form.controls;
  }


onSubmit(){
debugger
var formValues = this.form.controls!;
this.destroy = this._userService.AddUser(formValues.username.value!,formValues.email.value!,formValues.roleID.value!)
 .subscribe({
next:(response)=>{
this.toast.success(response.content);
this.form.reset();
this.isAdded.emit(true);
},
error:(err)=>{
  this.toast.success(err.error.message);
  this.isAdded.emit(false);
}
});
}



  ngOnDestroy(): void {
  this.destroy.unsubscribe();
  }

}
