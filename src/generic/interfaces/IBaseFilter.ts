export interface IBaseFilter {
  readonly find?: string | undefined;
  readonly findBy?: string | undefined;
  readonly orderBy?: string | undefined;
  readonly direction?: 'ascending' | 'descending' | string | undefined;
}