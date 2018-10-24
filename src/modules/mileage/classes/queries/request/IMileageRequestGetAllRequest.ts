import { ICompanyAccess } from '@generic/interfaces';
import { IMileageRequestGetAllFilter } from '@mileage/classes/filters';

export interface IMileageRequestGetAllRequest extends ICompanyAccess {
  readonly filter: IMileageRequestGetAllFilter | undefined;
}