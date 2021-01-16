import { BookFormModule } from './../../../shared/components/book-form/book-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';


@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    NewRoutingModule,
    BookFormModule
  ]
})
export class NewModule { }
