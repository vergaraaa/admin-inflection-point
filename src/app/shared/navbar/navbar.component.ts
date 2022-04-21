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

    constructor(
        private router: Router,
        private authService: SocialAuthService,
        private http: HttpClient,
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
        else {
            this.router.navigate(['/login']);
        }
    }

    getUserImageGoogle() {
        let user = JSON.parse(localStorage.getItem('google_auth')!);
        this.profilePicture = user.photoUrl;
        this.isLoadingImage = false;
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

    async logout() {
        await this.authService.signOut();
        localStorage.clear();
        this.router.navigate(['/login']);
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
