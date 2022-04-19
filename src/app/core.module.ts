import { NgModule } from '@angular/core';
import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';

// Modulo para providers
@NgModule({
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
                  }
              ]
          } as SocialAuthServiceConfig
      }
  ],
})
export class CoreModule {}
