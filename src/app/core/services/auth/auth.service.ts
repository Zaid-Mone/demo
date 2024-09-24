import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { routes, SideBarService } from '../../core.index';
import { DataService } from '../common/data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { LoginDTO, LoginResponseDTO, RegisterDTO, UserInfoDTO } from '../../models/auth/LoginDTO';
import { APIResponse } from '../../models/common/APIResponse';
import { ChangePasswordDTO, EditUserInfoDTO, UserProfileDTO } from '../../models/common/UserInfoDTO';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DataService<any>{
  public checkAuth: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('authenticated') || "false"
  );

  constructor(private router: Router, 
    private sidebar: SideBarService,
    private _http: HttpClient)  {
    super(_http)
        this.resourceName = 'Auth/'
      }


  authenticateUser(loginData: LoginDTO): Observable<APIResponse<LoginResponseDTO>> {
    this.ApiName = 'Login';
    this.url = environment.API_LiveURL;
    return this.httpPost(loginData);

  }

  registerUser(registerData: RegisterDTO): Observable<APIResponse<any>> {
    this.ApiName = 'Register';
    this.url = environment.API_LiveURL;
    return this.httpPost(registerData);
  }

  public login(): void {
    this.checkAuth.next('true');
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('timeOut', Date());
    this.router.navigate([routes.dashboard]);
    localStorage.setItem('layoutPosition', '1');
  }

  public logout(): void {
    this.router.navigate([routes.login]);
    this.checkAuth.next("false");
    localStorage.clear();
    sessionStorage.clear();
  }

  SaveToken(token: string,groupID:number) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('groupID', groupID.toString());
  }

  removeStorage(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('groupID');
  }

  getUserGroup(groudID:number):string{
switch(groudID){
  case 1:
    default:
    return "/super-admin/";
  case 2:
    return "/admin/";
  case 3:
    return "/customer/";

}
  }

  getUserGroupId():number{
    return parseInt(localStorage.getItem('groupID')??'0');
  }

   ForgotPassword(Email: string): Observable<APIResponse<number>> {
    this.ApiName = 'ForgetPassword';
    this.url = environment.API_LiveURL;
    return this.httpPost({Email:Email});
  }

  ResetPassword(userId:number,password:string): Observable<APIResponse<void>> {
    this.ApiName = 'ResetPassword';
    this.url = environment.API_LiveURL;
    return this.httpPost({UserID:userId,NewPassword:password});
  }

  VerifyCode(Code:string): Observable<APIResponse<void>> {
    let params = new HttpParams().set('VerficationCode', Code);
    this.ApiName = 'Verfication';
    this.url = environment.API_LiveURL;
    return this.httpGetWithParam(params);
  }

  changepassword(changePasswordDTO:ChangePasswordDTO):Observable<APIResponse<void>> {
    this.resourceName = 'Common/'
    this.ApiName = 'ChangePassword';
    this.url = environment.API_LiveURL;
    return this.httpPost(changePasswordDTO);
  }

  changeUserProfileImage(formData:FormData){
    this.resourceName = 'Common/'
    this.ApiName = 'UploadImage';
    this.url = environment.API_LiveURL;
  return this.httpPost(formData);
  }

  GetUserProfile():Observable<APIResponse<UserProfileDTO>> {
    this.resourceName = 'Common/'
    this.ApiName = 'GetUserProfile';
    this.url = environment.API_LiveURL;
  return this.httpGetWithoutParam();
  }

  EditUserProfile(editUserInfoDTO:EditUserInfoDTO){
    this.resourceName = 'Common/'
    this.ApiName = 'EditUserProfile';
    this.url = environment.API_LiveURL;
  return this.httpPost(editUserInfoDTO);
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    const decoded: any =jwtDecode(token);;
    const expiry = decoded.exp * 1000;
    return Date.now() >= expiry;
  } 

}
