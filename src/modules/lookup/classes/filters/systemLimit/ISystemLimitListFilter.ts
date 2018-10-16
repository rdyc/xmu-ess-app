import { SystemLimitField } from '@lookup/classes/types';

export interface ISystemLimitListFilter {
  readonly companyUid?: string | undefined;
  readonly orderBy?: SystemLimitField | undefined;
  readonly direction?: 'descending' | 'ascending' | undefined;
}