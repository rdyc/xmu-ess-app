import { ICompanyAccess } from '@generic/interfaces';
import { ILeaveRequestGetAllFilter } from '@leave/classes/filters/request';

export interface ILeaveRequestGetAllRequest extends ICompanyAccess {
  filter?: ILeaveRequestGetAllFilter;
}