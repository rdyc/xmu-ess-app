import { ICategoryIndicatorItemPayload } from './ICategoryIndicatorItemPayload';

export interface ICategoryLevelItemPayload {
  levelUid?: string;
  level: number;
  description: string;
  indicators: ICategoryIndicatorItemPayload[];
}