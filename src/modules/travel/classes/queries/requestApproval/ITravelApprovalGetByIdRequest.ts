import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelApprovalGetByIdRequest extends ICompanyAccess {
  readonly travelUid: string | undefined;
}