export interface NameValueObject {
  name: string;
  value: string;
}

export interface NamedEntity {
  _id: string;
  name: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}