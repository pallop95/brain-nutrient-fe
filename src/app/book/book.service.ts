import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { BookDto, BooksControllerService } from '../../../generated-sources/openapi';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: BookDto[] = [];

  // isFetchedFirstTime = false;
  constructor(
    private bookControllerService: BooksControllerService,
  ) {}

  getBooks(): Observable<BookDto[]> {
    // this.isFetchedFirstTime = true;
    /*
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
    */
   return this.bookControllerService.booksControllerFindAllBooks();
  }

  getBookById(id: string): Observable<BookDto | null> {
    /*
    return this.getBooks().pipe(
      switchMap(books => {
        const foundBook = books.find(book => book.id === id) || null;
        return of(foundBook);
      })
    );
    */
    return this.bookControllerService.booksControllerFindBookById(id);
  }

  addBook(book: BookDto): Observable<BookDto> {
    /*
    // return this.http.post<IBook>(this.apiUrl, book);

    const newBook = { ...book, id: this.generateUniqueId() }
    this.books.push(newBook);

    return this.putBooks(this.books);
    */
   return this.bookControllerService.booksControllerCreateBook(book);
  }

  updateBook(book: BookDto): Observable<BookDto | null> {
    /*
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

    return of(updatedBook); // TODO: check
    */
    return this.bookControllerService.booksControllerUpdateBook(book.id, book);
  }

  deleteBook(id: string): Observable<void> {
    /*
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);

    this.books = this.books.filter(book => book.id !== id);
    return this.putBooks(this.books);
    */
   return this.bookControllerService.booksControllerDeleteBook(id);
  }
}
