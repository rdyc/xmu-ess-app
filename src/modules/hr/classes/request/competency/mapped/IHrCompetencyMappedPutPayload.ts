import { IMappedItemPayload } from './IMappedItemPayload';

export interface IHrCompetencyMappedPutPayload {
  companyUid: string;
  positionUid: string;
  categories: IMappedItemPayload[];
}