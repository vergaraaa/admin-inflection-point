import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApiDetailComponent } from './api-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
})
export class ApiDetailModule {}
