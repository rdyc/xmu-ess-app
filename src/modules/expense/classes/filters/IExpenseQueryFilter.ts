export interface IExpenseQueryFilter { // Coba-coba sementara, deleted soon :p
  readonly find?: string | undefined;
  readonly findBy?: string | undefined;
  readonly orderBy?: string | undefined;
  readonly direction?: string | undefined;
  readonly page: number | undefined;
  readonly size: number | undefined;
}