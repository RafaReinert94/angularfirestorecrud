import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  books$ = this.booksSvc.books;

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };


  constructor(private router: Router, private booksSvc:BooksService) {}

  ngOnInit(): void {}

  onGoToEdit(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  async onGoToDelete(bookId: string): Promise<void> {
    try {
      await this.booksSvc.onDeleteBook(bookId);
      alert('Deleted');
    } catch (error) {
      console.log(error);
    }

  }
}
