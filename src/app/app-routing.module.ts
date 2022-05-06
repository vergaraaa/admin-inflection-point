import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
    data: { requiresLogin: false, role: 3, nav: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
    data: { requiresLogin: true, role: 3, nav: true, navname: 'HOME' },
    canActivate: [AuthGuard],
  },
  {
    path: 'my-apis',
    loadChildren: () =>
      import('./views/my-apis/my-apis.module').then((m) => m.MyApisModule),
    data: { requiresLogin: true, role: 2, nav: true, navname: 'MIS APIS' },
    canActivate: [AuthGuard],
  },
  {
    path: 'api',
    loadChildren: () =>
      import('./views/api-detail/api-detail.module').then(
        (m) => m.ApiDetailModule
      ),
    data: { requiresLogin: true, role: 3, nav: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./views/users/users.module').then((m) => m.UsersModule),
    data: { requiresLogin: true, role: 1, nav: true, navname: 'USUARIOS' },
    canActivate: [AuthGuard],
  },
  {
    path: 'create-api',
    loadChildren: () =>
      import('./views/api-form/api-form.module').then((m) => m.ApiFormModule),
    data: { requiresLogin: true, role: 2, nav: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-api/:api_id',
    loadChildren: () =>
      import('./views/api-form/api-form.module').then((m) => m.ApiFormModule),
    data: { requiresLogin: true, role: 2, nav: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'create-route/:api',
    loadChildren: () =>
      import('./views/route-form/route-form.module').then(
        (m) => m.RouteFormModule
      ),
    data: { requiresLogin: true, role: 2, nav: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-route/:api/:route_id',
    loadChildren: () =>
      import('./views/route-form/route-form.module').then(
        (m) => m.RouteFormModule
      ),
    data: { requiresLogin: true, role: 2, nav: false },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
