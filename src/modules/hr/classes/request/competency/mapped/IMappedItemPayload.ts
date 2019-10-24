import { IMappedLevelItemPayload } from './IMappedLevelItemPayload';

export interface IMappedItemPayload {
  uid?: string;
  categoryUid: string;
  mappedLevels: IMappedLevelItemPayload[];
}