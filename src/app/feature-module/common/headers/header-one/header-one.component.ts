import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService, CommonService, routes } from 'src/app/core/core.index';
import { UserInfoDTO } from 'src/app/core/models/auth/LoginDTO';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss'],
  standalone:true,
  imports:[RouterModule],
})
export class HeaderOneComponent  {
  public miniSidebar = false;
  public headerSidebarStyle = '1';
  public routes = routes;
  public userInfo: UserInfoDTO = new UserInfoDTO();
  public userInfoSubscription: Subscription;
  elem=document.documentElement
  

  constructor(private auth: AuthService, private sideBar: SideBarService,private common:CommonService) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.sideBar.headerSidebarStyle.subscribe((res: string) => {
      this.headerSidebarStyle = res;
    });



    this.userInfoSubscription = this.common.getUserInfo().subscribe((res: UserInfoDTO) => {
      this.userInfo = res;
    });
  }

 

  public logOut(): void {
    this.auth.logout();
  }
  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileIcon(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  fullscreen() {
    if(!document.fullscreenElement) {
      this.elem.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
  }
  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }
}
