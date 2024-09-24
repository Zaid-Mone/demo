import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/core.index';
import { SharedModule } from 'src/app/shared/shared.module';
import { Sort } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users.service';
import { tblWebUsersTypeLockup, UserDetailsDTO } from 'src/app/core/models/common/UserInfoDTO';
import {  Subscription } from 'rxjs';
import { AppTableComponent } from 'src/app/feature-module/common/app-table/app-table.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from "../add-user/add-user.component";
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [SharedModule, RouterModule, AppTableComponent, CommonModule, AddUserComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{

  constructor(private _userServices:UsersService,private toast:ToastrService) {}
totalRecords=0;
destory:Subscription[]=[];
users:UserDetailsDTO[]=[];
roles:tblWebUsersTypeLockup[]=[];
ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }




getUsers(page:number=1,pageSize:number=5,userTypeID:number=0){
this.destory.push(this._userServices.getUsers(page,pageSize,userTypeID).subscribe({
  next:(response)=>{
this.totalRecords = response.content?.totalCount!;
this.users  = response.content?.data!;
},
  error:(err)=>{
this.toast.error('حدث خطأ')
  }
}))
}



OnPageChage(event:any){
  this.getUsers(event.page,event.pageSize);
 }

 OnPageLimitChange(event:any){
  this.getUsers(event.page,event.pageSize);
 }


getRoles(){
  this.destory.push(
    this._userServices.getRoles().subscribe({
      next:(response)=>{
      this.roles = response.content!;
      },
      error:(err)=>{
        this.toast.error('حدث خطأ')
      }
    })
  )
}





  public routes = routes;


  isCollapsed1 = false;

  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }

  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }


  public sortData(sort: Sort) {
    const data = this.users.slice();

    if (!sort.active || sort.direction === '') {
      this.users = data;
    } else {
      this.users = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  isAddedNewUser(){
    debugger
    this.getUsers();
  }


}
