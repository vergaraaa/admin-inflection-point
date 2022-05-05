import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApiDetailComponent } from './api-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouteDetailComponent } from './route-detail/route-detail.component';

@NgModule({
  declarations: [ApiDetailComponent, RouteDetailComponent],
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
