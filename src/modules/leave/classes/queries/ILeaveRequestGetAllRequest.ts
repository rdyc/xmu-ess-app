import { ICompanyAccess } from '@generic/interfaces';
import { ILeaveRequestGetAllFilter } from '@leave/classes/filters';

export interface ILeaveRequestGetAllRequest extends ICompanyAccess {
  readonly filter: ILeaveRequestGetAllFilter | undefined;
}