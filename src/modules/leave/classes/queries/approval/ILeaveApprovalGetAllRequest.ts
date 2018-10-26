import { ICompanyAccess } from '@generic/interfaces';
import { ILeaveApprovalGetAllFilter } from '@leave/classes/filters';

export interface ILeaveApprovalGetAllRequest extends ICompanyAccess {
  readonly filter: ILeaveApprovalGetAllFilter | undefined;
}