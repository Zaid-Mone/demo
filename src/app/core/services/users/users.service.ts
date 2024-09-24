import { Injectable } from '@angular/core';
import { DataService } from '../common/data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { AddUserDTO } from '../../models/common/AddUserDTO';
import { APIResponse, PageList } from '../../models/common/APIResponse';
import { Observable } from 'rxjs';
import { tblWebUsersTypeLockup, UserDetailsDTO } from '../../models/common/UserInfoDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService<any>{

  constructor(private _http:HttpClient) { super(_http)}


AddUser(username:string,email:string,roleID:number):Observable<APIResponse<string>>{

let addUser = new AddUserDTO();
addUser.username = username;
addUser.email = email;
addUser.roleId = roleID;

  this.resourceName = 'SuperAdmin/'
  this.ApiName = 'AddUser';
  this.url = environment.API_LiveURL;
  return this.httpPost(addUser);
}


getUsers(page:number,pageSize:number,userTypeID:number):Observable<APIResponse<PageList<UserDetailsDTO>>>{
  let params = new HttpParams()
  .set('PageIndex',page)
  .set('PageSize',pageSize)
  .set('userType',userTypeID);
  this.resourceName = 'Common/'
  this.ApiName = 'GetUsers';
  this.url = environment.API_LiveURL;
  return this.httpGetWithParam(params);
}

getRoles():Observable<APIResponse<tblWebUsersTypeLockup[]>>{
  const groupID =  localStorage.getItem('groupID')??0;
let params = new HttpParams()
.set('roleID',groupID);

this.resourceName = 'Common/'
this.ApiName = 'GatRolesByRoleID';
this.url = environment.API_LiveURL;
return this.httpGetWithParam(params);


}





}
