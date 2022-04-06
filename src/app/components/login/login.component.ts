import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundImage = "url('../../../assets/img/login_background.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        // document.body.style.backgroundPosition = 'center';
        document.body.style.overflow = 'hidden';
    }

    googleAuth() {
        console.log('google')
    }

    microsoftAuth() {
        console.log('facebook')
    }

}
