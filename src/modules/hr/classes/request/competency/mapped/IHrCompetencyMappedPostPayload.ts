import { IMappedItemPayload } from './IMappedItemPayload';

export interface IHrCompetencyMappedPostPayload {
  positionUid: string;
  levelType: string;
  categories: IMappedItemPayload[];
}