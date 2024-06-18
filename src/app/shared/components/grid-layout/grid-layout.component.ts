import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-layout',
  standalone: true,
  imports: [],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class GridLayoutComponent {

}
