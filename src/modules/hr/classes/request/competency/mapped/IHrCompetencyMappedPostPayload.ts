import { IMappedItemPayload } from './IMappedItemPayload';

export interface IHrCompetencyMappedPostPayload {
  companyUid: string;
  positionUid: string;
  categories: IMappedItemPayload[];
}