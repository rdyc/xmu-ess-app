import { IMappedItemPayload } from './IMappedItemPayload';

export interface IHrCompetencyMappedPutPayload {
  positionUid: string;
  levelType: string;
  categories: IMappedItemPayload[];
}