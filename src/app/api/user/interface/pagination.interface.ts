export interface IPagination {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: "asc" | "desc";
}
