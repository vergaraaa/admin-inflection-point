import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [FormsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FormsComponent }]),
    SharedModule,
  ],
})
export class FormsModule {}
