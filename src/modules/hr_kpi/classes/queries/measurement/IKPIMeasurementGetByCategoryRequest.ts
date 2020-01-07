import { IKPIMeasurementGetAllFilter } from '../../filter/measurement';

export interface IKPIMeasurementGetByCategoryRequest {
  categoryUid: string;
  filter?: IKPIMeasurementGetAllFilter;
}