import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppComponentComponent } from './components/admin.app-component/admin.app-component.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: AdminAppComponentComponent,
    children: [
      {
        path: '',
        redirectTo: 'Dashboard',
        pathMatch: 'full',
      },
      { path: 'Dashboard', component: DashboardComponent},
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
