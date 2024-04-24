export interface IBook extends IReason {
  id: string,
  name: string,
  chapters: IReason[],
}

export interface IReason {
  what: string,
  how: string,
  why: string,
}

