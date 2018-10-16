export interface IBaseCommand<T> {
  data: T;
  resolve: any;
  reject: any;
}