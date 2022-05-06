import { Injectable, OnInit } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user_role: number = 0;
  constructor(private router: Router, private userService: UserService) {}

  getUserRole() {
    this.userService.getUserRole().subscribe({
      next: (res: any) => {
        this.user_role = res.role;
      },
      error: (err) => console.error(err),
    });
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(route, url);
  }

  checkLogin(route: ActivatedRouteSnapshot, url: any) {
    const requiresLogin = route.data['requiresLogin'];
    const role = route.data['role'];

    if (requiresLogin) {
      // not logged in so redirect to login page

      if (localStorage.getItem('token')) {
        if (role <= 2) {
          this.userService.getUserRole().subscribe({
            next: (res: any) => {
              this.user_role = res.role;
              if (localStorage.getItem('token')) {
                if (this.user_role > role) {
                  this.router.navigate(['/home']);
                  return false;
                }
                return true;
              }

              this.router.navigate(['/login']);
              return false;
            },
            error: (err) => console.error(err),
          });
        }
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // logged in so redirect to home page
      if (localStorage.getItem('token')) {
        this.router.navigate(['/home']);
        return false;
      }

      return true;
    }
  }
}
