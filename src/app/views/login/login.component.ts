import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, MicrosoftLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private authService: SocialAuthService, private userService: UserService) { }

    ngOnInit(): void {
        this.putBackground();
    }

    googleAuth() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (user) => {
            // Save on local storage
            localStorage.setItem('google_auth', JSON.stringify(user));
            this.getUserByEmail(user);
        });
    }

    microsoftAuth() {
        this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID).then((user) => {
            localStorage.setItem('microsoft_auth', JSON.stringify(user));
            this.getUserByEmail(user);
        });
    }
    
    getUserByEmail(user: SocialUser) {
        // Check if user exists on database
        this.userService.getUserByEmail(user.email).subscribe({
            next: res => {
                if (res == null) {
                    this.userService.createUser(
                        user.firstName,
                        user.lastName,
                        3,
                        user.email
                    ).subscribe({});
                }

                // Redirect 
                this.removeBackground();
                this.router.navigate(['/home']);
            },
            error: err => console.error(err)
        });
    }

    putBackground() {
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundImage = "url('../../../assets/img/login_background.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.overflow = 'hidden';
    }

    removeBackground() {
        document.body.style.backgroundAttachment = "initial";
        document.body.style.backgroundImage = "initial";
        document.body.style.backgroundSize = 'initial';
        document.body.style.backgroundRepeat = 'initial';
        document.body.style.overflow = 'initial';
    }


}
