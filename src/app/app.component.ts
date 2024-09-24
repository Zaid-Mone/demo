import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event } from '@angular/router';
import { AuthService, SpinnerService } from './core/core.index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Kanakku';

  constructor(private spinner: SpinnerService, private router: Router,private auth: AuthService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      }
    });
    // this.redirectToModule();
  }




redirectToModule(){
  if(localStorage.getItem('access_token')){
    this.router.navigate([this.auth.getUserGroup(parseInt(localStorage.getItem('groupID')??'0'))]);
  }else{
    this.router.navigate(['/Auth/login']);
  }
}
}