import { Component, input, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { MatButtonModule } from '@angular/material/button';
import { ModeFormType } from '../book.interface';
import { BookDto, ChapterDto } from '../../../../generated-sources/openapi';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromBooks from '../store/index';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit, OnDestroy {
  selectedBook$: Observable<BookDto | null>;
  isLoading$: Observable<boolean>;
  bookSubscription: Subscription;

  textSubmit: 'Save' | 'Back' = 'Save';
  mode: ModeFormType | null = null;
  id: string | null = null;

  // book: BookDto | null = null;
  bookForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    // private bookService: BookService,
    private router: Router,
    private store: Store,
    ) {
    this.selectedBook$ = this.store.pipe(select(fromBooks.selectors.selectSelectedBook));
    this.isLoading$ = this.store.pipe(select(fromBooks.selectors.selectBookIsLoading));

    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] ?? 'create'; // Access 'mode' parameter
      this.id = params['id']; // Access 'id' parameter

      console.log('mode ::', this.mode);
      console.log('id ::', this.id);


      this.textSubmit = this.mode === 'view' ? 'Back' : 'Save';
    });

    this.bookSubscription = this.selectedBook$.subscribe((selectedBook: BookDto | null) => {
      console.log('selectedBook ::', selectedBook);
      // this.book = selectedBook;

      if(!selectedBook) return;

      const tempChapters = this.fb.array(
        selectedBook.chapters?.map(chapter => this.buildChapterForm(chapter)) ?? []
      );
      console.log('tempChapters ::', tempChapters);

      this.bookForm = this.fb.group({
        id: [selectedBook.id, Validators.required],
        name: [selectedBook?.name, Validators.required],
        whyRead: [selectedBook?.whyRead, Validators.required],
        chapters: tempChapters,
      });
    });
  }

  initDispatch(id :string) {
    this.store.dispatch(fromBooks.actions.getBookStart({ id }));
  }

  ngOnInit(): void {
    // this.initializeForm();
    switch (this.mode) {
      case 'create':
        this.bookForm = this.fb.group({
          // id: ['', Validators.required],
          name: ['', Validators.required],
          whyRead: ['', Validators.required],
          chapters: this.fb.array([]),
        });
        break;
      case 'update':
      case 'view':
        if (!this.id) return;

        this.initDispatch(this.id);
        break;
      default:
        console.log('WTF!!!');
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }

  get chapters(): FormArray { // Define a getter for chapters
    return this.bookForm.get('chapters') as FormArray;
  }

  // initializeForm(): void {
  //   this.bookForm = this.fb.group({
  //     id: [''], // You can set validators if needed
  //     name: ['', Validators.required],
  //     whyRead: ['', Validators.required],
  //     chapters: this.fb.array([]) // You can handle chapters separately if needed
  //   });

  //   if (this.book) {
  //     this.isEditMode = true;
  //     this.bookForm.patchValue(this.book);
  //   }
  // }

  buildChapterForm(chapter?: ChapterDto): FormGroup {
    return !chapter?
      this.fb.group({
        title: ['', Validators.required],
        what: ['', Validators.required],
        how: ['', Validators.required],
        whyRead: ['', Validators.required],
      }) :
      this.fb.group({
        title: [chapter.title, Validators.required],
        what: [chapter.what, Validators.required],
        how: [chapter.how, Validators.required],
        whyRead: [chapter.whyRead, Validators.required],
      });
  }

  addChapter(): void {
    const chapters = this.chapters as FormArray;
    chapters.push(this.buildChapterForm());
  }

  removeChapter(index: number): void {
    const chapters = this.bookForm.get('chapters') as FormArray;
    chapters.removeAt(index);
  }

  onSubmit(): void {
    if (this.bookForm.valid && ['create', 'update'].includes(this.mode || '')) {
      if (!this.bookForm.dirty) {
        this.router.navigate(['/book']);
        return;
      }
      switch (this.mode) {
        case 'create':
          this.store.dispatch(fromBooks.actions.createBookStart({ newBook: this.bookForm.value }));
          break;
        case 'update':
          this.store.dispatch(fromBooks.actions.updateBookStart({ updateBook: this.bookForm.value }));
          break;
        default:
          break;
      }

    } else if (this.mode === 'view') {
      this.router.navigate(['/book']);
    } else {
      // Form is invalid, display error messages or handle accordingly
      // TODO: alert dialog
      alert('Please check');
    }
  }
}
