import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelGetByIdRequest extends ICompanyAccess {
  readonly travelUid: string | undefined;
}