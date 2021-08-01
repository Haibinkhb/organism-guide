export interface ResponseInterface<T = unknown> {
  code: number;
  data?: T;
  msg: string;
}

export interface QueryListRes<T> {
  data: T[];
  total: number;
}
