import { IBaseFilter } from '@generic/interfaces';

export interface IProjectRegistrationAllFilter extends IBaseFilter {
  readonly customerUids: string[] | undefined;
  readonly projectTypes: string[] | undefined;
  readonly statusTypes: string[] | undefined;
}