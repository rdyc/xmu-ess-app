import { IClusterCategoryItemPayload } from './IClusterCategoryItemPayload';

export interface IHrCompetencyClusterPostPayload {
  name: string;
  description: string;
  categories: IClusterCategoryItemPayload[];
}