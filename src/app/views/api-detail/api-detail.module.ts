import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApiDetailComponent } from './api-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ApiDetailComponent],
  imports: [
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
