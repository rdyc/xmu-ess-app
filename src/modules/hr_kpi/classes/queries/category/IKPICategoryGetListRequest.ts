import { IKPICategoryGetListFilter } from '../../filter/category';

export interface IKPICategoryGetListRequest {
  categoryUid: string;
  filter?: IKPICategoryGetListFilter;
}