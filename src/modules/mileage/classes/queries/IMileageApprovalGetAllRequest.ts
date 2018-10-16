import { ICompanyAccess } from '@generic/interfaces';
import { IMileageApprovalGetAllFilter } from '@mileage/classes/filters';

export interface IMileageApprovalGetAllRequest extends ICompanyAccess {
  readonly filter: IMileageApprovalGetAllFilter | undefined;
}