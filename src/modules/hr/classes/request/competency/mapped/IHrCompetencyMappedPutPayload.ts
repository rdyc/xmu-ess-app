import { IMappedItemPayload } from './IMappedItemPayload';

export interface IHrCompetencyMappedPutPayload {
  positionUid: string;
  categories: IMappedItemPayload[];
}