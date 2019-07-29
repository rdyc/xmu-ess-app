import { IKPIMeasurementGetListFilter } from '../../filter/measurement';

export interface IKPIMeasurementGetListRequest {
  categoryUid: string;
  filter?: IKPIMeasurementGetListFilter;
}