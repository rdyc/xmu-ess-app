import { IHrIndicatorItem } from './IHrIndicatorItem';

export interface IHrLevelItem {
  levelUid?: string;
  level: number;
  description: string;
  indicators: IHrIndicatorItem[];
}