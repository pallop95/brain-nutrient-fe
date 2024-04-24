import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IBook } from '../book.interface';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  @Input() book: IBook | null = null;
  bookForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.initializeForm();
    this.bookForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      whyRead: ['', Validators.required],
      chapters: this.fb.array([this.buildChapterForm()]),
    });
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

  buildChapterForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      what: ['', Validators.required],
      how: ['', Validators.required],
      whyRead: ['', Validators.required],
    });
  }

  addChapter(): void {
    const chapters = this.bookForm.get('chapters') as FormArray;
    chapters.push(this.buildChapterForm());
  }

  removeChapter(index: number): void {
    const chapters = this.bookForm.get('chapters') as FormArray;
    chapters.removeAt(index);
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      // Form is valid, handle submission
      console.log(this.bookForm.value);
    } else {
      // Form is invalid, display error messages or handle accordingly
    }
  }
}
