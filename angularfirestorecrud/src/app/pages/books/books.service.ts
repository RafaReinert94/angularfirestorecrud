import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/components/header/models/book.interface';
import { map } from 'rxjs/operators';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books: Observable<Book[]>;

  private booksCollection: AngularFirestoreCollection<Book>;

  constructor(private readonly afs: AngularFirestore) {
    this.booksCollection = afs.collection<Book>('books');
    this.getBooks();
  }

  onDeleteBook(bookId: string): Promise<void> {
    return new Promise(async (resolve, reject)=>{
      try {
        const result = this.booksCollection.doc(bookId).delete();
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  onSaveBook(book: Book, bookId: string): Promise<void> {
    return new Promise(async (resolve, reject)=>{
      try {
        const id = bookId || this.afs.createId();
        const data = {id, ...book};
        const result = this.booksCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  private getBooks(): void {
    this.books = this.booksCollection
      .snapshotChanges()
      .pipe(map((actions) => actions.map((a) => a.payload.doc.data() as Book)));
  }
}
