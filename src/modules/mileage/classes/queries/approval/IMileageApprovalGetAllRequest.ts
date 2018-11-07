import { IMileageApprovalGetAllFilter } from '@mileage/classes/filters';

export interface IMileageApprovalGetAllRequest {
  readonly filter: IMileageApprovalGetAllFilter | undefined;
}