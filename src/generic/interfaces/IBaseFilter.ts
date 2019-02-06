import { DirectionType } from '@generic/types';

export interface IBaseFilter {
  find?: string;
  findBy?: string;
  orderBy?: string;
  direction?: DirectionType;
}