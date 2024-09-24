export class APIResponse<T>{
   code?: number;
   message?: string;
   content?: T;
 }



 export class PageList<T> {
  data!: T[];
  totalCount!: number;
  currentPage!: number;
  pageSize!: number;
}

