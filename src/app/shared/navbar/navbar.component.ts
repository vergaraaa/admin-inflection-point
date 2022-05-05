import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    sanitizer: any;
    profilePicture: any | string = "";
    googleLogin: boolean = true;
    isLoadingImage: boolean = true;
    navlinks: any = [];

    constructor(
        private router: Router,
        private authService: SocialAuthService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        if (localStorage.getItem('microsoft_auth')) {
            this.googleLogin = false;
        }

        if (this.googleLogin) {
            this.getUserImageGoogle();
        }
        else if (!this.googleLogin) {
            this.getUserImageMicrosoft();
        }

        this.userService.getUserRole().subscribe({
            next: (res: any) => {
                for (let i = 1; i < this.router.config.length; i++) {
                    if (this.router.config[i].data!['role'] >= res.role && this.router.config[i].data!['nav']) {
                        this.navlinks.push(this.router.config[i]);
                    }
                }
            },
            error: err => console.error(err)
        })

    }

    getUserImageGoogle(): string {
        let user = JSON.parse(localStorage.getItem('google_auth')!);
        this.isLoadingImage = false;
        return user.photoUrl;
    }

    getUserImageMicrosoft() {
        let user = JSON.parse(localStorage.getItem('microsoft_auth')!);
        let auth_token = user.response.accessToken;
        this.userService.getUserPhoto(
            'https://graph.microsoft.com/v1.0/me/photo/$value',
            auth_token).subscribe({
                next: (data) => {
                    this.createImageFromBlob(data);
                }, error: (error) => {
                    console.log('poniendo foto base');
                    this.profilePicture = 'https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg';
                    console.error(error);
                }
            });
        this.isLoadingImage = false;
    }

    logout() {
        this.authService.signOut(true).then(() => {
            localStorage.clear();
            this.router.navigate(['/login']);
        }).catch((e) => console.error(e));
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.profilePicture = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }
}
