import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../models/common/APIResponse';
import { UserInfoDTO } from '../../models/auth/LoginDTO';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService extends DataService<any>{
  public baseRoute: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public pageRoute: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public lastRoute: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public currentRoute: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private userInfoSubject = new BehaviorSubject<UserInfoDTO | null>(null);
  public userInfo$ = this.userInfoSubject.asObservable();



  constructor(private router: Router,private _http: HttpClient)  {
    super(_http)
    this.resourceName = 'Common/'
  }

  getUserInfo(): Observable<UserInfoDTO> {
    this.ApiName = 'GetUserInfo';
    this.url = environment.API_LiveURL;
  
    return this.httpGetWithoutParam<APIResponse<UserInfoDTO>>().pipe(
      map((response: APIResponse<UserInfoDTO>) => {
        if (response.content) {
          return response.content;
        }
        console.error('Invalid response:', response);
        throw new Error('Failed to get user info');
      }),
      tap((userInfo: UserInfoDTO) => { 
        this.userInfoSubject.next(userInfo);
      })
    );
  }
  
}
