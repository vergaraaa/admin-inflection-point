import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { GoogleLoginProvider, MicrosoftLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        SocialLoginModule,
        CoreModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '948183837469-mfu3sges0puokgh7q1slh4o9t1s88pco.apps.googleusercontent.com'
                        )
                    },
                    {
                        id: MicrosoftLoginProvider.PROVIDER_ID,
                        provider: new MicrosoftLoginProvider(
                            'dac4536c-a650-4c16-adda-5ebb0551cae4'
                        )
                    }
                ]
            } as SocialAuthServiceConfig
        }
    ],
})
export class AppModule { }
