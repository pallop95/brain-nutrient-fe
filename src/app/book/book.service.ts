import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { books, IBook } from './book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = 'https://brain-nutrient-default-rtdb.asia-southeast1.firebasedatabase.app/books.json';
  // mockBooks = books;
  books: IBook[] = [];

  isFetchedFirstTime = false;
  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    this.isFetchedFirstTime = true;
    return this.http.get<IBook[]>(this.apiUrl).pipe(
      switchMap(books => {
        this.books = books || [];
        return of(this.books);
      }),
      catchError(error => {
        console.error('Error fetching books:', error);
        return of([]);
      })
    );
  }

  getBookById(id: string): Observable<IBook | null> {
      return this.getBooks().pipe(
        switchMap(books => {
          const foundBook = books.find(book => book.id === id) || null;
          return of(foundBook);
        })
      );
  }

  addBook(book: IBook): Observable<void> {
    // return this.http.post<IBook>(this.apiUrl, book);

    const newBook = { ...book, id: this.generateUniqueId() }
    this.books.push(newBook);

    return this.putBooks(this.books);
  }

  updateBook(book: IBook): Observable<IBook | null> {
    // return this.http.put<IBook>(`${this.apiUrl}/${book.id}`, book);

    const updatedBook = {
      ...book,
    }
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index === -1) {
      return of(null);
    }
    this.books[index] = book; // this.books.splice(index, 1, updatedBook);
    return this.putBooks(this.books).pipe(
      switchMap(() => of(book))
    );

    // return of(updatedBook); // TODO: check
  }

  deleteBook(id: string): Observable<void> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);

    this.books = this.books.filter(book => book.id !== id);
    return this.putBooks(this.books);
  }

  private putBooks(books: IBook[]): Observable<void> {
    return this.http.put<void>(this.apiUrl, books.slice()).pipe(
      catchError(error => {
        console.error('Error updateing Books:', error);
        return of();
      })
    )
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
