import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { books, IBook, ModeFormType } from './book.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BookService } from './book.service';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-book',
  standalone: true,
    imports: [
      CommonModule,
      MatTableModule,
      MatPaginatorModule,
      MatButtonModule,
      MatIconModule,
      MatButtonToggleModule,
      // ConfirmDialogComponent
    ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit, AfterViewInit  {
  // books$: Observable<IBook[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'whyRead', 'action'];
  dataSource: MatTableDataSource<IBook>;

  books: IBook[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private bookService: BookService, // TODO: remove (we want ngrx/store)
  ) {
    this.dataSource = new MatTableDataSource<IBook>();
    // TODO: ngrx/store to get the books
    // this.books$ = this.store.select(...);

    // TODO: remove this below?
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      console.log('new books from subscribe', this.books);
      this.dataSource.data = [ ...this.books ];
    });
  }

  ngOnInit() {
    // this.books = await this.bookService.getBooks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  onCRUClick(mode: ModeFormType, book?: IBook) {
    !book ?
      this.router.navigate(['/book/book-form'], { queryParams: { mode } }) :
      this.router.navigate(['/book/book-form'], { queryParams: { mode, id: book.id } });
  }

  onDeleteClick(book: IBook) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete confirmation',
        message: 'Are you sure you want to delete this book?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked "Yes", proceed with delete operation
        this.deleteBook(book);
      }
    });
  }

  private deleteBook(book: IBook) {
    this.bookService.deleteBook(book.id).subscribe((books) => {
      this.getBooks();
    });

  }
}
