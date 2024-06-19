import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../shared/material/material.module';
import { Paging } from './shared-comps.interface';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';

export interface PeriodicElement {
  id: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 5, name: 'Boron', weight: 10.81, symbol: 'B'},
  {id: 6, name: 'Carbon', weight: 12.01, symbol: 'C'},
  {id: 7, name: 'Nitrogen', weight: 14.01, symbol: 'N'},
  {id: 8, name: 'Oxygen', weight: 15.999, symbol: 'O'},
  {id: 9, name: 'Fluorine', weight: 18.998, symbol: 'F'},
  {id: 10, name: 'Neon', weight: 20.18, symbol: 'Ne'},
  // Add more elements if needed
];

@Component({
  selector: 'app-shared-comps',
  standalone: true,
  imports: [
    MaterialModule,
    PaginatorComponent,
  ],
  templateUrl: './shared-comps.component.html',
  styleUrl: './shared-comps.component.scss'
})
export class SharedCompsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  panelOpenState = false;

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.panelOpenState = true;
  }

  paging: Paging = {
    page: 1,
    pageSize: 10,
    totalRow: ELEMENT_DATA.length, // Set total rows dynamically based on data
    totalAll: null,
    totalPage: 0,
    sortField: '',
    sortType: 'DESC',
    startRow: 1
  };

  handlePageChange(event: Paging) {
    this.paging = event;

    this.updateDataSource();
  }

  updateDataSource() {
    this.dataSource.data = ELEMENT_DATA.slice(this.paging.startRow - 1, this.paging.startRow + this.paging.pageSize - 1);
  }
}
