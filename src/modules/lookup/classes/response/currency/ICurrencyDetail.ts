import { IBaseChanges } from '@generic/interfaces';

export interface ICurrencyDetail {
  uid: string;
  name: string;
  symbol: string;
  rate: number;
  isActive: boolean;
  changes: IBaseChanges | null;
}