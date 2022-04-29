import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    SharedModule,
  ],
})
export class LoginModule {}
