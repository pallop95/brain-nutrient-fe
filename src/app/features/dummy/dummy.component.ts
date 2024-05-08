import { Component } from '@angular/core';
import { DummyService } from './dummy.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.scss'
})
export class DummyComponent {
  constructor(private dummyService: DummyService) {

  }

  generateBadRequestError() {
    return this.dummyService.generateBadRequestError();
  }

  generateInternalServerError() {
    return this.dummyService.generateInternalServerError();
  }

  generateNotFoundError() {
    return this.dummyService.generateNotFoundError();
  }

  generateTimeoutError() {
    return this.dummyService.generateTimeoutError();
  }

  generateUnauthorizedError() {
    return this.dummyService.generateUnauthorizedError();
  }

  generateValidationError(id: number) {
    return this.dummyService.generateValidationError(NaN);
  }
}
