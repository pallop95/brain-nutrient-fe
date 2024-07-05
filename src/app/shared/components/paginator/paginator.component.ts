import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Paging, initPaging } from '../../../features/shared-comps/shared-comps.interface';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() paging: Paging = { ...initPaging };
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() disabled: boolean = false;

  @Output() pageChange: EventEmitter<Paging> = new EventEmitter<Paging>();

  ngOnInit() {}

  handlePageEvent(event: PageEvent) {
    this.paging.page = event.pageIndex + 1;
    this.paging.pageSize = event.pageSize;
    this.paging.startRow = event.pageIndex * event.pageSize + 1;
    this.pageChange.emit(this.paging);
  }
}
