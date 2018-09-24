import { IBaseFilter } from '@generic/interfaces';

export interface IProjectGetAllFilter extends IBaseFilter {
  readonly customerUids: string[] | undefined;
  readonly projectTypes: string[] | undefined;
  readonly statusTypes: string[] | undefined;
}