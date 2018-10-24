import { ILookupMileageExceptionAllFilter } from '@lookup/classes/filters/mileageException';

export interface ILookupMileageExceptionAllRequest {
  readonly filter: ILookupMileageExceptionAllFilter | undefined;
}
