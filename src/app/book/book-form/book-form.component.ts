import { Component, input, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IBook, IChapter, ModeFormType } from '../book.interface';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  textSubmit: 'Save' | 'Back' = 'Save';
  mode: ModeFormType | null = null;
  id: string | null = null;

  book: IBook | null = null;
  bookForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] ?? 'create'; // Access 'mode' parameter
      this.id = params['id']; // Access 'id' parameter

      console.log('mode ::', this.mode);
      console.log('id ::', this.id);

      this.textSubmit = this.mode === 'view' ? 'Back' : 'Save';
    });
  }

  ngOnInit(): void {
    debugger;
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

        this.bookService.getBookById(this.id).subscribe((book) => {
          this.book = book;
        });
        console.log('book ::', this.book);

        if(!this.book) return;

        const tempChapters = this.fb.array(
          this.book.chapters.map(chapter => this.buildChapterForm(chapter)) ?? []
        );
        console.log('tempChapters ::', tempChapters);

        this.bookForm = this.fb.group({
          id: [this.book.id, Validators.required],
          name: [this.book?.name, Validators.required],
          whyRead: [this.book?.whyRead, Validators.required],
          chapters: tempChapters,
        });
        break;
      default:
        console.log('WTF!!!');
        break;
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

  buildChapterForm(chapter?: IChapter): FormGroup {
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
      // Form is valid, handle submission
      console.log(this.bookForm.value);

      switch (this.mode) {
        case 'create':
          this.bookService.addBook(this.bookForm.value).subscribe(() => {
            this.router.navigate(['/book']);
          });
          break;
        case 'update':
          this.bookService.updateBook(this.bookForm.value).subscribe(() => {
            this.router.navigate(['/book']);
          });
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
