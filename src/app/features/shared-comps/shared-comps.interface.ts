export interface Paging {
  page: number;
  pageSize: number;
  totalRow: number;
  totalAll: number | null;
  totalPage: number;
  sortField: string;
  sortType: 'ASC' | 'DESC';
  startRow: number;
}

export const initPaging: Paging = {
  page: 1,
  pageSize: 10,
  totalRow: 0,
  totalAll: null,
  totalPage: 0,
  sortField: '',
  sortType: 'DESC',
  startRow: 1
};
