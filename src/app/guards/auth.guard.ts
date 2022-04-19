import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const requiresLogin = route.data['requiresLogin'];

        if(requiresLogin){
            // not logged in so redirect to login page
            if (localStorage.getItem('google_auth') || localStorage.getItem('microsoft_auth')) {
                return true;
            }
    
            this.router.navigate(['/login']);
            return false;
        }
        else{
            // logged in so redirect to home page
            if (!localStorage.getItem('google_auth') || !localStorage.getItem('microsoft_auth')) {
                return true;
            }
    
            this.router.navigate(['/']);
            return false;
        }
    }
}