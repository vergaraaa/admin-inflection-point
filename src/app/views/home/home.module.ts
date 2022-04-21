import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from './../../shared/shared.module';
import { LoadingIndicatorComponent } from 'src/app/shared/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    SharedModule,
  ],
})
export class HomeModule {}
