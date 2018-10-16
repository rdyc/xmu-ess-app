import { IMileageExceptionListFilter } from '@lookup/classes/filters';

export interface IMileageExceptionListRequest {
  readonly filter?: IMileageExceptionListFilter | undefined;
}
