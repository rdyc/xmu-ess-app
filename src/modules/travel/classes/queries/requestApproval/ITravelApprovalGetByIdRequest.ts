import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelApprovalGetByIdRequest extends ICompanyAccess {
  travelUid?: string;
}