import { ICompanyAccess } from '@generic/interfaces';

export interface IMileageRequestGetByIdRequest extends ICompanyAccess {
  readonly mileageUid: string | undefined;
}