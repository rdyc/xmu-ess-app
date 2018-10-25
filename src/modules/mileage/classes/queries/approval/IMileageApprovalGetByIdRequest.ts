import { ICompanyAccess } from '@generic/interfaces';

export interface IMileageApprovalGetByIdRequest extends ICompanyAccess {
  readonly mileageUid: string | undefined;
}