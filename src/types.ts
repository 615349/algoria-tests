export type Hit = {
  author: string;
  created_at: string;
  objectID: string;
  points: number;
  title: string;
  url: string;
}

export interface Algoria {
  hits: Array<Hit>
}