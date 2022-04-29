import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () =>
            import('./views/login/login.module').then((m) => m.LoginModule),
        data: { requiresLogin: false },
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        loadChildren: () =>
        import('./views/home/home.module').then((m) => m.HomeModule),
        data: { requiresLogin: true },
        canActivate: [AuthGuard],
    },
    {
        path: 'my-apis',
        loadChildren: () =>
        import('./views/my-apis/my-apis.module').then((m) => m.MyApisModule),
        data: { requiresLogin: true },
        canActivate: [AuthGuard],
    },
    {
        path: 'api',
        loadChildren: () =>
        import('./views/api-detail/api-detail.module').then(
            (m) => m.ApiDetailModule
            ),
        data: { requiresLogin: true },
        canActivate: [AuthGuard],
    },
    {
        path: 'users',
        loadChildren: () =>
        import('./views/users/users.module').then((m) => m.UsersModule),
        data: { requiresLogin: true },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
