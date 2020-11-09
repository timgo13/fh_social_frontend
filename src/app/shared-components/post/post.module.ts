import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
  ],
  exports: [PostComponent]
})
export class PostModule { }
