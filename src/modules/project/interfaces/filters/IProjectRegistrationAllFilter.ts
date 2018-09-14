import { IBaseFilter } from '@generic/interfaces';
import { ProjectField } from '@project/types';

export interface IProjectRegistrationAllFilter extends IBaseFilter<ProjectField> {
  readonly customerUids: string[] | undefined;
  readonly projectTypes: string[] | undefined;
  readonly statusTypes: string[] | undefined;
}