import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundImage = "url('../../../assets/img/login_background.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.overflow = 'hidden';
    }

    googleAuth() {
        console.log('google')
        // TODO: auth with google
        this.router.navigate(['/home']);
    }
    
    microsoftAuth() {
        console.log('microsoft')
        // TODO: auth with microsoft
        this.router.navigate(['/home']);
    }

}
