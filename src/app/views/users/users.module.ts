import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserComponent } from './users.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: UserComponent }]),
    SharedModule,
    FormsModule
  ],
})
export class UsersModule {}
