export interface ViewList<T> {
  data: T[],
  extra: ViewListExtra;
}

export interface ViewListExtra {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}
