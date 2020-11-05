import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';


@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [GroupComponent]
})
export class GroupModule { }
