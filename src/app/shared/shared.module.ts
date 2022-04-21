import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
      NavbarComponent,
      LoadingIndicatorComponent, 
],
  imports: [
      CommonModule, 
      RouterModule,
],
  exports: [
      NavbarComponent, 
      CommonModule,
      LoadingIndicatorComponent
],
})
export class SharedModule {}
