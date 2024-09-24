import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, routes } from 'src/app/core/core.index'

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent {
  public routes = routes;
  constructor(private router: Router, private auth: AuthService) {}

RedirectToDashboard(){
  this.auth.getUserGroup(this.auth.getUserGroupId());
}
}
