import { CurrencyField } from '@lookup/classes/types';

export interface ICurrencyListFilter {
  orderBy?: CurrencyField;
  direction?: 'descending' | 'ascending';
}