import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyApisComponent } from './my-apis.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [MyApisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MyApisComponent }]),
    SharedModule,
  ],
})
export class MyApisModule {}
