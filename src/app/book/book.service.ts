import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { books, IBook } from './book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  mockBooks = books;
  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    // return this.http.get<IBook[]>(this.apiUrl);
    return of(this.mockBooks);
  }

  getBookById(id: string): Observable<IBook> {
    // return this.http.get<IBook>(`${this.apiUrl}/${id}`);
    const foundBook = this.mockBooks.filter(book => book.id === id)[0];
    return of(foundBook);
  }

  addBook(book: IBook): Observable<IBook> {
    // return this.http.post<IBook>(this.apiUrl, book);
    const newBook = {
      ...book,
      id: Math.random().toString(),
    }
    this.mockBooks.push(newBook);
    return of(newBook);
  }

  updateBook(book: IBook): Observable<IBook> {
    // return this.http.put<IBook>(`${this.apiUrl}/${book.id}`, book);
    const updatedBook = {
      ...book,
    }
    const index = this.mockBooks.findIndex(book => book.id === updatedBook.id);
    this.mockBooks.splice(index, 1, updatedBook);
    return of(updatedBook);
  }

  deleteBook(id: string): Observable<IBook[]> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    this.mockBooks = this.mockBooks.filter(book => book.id !== id);
    return of(this.mockBooks);
  }
}
