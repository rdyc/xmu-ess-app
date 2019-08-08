import { IClusterCategoryItemPayload } from './IClusterCategoryItemPayload';

export interface IHrCompetencyClusterPatchPayload {
  name: string;
  description: string;
  categories: IClusterCategoryItemPayload[];
}