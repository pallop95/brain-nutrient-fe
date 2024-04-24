export interface IBook extends IReason {
  id: string;
  chapters: IReason[];
}

export interface IReason {
  name: string;
  what: string;
  how: string;
  why: string;
}
