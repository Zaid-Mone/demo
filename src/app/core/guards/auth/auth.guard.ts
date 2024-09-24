import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, routes } from '../../core.index';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>  
    | boolean
    | UrlTree {
      const requiredGroupId = route.data['requiredGroupId'];
      const userGroupId = this.auth.getUserGroupId();
      const token =localStorage.getItem('access_token');

      if (token && !this.auth.isTokenExpired(token)) {
        if (userGroupId === requiredGroupId) {
          return true; 
        } else {
          // here i must redirect the user to his module
          this.router.navigate(['/unauthorized']); 
          return false;
        }
      } else {
        // token is missing or expired
        localStorage.removeItem('access_token'); 
        this.router.navigate(['/auth/login']);
        return false;
      }




    // if (localStorage.getItem('access_token')) {
    //   return true;
    // } else {
    //   this.router.navigate([routes.login]);
    //   return false;
    // }
    // if (localStorage.getItem('access_token')) {
    //   if (userGroupId === requiredGroupId) {
    //     return true; 
    //   } else {
    //     this.router.navigate(['/unauthorized']); 
    //     return false;
    //   }
    // } else {
    //   this.router.navigate([routes.login]);
    //   return false;
    // }
  }
}
