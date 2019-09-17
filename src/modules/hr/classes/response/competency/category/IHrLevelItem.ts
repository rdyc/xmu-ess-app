import { IHrIndicatorItem } from './IHrIndicatorItem';

export interface IHrLevelItem {
  uid: string;
  level: number;
  description: string;
  indicators: IHrIndicatorItem[];
}