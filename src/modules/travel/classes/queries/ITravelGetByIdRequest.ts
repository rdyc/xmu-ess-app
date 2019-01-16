import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelGetByIdRequest extends ICompanyAccess {
  travelUid?: string;
}