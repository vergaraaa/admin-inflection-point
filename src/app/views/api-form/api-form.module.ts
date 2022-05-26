import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiFormComponent } from './api-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ApiRouteComponent } from './api-route/api-route.component';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ApiFormComponent, ApiRouteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ApiFormComponent }]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ApiFormModule {}
