import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
  ],
  template: `
    <div class="dialog-container">
      <h2 class="text-lg font-semibold mb-4">{{ data.title }}</h2>
      <div class="text-gray-700 mb-6">{{ data.message }}</div>
      <div class="flex flex-row justify-end">
        <button
          mat-button
          mat-dialog-close
          class="mx-1 bg-gray-100 hover:bg-gray-300 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          No
        </button>
        <button
          mat-button
          [mat-dialog-close]="true"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Yes
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 1rem;
        max-width: 400px;
      }
    `,
  ]
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {}
}
