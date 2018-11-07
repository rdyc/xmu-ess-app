import { IMileageRequestGetAllFilter } from '@mileage/classes/filters';

export interface IMileageRequestGetAllRequest {
  readonly filter: IMileageRequestGetAllFilter | undefined;
}