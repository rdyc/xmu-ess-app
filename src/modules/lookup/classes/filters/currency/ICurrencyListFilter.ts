import { CurrencyField } from '@lookup/classes/types';

export interface ILookupCurrencyListFilter {
  readonly orderBy?: CurrencyField | undefined;
  readonly direction?: 'descending' | 'ascending' | undefined;
}