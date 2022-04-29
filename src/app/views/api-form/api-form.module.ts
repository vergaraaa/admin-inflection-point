import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApiFormComponent } from './api-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ApiRouteComponent } from './api-route/api-route.component';

@NgModule({
  declarations: [ApiFormComponent, ApiRouteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ApiFormComponent }]),
    SharedModule,
    FormsModule,
  ],
})
export class ApiFormModule {}
