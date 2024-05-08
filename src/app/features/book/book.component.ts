import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BookService } from './book.service';
import { from, Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BookDto } from '../../../../generated-sources/openapi';
import { ModeFormType } from './book.interface';
import { select, Store } from '@ngrx/store';
import * as fromBooks from './store/index';
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
export class BookComponent implements OnDestroy, AfterViewInit  {
  books$: Observable<BookDto[] | null>;
  booksSubscription: Subscription;

  isLoading$: Observable<boolean>;
  // isLoadingSubscription: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'whyRead', 'action'];
  dataSource: MatTableDataSource<BookDto>;

  // books: BookDto[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store,
  ) {
    this.initDispatch();
    this.books$ = this.store.pipe(select(fromBooks.selectors.selectBookList));
    this.isLoading$ = this.store.pipe(select(fromBooks.selectors.selectBookIsLoading));

    this.dataSource = new MatTableDataSource<BookDto>();

    this.booksSubscription = this.books$.subscribe((books: BookDto[] | null) => {
      console.log('New value received from books$:', books);
      if (!books) return;

      // this.books = books;
      this.dataSource.data = [ ...books ];
      // Perform manipulation or other actions with the received books array
    });

    // this.isLoadingSubscription = this.isLoading$.subscribe((isLoading: boolean) => {
    //   debugger;
    //   if (!isLoading) {
    //     this.initDispatch();

    //     // Loading has finished, perform any necessary actions
    //     // this.dataSource.paginator = this.paginator;
    //   }
    // });
    // TODO: remove this below?
    // this.getBooks();
  }

  private initDispatch(): void {
    this.store.dispatch(fromBooks.actions.getBooksStart());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  onCRUClick(mode: ModeFormType, book?: BookDto) {
    !book ?
      this.router.navigate(['/book/book-form'], { queryParams: { mode } }) :
      this.router.navigate(['/book/book-form'], { queryParams: { mode, id: book.id } });
  }

  onDeleteClick(book: BookDto) {
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

  private deleteBook(book: BookDto) {
    // this.bookService.deleteBook(book.id).subscribe((books) => {
    //   this.getBooks();
    // });
    this.store.dispatch(fromBooks.actions.deleteBookStart({ id: book?.id }));
  }

  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
