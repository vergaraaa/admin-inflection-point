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
        this.putBackground();
    }

    googleAuth() {
        console.log('google')
        // TODO: auth with google
        this.removeBackground();
        this.router.navigate(['/home']);
    }
    
    microsoftAuth() {
        console.log('microsoft')
        // TODO: auth with microsoft
        this.removeBackground();
        this.router.navigate(['/home']);
    }

    putBackground(){
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundImage = "url('../../../assets/img/login_background.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.overflow = 'hidden';
    }
    
    removeBackground(){
        document.body.style.backgroundAttachment = "initial";
        document.body.style.backgroundImage = "initial";
        document.body.style.backgroundSize = 'initial';
        document.body.style.backgroundRepeat = 'initial';
        document.body.style.overflow = 'initial';
    }


}
