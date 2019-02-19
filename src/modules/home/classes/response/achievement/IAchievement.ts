import { IValueResponse } from './IValueResponse';

export interface IAchievement {
  id: number;
  title: string;
  description: string;
  unit: string;
  valueObject: IValueResponse[];
}