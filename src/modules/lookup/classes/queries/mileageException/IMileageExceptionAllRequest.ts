import { IMileageExceptionAllFilter } from '@lookup/classes/filters';

export interface IMileageExceptionAllRequest {
  readonly filter?: IMileageExceptionAllFilter | undefined;
}
