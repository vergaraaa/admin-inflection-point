import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApiDetailComponent } from './api-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ApiDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ApiDetailComponent,
      },
    ]),
    SharedModule,
  ],
})
export class ApiDetailModule {}
