import { CurrencyField } from '@lookup/classes/types';

export interface ICurrencyListFilter {
  readonly orderBy?: CurrencyField | undefined;
  readonly direction?: 'descending' | 'ascending' | undefined;
}