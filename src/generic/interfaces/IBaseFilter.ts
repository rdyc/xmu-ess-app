export interface IBaseFilter {
  readonly find: string | undefined;
  readonly findBy: string | undefined;
  readonly orderBy: string | undefined;
  readonly direction: string | undefined;
  readonly page: number | undefined;
  readonly size: number | undefined;
}