import { BookFormComponent } from './book-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [BookFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[BookFormComponent]
})
export class BookFormModule { }
