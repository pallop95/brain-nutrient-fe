import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { books, IBook } from './book.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
    ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'whyRead', 'action'];
  dataSource: MatTableDataSource<IBook>;

  books: IBook[] = [];

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource<IBook>();
    this.books = books;
    // TODO: ngrx/store to get the books
  }

  ngOnInit() {
    this.dataSource.data = [ ...this.books ];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onCreateClick() {
    // Handle the create button click event (e.g., open a modal for creating a new book)
    console.log('Create button clicked');
    this.router.navigate(['/book/book-form']);
  }

  onViewClick(book: IBook) {
    // Handle the view button click event (e.g., show details of the selected book)
    console.log('View button clicked for book:', book);
  }

  onUpdateClick(book: IBook) {
    // Handle the update button click event (e.g., open a modal for updating the selected book)
    console.log('Update button clicked for book:', book);
  }

  onDeleteClick(book: IBook) {
    // Handle the delete button click event (e.g., delete the selected book)
    console.log('Delete button clicked for book:', book);
  }
}
