import { SystemLimitField } from '@lookup/classes/types';

export interface ISystemLimitListFilter {
  companyUid?: string;
  orderBy?: SystemLimitField;
  direction?: 'descending' | 'ascending';
}