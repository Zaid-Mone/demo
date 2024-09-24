import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature-module/landing-pages/home/home.component';
import { LoggedInGuard } from './core/guards/loggedIn/logged-in.guard';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { UserGroup } from './core/enums/UserGroup';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
{
path:'home',
component:HomeComponent
},
  {
    path: 'Auth',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: 'super-admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/super-admin/super-admin.module').then((m) => m.SuperAdminModule),
    data: { requiredGroupId: UserGroup.SuperAdmin },
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    data: { requiredGroupId: UserGroup.Admin },
  },

  {
    path: 'error',
    loadChildren: () =>
      import('./shared/error/error.module').then((m) => m.ErrorModule),
  },

  {
    path: '**',
    redirectTo: 'error/404',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
