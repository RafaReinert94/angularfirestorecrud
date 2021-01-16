import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/components/header/models/book.interface';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state:{
      value:null
    }
  }

  book: Book = null;

  constructor(private router:Router, private booksSvc: BooksService) {
    const navigation = this.router.getCurrentNavigation();
    this.book = navigation?.extras?.state?.value;
   }

  ngOnInit(): void {
    if(typeof this.book === 'undefined'){
      this.router.navigate(['list'])
    }
  }

  onGoToEdit(): void {
    this.navigationExtras.state.value = this.book;
    this.router.navigate(['edit'], this.navigationExtras)
  }

  onGoBackToList():void{
    this.router.navigate(['list'])
  }

  async onGoToDelete(): Promise<void> {
    try {
      await this.booksSvc.onDeleteBook(this.book?.id);
      alert('Deleted');
      this.onGoBackToList();
    } catch (error) {
      console.log(error);
    }

  }

}
