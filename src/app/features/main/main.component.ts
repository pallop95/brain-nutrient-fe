import { Component } from '@angular/core';
import { GridLayoutComponent } from '../../shared/grid-layout/grid-layout.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [GridLayoutComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
