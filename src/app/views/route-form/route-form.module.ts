import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouteFormComponent } from './route-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [RouteFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RouteFormComponent }]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RouteFormModule {}
