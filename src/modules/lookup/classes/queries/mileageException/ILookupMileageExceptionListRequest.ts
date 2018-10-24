import { ILookupMileageExceptionListFilter } from '@lookup/classes/filters/mileageException';

export interface ILookupMileageExceptionListRequest {
  readonly filter: ILookupMileageExceptionListFilter | undefined;
}
