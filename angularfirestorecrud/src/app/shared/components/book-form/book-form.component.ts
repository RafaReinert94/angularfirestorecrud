import { BooksService } from './../../../pages/books/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Book } from '../header/models/book.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {


  book: Book= null;

  bookForm: FormGroup;
  private isEmail = /\S+@\S+\.\S/;

  constructor(private router: Router, private fb: FormBuilder, private bookSvc: BooksService) {
    const navigation = this.router.getCurrentNavigation();
    this.book = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if(typeof this.book === 'undefined'){
      this.router.navigate(['new']);
    } else{
      this.bookForm.patchValue(this.book)
    }
  }

  onSave():void{
    console.log('Save', this.bookForm.value);
    if(this.bookForm.valid){
      const book = this.bookForm.value;
      const bookId = this.book?.id || null;
      this.bookSvc.onSaveBook(book, bookId);
      this.bookForm.reset();
    }
  }

  private initForm():void {
    this.bookForm = this.fb.group({
      name:['', [Validators.required]],
      lastName:['', [Validators.required]],
      email:['', [Validators.required, Validators.pattern(this.isEmail)]],
      startDate:['', [Validators.required]],
    })
  }

  onGoBackToList():void{
    this.router.navigate(['list']);
  }

  isValidField(field:string): string {
    const validateField = this.bookForm.get(field);
    return (!validateField.valid && validateField.touched)
    ? 'is-invalid' : validateField.touched ? 'is-valid' : '';
  }

}
