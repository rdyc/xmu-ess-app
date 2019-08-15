import { IClusterCategoryItemPayload } from './IClusterCategoryItemPayload';

export interface IHrCompetencyClusterPutPayload {
  name: string;
  description: string;
  categories: IClusterCategoryItemPayload[];
}