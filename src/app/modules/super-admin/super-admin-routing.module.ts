import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminAppComponentComponent } from './Components/super-admin.app-component/super-admin.app-component.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SettingComponent } from '../Shared/Settings/setting/setting.component';
import { UsersListComponent } from '../Shared/Users/users-list/users-list.component';


const routes: Routes = [
  {
    path: '',
    component: SuperAdminAppComponentComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'Settings',component:SettingComponent},
      { path: 'users',component:UsersListComponent},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
